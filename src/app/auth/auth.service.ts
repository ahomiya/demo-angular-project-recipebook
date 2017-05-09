import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  // Properties
  signupChanged = new Subject<boolean>();
  signinChanged = new Subject<boolean>();
  signoutChanged = new Subject<boolean>();

  // Constructor
  constructor() { }

  // Sign up
  signupUser(email: string, password: string) {
    // Create user with email and password
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        (response) => {
          this.signupChanged.next(true);
        }
      )
      .catch(
        (error) => {
          this.signupChanged.next(false);
        }
      );
  }

  // Sign in
  signinUser(email: string, password: string) {
    // Sign user in with email and password
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        (response) => {
          /**
           * Return the current token if it has not expired,
           * otherwise this will refresh the token and return a new one.
           */
          firebase.auth().currentUser.getToken()
            .then(
              (token: string) => {
                /**
                 * Store user token in local storage to keep user
                 * logged in between page refreshes.
                 */
                localStorage.setItem('user', token);

                // Emit the response (changes) to the observer
                this.signinChanged.next(true);
              }
            );
        }
      )
      .catch(
        (error) => {
          this.signinChanged.next(false);
        }
      );
  }

  // Sign out
  signoutUser() {
    // Sign out the current user and emit the response (changes) to the observer
    firebase.auth().signOut()
      .then(
        (response) => {
          this.signoutChanged.next(true);
        }
      ).catch(
        (error) => {
          this.signoutChanged.next(false);
        }
      );

    // Remove user from local storage to sign user out
    localStorage.removeItem('user');
  }

  // Get token
  getToken() {
    // Update user token and return a new one
    firebase.auth().currentUser.getToken()
      .then(
        (token: string) => {
          // Update user token
          localStorage.setItem('user', token);
          console.log('auth.service.ts | getToken() | .then()');
        }
      );
    console.log('auth.service.ts | getToken() | return');
    return localStorage.getItem('user');
  }

  // Verify authentication
  isAuthenticated() {
    return localStorage.getItem('user') != null;
  }
}
