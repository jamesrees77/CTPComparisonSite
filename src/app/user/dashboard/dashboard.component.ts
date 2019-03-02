import {Component, OnInit} from '@angular/core';
import {PropertyService} from '../../services/property.service';
import {combineLatest, concat, Observable} from 'rxjs';
import {flatMap, map, mergeMap, switchMap} from 'rxjs/operators';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {fromPromise} from 'rxjs/internal-compatibility';

@Component({
  template: `
    <standard-page>
      <div class="container">
        <agm-map [latitude]="lat" [longitude]="lng">
          <agm-marker [latitude]="lat" [longitude]="lng"></agm-marker>
        </agm-map>
        <div class="row">
          <div class="col-md-4">
            <div class="card">
              <div class="title">Average Price in {{myCurrentArea}}</div>
              <div class="price">{{userComparisonPrice}}</div>
            </div>
            <div class="card">
              <div class="title">Amount of properties in {{myCurrentArea}}</div>
              <div class="price">{{currentLocationAmount}}</div>
            </div>
          </div>
        </div>
        <div class="col-md-12 line_chart">
          <canvas *ngIf="lineChartData[0].data.length > 7" baseChart height="90"
                  [datasets]="lineChartData"
                  [labels]="lineChartLabels"
                  [options]="lineChartOptions"
                  [legend]="true"
                  chartType="line"
          ></canvas>
        </div>
        <canvas *ngIf="barChartData[0].data.length > 7" baseChart
                [datasets]="barChartData"
                [labels]="lineChartLabels"
                [options]="lineChartOptions"
                [legend]="true"
                chartType="bar"
        ></canvas>
        Currently the average house price in your area of BS6 is £{{userComparisonPrice}} PCM.
        Here is how that compares to other areas in Bristol:
        <table>
          <tr>
            <th>Location</th>
            <th>Price Difference</th>
          </tr>
          <tr *ngFor="let difference of differences">
            <td>{{difference.location}}</td>
            <td>{{difference.price}}</td>
          </tr>
        </table>
      </div>
    </standard-page>
  `,
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit{
  public property$: Observable<any>;
  public propertyBs$: Observable<any>;
  public user$: Observable<any>;
  public user;
  public totalPrice: Observable<any>;
  public currentPrice: Observable<any>;
  public propertLength$: Observable<any>;
  public currentPropertLength$: Observable<any>;
  public currentLocationAmount;
  public userComparisonPrice;

  lat = 51.454373;
  lng = -2.587519;

  public test = [{
    lat: 1234,
    lon: 43221,
  }]
  differences = [];

  myCurrentArea;


  public lineChartData: Array<any> = [
    {data: [], label: 'Current average price per location'},
    {data: [], label: 'Comparison to current location'},
  ];

  public barChartData: Array<any> = [
    {data: [], label: 'Number of available properties'},
  ];
  public lineChartLabels: Array<any> = ['BS1', 'BS2', 'BS3', 'BS4', 'BS5', 'BS6', 'BS7', 'BS8'];
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0, 0, 0, 0)',
        }
      }],
    }
  };
  constructor(private _property: PropertyService,
              private _user: UserService,
              private _auth: AuthService) {
    this.property$ = this._property.getAllProperties().valueChanges();
    this.user$ = this._user.getUserById(this._auth.currentUserId).valueChanges();
    this.myCurrentArea = 'BS6';
    this.getPostCodeRentData();
    console.log(this.test);
    //@TODO add lat and lon to python scraper;
  }

  ngOnInit(): void {
    console.log(this._user.userDb);
  }

  getDifference(total, currentPrice, i: number, length: number, currentLength: number) {
    this.userComparisonPrice = (currentPrice / currentLength);
    this.currentLocationAmount = currentLength;
    const average = (total / length);
    this.barChartData[0].data[i - 1] = length;
    this.lineChartData[0].data[i - 1] = average;
    if ('BS' + i !== this.myCurrentArea) {
      const item = {
        location: 'BS' + i,
        price: this.userComparisonPrice - average
      };
      this.lineChartData[1].data[i - 1] = item.price;
      this.differences.push(item);
    } else {
      this.lineChartData[1].data[i - 1] = 0;
    }
  }


  getPostCodeRentData() {
    let currentLength;
    this.propertyBs$ = this.property$.pipe(
      map((properties) =>
        properties.filter((property) => property.post_code === this.myCurrentArea)
      )
    );
    this.currentPropertLength$ = this.propertyBs$.pipe(
      map((properties) =>
        currentLength = properties.length
      ),
    );

    this.currentPrice = this.propertyBs$.pipe(
      map((properties) =>
        properties
          .map((property) => property.property_rent)
          .reduce((prev, curr) => prev + curr, 0),
      ),
    );
    for (let i = 1; i < 9; i ++) {
      let propertyLength;
      this.propertyBs$ = this.property$.pipe(
        map((properties) =>
          properties.filter((property) => property.post_code === 'BS' + i)
        )
      );

      this.propertLength$ = this.propertyBs$.pipe(
        map((properties) =>
          propertyLength = properties.length
        ),
      );

      this.totalPrice = this.propertyBs$.pipe(
        map((properties) =>
          properties
            .map((property) => property.property_rent)
            .reduce((prev, curr) => prev + curr, 0),
        ),
      );
      combineLatest(
        this.totalPrice,
        this.currentPrice,
        this.currentPropertLength$,
        this.propertLength$,
      ).subscribe(([total, current]) =>
        this.getDifference(total, current, i, propertyLength, currentLength)
      );
    }
  }
}
