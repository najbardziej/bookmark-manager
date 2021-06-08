import {Component, ViewChild, OnDestroy, OnInit} from '@angular/core';
import {BookmarkService} from './bookmark.service';
import {Subscription} from 'rxjs';
import {Bookmark} from '../bookmark';
import { ActivatedRoute, Params } from '@angular/router';
import {Folder} from '../folder';
import {FolderService} from '../sidebar/folder-list/folder.service';
import {TagService} from '../sidebar/tag-list/tag.service';
import {Tag} from '../tag';

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
  tagSubscription!: Subscription;
  errorMessage = '';
  bookmarks: Bookmark[] = [];
  params: Params;
  folders: Folder[] = [];
  tags: Tag[] = [];

  constructor(private bookmarkService: BookmarkService, private folderService: FolderService, private tagService: TagService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription =
      this.bookmarkService.getBookmarks().subscribe({
        next: bookmarks => {
          this.route.queryParams.subscribe(params => {
            if (params.category){
              this.getFolders();
              this.bookmarks = [];
              this.bookmarks = this.prepareBookmark(bookmarks, params.category);
              return;
            }if (params.tag){
              this.getTags();
              this.bookmarks = [];
              this.bookmarks = this.prepareBookmarkByTag(bookmarks, params.tag);
              return;
            }
            else{
              this.bookmarks = bookmarks;
            }
          });
        },
        error: err => this.errorMessage = err
      });
    this.getFolders();
    this.getTags();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.folderSubscription.unsubscribe();
  }

  onEditButtonClicked($event: Bookmark): void {
    document.body.appendChild(document.getElementById('exampleModal'));
    this.editedBookmark = $event;
    if (!this.editedBookmark.tags)
      this.editedBookmark.tags = [];
    this.editTitle = $event.title;
    this.editUrl = $event.url;
    this.editContent = $event.content;
    this.editId  = $event.bookmarkId;
    this.getTags();
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

  private prepareBookmarkByTag(bookmarks: Bookmark[], tag: any): Bookmark[] {
    const bookmarksToShow: Bookmark[] = [];
    for (const bookmark of bookmarks) {
      for (const tag1 of bookmark.tags) {
        if (tag1.name.toLowerCase() === tag.toLowerCase()){
          bookmarksToShow.push(bookmark);
        }
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

  addTagToBookmark(event: Event): void {
    const button = event.target as HTMLButtonElement;
    const buttonValue = button.value;
    const newTag: Tag = ({} as Tag);
    this.editedBookmark.tags.push(this.searchTag(buttonValue));
  }

  deleteTagFromBookmark(event: Event): void {
    const button = event.target as HTMLButtonElement;
    const buttonValue = button.value;
    for (const tagsKey in this.editedBookmark.tags) {
      if (this.editedBookmark.tags[tagsKey].name === buttonValue){
        this.editedBookmark.tags.splice(Number(tagsKey), 1 + Number(tagsKey));
      }
    }
  }

  searchTag(tagName: string): Tag | null {
    for (const tag of this.tags) {
      if (tag.name === tagName){
        return tag;
      }
    }
    return null;
  }

  private getTags(): void {
    this.tagSubscription =
      this.tagService.getTags().subscribe({
        next: tags => {
          this.tags = tags;
        },
        error: err => this.errorMessage = err
      });
  }

  private getFolders(): void {
    this.folderSubscription =
      this.folderService.getFolders().subscribe({
        next: folders => {
          this.folders = folders;
        },
        error: err => this.errorMessage = err
      });
  }
}
