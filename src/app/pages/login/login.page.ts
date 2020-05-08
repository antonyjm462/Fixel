import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { StorageService } from "../../services/storage.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  userEmail: string;
  password: string;
  userResetEmail: any;
  user: any[];

  constructor(
    public storageService: StorageService,
    private authService: AuthService,
    public router: Router,
    private httpclient: HttpClient,
    private http: HTTP
  ) {}
  ngOnInit() {}
  
  async setUser(user) {
    try {
      const url = `https://us-central1-fixel-project.cloudfunctions.net/setUser?user=${user}`;
      const params = {};
      const headers = {'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods':'POST, GET, OPTIONS, PUT',
      'Accept':'application/json',
      'content-type':'application/json'
    }
      const response = await this.http.get(url, params, headers);
      console.log(response.status);
      console.log("server set data"+JSON.parse(response.data)); // JSON data returned by server
    } catch (error) {
      console.log(error);
    }
  }

  onLogin() {
    this.storageService
      .set("user_name", this.userEmail)
      .then(result => {
        console.log("Data is saved");
      })
      .catch(e => {
        console.log("error: " + e);
      });
    this.setUser(this.userEmail);
    this.authService.login(this.userEmail, this.password);
  }

  register() {
    this.router.navigate(["register"]);
  }

  ForgotPassword() {
    this.authService.sendPasswordResetEmail(this.userResetEmail);
  }

  googlelogin() {
    this.authService.loginWithGoogle();
  }
}
