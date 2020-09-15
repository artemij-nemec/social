import React, { Component } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import ProfileContainer from './components/Profile/ProfileContainer'
import UsersContainer from './components/Users/UsersContainer'
import { Route, Switch, withRouter } from 'react-router-dom'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import Login from './components/Login/Login'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { initializeApp } from './redux/app-reducer'
import Preloader from './components/Common/Preloader/Preloader'
import store from './redux/redux-store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

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
              render={() => <DialogsContainer />} />
            <Route path="/users"
              render={() => <UsersContainer />} />
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
const AppWithRouter =  compose(
  withBrowserRouter,
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App)

export default AppWithRouter
