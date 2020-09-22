import React, { Component } from 'react'
import { connect, Provider } from 'react-redux'
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import './App.css'
import Preloader from './components/Common/Preloader/Preloader'
import HeaderContainer from './components/Header/HeaderContainer'
import Login from './components/Login/Login'
import Navbar from './components/Navbar/Navbar'
import ProfileContainer from './components/Profile/ProfileContainer'
import { withSuspense } from './hoc/withSuspense'
import { initializeApp } from './redux/app-reducer'
import store from './redux/redux-store'
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))

class App extends Component {
  componentDidMount() {
    this.props.initializeApp()
  }
  render() {
    if (!this.props.initialized) {
      return (
        <Preloader />
      )
    }

    return (
      <div className="app_wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app_wrapper_content">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/profile/:userId?"
              render={() => <ProfileContainer />} />
            <Route path="/dialogs"
              render={withSuspense(DialogsContainer)} />
            <Route path="/users"
              render={withSuspense(UsersContainer)} />
          </Switch>
        </div>
      </div>
    )
  }
}

function withBrowserRouter(Component) {
  return class extends React.Component {
    render() {
      return <BrowserRouter>
        <Provider store={store}>
          <Component {...this.props} />
        </Provider>
      </BrowserRouter>
    }
  }
}

const mapStateToProps = state => ({
  initialized: state.appReducer.initialized
})
const AppWithRouter = compose(
  withBrowserRouter,
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App)

export default AppWithRouter
