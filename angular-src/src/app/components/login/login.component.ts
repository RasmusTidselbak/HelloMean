import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password:string;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage: FlashMessagesService    
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    console.log('Login Submit activated for user \'' + this.username + '\'');
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      console.log(data);
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show('Login successfull', {cssClass: 'alert-success', timeout:10000});
        this.router.navigate(['dashboard']);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout:10000});
        this.router.navigate(['login']);
      }
    });    
  }
}
