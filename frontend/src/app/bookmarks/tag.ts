import {Bookmark} from './bookmark';

export interface Tag {
  name: string;
  bookmarks: Bookmark[];
}
