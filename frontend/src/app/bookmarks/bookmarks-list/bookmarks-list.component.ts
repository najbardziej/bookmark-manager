import {Component, ViewChild, OnDestroy, OnInit} from '@angular/core';
import {BookmarkService} from './bookmark.service';
import {Subscription} from 'rxjs';
import {Bookmark} from '../bookmark';
import { ActivatedRoute, Params } from '@angular/router';

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
  subscription!: Subscription;
  errorMessage = '';
  allBookmarks: Bookmark[] = [];
  bookmarks: Bookmark[] = [];
  params: Params;

  constructor(private bookmarkService: BookmarkService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription =
      this.bookmarkService.getBookmarks().subscribe({
        next: bookmarks => {
          this.allBookmarks = bookmarks;
          this.route.queryParams.subscribe(params => {
            if (params['category']){
              this.bookmarks = [];
              this.bookmarks = this.allBookmarks.filter(b => b.category?.name == params['category']);
            }else{
              this.bookmarks = this.allBookmarks;
            }
          });
        },
        error: err => this.errorMessage = err
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEditButtonClicked($event: Bookmark): void {
    this.editedBookmark = $event;
    this.editTitle = $event.title;
    this.editUrl = $event.url;
    this.editContent = $event.content;
    this.editId  = $event.bookmarkId;
    this.contentModal.show();
  }

  onAddButtonClicked($event: Bookmark): void {
    this.editedBookmark = $event;
    this.editTitle = $event.title;
    this.editUrl = $event.url;
    this.editContent = $event.content;
    this.editId  = $event.bookmarkId;
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
