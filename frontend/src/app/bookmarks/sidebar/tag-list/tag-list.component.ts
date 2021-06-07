import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Folder} from "../../folder";
import {FolderService} from "../folder-list/folder.service";
import {Tag} from "../../tag";
import {TagService} from './tag.service';

@Component({
  selector: 'bm-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  errorMessage = '';
  tags: Tag[] = [];

  constructor(private tagService: TagService) { }

  ngOnInit(): void {
    this.subscription =
      this.tagService.getTags().subscribe({
        next: tags => {
          this.tags = tags;
        },
        error: err => this.errorMessage = err
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
