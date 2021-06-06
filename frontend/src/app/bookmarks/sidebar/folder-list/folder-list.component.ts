import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {FolderService} from './folder.service';
import {Folder} from '../../folder';

@Component({
  selector: 'bm-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent implements OnInit, OnDestroy {
  @ViewChild('content', { static: true }) public content: any;
  subscription!: Subscription;
  public editedFolder: Folder;
  editName = '';
  editNodeLevel: number;
  editId: number;
  errorMessage = '';
  parentFolder: Folder;
  folders: Folder[] = [];

  constructor(private folderService: FolderService) { }

  ngOnInit(): void {
    this.subscription =
      this.folderService.getFolders().subscribe({
        next: folders => {
          this.folders = folders;
        },
        error: err => this.errorMessage = err
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddButtonClicked($event: Folder): void {
    document.body.appendChild(document.getElementById('folderModal'));
    this.parentFolder = null;
    this.editedFolder = ({} as Folder);
    this.editName = this.editedFolder.name;
    this.editNodeLevel = this.editedFolder.nodeLevel;
    this.editId  = this.editedFolder.id;
    this.content.show();
  }

  onAddNestedButtonClicked($event: Folder): void {
    document.body.appendChild(document.getElementById('folderModal'));
    this.parentFolder = $event;
    this.editedFolder = ({} as Folder);
    this.editName = this.editedFolder.name;
    this.editNodeLevel = this.editedFolder.nodeLevel;
    this.editId  = this.editedFolder.id;
    this.content.show();
  }

  onEditButtonClicked($event: Folder): void {
    document.body.appendChild(document.getElementById('folderModal'));
    this.parentFolder = null;
    this.editedFolder = $event;
    this.editName = $event.name;
    // this.editNodeLevel = $event.nodeLevel;
    this.editId  = $event.id;
    this.content.show();
  }

  removeFolder(folder: Folder): void{
    this.folderService.deleteFolder(folder).subscribe(
      data => {
        const index = this.folders.indexOf(folder, 0);
        if (index > -1){
          this.folders.splice(index, 1);
        }
        console.log('Successful');
      }
    );
    window.location.reload();
  }

  editFolder(): void {
    this.editedFolder.name = this.editName;
    this.editedFolder.nodeLevel = this.editNodeLevel;
    this.editedFolder.id = this.editId;
    if (this.editId) {
      this.folderService.editFolder(this.editedFolder)
        .subscribe(data => {
          console.log('Successful');
        });
    } else {
      if (this.parentFolder) {
        this.folderService.addNestedFolder(this.editedFolder, this.parentFolder.id)
          .subscribe(data => {
            console.log('Successful');
          });
      } else {
        this.folderService.addFolder(this.editedFolder)
          .subscribe(data => {
            console.log('Successful');
          });
      }
      window.location.reload();
    }
    this.content.hide();
  }

}
