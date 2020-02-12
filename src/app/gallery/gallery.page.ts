import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { HTTP } from '@ionic-native/http/ngx';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {
  currentuser: any;
  uploadList: any;
  output_data: any;
  imageList: any[] = [];

  constructor(public firebase: FirebaseService,public storageService: StorageService,public router: Router,private http: HTTP) { 
    this.getuploadList();
    this.storageService.get('user_name').then(result => {
      if (result != null) {  
      console.log('Username: '+ result);
      this.currentuser = result;
      this.getData();
      } 
      }).catch(e => {
      console.log('error: '+ e);
      });
  }

  ngOnInit() {
  }

  getuploadList = () =>
  this.firebase
    .getItem('uploads')
    .subscribe((res: any) => (this.uploadList = res));



  // getURL(url): Observable<any[]> {
  //     return this.http.get<any[]>(url);
  //   }

  // getOutput(user) {
  //     this.getURL(`https://us-central1-fixel-project.cloudfunctions.net/getOutput?data={"user":"${user}"}`).subscribe((data: any) => {
  //       this.output_data = JSON.parse(data);
  //       console.log(this.output_data);
  //       console.log(this.uploadList);
  //       this.imageList = this.output_data.data;
  //     });
  //   }


    async getData() {
      try {
        const url = `https://us-central1-fixel-project.cloudfunctions.net/getOutput?data={"user":"${this.currentuser}"}`;
        const params = {};
        const headers = {origin};
  
        const response = await this.http.get(url, params, headers);
  
        console.log(response.status);
        this.output_data = JSON.parse(response.data); // JSON data returned by server
        console.log(response.headers);
        this.imageList = this.output_data.data;
  
      } catch (error) {
        console.error(error.status);
        console.error(error.error); // Error message as string
        console.error(error.headers);
      }
    }

  Home(){
      this.router.navigate(['']);
  }
}
