import React, { Component } from 'react'
import { Link } from 'react-router'
import { Button, Accordion, Panel, FormGroup, ControlLabel, FormControl } from 'react-bootstrap/lib'


class Landing extends Component {
  render() {
    return (
        <div>
          <section id="banner">
              <div className="container">
                  <div className="row">
                      <div className="carousel-caption text-center">
                          <h3>Varsanity</h3>
                      </div>
                  </div>
              </div>
          </section>

          <div className="container">
            <div className="contact_full">
                <div className="col-md-6 col-md-offset-3">
                    <div className="row">
                        <div>
                          <FormGroup controlId="formControlsText">
                              <FormControl type="text" placeholder="Enter your address..." />
                          </FormGroup>

                          <FormGroup controlId="formControlsSelect">
                              <ControlLabel>Please select your PV capacity:</ControlLabel>
                              <FormControl componentClass="select" placeholder="select">
                                  <option>I do not have solar yet</option>
                                  <option>2 kW</option>
                                  <option>4 kW</option>
                                  <option>6 kW</option>
                                  <option>8 kW</option>
                                  <option>10 kW</option>
                              </FormControl>
                          </FormGroup>

                            <div className="col-md-6 text-center">
                                <Button href="/api/utilityApi" bsStyle="primary">I know my utility login</Button>
                            </div>

                            <div className="col-md-6 text-center">
                                <Button bsStyle="primary">I <b>do not</b> know my utility login</Button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
          </div>


        </div>

    )
  }
}


module.exports = Landing;