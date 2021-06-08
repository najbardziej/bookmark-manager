import {Bookmark} from './bookmark';

export interface Tag {
  id: number;
  name: string;
  bookmarks: Bookmark[];
}
