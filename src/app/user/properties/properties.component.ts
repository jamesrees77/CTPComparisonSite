import {Component} from '@angular/core';
import {PropertyService} from '../../services/property.service';
import {Observable} from 'rxjs';
import {UserService} from '../../services/user.service';
import {environment} from '../../../environments/environment';

@Component({
  template: `
    <standard-page>
      <div>
        <ais-instantsearch [config]="searchConfig" >
    
          <mat-toolbar>
            <mat-toolbar-row>
              <span> <ais-search-box [searchAsYouType]=false  (change)="searchChanged($event)" (reset)="searchChanged($event)"></ais-search-box></span>
              <ais-hits-per-page
                [items]="[
                { label: '8 hits per page', value: 8, default: true },
                { label: '16 hits per page', value: 16}
                 ]"
              ></ais-hits-per-page>
             
            </mat-toolbar-row>
          </mat-toolbar>

          <ais-hits *ngIf="showResults">
            <ng-template let-hits="hits">
              <div *ngFor="let hit of hits">

                <property-card [property]="hit"></property-card>

              </div>
            </ng-template>
          </ais-hits>
          <ais-pagination padding="2" *ngIf="showResults"></ais-pagination>
        </ais-instantsearch>
      </div>
    </standard-page>
  `,
  styleUrls: ['./properties.component.scss']
})

export class PropertiesComponent {
  public properties$: Observable<any>;
  searchConfig = {
    ...environment.algolia,
    indexName: 'properties'
  };
  showResults = false;
  constructor(private _property: PropertyService,
              private _user: UserService) {
    this.properties$ = this._property.getAllProperties().valueChanges();
    console.log(this._user.userDb);
  }


  searchChanged(query) {
    console.log('EVENT: ', query);
    if (query.type === 'change') {
      this.showResults = true;
    } else {
      this.showResults = false;
    }
  }

}
