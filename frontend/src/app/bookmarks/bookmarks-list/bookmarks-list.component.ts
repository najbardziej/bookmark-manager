import {Component, ViewChild, OnDestroy, OnInit, ElementRef} from '@angular/core';
import {BookmarkService} from './bookmark.service';
import {Subscription} from 'rxjs';
import {Bookmark} from '../bookmark';

@Component({
  selector: 'bm-bookmarks-list',
  templateUrl: './bookmarks-list.component.html',
  styleUrls: ['./bookmarks-list.component.scss']
})
export class BookmarksListComponent implements OnInit, OnDestroy {
  @ViewChild('content', { static: true }) public contentModal: any;
  public editedBookmark: Bookmark;

  subscription!: Subscription;
  errorMessage = '';
  bookmarks: Bookmark[] = [];

  constructor(private bookmarkService: BookmarkService) { }

  ngOnInit(): void {
    this.subscription =
      this.bookmarkService.getBookmarks().subscribe({
        next: bookmarks => {
          this.bookmarks = bookmarks;
        },
        error: err => this.errorMessage = err
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEditButtonClicked($event: Bookmark): void {
    this.editedBookmark = $event;
    this.contentModal.show();
  }

  editBookmark(): void {
    this.bookmarkService.editBookmark(this.editedBookmark)
      .subscribe(data => {
        console.log('Successful');
      });
  }
}
