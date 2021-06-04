import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FolderService} from './folder.service';
import {Folder} from '../../folder';

@Component({
  selector: 'bm-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  errorMessage = '';
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

  removeFolder(folder: Folder): void{
    this.folderService.deleteFolder(folder).subscribe(
      data => {
        const index = this.folders.indexOf(folder, 0);
        if(index > -1){
          this.folders.splice(index, 1);
        }
        console.log('Successful');
      }
    );
  }

}
