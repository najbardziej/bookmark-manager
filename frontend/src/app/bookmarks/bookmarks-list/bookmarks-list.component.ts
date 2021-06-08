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
  bookmarks: Bookmark[] = [];
  params: Params;
  folders: Folder[] = [];

  constructor(private bookmarkService: BookmarkService, private folderService: FolderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription =
      this.bookmarkService.getBookmarks().subscribe({
        next: bookmarks => {
          this.route.queryParams.subscribe(params => {
            if (params.category){
              this.bookmarks = [];
              this.bookmarks = this.prepareBookmark(bookmarks, params.category);
            }else{
              this.bookmarks = bookmarks;
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
    console.log(JSON.stringify(this.editedBookmark));
    if (this.editId) {
      if (this.editedBookmark.category) {
        console.log(this.editedBookmark);
        this.prepareCategory(this.editedBookmark.category);
      }
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

  private prepareCategory(category: Folder): Folder|null {
    for (const folder of this.folders) {
      if (folder.subcategories){
        for (const subcategory  of folder.subcategories) {
          if (subcategory.id === category.id) {
            folder.subcategories.length = 0;
            folder.subcategories.push(category);
            return folder;
          }
        }
      }
    }
    return null;
  }

  // tslint:disable-next-line:typedef
  private prepareBookmark(bookmarks: Bookmark[], category: any): Bookmark[] {
    let bookmarksToShow: Bookmark[] = [];
    for (const bookmark of bookmarks) {
      if (bookmark.category.name === category) {
        bookmarksToShow.push(bookmark); }
      if (this.subcategoryBelongsToCategory(bookmark.category.id, category)) {
        bookmarksToShow.push(bookmark);
      }
    }
    return bookmarksToShow;
  }

  private subcategoryBelongsToCategory(id: number, enteredCategory:String): boolean {
    for (const folder of this.folders) {
      if (folder.subcategories.length > 0 && folder.name === enteredCategory) {
        for (const subcategory of folder.subcategories) {
          if (subcategory.id === id) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
