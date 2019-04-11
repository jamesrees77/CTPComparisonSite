import {Component, OnInit} from '@angular/core';
import {PropertyService} from '../../services/property.service';
import {combineLatest, Observable} from 'rxjs';
import {flatMap, map, tap,} from 'rxjs/operators';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
  template: `
    <standard-page>
      <side-nav class="example-container">
          <div class="animated fadeIn container">
          <div class="row">
            <div class="col-sm-6 col-lg-3">
              <div class="card text-white bg-info">
                <div class="card-body tabs">
                  <div class="text-value">Current Location:</div>
                  <div>{{myCurrentArea}}</div>
                </div>
              </div>
            </div><!--/.col-->
            <div class="col-sm-6 col-lg-3">
              <div class="card text-white bg-primary">
                <div class="card-body tabs">
                  <div class="btn-group float-right" dropdown>
                  </div>
                  <div class="text-value">Average Price:</div>
                  <div>£{{userComparisonPrice}}</div>
                </div>
              </div>
            </div><!--/.col-->
            <div class="col-sm-6 col-lg-3">
              <div class="card text-white bg-warning">
                <div class="card-body tabs">
                  <div class="btn-group float-right" dropdown>
                  </div>
                  <div class="text-value">Properties Available:</div>
                  <div>{{currentLocationAmount}}</div>
                </div>
              </div>
            </div><!--/.col-->
            <div class="col-sm-6 col-lg-3">
              <div class="card text-white bg-danger">
                <div class="card-body tabs card-footer">
                  <div class="btn-group float-right" dropdown>
                  </div>
                  <div class="text-value">Change Location: </div>
                  <form [formGroup]="locationFormGroup">
                    <mat-select [formControlName]="'current_location'" (selectionChange)="updateUserCurrentLocation()">
                      <mat-option *ngFor="let location of lineChartLabels" [value]="location">{{location}}</mat-option>
                    </mat-select>
                  </form>
                </div>
              </div>
            </div><!--/.col-->
          </div><!--/.row-->
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-8">
                  <h4 class="card-title mb-0">Comparison of property Prices base on your location</h4>
                  <div class="small text-muted">{{myCurrentArea}}</div>
                </div><!--/.col--><!--/.col-->
              </div><!--/.row-->
              <div class="chart-wrapper" style="margin-top:40px;">
                <!--line chart data -->
                <canvas *ngIf="lineChartData[0].data.length > 15" baseChart class="chart" height="100"
                        [datasets]="lineChartData"
                        [labels]="lineChartLabels"
                        [options]="lineChartOptions"
                        [legend]="true"
                        [colors]="chartColors"
                        chartType="line"
                ></canvas>
              </div>
            </div>
          </div>
          <!--/.card/.row-->
          <div class="row">
            <div class="col-md-6 ">
              <div class="card">
                <div class="card-header">Savings</div>
                <div class="card-body">
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
              <div class="card">
                <div class="card-header">
                  Number of Properties
                </div>
                <div class="card-body">
                  <div style="padding-bottom: 25px;">
                      <hr class="mt-0">
                    <!-- bar chart data -->
                      <canvas *ngIf="barChartData[0].data.length > 15" baseChart
                              [datasets]="barChartData"
                              [labels]="lineChartLabels"
                              [options]="barhartOptions"
                              [legend]="true"
                              [colors]="chartColors"
                              chartType="horizontalBar"
                      ></canvas>
                  </div>
               
                  <!--/.row-->
                  <br>
                 
                </div>
              </div>
            </div>
            <div class="col-md-6 ">
              <div class="card">
                <div class="card-header">
                  Average rent price per county
                </div>
                <div class="card-body">
                  <rent-map-uk></rent-map-uk>
                </div>
              </div>
              <div class="card">
                <div class="card-header">Map of student properties</div>
                <div class="card-body">
                  <agm-map [zoom]='11' [latitude]="lat" [longitude]="lng">
                    <div *ngFor="let radius of test">
                      <agm-circle [latitude]="radius.lat" [longitude]="radius.lon" [radius]="radius.radius" >test</agm-circle>
                    </div>
                  </agm-map>
                </div>
              </div>
            </div><!--/.col-->
          </div>
        </div>
      </side-nav>
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

  locationFormGroup: FormGroup;
  lat = 51.454373;
  lng = -2.587519;
  public test = [
    {
    radius: null,
    lat: 51.4523,
    lon: -2.5925,
   },
    {
      radius: null,
      lat: 51.4476,
      lon: -2.5674,
    },

    {
      radius: null,
      lat: 51.4389,
      lon: -2.6005,
    },
    {
      radius: null,
      lat: 51.4400,
      lon: -2.5513,
    },
    {
      radius: null,
      lat: 51.4610,
      lon: -2.5532,
    },
    {
      radius: null,
      lat: 51.4679,
      lon: -2.6001,
    },
    {
      radius: null,
      lat: 51.4814,
      lon: -2.5797,
    },
    {
      radius: null,
      lat: 51.4585,
      lon: -2.6640,
    },
  ];

  differences = [];

  myCurrentArea;


  public lineChartData: Array<any> = [
    {data: [], label: 'Comparison to current location'},
    {data: [], label: 'Current average price per location'},
  ];

  public barChartData: Array<any> = [
    {data: [], label: 'Number of available properties'},
  ];
  public lineChartLabels: Array<any> = ['BS1', 'BS2', 'BS3', 'BS4', 'BS5', 'BS6', 'BS7', 'BS8', 'BS9', 'BS10', 'BS11', 'BS12', 'BS13', 'BS14', 'BS15', 'BS16'];
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
  public chartColors: Array<any> = [
    { // first color
      backgroundColor: 'rgba(23,162,184, 0.5)',
    },
    { // first color
      backgroundColor: 'rgba(220,53,69, 0.4)',
    },

    ];
  constructor(private _property: PropertyService,
              private _user: UserService,
              private _auth: AuthService,
              private _formBuilder: FormBuilder) {
    this.property$ = this._property.getAllProperties().valueChanges();
    this.user$ = this._user.getUserById(this._auth.currentUserId).valueChanges();
    this.user$.pipe(
      map((user: any) => this.myCurrentArea =  user.current_location)
    ).subscribe();

    this.getPostCodeRentData();

  }

  ngOnInit(): void {
    this.locationFormGroup = this.initFormGroup();
  }

  getDifference(total, currentPrice, i: number, length: number, currentLength: number, numStudents: number) {
    this.userComparisonPrice = Math.round((currentPrice / currentLength));
    this.currentLocationAmount = currentLength;
    const average = (total / length); // Get Average rent price
    const difference = this.userComparisonPrice - average; // get the difference
    const newAverage = Math.round((this.userComparisonPrice + average) / 2); // get average of new location
    let percentage = Math.round((difference / newAverage) * 100); // get percentage
    this.barChartData[0].data[i - 1] = length; // set length on bar chart
    this.lineChartData[1].data[i - 1] = Math.round(average); // set data average to line chart

    if(i <= 7){
      this.test[i].radius = numStudents * 100;
    }

    if ('BS' + i !== this.myCurrentArea) {
      // if location is not = to current location then set the following settings to each of the graphs
      const item = {
        location: 'BS' + i,
        price: this.userComparisonPrice - average,
        amount: length,
        average:(isNaN(Math.round(average))) ? 'N/A' : Math.round(average),
        percentage: (percentage > 0) ? percentage : 0,
      };
      // set price on line chart
      this.lineChartData[0].data[i - 1] = Math.round(item.price);
      this.differences.push(item);
    } else {
      // if it IS current location - set data on line chart to this
      this.lineChartData[0].data[i - 1] = 0;
    }
  }


  getPostCodeRentData() {
    console.log(this.myCurrentArea);
    let currentLength;
    // map all properties from firestore
    this.propertyBs$ = this.property$.pipe(
      map((properties) =>
        properties.filter((property) => property.post_code === this.myCurrentArea)
      )
    );
    // map all properties from current location
    this.currentPropertLength$ = this.propertyBs$.pipe(
      map((properties) =>
        currentLength = properties.length
      ),
    );

    // reduce to get all property rent prices for current location
    this.currentPrice = this.propertyBs$.pipe(
      map((properties) =>
        properties
          .map((property) => property.property_rent)
          .reduce((prev, curr) => prev + curr, 0),
      ),
    );
    // loop through first locations
    for (let i = 1; i < 17; i ++) {
      let propertyLength;
      let numStudents;
      // filter by property post_code
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

      let student = this.property$.pipe(
        map((properties) =>
          properties.filter((property) => property.post_code === 'BS' + i && property.is_student_property)
        )
      );

      let studentLength = student.pipe(
        map ((properties) =>
          numStudents = properties.length
        )
      )

      this.totalPrice = this.propertyBs$.pipe(
        map((properties) =>
          properties
            .map((property) => property.property_rent)
            .reduce((prev, curr) => prev + curr, 0),
        ),
      );
      // combine all observables and then pass them into new function that handles the math
      combineLatest(
        this.totalPrice,
        this.currentPrice,
        this.currentPropertLength$,
        this.propertLength$,
        studentLength
      ).subscribe(([total, current]) =>
        this.getDifference(total, current, i, propertyLength, currentLength, numStudents)
      );
    }
  }

 initFormGroup() {
    return this._formBuilder.group({
      current_location: ''
    })
 }

  updateUserCurrentLocation() {
    this._user.updateUserCurrentLocation(this.locationFormGroup.getRawValue()).then(
      () => location.reload()
    )
  }
}
