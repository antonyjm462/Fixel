import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  userEmail: any;
  password: any;
  constructor(private  authService:  AuthService,public router: Router) { }
  ngOnInit() {}

  onRegister(){
      this.authService.register(this.userEmail, this.password);
  }

  login(){
    this.router.navigate(['']);
  }
  
}
