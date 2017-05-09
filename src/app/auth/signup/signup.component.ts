import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
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

  // Sign up
  onSignup(form: NgForm) {
    // Form variables
    const email = form.value.email;
    const password = form.value.password;

    // Submit user information through the service
    this.authService.signupUser(email, password);

    /**
     * Get signup status from the service
     * by subscribing to the changes of an event.
     */
    this.subscription = this.authService.signupChanged
      .subscribe(
        (response: boolean) => {
          if (response) {
            // Navigate to signin page
            this.router.navigate(['/signin']);
          } else {
            // Error handler (to be restructure)
            console.log('Register fail');
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
