import {Component, ViewChild, OnDestroy, OnInit} from '@angular/core';
import {BookmarkService} from './bookmark.service';
import {Subscription} from 'rxjs';
import {Bookmark} from '../bookmark';
import { ActivatedRoute, Params } from '@angular/router';
import {Folder} from '../folder';
import {FolderService} from '../sidebar/folder-list/folder.service';

@Component({
  selector: 'bm-bookmarks-list',
  templateUrl: './bookmarks-list.component.html',
  styleUrls: ['./bookmarks-list.component.scss']
})
export class BookmarksListComponent implements OnInit, OnDestroy {
  @ViewChild('content', { static: true }) public contentModal: any;
  public editedBookmark: Bookmark;
  editContent = '';
  editTitle = '';
  editUrl = '';
  editId: number;
  editFolder: Folder;
  subscription!: Subscription;
  folderSubscription!: Subscription;
  errorMessage = '';
  allBookmarks: Bookmark[] = [];
  bookmarks: Bookmark[] = [];
  params: Params;
  folders: Folder[] = [];

  constructor(private bookmarkService: BookmarkService, private folderService: FolderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription =
      this.bookmarkService.getBookmarks().subscribe({
        next: bookmarks => {
          this.allBookmarks = bookmarks;
          this.route.queryParams.subscribe(params => {
            if (params.category){
              this.bookmarks = [];
              this.bookmarks = this.allBookmarks.filter(b => b.category?.name == params.category);
            }else{
              this.bookmarks = this.allBookmarks;
            }
          });
        },
        error: err => this.errorMessage = err
      });
    this.folderSubscription =
      this.folderService.getFolders().subscribe({
        next: folders => {
          this.folders = folders;
        },
        error: err => this.errorMessage = err
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.folderSubscription.unsubscribe();
  }

  onEditButtonClicked($event: Bookmark): void {
    document.body.appendChild(document.getElementById('exampleModal'));
    this.editedBookmark = $event;
    this.editTitle = $event.title;
    this.editUrl = $event.url;
    this.editContent = $event.content;
    this.editId  = $event.bookmarkId;
    this.route.queryParams.subscribe(params => {
      if (params.category) {
        this.editFolder = this.folders.filter(f => f.name === params.category)[0];
        if (!this.editFolder) {
          this.folders.forEach(f1 => {
            this.editFolder = f1.subcategories.filter(f => f.name === params.category)[0] ?? this.editFolder;
          });
          }
        }
    });
    this.contentModal.show();
  }

  onAddButtonClicked($event: Bookmark): void {
    this.editedBookmark = $event;
    this.editTitle = $event.title;
    this.editUrl = $event.url;
    this.editContent = $event.content;
    this.editId = $event.bookmarkId;
    this.contentModal.show();
  }

  onDeleteButtonClicked(): void {
    this.bookmarkService.deleteBookmark(this.editedBookmark)
      .subscribe(data => {
        console.log('Successful');
      });
    window.location.reload();
  }

  editBookmark(): void {
    this.editedBookmark.title = this.editTitle;
    this.editedBookmark.content = this.editContent;
    this.editedBookmark.url = this.editUrl;
    this.editedBookmark.category = this.editFolder;
    if (this.editId) {
      this.bookmarkService.editBookmark(this.editedBookmark)
        .subscribe(data => {
          console.log('Successful');
        });
    } else {
      this.bookmarkService.addBookmark(this.editedBookmark)
        .subscribe(data => {
          console.log('Successful');
        });
      window.location.reload();
    }
    this.contentModal.hide();
  }
}
