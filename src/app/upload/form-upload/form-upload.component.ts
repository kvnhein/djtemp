import {Component, OnInit} from '@angular/core';

import {UploadFileService} from '../upload-file.service';
import {FileUpload} from '../fileupload';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})

export class FormUploadComponent implements OnInit {

 

  selectedFiles: FileList
  currentFileUpload: FileUpload
  progress: {percentage: number} = {percentage: 0}

  uploads: Observable<FileUpload[]>;

  constructor(private uploadService: UploadFileService, private upSvc: UploadFileService ) {}

  ngOnInit() {
    this.uploads = this.upSvc.getUploads();
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    const file = this.selectedFiles.item(0)
    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress)
  }

}
