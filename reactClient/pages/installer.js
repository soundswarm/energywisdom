import React, { Component } from 'react'
import { Table } from 'react-bootstrap/lib'
import _ from 'lodash'





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

    //var r = (Math.round(Math.random()* 127) + 127);
    //var g = (Math.round(Math.random()* 127) + 127);
    //var b = (Math.round(Math.random()* 127) + 127);

    return "rgb(" + r + "," + g + "," + b + ")";
}


class Installer extends Component {
  render() {

      let raw_data = [
          {
            "pv_size": 2,
            "battery_size": 2,
            "savings": 13847.35
          },
          {
            "pv_size": 2,
            "battery_size": 4,
            "savings": 13847.35
          },
          {
            "pv_size": 2,
            "battery_size": 6,
            "savings": 13847.35
          },
          {
            "pv_size": 2,
            "battery_size": 8,
            "savings": 13847.35
          },
          {
            "pv_size": 2,
            "battery_size": 10,
            "savings": 13847.35
          },
          {
            "pv_size": 4,
            "battery_size": 2,
            "savings": 15182.977
          },
          {
            "pv_size": 4,
            "battery_size": 4,
            "savings": 15182.977
          },
          {
            "pv_size": 4,
            "battery_size": 6,
            "savings": 15182.977
          },
          {
            "pv_size": 4,
            "battery_size": 8,
            "savings": 15182.977
          },
          {
            "pv_size": 4,
            "battery_size": 10,
            "savings": 15182.977
          },
          {
            "pv_size": 6,
            "battery_size": 2,
            "savings": 12159.341
          },
          {
            "pv_size": 6,
            "battery_size": 4,
            "savings": 12159.341
          },
          {
            "pv_size": 6,
            "battery_size": 6,
            "savings": 12159.341
          },
          {
            "pv_size": 6,
            "battery_size": 8,
            "savings": 12159.341
          },
          {
            "pv_size": 6,
            "battery_size": 10,
            "savings": 12159.341
          },
          {
            "pv_size": 8,
            "battery_size": 2,
            "savings": 4072.771
          },
          {
            "pv_size": 8,
            "battery_size": 4,
            "savings": 4072.771
          },
          {
            "pv_size": 8,
            "battery_size": 6,
            "savings": 4072.771
          },
          {
            "pv_size": 8,
            "battery_size": 8,
            "savings": 4072.771
          },
          {
            "pv_size": 8,
            "battery_size": 10,
            "savings": 4072.771
          },
          {
            "pv_size": 10,
            "battery_size": 2,
            "savings": -4013.149
          },
          {
            "pv_size": 10,
            "battery_size": 4,
            "savings": -4013.149
          },
          {
            "pv_size": 10,
            "battery_size": 6,
            "savings": -4013.149
          },
          {
            "pv_size": 10,
            "battery_size": 8,
            "savings": -4013.149
          },
          {
            "pv_size": 10,
            "battery_size": 10,
            "savings": -4013.149
          }
      ];

      let numRows = raw_data.length / 5;


      // Alert: the below is super un-optimized...
      let values = _.map(raw_data, cell => cell.savings);
      let minimum = _.min(values);
      let maximum = _.max(values);
      let range = maximum - minimum;

      let color_data = [];
      for (let i=0; i < numRows; i++) {
          let color_row = [];
          for (let j=0; j < 5; j++) {
              let cell = raw_data[i*5 + j];
              let percent = 100 * (1 - (cell.savings - minimum) / range);
              color_row.push([cell.savings, percentToRGB(percent)]);
          }
          color_data.push(color_row);
      }


    return (
      <div>

          <section id="about">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="feature_header text-center">
                            <h3 className="feature_title">Sweet <b>grid</b></h3>
                            <h4 className="feature_sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit. </h4>
                            <div className="divider"></div>
                        </div>
                    </div>
                </div>
            </div>
          </section>

            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                      <Table responsive id="installer-table">
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
                              color_data.map(function(row, xIndex) {
                                return (
                                    <tr>
                                      <td className="text-center"><b>{(1+xIndex)*2}</b></td>
                                      {
                                        row.map(function(cell, yIndex) {
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
                  </div>
                </div>
            </div>
      </div>
    )
  }
}


module.exports = Installer;