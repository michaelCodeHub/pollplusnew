import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  title: string;
  isLogIn = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router

  ) { }

  ngOnInit() {
    this.user = new User();

    this.isLoggedIn();
    this.title = this.activatedRoute.snapshot.data.title;

  }


  isLoggedIn(): boolean {
    const result = this.authService.loggedIn();
    if (result) {
      this.user = JSON.parse(localStorage.getItem('user'));
      console.log(this.user.id);
      this.isLogIn = true;
    }
    return result;
  }

  onRegisterSubmit(): void {

    if (this.title === 'Edit') {

      console.log(this.user.displayName);

      this.authService.updateUser(this.user).subscribe(data => {
        if (data.success) {
          this.flashMessage.show('You are now registered and may log in', { cssClass: 'alert-success', timeOut: 3000 });
          this.router.navigate(['/login']);
        } else {
          this.flashMessage.show('A registration Error Occurred', { cssClass: 'alert-danger', timeOut: 3000 });
          this.router.navigate(['/register']);
        }
      });
    }
    else {

      this.authService.registerUser(this.user).subscribe(data => {
        if (data.success) {
          this.flashMessage.show('You are now registered and may log in', { cssClass: 'alert-success', timeOut: 3000 });
          this.router.navigate(['/login']);
        } else {
          this.flashMessage.show('A registration Error Occurred', { cssClass: 'alert-danger', timeOut: 3000 });
          this.router.navigate(['/register']);
        }
      });
    }
  }

}
