import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Bookmark} from '../../bookmark';
import {Tag} from "../../tag";
import {Folder} from "../../folder";

@Component({
  selector: 'bm-new-bookmark',
  templateUrl: './new-bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class NewBookmarkComponent implements OnInit {
  bookmark: Bookmark;
  @Output() addButtonClicked: EventEmitter<Bookmark> = new EventEmitter<Bookmark>();

  constructor() {
    this.bookmark = ({} as Bookmark);
  }

  ngOnInit(): void {
  }

  onClick(): void {
    this.addButtonClicked.emit(this.bookmark);
  }

}
