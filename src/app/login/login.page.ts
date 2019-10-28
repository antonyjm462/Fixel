import { Component, OnInit, ViewChild, TemplateRef } from  '@angular/core';
import { AuthService } from  'src/app/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    userEmail: any;
    password: any;
    @ViewChild("modalTemplate", { static: true }) modalTemplate: TemplateRef<any>;
    userResetEmail: any;
    dialogRef: any;

    constructor(private  authService:  AuthService, public router: Router,public dialog: MatDialog) { }
    ngOnInit() {}

    openDialog() {
        this.dialogRef = this.dialog.open(this.modalTemplate, {
          width: '450px',
          height: '280px'
        });
      }

    onLogin(){
        this.authService.login(this.userEmail, this.password);
    }

    register(){
        this.router.navigate(['admin/register']);
    }

    ForgotPassword(){
        this.authService.sendPasswordResetEmail(this.userResetEmail);
    }

    googlelogin(){
        this.authService.loginWithGoogle();
    }

}
