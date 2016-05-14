import React, { Component } from 'react'
import { Link } from 'react-router'

class Landing extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/homeowner">Home Owner</Link></li>
          <li><Link to="/installer">Installer</Link></li>
        </ul>
          {React.cloneElement(this.props.children || <div />, { key: this.props.location })}
      </div>
    )
  }
}


module.exports = Landing;