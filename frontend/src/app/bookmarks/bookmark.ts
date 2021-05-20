import {Folder} from './folder';
import {Tag} from './tag';

export interface Bookmark {
  title: string;
  content: string;
  url: string;
  bookmarkId: number;
  userId: number;
  tags: Tag[];
  addedAt: Date;
  folder: Folder;
}
