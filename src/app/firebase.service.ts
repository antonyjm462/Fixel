import { Injectable,OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './model/user';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  user: any;
  id: any;
  name: any;
  number: any;
  //doc = { payload: { doc: { data: () => { this.id, this.name, this.number} }}};
  dataList: { name: any; number: any; }[];

  constructor(private firestore: AngularFirestore) {
    AngularFireModule.initializeApp(environment.firebase)
   }

  documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.id = _.payload.doc.id;
    return object;
}

  getUsers() {
    return this.firestore.collection('users').snapshotChanges().pipe(map( docArray => {
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

  createUser(user: User) {
    return this.firestore.collection('users').add((JSON.parse(JSON.stringify(user))));
  }

  updateUser(userKey, value){
    return this.firestore.collection('users').doc(userKey).update(value);
  }

  // Deletes a single User
  deleteUser(username: string) {
    return this.firestore.collection('users').doc(username).delete();
  }


}
