import React, { Component } from 'react'
import Navigation from './navigation'

class App extends Component {
  render() {
    return (
        <div>
          <Navigation />
          {React.cloneElement(this.props.children || <div />, { key: this.props.location })}

            <section id="footer">
                <div className="footer_b">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="footer_bottom">
                                    <p className="text-block"> &copy; VARSanity</p>
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



module.exports = App;