import { Component } from '@angular/core';
import { PhotoService } from '../photo.service';
import { FirebaseService } from '../firebase.service';
import { Upfile } from '../model/upfile';
import { Base64 } from '@ionic-native/base64/ngx'
import { StorageService } from '../storage.service';

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
  currentuser: string;
  upload_data:string;
  upload_no: any;

  constructor(public storageService: StorageService,,private base64: Base64,public firebase: FirebaseService , public photoService: PhotoService) {
    this.getuploadList();
    this.upload_no = this.uploadList.length;
    this.storageService.get('user_name').then(result => {
      if (result != null) {  
      console.log('Username: '+ result);
      this.currentuser = result;
      } 
      }).catch(e => {
      console.log('error: '+ e);
      });
  }

  ngOnInit() {
    this.photoService.loadSaved(); 
  console.log(this.uploadList);}


  getuploadList = () =>
  this.firebase
    .getItem('uploads')
    .subscribe((res: any) => (this.uploadList = res));

  selectImage(img){
    this.uploadList.push(img);
      console.log(this.uploadList);
    }

    uploadImage(){
      for (var i = 0; i < this.uploadList.length; i++){
        this.data = { data: { i:this.imageLists[i] }};
        this.firebase.createFile(this.data,this.currentuser);
      }
    }
}