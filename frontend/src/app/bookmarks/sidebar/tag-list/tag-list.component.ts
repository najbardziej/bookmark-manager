import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('content', { static: true }) public content: any;
  subscription!: Subscription;
  errorMessage = '';
  tags: Tag[] = [];
  newTagName = '';
  public editedTag: Tag;

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

  onAddButtonClicked($event: Tag): void {
    document.body.appendChild(document.getElementById('tagModal'));
    this.content.show();
  }

  addTag(): void {
    this.editedTag = ({} as Tag);
    this.editedTag.name = this.newTagName;
    if (this.newTagName){
      this.tagService.addTag(this.editedTag)
        .subscribe(data => {
          console.log('Successful');
          this.tags.push(this.editedTag);
        });
    }
  }
}
