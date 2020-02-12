import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  userEmail: any;
  password: any;
  constructor(private  authService: AuthService,public router: Router) { }
  ngOnInit() {}

  onRegister(){
      this.authService.register(this.userEmail.toString(), this.password.toString());
  }

  login(){
    this.router.navigate(['']);
  }
  
}
