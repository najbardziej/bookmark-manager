import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MDBBootstrapModule} from 'angular-bootstrap-md';
import { BookmarksComponent } from './bookmarks.component';
import { BookmarksListComponent } from './bookmarks-list/bookmarks-list.component';
import { BookmarkComponent } from './bookmarks-list/bookmark/bookmark.component';
import { ConvertUrlToDomainPipe } from './bookmarks-list/convert-url-to-domain.pipe';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FolderListComponent } from './sidebar/folder-list/folder-list.component';
import { TagListComponent } from './sidebar/tag-list/tag-list.component';

@NgModule({
  declarations: [
    BookmarksComponent,
    BookmarksListComponent,
    BookmarkComponent,
    ConvertUrlToDomainPipe,
    SidebarComponent,
    FolderListComponent,
    TagListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      // {
      //   path: 'bookmarks',
      //   canActivate: [BookmarksGuard],
      //   component: BookmarksListComponent
      // },
    ]),
    MDBBootstrapModule,
  ]
})
export class BookmarksModule { }
