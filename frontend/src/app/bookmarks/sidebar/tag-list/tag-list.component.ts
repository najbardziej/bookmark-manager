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
  newTagId: number;
  public editedTag: Tag;
  action = '';

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
    this.action = 'add';
    this.content.show();
  }

  onEditButtonClicked($event: Tag): void {
    document.body.appendChild(document.getElementById('tagModal'));
    this.newTagName = $event.name;
    this.newTagId = $event.id;
    this.action = 'edit';
    this.content.show();
  }

  addTag(): void {
    this.editedTag = ({} as Tag);
    this.editedTag.name = this.newTagName;
    if (!this.newTagName) { return; }
    if (this.action === 'add'){
      this.tagService.addTag(this.editedTag)
        .subscribe(data => {
          console.log('Successful');
          this.tags.push(this.editedTag);
        });
    }
    if (this.action === 'edit'){
      this.editedTag.id = this.newTagId;
      this.tagService.editTag(this.editedTag)
        .subscribe(data => {
          console.log('Successful');
          this.updateTagList();
        });
    }
    this.content.hide();
  }

  removeTag(): void {
    this.editedTag = ({} as Tag);
    this.editedTag.id = this.newTagId;
    this.tagService.deleteTag(this.editedTag)
      .subscribe(data => {
        console.log('Successful');
        this.removeTagFromList();
      });
    this.content.hide();
  }

  private removeTagFromList(): void{
    for(const tagsKey in this.tags) {
      if (this.tags[tagsKey].id === this.editedTag.id){
        this.tags.splice(Number(tagsKey), 1);
      }
    }
  }

  private updateTagList() {
    for(const tagsKey in this.tags) {
      if (this.tags[tagsKey].id === this.editedTag.id){
        this.tags[tagsKey] = this.editedTag;
      }
    }
  }
}
