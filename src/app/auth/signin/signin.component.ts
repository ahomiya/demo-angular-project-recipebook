import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {
  // Properties
  private subscription: Subscription;

  // Constructor
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  /**
   * Lifecycle hook that is called after
   * data-bound properties of a directive are initialized
   */
  ngOnInit() { }

  // Sign in
  onSignin(form: NgForm) {
    // Form variables
    const email = form.value.email;
    const password = form.value.password;

    // Submit user information through the service
    this.authService.signinUser(email, password);

    /**
     * Get signin status from the service
     * by subscribing to the changes of an event.
     */
    this.subscription = this.authService.signinChanged
      .subscribe(
        (response: boolean) => {
          if (response) {
            // Navigate to home page (Recipes)
            this.router.navigate(['/']);
          } else {
            // Error handler (to be restructure)
            console.log('Login fail');
          }
        }
      );
  }

  /**
   * Lifecycle hook that is called when
   * a directive, pipe or service is destroyed
   */
  ngOnDestroy() {
    // Dispose the resource held by the subscription
    if (this.authService.isAuthenticated()) {
      this.subscription.unsubscribe();
    }
  }
}
