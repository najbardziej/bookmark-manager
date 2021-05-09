import {Bookmark} from './bookmark';

export interface Folder {
  name: string;
  bookmarks: Bookmark[];
}
