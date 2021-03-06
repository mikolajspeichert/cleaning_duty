import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import { fetchIfNeeded } from './actions'
import Header from '../../components/Header'
import UserTable from '../UserTable'
import UserPanel from '../UserPanel'
import DutyTable from '../DutyTable'
import Statistics from '../Statistics'
import SpecialDates from '../SpecialDates'

// Main container
// Routing created with react-router
// By default app is showing the UserTable container
class App extends Component {
  componentDidMount() {
    const dispatch = this.props.dispatch
    dispatch(fetchIfNeeded())
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={UserTable} />
          <Route path="/user/:id" component={UserPanel} />
          <Route path="/user" component={UserPanel} />
          <Route path="/duties" component={DutyTable} />
          <Route path="/stats" component={Statistics} />
          <Route path="/dates" component={SpecialDates} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(connect(null)(App))
