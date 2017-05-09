import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // Properties
  loadedFeature = 'recipe';

  /**
   * Lifecycle hook that is called after
   * data-bound properties of a directive are initialized
   */
  ngOnInit() {
    // Initialize the API (Firebase)
    firebase.initializeApp({
      apiKey: 'AIzaSyArPhHwluWjZmbE_MnMEa7fjqFGrj26TNs',
      authDomain: 'ng-recipebook-5ad27.firebaseapp.com'
    });
  }

  // Methods
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
