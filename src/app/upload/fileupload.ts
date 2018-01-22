export class FileUpload {
    
     $key: string;
     name: string;
     url: string;
     file: File;
     progress: number;
    
     constructor(file: File) {
       this.file = file;
     }
   }