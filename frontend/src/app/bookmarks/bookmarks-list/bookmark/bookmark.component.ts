import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Bookmark} from '../../bookmark';

@Component({
  selector: 'bm-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit {
  @Input() bookmark: Bookmark;
  @Output() editButtonClicked: EventEmitter<Bookmark> = new EventEmitter<Bookmark>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.editButtonClicked.emit(this.bookmark);
  }

}
