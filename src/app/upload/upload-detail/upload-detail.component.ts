import { Component, OnInit, Input } from '@angular/core';
import {UploadFileService} from '../upload-file.service';
import {FileUpload} from '../fileupload';

@Component({
  selector: 'app-upload-detail',
  templateUrl: './upload-detail.component.html',
  styleUrls: ['./upload-detail.component.css']
})
export class UploadDetailComponent  {
  @Input() upload: FileUpload;
  constructor(private upSvc: UploadFileService) { }



}
