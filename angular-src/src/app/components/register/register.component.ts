import { Component, OnInit } from '@angular/core';
import { ValidateService } from "../../services/validate.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  password: string;

  constructor(private validateService:ValidateService, private flashMessage:FlashMessagesService) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    console.log(this.name);
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Required Fields
    if (!this.validateService.ValidateRegister(user)){
      this.flashMessage.show('Please fill in all fields!', {cssClass: 'alert-danger', timeout: 10000});
      return false;
    }

    if (!this.validateService.ValidateEmail(user.email)) {
      this.flashMessage.show('Please use a vaild email!', {cssClass: 'alert-danger', timeout: 10000});
      return false;
    }
  }
}
