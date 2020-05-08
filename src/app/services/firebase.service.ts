import { Injectable,OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase } from '@angular/fire/database';
import { Upfile } from '../model/upfile';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  id: any;
  fileupload: any;

  constructor(private firestore: AngularFirestore, public db: AngularFireDatabase) {
    AngularFireModule.initializeApp(environment.firebase);
   }

  getItem(item: string) {
    return this.firestore.collection(item).snapshotChanges().pipe(map( docArray => {
      return docArray.map( doc => {
        return(
          {
            id: doc.payload.doc.id,
            data: doc.payload.doc.data()
          }
        );
      });
    }));
  }


  createFile(file: Upfile,user: string) {
    return this.firestore.collection('uploads').doc(user).set((JSON.parse(JSON.stringify(file))));
  }

  updateFile(fid, value){
    return this.firestore.collection('uploads').doc(fid).update(value);
  }

  deleteFile(id) {
    return this.firestore.collection('uploads').doc(id).delete();
  }

}