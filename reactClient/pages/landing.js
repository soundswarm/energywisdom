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
                      <div className="blog-header text-center">
                          <h2>Varsanity</h2>
                      </div>
                  </div>
              </div>
          </section>

          <div className="container">
            <div className="contact_full">
                <div className="col-md-6 col-md-offset-3">
                    <div className="row">
                        <div className="left_contact">
                          <form action="role">
                            <div className="form-level">
                                <input name="address" placeholder="Enter your address..." id="name"  value="" type="text" className="input-block" />
                                <span className="form-icon fa fa-map-marker"></span>
                            </div>
                          </form>

                            <Accordion>
                                <Panel header="I already have solar" eventKey="1">
                                  <FormGroup controlId="formControlsSelect">
                                      <ControlLabel>G:</ControlLabel>
                                      <FormControl componentClass="select" placeholder="select">
                                        <option value="select">select</option>
                                        <option value="other">...</option>
                                      </FormControl>

                                      <ControlLabel>K:</ControlLabel>
                                      <FormControl componentClass="select" placeholder="select">
                                        <option value="select">select</option>
                                        <option value="other">...</option>
                                      </FormControl>

                                      <ControlLabel>W:</ControlLabel>
                                      <FormControl componentClass="select" placeholder="select">
                                        <option value="select">select</option>
                                        <option value="other">...</option>
                                      </FormControl>

                                  </FormGroup>
                                </Panel>
                            </Accordion>

                            <div className="col-md-6 text-center">
                                <Button href="/utilityApi" bsStyle="primary">I know my login</Button>
                            </div>

                            <div className="col-md-6 text-center">
                                <Button bsStyle="primary">I do not know my login</Button>
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