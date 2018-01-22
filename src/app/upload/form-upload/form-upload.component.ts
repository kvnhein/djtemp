import { Component, OnInit, Input } from '@angular/core';

import {UploadFileService} from '../upload-file.service';
import {FileUpload} from '../fileupload';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})

export class FormUploadComponent {


  selectedFiles: FileList | null;
  currentUpload: FileUpload;
  // progress: {percentage: number} = {percentage: 0}

   uploads: Observable<FileUpload[]>;
   showSpinner = true;

  constructor(private uploadService: UploadFileService, private upSvc: UploadFileService ) {}

  detectFiles($event: Event) {
    this.selectedFiles = ($event.target as HTMLInputElement).files;
}

ngOnInit() {
  this.uploads = this.upSvc.getUploads();
  this.uploads.subscribe(() => this.showSpinner = false);
}



  // selectFile(event) {
  //   this.selectedFiles = event.target.files;
  // }

  uploadSingle() {
    const file = this.selectedFiles;
    if (file && file.length === 1) {
      this.currentUpload = new FileUpload(file.item(0));
      this.upSvc.pushUpload(this.currentUpload);
    } else {
      console.error('No file found!');
    }
  }
  
  uploadMulti() {
    const files = this.selectedFiles;
    if (!files || files.length === 0) {
      console.error('No Multi Files found!');
      return;
    }

    Array.from(files).forEach((file) => {
      this.currentUpload = new FileUpload(file);
      this.upSvc.pushUpload(this.currentUpload);
    });
  }



}
