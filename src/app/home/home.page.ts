import { Component } from '@angular/core';
import { PhotoService } from '../photo.service';
import { FirebaseService } from '../firebase.service';
import { Upfile } from '../model/upfile';
import { Base64 } from '@ionic-native/base64/ngx'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectedFiles: any;
  currentFileUpload: any;
  percentage: any;
  imageLists: any[] = [];
  data: Upfile;
  uploadList: any;
  filestring: string;

  constructor(private base64: Base64,public firebase: FirebaseService , public photoService: PhotoService) {
    this.getuploadList();
  }

  ngOnInit() {
    this.photoService.loadSaved(); 
  console.log(this.uploadList);}


  getuploadList = () =>
  this.firebase
    .getItem('uploads')
    .subscribe((res: any) => (this.uploadList = res));

  selectImage(img){
      this.imageLists.push(img);
      console.log(this.imageLists);
    }

    uploadImage(){
      for (var i = 0; i < this.imageLists.length; i++){
        this.data = { data: this.imageLists[i]};
        this.firebase.createFile(this.data);
      }
    }
}