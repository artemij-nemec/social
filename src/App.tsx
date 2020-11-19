import React, { Component } from 'react'
import { connect, Provider } from 'react-redux'
import { BrowserRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import './App.css'
import Preloader from './components/Common/Preloader/Preloader'
import HeaderContainer from './components/Header/HeaderContainer'
import { Login } from './components/Login/Login'
import Navbar from './components/Navbar/Navbar'
import ProfileContainer from './components/Profile/ProfileContainer'
import { withSuspense } from './hoc/withSuspense'
import { initializeApp } from './redux/app-reducer'
import store, { RootStateType } from './redux/redux-store'
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const SuspendedDialogsContainer = withSuspense(DialogsContainer)
const SuspendedUsersContainer = withSuspense(UsersContainer)

type PropsType = ReturnType<typeof mapStateToProps> & {
  initializeApp: () => void
}
class App extends Component<PropsType> {
  errorHandler = (error: PromiseRejectionEvent) => (
    alert("Error occurred: " + error.reason.message)
  )
  componentDidMount() {
    window.addEventListener('unhandledrejection', this.errorHandler)
    this.props.initializeApp()
  }
  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.errorHandler)
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <div className='app_wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app_wrapper_content'>
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/profile' />} />
            <Route path='/login' component={Login} />
            <Route path='/profile/:userId?'
              render={() => <ProfileContainer />} />
            <Route path='/dialogs'
              render={() => <SuspendedDialogsContainer />} />
            <Route path='/users'
              render={() => <SuspendedUsersContainer />} />
            <Route path='*'
              render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </div>
      </div>
    )
  }
}

function withBrowserRouter(Component: React.ComponentType) {
  return class extends React.Component {
    render() {
      return (<BrowserRouter basename={process.env.PUBLIC_URL} >
        <Provider store={store}>
          <Component {...this.props} />
        </Provider>
      </BrowserRouter>
      )
    }
  }
}

const mapStateToProps = (state: RootStateType) => ({
  initialized: state.appReducer.initialized
})
const AppWithRouter = compose<React.ComponentType>(
  withBrowserRouter,
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App)

export default AppWithRouter
