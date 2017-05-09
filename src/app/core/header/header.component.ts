import { Component, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnDestroy {
  // Properties
  private subscription: Subscription;

  // Constructor
  constructor(
    private router: Router,
    private authService: AuthService,
    private dataStorageService: DataStorageService
  ) {}

  // Save data
  onSaveData() {
    /**
     * Send HTTP request to the API and listen to the response
     * from the service by subscribing to the changes of an event
     */
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response: Response) => {}
      );
  }

  // Fetch data
  onFetchData() {
    // Get live data from the datastorage-service
    this.dataStorageService.getRecipes();
  }

  // Logout
  onLogout() {
    // Sign out the current user
    this.authService.signoutUser();

    // Listen to the service's response
    this.subscription = this.authService.signoutChanged
      .subscribe(
        (response: boolean) => {
          if (response) {
            // Navigate to sigin component
            this.router.navigate(['/']);
          } else {
            // Error handler (to be restructure)
            console.log('Logout fail');
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
    this.subscription.unsubscribe();
  }
}
