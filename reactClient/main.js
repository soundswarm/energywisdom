import { render } from 'react-dom'
import { browserHistory, Router, Route, Link } from 'react-router'
import routes from './routes'


render(routes, document.getElementById('content'))