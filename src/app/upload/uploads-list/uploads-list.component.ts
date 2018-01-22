import { Component, OnInit } from '@angular/core';
import {UploadFileService} from '../upload-file.service';
import {FileUpload} from '../fileupload';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'uploads-list',
  templateUrl: './uploads-list.component.html',
  styleUrls: ['./uploads-list.component.css']
})
export class UploadsListComponent implements OnInit {

  uploads: Observable<FileUpload[]>;
  showSpinner = true;

  constructor(private upSvc: UploadFileService) { }

  ngOnInit() {
    this.uploads = this.upSvc.getUploads();
    this.uploads.subscribe(() => this.showSpinner = false);
  }

}
