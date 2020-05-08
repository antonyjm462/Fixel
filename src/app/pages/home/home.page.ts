import { Component } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { FirebaseService } from '../../services/firebase.service';
import { Upfile } from '../../model/upfile';
import { Base64 } from '@ionic-native/base64/ngx'
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

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

  constructor(public router: Router,public storageService: StorageService,private base64: Base64,public firebase: FirebaseService , public photoService: PhotoService) {
    this.getuploadList();
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
    this.photoService.loadSaved();}


  getuploadList = () =>
  this.firebase
    .getItem('uploads')
    .subscribe((res: any) => (this.uploadList = res));

  selectImage(img){
    for(let i=0;i< this.uploadList.length;i++){
      if(this.uploadList[i].id == this.currentuser){
        this.imageLists = JSON.parse(this.uploadList[i].data);
        break;
      } else {
        this.imageLists =[];
      }
    }
    this.imageLists.push(img);
      console.log(this.imageLists);
    }

    uploadImage(){
        this.data = { data: this.imageLists };
        this.firebase.createFile(this.data,this.currentuser);
    }

    logout(){
      this.storageService.remove('user_name');
      this.router.navigate(['']);
    }

    gallery(){
      this.router.navigate(['gallery']);
    }
}