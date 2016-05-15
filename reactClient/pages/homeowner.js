import React, { Component } from 'react'


class HomeOwner extends Component {
  render() {

    return (
      <div>
        <h1>Home Owner</h1>

          <section id="about">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="feature_header text-center">
                            <h3 className="feature_title">The <b>VARSanity</b> Recommendation</h3>
                            
                            <img src="images/Slide1.png" />
                            <div className="divider"></div>
                        </div>
                    </div>
                </div>
            </div>
          </section>

          <section id="pricing_table" className="pricing_overlay">
            <div className="container">
                <div className="row">
                    <div className="text-center pricing">
                        <div className="col-md-4 col-xs-12 col-sm-12">
                            <div className="single_table">
                            <div className="plan_wraper"></div>
                                <ul>
                                    <li className="plan">Lowest Cost<br/><span>&nbsp;</span></li>
                                    <li className="price"><span>4kW PV</span> 2kWh Batt</li>
                                    <li>80% PV Consumption</li>
                                    <li>0.5 MT CO2 Abated</li>
                                    <li>Varsanity Score = 10%</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4 col-xs-12 col-sm-12">
                            <div className="single_table grey_bg  ">
                                <div className="plan_wraper"></div>
                                <ul>
                                    <li className="plan">Recommended <br/><span>to Maximize Energy</span></li>
                                    <li className="price"><span>6kW PV</span> 6kWh Batt</li>
                                    <li>90% PV Consumption</li>
                                    <li>0.9 MT CO2 Abated</li>
                                    <li>Varsanity Score = 90%</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4 col-xs-12 col-sm-12">
                            <div className="single_table dark_bg">
                                <div className="plan_wraper"></div>
                                <ul>
                                    <li className="plan">Max PV<br/><span>Self Consumption</span></li>
                                    <li className="price"><span>6kW PV</span> 10kWh Batt</li>
                                    <li>100% PV Consumption</li>
                                    <li>0.75 MT CO2 Abated</li>
                                    <li>Varsanity Score = 50%</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
          
      </div>
    )
  }
}


module.exports = HomeOwner;