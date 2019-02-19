import {Component} from '@angular/core';
import {PropertyService} from '../../services/property.service';
import {Observable} from 'rxjs';
import {UserService} from '../../services/user.service';

@Component({
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-3" *ngFor="let property of (properties$ | async)">
          {{property?.post_code}}
          <button (click)="likeProperty(property.property_id)">like property</button>
        </div>
      </div>
    </div>
  `
})

export class PropertiesComponent {
  public properties$: Observable<any>;
  constructor(private _property: PropertyService,
              private _user: UserService) {
    this.properties$ = this._property.getAllProperties().valueChanges();
  }

  likeProperty(id: string) {
    return this._user.likePropertyAndAddToUser(id);
  }
}
