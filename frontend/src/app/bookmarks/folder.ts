import {Bookmark} from './bookmark';

export interface Folder {
  id: number;
  name: string;
  nodeLevel: number;
  subcategories: Folder[];
}
