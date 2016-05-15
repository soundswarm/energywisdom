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
                            <h4 className="feature_sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit. </h4>
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
                                    <li className="plan">Standard <br/><span>Monthly plan</span></li>
                                    <li className="price"> 29 <span>$</span></li>
                                    <li> 20 gb disk Space</li>
                                    <li>Monthly Bandwidth</li>
                                    <li>Unlimited Users</li>
                                    <li> 150 Domains</li>
                                    <li> 150 Email Account</li>
                                    <li> Automated Cloud Backup</li>
                                    <li className="price_button"> <button className="btn btn-main">Sign UP Now!</button></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4 col-xs-12 col-sm-12">
                            <div className="single_table grey_bg  ">
                                <div className="plan_wraper"></div>
                                <ul>
                                    <li className="plan">Unlimited  <br/><span>Monthly plan</span></li>
                                    <li className="price"> 29 <span>$</span></li>
                                    <li> 20 gb disk Space</li>
                                    <li>Monthly Bandwidth</li>
                                    <li>Unlimited Users</li>
                                    <li> 150 Domains</li>
                                    <li> 150 Email Account</li>
                                    <li> Automated Cloud Backup</li>
                                    <li className="price_button"> <button className="btn btn-main featured">Sign UP Now!</button></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4 col-xs-12 col-sm-12">
                            <div className="single_table dark_bg">
                                <div className="plan_wraper"></div>
                                <ul>
                                    <li className="plan">Premium  <br/><span>Monthly plan</span></li>
                                    <li className="price"> 29 <span>$</span></li>
                                    <li> 20 gb disk Space</li>
                                    <li>Monthly Bandwidth</li>
                                    <li>Unlimited Users</li>
                                    <li> 150 Domains</li>
                                    <li> 150 Email Account</li>
                                    <li> Automated Cloud Backup</li>
                                    <li className="price_button"> <button className="btn btn-main">Sign UP Now!</button></li>
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