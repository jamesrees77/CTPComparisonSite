import { Component } from '@angular/core';
import {PropertyService} from './services/property.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public property$: Observable<any>;
  constructor(private _property: PropertyService) {
    this.property$ = this._property.getAllZooplaProperties().valueChanges();
  }
}
