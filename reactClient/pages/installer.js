import React, { Component } from 'react'
import { Table } from 'react-bootstrap/lib'
import _ from 'lodash'


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function percentToRGB(percent) {
    if (percent === 100) {
        percent = 99
    }
    var r, g, b;

    if (percent < 50) {
        // green to yellow
        r = Math.floor(255 * (percent / 50));
        g = 255;

    } else {
        // yellow to red
        r = 255;
        g = Math.floor(255 * ((50 - percent % 50) / 50));
    }
    b = 0;

    // Mix with white to get more pleasing, pastel-like colors
    r = Math.floor((r + 256) / 2);
    g = Math.floor((g + 256) / 2);
    b = Math.floor((b + 256) / 2);

    return "rgb(" + r + "," + g + "," + b + ")";
}


let Installer = React.createClass({


    getInitialState: function(){
        return {
            raw_data: null
        };
    },

    componentDidMount: function(){
        fetch('http://localhost:8000/api/calculateSavings', {
                  method: 'POST'
                }).then((response) => {
            response.json().then((result) => {
                this.setState(
              {raw_data: result}
          )
            });


        })
  },


  render: function(){
      let raw_data_OLD = [
  {
    "pv_size": 1,
    "battery_size": 1,
    "savings": 10586.164
  },
  {
    "pv_size": 1,
    "battery_size": 2,
    "savings": 12775.136999999999
  },
  {
    "pv_size": 1,
    "battery_size": 3,
    "savings": 14697.021
  },
  {
    "pv_size": 1,
    "battery_size": 4,
    "savings": 16548.293
  },
  {
    "pv_size": 1,
    "battery_size": 5,
    "savings": 18401.91
  },
  {
    "pv_size": 2,
    "battery_size": 1,
    "savings": 15226.702000000001
  },
  {
    "pv_size": 2,
    "battery_size": 2,
    "savings": 17159.057
  },
  {
    "pv_size": 2,
    "battery_size": 3,
    "savings": 19190.637
  },
  {
    "pv_size": 2,
    "battery_size": 4,
    "savings": 21496.33
  },
  {
    "pv_size": 2,
    "battery_size": 5,
    "savings": 21817.101000000002
  },
  {
    "pv_size": 3,
    "battery_size": 1,
    "savings": 20149.876
  },
  {
    "pv_size": 3,
    "battery_size": 2,
    "savings": 21317.101000000002
  },
  {
    "pv_size": 3,
    "battery_size": 3,
    "savings": 15552.014
  },
  {
    "pv_size": 3,
    "battery_size": 4,
    "savings": 17152.921
  },
  {
    "pv_size": 3,
    "battery_size": 5,
    "savings": 11074.061000000002
  },
  {
    "pv_size": 4,
    "battery_size": 1,
    "savings": 16077.918000000001
  },
  {
    "pv_size": 4,
    "battery_size": 2,
    "savings": 5665.0430000000015
  },
  {
    "pv_size": 4,
    "battery_size": 3,
    "savings": 14590.856
  },
  {
    "pv_size": 4,
    "battery_size": 4,
    "savings": 15592.963000000003
  },
  {
    "pv_size": 4,
    "battery_size": 5,
    "savings": 14817.101000000002
  },
  {
    "pv_size": 5,
    "battery_size": 1,
    "savings": 14792.821000000004
  },
  {
    "pv_size": 5,
    "battery_size": 2,
    "savings": 14317.101000000002
  },
  {
    "pv_size": 5,
    "battery_size": 3,
    "savings": 13317.101000000002
  },
  {
    "pv_size": 5,
    "battery_size": 4,
    "savings": 12317.101000000002
  },
  {
    "pv_size": 5,
    "battery_size": 5,
    "savings": 11317.101000000002
  }
];
let table = <p className="text-center"><b>Loading...</b></p>
      if (this.state.raw_data) {

          let numRows = this.state.raw_data.length / 5;


          // Alert: the below is super un-optimized...
          let values = _.map(this.state.raw_data, cell => cell.savings);
          let minimum = _.min(values);
          let maximum = _.max(values);
          let range = maximum - minimum;

          let color_data = [];
          for (let i = 0; i < numRows; i++) {
              let color_row = [];
              for (let j = 0; j < 5; j++) {
                  let cell = this.state.raw_data[i * 5 + j];
                  let percent = 100 * (1 - (cell.savings - minimum) / range);
                  color_row.push([numberWithCommas(Math.floor(cell.savings)), percentToRGB(percent)]);
              }
              color_data.push(color_row);
          }


          table = (<Table responsive id="installer-table">
                  <thead>
                  <tr>
                      <th className="text-center"></th>
                      <th className="text-center">2</th>
                      <th className="text-center">4</th>
                      <th className="text-center">6</th>
                      <th className="text-center">8</th>
                      <th className="text-center">10</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                      color_data.map(function (row, xIndex) {
                          return (
                              <tr>
                                  <td className="text-center"><b>{1 + xIndex}</b></td>
                                  {
                                      row.map(function (cell, yIndex) {
                                          return (
                                              <td className="text-center" style={{backgroundColor:cell[1]}}>
                                                  ${cell[0]}
                                              </td>
                                          )
                                      })
                                  }
                              </tr>
                          )
                      })
                  }
                  </tbody>
              </Table>
          );
      }

    return (
      <div>

          <section id="about">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="feature_header text-center">
                            <h3 className="feature_title">The <b>VARSanity</b> Calculator</h3>
                        </div>
                    </div>
                </div>
            </div>
          </section>

            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                    <h4 className="text-center feature_sub">Avoided costs for John Doe, Oakland, CA.</h4>
                        <p className="text-center">Storage Capacity (kW) x PZ Size (kW)</p>
                        {table}
                  </div>
                </div>
            </div>
      </div>
    )
  }
});


module.exports = Installer;