import React, { Component } from 'react'
import { Link } from 'react-router'
import {Button} from 'react-bootstrap/lib'

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
<Button bsStyle="primary" bsSize="large">Large button</Button>
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