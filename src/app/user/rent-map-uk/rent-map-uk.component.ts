import {Component} from '@angular/core';

@Component({
  selector: 'rent-map-uk',
  template: `
    <!--Settings for fusion chart of England -->
    <fusioncharts
      width="500"
      height="550"
      type="england"
      [dataSource]="data">
    </fusioncharts>`
})

export class RentMapUkComponent {
  public data: Object;
  constructor() {
    this.data = {
      "chart": {
        "animation": "0",
        "showbevel": "0",
        "usehovercolor": "1",
        "canvasbordercolor": "FFFFFF",
        "bordercolor": "FFFFFF",
        "showlegend": "1",
        "legendposition": "BOTTOM",
        "legendborderalpha": "0",
        "legendbordercolor": "ffffff",
        "legendallowdrag": "0",
        "legendshadow": "0",
        "connectorcolor": "000000",
        "fillalpha": "80",
        "hovercolor": "CCCCCC",
        "showborder": 0,
        "theme": "fusion"
      },
      "colorrange": {
        "minvalue": "501",
        "startlabel": "Low",
        "endlabel": "High",
        "code": "6baa01",
        "gradient": "1",
        "color": [{"maxvalue": "5742", "code": "e44a00"}, {"maxvalue": "1500", "code": "f8bd19"}]

      },
      "data": [{"id":"001","value":880},{"id":"002","value":1622},{"id":"003","value":1260},{"id":"004","value":979},{"id":"005","value":987},{"id":"006","value":843},
        {"id":"007","value":552}, {"id":"008","value":665}, {"id":"009","value":814}, {"id":"010","value":1218}, {"id":"011","value":501}, {"id":"035","value":1577}, {"id":"048","value":528},
        {"id":"012","value":1136}, {"id":"043","value":1063}, {"id":"013","value":1120}, {"id":"014","value":1155}, {"id":"015","value":761}, {"id":"016","value":1410},
        {"id":"046","value":673}, {"id":"018","value":1135}, {"id":"019","value":635}, {"id":"020","value":845}, {"id":"021","value":618},{"id":"022","value":5742},
        {"id":"042","value":783},{"id":"040","value":807},{"id":"024","value":938},{"id":"025","value":812},{"id":"026","value":580},{"id":"027","value":905},
        {"id":"028","value":1627},{"id":"045","value":1076},{"id":"049","value":743},{"id":"030","value":687},{"id":"031","value":1023},{"id":"032","value":648},
        {"id":"033","value":891},{"id":"034","value":1756},{"id":"041","value":807},{"id":"044","value":895},{"id":"047","value":1132},{"id":"050","value":989},
        {"id":"036","value":1102},{"id":"038","value":849}, {"id":"039","value":765},]
    }
  }
}
