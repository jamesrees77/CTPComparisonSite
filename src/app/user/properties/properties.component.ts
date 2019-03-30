import {Component} from '@angular/core';
import {PropertyService} from '../../services/property.service';
import {Observable} from 'rxjs';
import {UserService} from '../../services/user.service';
import {environment} from '../../../environments/environment';

@Component({
  template: `
    <standard-page>
      <div class="page" [ngClass]="{'background': newSearch}">
        <ais-instantsearch [config]="searchConfig" [ngClass]="{'container': newSearch}" (submit)="searchChanged($event)">
          <ng-container>
            <div class="container" [ngClass]="{'hidden': !newSearch}">
              <div class="col-md-6">
                <div class="card">
                  <h1 class="title">
                    Find a new Home in Bristol
                  </h1>
                  <div class="sub">
                    Discover a new place to live in Bristol across all property sites.
                  </div>
                  <div class="label">Where</div>
                  <ais-search-box [searchAsYouType]=false [placeholder]="'Anywhere'" (submit)="searchChanged($event)" style="margin-bottom: 16px"></ais-search-box>
                  <div class="label" style="margin-bottom: 8px;">Price</div>
                  <div class="container">
                    <ais-range-slider
                      attribute="property_rent"
                      [min]="100"
                      [max]="1000"
                      [precision]="0"
                      [tooltips]="false"
                    >
                    </ais-range-slider>
                  </div>
                  <button class="search_button" type="submit" formtarget="ais-SearchBox-form" (click)="clickOther()">search</button>
                </div>
              </div>
            </div>
          </ng-container>

          <mat-toolbar *ngIf="!newSearch">
            <mat-toolbar-row>
              <div class="col-md-3">
                <ais-search-box [searchAsYouType]=false  (change)="searchChanged($event)" (reset)="searchChanged($event)"></ais-search-box>
              </div>
                <div class="col-md-3">
                  <ais-range-input attribute="property_rent" [min]="100" [max]="1500" currency="£"></ais-range-input>
                </div>
              <span style="color: white;">beds</span>
              <div class="col-md-2">
                <ais-range-input attribute="number_of_beds" [min]="1" [max]="10" currency=""></ais-range-input>
              </div>
              <!--<ais-sort-by-->
                <!--[items]="[-->
                  <!--{ value: 'properties', label: 'Featured' },-->
                  <!--{ value: 'properties_asc', label: 'Price asc.' },-->
                  <!--{ value: 'properties_desc', label: 'Price desc.' }-->
                <!--]"-->
              <!--&gt;</ais-sort-by>-->
              <ais-hits-per-page 
                [items]="[
                { label: '8 hits per page &emsp; ▼', value: 8, default: true },
                { label: '16 hits per page &emsp; ▼', value: 16}
                 ]"
              > </ais-hits-per-page>
            </mat-toolbar-row>
          </mat-toolbar>

          <ais-hits *ngIf="showResults">
            <ng-template let-hits="hits">
              <div class="" *ngIf="hits.length > 0; else noHits">
                <div *ngFor="let hit of hits">

                  <property-card [property]="hit"></property-card>

                </div>
                <div style="margin-top: 25px; margin-bottom: 25px;">
                  <ais-pagination padding="2" *ngIf="showResults"></ais-pagination>
                </div>
              </div>
            </ng-template>
            <ng-template #noHits>
              <div class="text-center">
                <img src="assets/images/search.png" alt="" style="width:250px; height: auto">
                <h1>Oops...No properties available with these filters! <br>Try altering your search.</h1>
              </div>
            </ng-template>
          </ais-hits>
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
  newSearch = true;
  submit = false;
  constructor(private _property: PropertyService,
              private _user: UserService) {
    this.properties$ = this._property.getAllProperties().valueChanges();
    console.log(this._user.userDb);
  }


  searchChanged(query) {
    console.log(query)
    if (query.type === 'submit' || query.type === 'click') {
      this.showResults = true;
      this.newSearch = false;
    } else if (query.type === 'reset'){
      this.showResults = false;
      this.newSearch = true;
    }
  }

  changeInitalSearch(query) {
      this.showResults = true;
  }

  search(event) {
    this.newSearch = false;
  }
  clickOther() {
   // console.log(document.getElementsByClassName('ais-SearchBox-submit'));
    let arr = [].slice.call(document.getElementsByClassName('ais-SearchBox-submit'));
    arr[0].click();
  }


}
