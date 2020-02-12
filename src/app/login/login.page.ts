import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    userEmail: string;
    password: string;
    userResetEmail: any;
    user: any[];

    constructor(public storageService: StorageService,private  authService: AuthService, public router: Router,private http: HttpClient) { 
      
    }
    ngOnInit() {}

    getURL(url): Observable<any[]> {
      return this.http.get<any[]>(url);
    }

    setUser(user) {
      this.getURL(`https://us-central1-fixel-project.cloudfunctions.net/setUser?user=${user}`).subscribe((user) => {
        this.user = user;
        console.log(this.user);
      });
    }
    onLogin(){
      this.storageService.set('user_name', this.userEmail).then(result => {
        console.log('Data is saved'); 
        }).catch(e => {
        console.log("error: " + e);
        });
        this.setUser(this.userEmail);
        this.authService.login(this.userEmail, this.password);
    }

    register(){
        this.router.navigate(['register']);
    }

    ForgotPassword(){
        this.authService.sendPasswordResetEmail(this.userResetEmail);
    }

    googlelogin(){
        this.authService.loginWithGoogle();
    }

}
