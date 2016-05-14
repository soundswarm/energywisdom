import React, { Component } from 'react'
import Navigation from './navigation'

class App extends Component {
  render() {
    return (
        <div>
          <Navigation />
          {React.cloneElement(this.props.children || <div />, { key: this.props.location })}
        </div>
    )
  }
}



module.exports = App;