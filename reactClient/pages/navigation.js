import React, { Component } from 'react'
import { Link } from 'react-router'


class Navigation extends Component {
  render() {

    return (

        <header id="section_header" className="navbar-fixed-top main-nav" role="navigation">
        <div className="container">
             <div className="navbar-header ">
                 <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
             </div>
                <nav className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                           <Link to="homeowner">Home Owner</Link>
                        </li>
                        <li>
                           <Link to="installer">Installer</Link>
                        </li>
                        <li>
                           <a href="/api/auth/facebook"><img src="images/facebookLogin.png" /></a>
                        </li>
                    </ul>
                 </nav>
            </div>
        </header>
    )
  }
}


module.exports = Navigation;