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
      <mat-sidenav-container class="example-container">
        <mat-sidenav mode="side" opened >Sidenav content</mat-sidenav>
        <mat-sidenav-content><div class="animated fadeIn">
          <div class="row">
            <div class="col-sm-6 col-lg-3">
              <div class="card text-white bg-info">
                <div class="card-body pb-0">
                  <button type="button" class="btn btn-transparent p-0 float-right">
                    <i class="icon-location-pin"></i>
                  </button>
                  <div class="text-value">9.823</div>
                  <div>Members online</div>
                </div>
                <div class="chart-wrapper mt-3 mx-3" style="height:70px;">
                </div>
              </div>
            </div><!--/.col-->
            <div class="col-sm-6 col-lg-3">
              <div class="card text-white bg-primary">
                <div class="card-body pb-0">
                  <div class="btn-group float-right" dropdown>
                    <button type="button" class="btn btn-transparent dropdown-toggle p-0" dropdownToggle>
                      <i class="icon-settings"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" *dropdownMenu>
                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <a class="dropdown-item" href="#">Something else here</a>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                  </div>
                  <div class="text-value">9.823</div>
                  <div>Members online</div>
                </div>
                <div class="chart-wrapper mt-3 mx-3" style="height:70px;">
                  <canvas baseChart class="chart"
                          [datasets]="lineChart1Data"
                          [labels]="lineChart1Labels"
                          [options]="lineChart1Options"
                          [colors]="lineChart1Colours"
                          [legend]="lineChart1Legend"
                          [chartType]="lineChart1Type"></canvas>
                </div>
              </div>
            </div><!--/.col-->
            <div class="col-sm-6 col-lg-3">
              <div class="card text-white bg-warning">
                <div class="card-body pb-0">
                  <div class="btn-group float-right" dropdown>
                    <button type="button" class="btn btn-transparent dropdown-toggle p-0" dropdownToggle>
                      <i class="icon-settings"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" *dropdownMenu>
                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                  </div>
                  <div class="text-value">9.823</div>
                  <div>Members online</div>
                </div>
                <div class="chart-wrapper mt-3" style="height:70px;">
                  <canvas baseChart class="chart"
                          [datasets]="lineChart3Data"
                          [labels]="lineChart3Labels"
                          [options]="lineChart3Options"
                          [colors]="lineChart3Colours"
                          [legend]="lineChart3Legend"
                          [chartType]="lineChart3Type"></canvas>
                </div>
              </div>
            </div><!--/.col-->
            <div class="col-sm-6 col-lg-3">
              <div class="card text-white bg-danger">
                <div class="card-body pb-0 card-footer">
                  <div class="btn-group float-right" dropdown>
                    <button type="button" class="btn btn-transparent dropdown-toggle p-0" dropdownToggle>
                      <i class="icon-settings"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" *dropdownMenu>
                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                  </div>
                  <div class="text-value">9.823</div>
                  <div>Members online</div>
                </div>
                <div class="chart-wrapper mt-3 mx-3" style="height:70px;">
                  <canvas baseChart class="chart"
                          [datasets]="barChart1Data"
                          [labels]="barChart1Labels"
                          [options]="barChart1Options"
                          [colors]="barChart1Colours"
                          [legend]="barChart1Legend"
                          [chartType]="barChart1Type"></canvas>
                </div>
              </div>
            </div><!--/.col-->
          </div><!--/.row-->
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-5">
                  <h4 class="card-title mb-0">Comparison of property Prices base on your location MAKE BACKGROUND OF EVERY OTHER SECTION GREY</h4>
                  <div class="small text-muted">{{myCurrentArea}}</div>
                </div><!--/.col-->
                <div class="col-sm-7 d-none d-md-block">
                  <button type="button" class="btn btn-primary float-right"><i class="icon-cloud-download"></i></button>
                  <div class="btn-group btn-group-toggle float-right mr-3" data-toggle="buttons">
                    <label class="btn btn-outline-secondary" [(ngModel)]="radioModel" btnRadio="Day" id="option1">Day</label>
                    <label class="btn btn-outline-secondary" [(ngModel)]="radioModel" btnRadio="Month" id="option2">Month</label>
                    <label class="btn btn-outline-secondary" [(ngModel)]="radioModel" btnRadio="Year" id="option3">Year</label>
                  </div>
                </div><!--/.col-->
              </div><!--/.row-->
              <div class="chart-wrapper" style="height:460px;margin-top:40px;">
                <canvas *ngIf="lineChartData[0].data.length > 7" baseChart class="chart" height="100"
                        [datasets]="lineChartData"
                        [labels]="lineChartLabels"
                        [options]="lineChartOptions"
                        [legend]="true"
                        chartType="line"
                ></canvas>
              </div>
            </div>
          </div>
          <!--/.card--><!--/.row-->
          <div class="row">
            <div class="col-md-12 ">
              <div class="card">
                <div class="card-header">
                  Number of Properties
                </div>
                <div class="card-body">
                  <div class="row" style="padding-bottom: 25px;">
                    <div class="col-sm-6">
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="callout callout-info">
                            <small class="text-muted">New Clients</small>
                            <br>
                            <strong class="h4">9,123</strong>
                          </div>
                        </div><!--/.col-->
                        <div class="col-sm-6">
                          <div class="callout callout-danger">
                            <small class="text-muted">Recuring Clients</small>
                            <br>
                            <strong class="h4">22,643</strong>
                          </div>
                        </div><!--/.col-->
                      </div><!--/.row-->
                      <hr class="mt-0">
                      <canvas *ngIf="barChartData[0].data.length > 7" baseChart
                              [datasets]="barChartData"
                              [labels]="lineChartLabels"
                              [options]="barhartOptions"
                              [legend]="true"
                              chartType="horizontalBar"
                      ></canvas>
                    </div><!--/.col-->
                    <div class="col-sm-6">
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="callout callout-warning">
                            <small class="text-muted">Pageviews</small>
                            <br>
                            <strong class="h4">78,623</strong>
                          </div>
                        </div><!--/.col-->
                        <div class="col-sm-6">
                          <div class="callout callout-success">
                            <small class="text-muted">Organic</small>
                            <br>
                            <strong class="h4">49,123</strong>
                          </div>
                        </div><!--/.col-->
                      </div><!--/.row-->
                      <hr class="mt-0">
                      <div class="progress-group">
                        <div class="progress-group-header">
                          <i class="icon-user progress-group-icon"></i>
                          <div>Male</div>
                          <div class="ml-auto font-weight-bold">43%</div>
                        </div>
                        <div class="progress-group-bars">
                          <div class="progress progress-xs">
                            <div class="progress-bar bg-warning" role="progressbar" style="width: 43%" aria-valuenow="43" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </div>
                      <div class="progress-group mb-5">
                        <div class="progress-group-header">
                          <i class="icon-user-female progress-group-icon"></i>
                          <div>Female</div>
                          <div class="ml-auto font-weight-bold">37%</div>
                        </div>
                        <div class="progress-group-bars">
                          <div class="progress progress-xs">
                            <div class="progress-bar bg-warning" role="progressbar" style="width: 43%" aria-valuenow="43" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </div>
                      <div class="progress-group">
                        <div class="progress-group-header align-items-end">
                          <i class="icon-globe progress-group-icon"></i>
                          <div>Organic Search</div>
                          <div class="ml-auto font-weight-bold mr-2">191.235</div>
                          <div class="text-muted small">(56%)</div>
                        </div>
                        <div class="progress-group-bars">
                          <div class="progress progress-xs">
                            <div class="progress-bar bg-success" role="progressbar" style="width: 56%" aria-valuenow="56" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </div>
                      <div class="progress-group">
                        <div class="progress-group-header align-items-end">
                          <i class="icon-social-facebook progress-group-icon"></i>
                          <div>Facebook</div>
                          <div class="ml-auto font-weight-bold mr-2">51.223</div>
                          <div class="text-muted small">(15%)</div>
                        </div>
                        <div class="progress-group-bars">
                          <div class="progress progress-xs">
                            <div class="progress-bar bg-success" role="progressbar" style="width: 15%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </div>
                      <div class="progress-group">
                        <div class="progress-group-header align-items-end">
                          <i class="icon-social-twitter progress-group-icon"></i>
                          <div>Twitter</div>
                          <div class="ml-auto font-weight-bold mr-2">37.564</div>
                          <div class="text-muted small">(11%)</div>
                        </div>
                        <div class="progress-group-bars">
                          <div class="progress progress-xs">
                            <div class="progress-bar bg-success" role="progressbar" style="width: 11%" aria-valuenow="11" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </div>
                      <div class="progress-group">
                        <div class="progress-group-header align-items-end">
                          <i class="icon-social-linkedin progress-group-icon"></i>
                          <div>LinkedIn</div>
                          <div class="ml-auto font-weight-bold mr-2">27.319</div>
                          <div class="text-muted small">(8%)</div>
                        </div>
                        <div class="progress-group-bars">
                          <div class="progress progress-xs">
                            <div class="progress-bar bg-success" role="progressbar" style="width: 8%" aria-valuenow="8" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </div>
                    </div><!--/.col-->
                  </div>
                  <agm-map [latitude]="lat" [longitude]="lng">
                    <agm-circle [latitude]="test[0].lat" [longitude]="test[0].lon" [radius]="test[0].radius" (mouseDown)="circleClick($event)">test</agm-circle>
                  </agm-map>
                  <!--/.row-->
                  <br>
                  <table class="table table-responsive-sm table-hover table-outline mb-0">
                    <thead class="thead-light">
                    <tr>
                      <th>Postcode</th>
                      <th class="text-center">Amount</th>
                      <th>Average Price</th>
                      <th class="text-center">Percent Saving</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr *ngFor="let difference of differences">
                      <td class="text-center">
                        {{difference.location}}
                      </td>
                      <td class="text-center">
                        {{difference.amount}}
                      </td>
                      <td class="text-center">
                        {{difference.average}}
                      </td>
                      
                      <td>
                        <div class="clearfix">
                          <div class="float-left">
                            <strong>{{difference.percentage}}%</strong>
                          </div>
                        </div>
                        <div class="progress progress-xs">
                          <div class="progress-bar bg-success" role="progressbar" [ngClass]="{'bg-danger': difference.percentage <= 10, 'bg-warning': difference.percentage <= 30, 'bg-info': difference.percentage <= 40}" [style.width]="difference.percentage + '%'" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div><!--/.col-->
          </div><!--/.row-->
        </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </standard-page>
    
    
    <!--<standard-page>-->
      <!--<div class="container">-->
        <!--<agm-map [latitude]="lat" [longitude]="lng">-->
          <!--<agm-circle [latitude]="test[0].lat" [longitude]="test[0].lon" [radius]="test[0].radius" (mouseDown)="circleClick($event)">test</agm-circle>-->
        <!--</agm-map>-->
        <!--<div class="row">-->
          <!--<div class="col-md-4">-->
            <!--<div class="card">-->
              <!--<div class="title">Average Price in {{myCurrentArea}}</div>-->
              <!--<div class="price">{{userComparisonPrice}}</div>-->
            <!--</div>-->
            <!--<div class="card">-->
              <!--<div class="title">Amount of properties in {{myCurrentArea}}</div>-->
              <!--<div class="price">{{currentLocationAmount}}</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="col-md-12 line_chart">-->
          <!--<canvas *ngIf="lineChartData[0].data.length > 7" baseChart height="90"-->
                  <!--[datasets]="lineChartData"-->
                  <!--[labels]="lineChartLabels"-->
                  <!--[options]="lineChartOptions"-->
                  <!--[legend]="true"-->
                  <!--chartType="line"-->
          <!--&gt;</canvas>-->
        <!--</div>-->
        <!--<canvas *ngIf="barChartData[0].data.length > 7" baseChart-->
                <!--[datasets]="barChartData"-->
                <!--[labels]="lineChartLabels"-->
                <!--[options]="lineChartOptions"-->
                <!--[legend]="true"-->
                <!--chartType="bar"-->
        <!--&gt;</canvas>-->
        <!--Currently the average house price in your area of BS6 is £{{userComparisonPrice}} PCM.-->
        <!--Here is how that compares to other areas in Bristol:-->
        <!--<table>-->
          <!--<tr>-->
            <!--<th>Location</th>-->
            <!--<th>Price Difference</th>-->
          <!--</tr>-->
          <!--<tr *ngFor="let difference of differences">-->
            <!--<td>{{difference.location}}</td>-->
            <!--<td>{{difference.price}}</td>-->
          <!--</tr>-->
        <!--</table>-->
      <!--</div>-->
    <!--</standard-page>-->
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
    radius: null,
    lat: 51.4523,
    lon: -2.5925,
  }];

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
  public barhartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        padding: 20,
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
    this.myCurrentArea = 'BS1';
    this.getPostCodeRentData();
    console.log('test1: ', this.test)
    const radius = 233;
    this.test[0].radius = radius;
    console.log('test 2: ', this.test)
  }

  ngOnInit(): void {
    console.log(this._user.userDb);
  }

  getDifference(total, currentPrice, i: number, length: number, currentLength: number) {
    this.userComparisonPrice = (currentPrice / currentLength);
    this.currentLocationAmount = currentLength;
    const average = (total / length);
    const difference = this.userComparisonPrice - average;
    const newAverage = (this.userComparisonPrice + average) / 2;
    let percentage = Math.round((difference / newAverage) * 100);
    this.barChartData[0].data[i - 1] = length;
    this.lineChartData[0].data[i - 1] = average;

    let colours;

    (percentage <= 10) ? colours = '#dc3545' : colours = '';

    if ('BS' + i !== this.myCurrentArea) {
      const item = {
        location: 'BS' + i,
        price: this.userComparisonPrice - average,
        amount: length,
        average:(isNaN(Math.round(average))) ? 'N/A' : Math.round(average),
        percentage: (percentage > 0) ? percentage : 0,
        colours: colours
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

  circleClick(event) {
    console.log(event)
  }
}
