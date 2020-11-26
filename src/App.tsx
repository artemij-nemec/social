import { UserOutlined } from '@ant-design/icons'
import { Breadcrumb, Layout, Menu } from 'antd'
import 'antd/dist/antd.css'
import React, { Component } from 'react'
import { connect, Provider } from 'react-redux'
import { BrowserRouter, Link, Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import './App.css'
import Preloader from './components/Common/Preloader/Preloader'
import Header from './components/Header/Header'
import { Login } from './components/Login/Login'
import ProfileContainer from './components/Profile/ProfileContainer'
import { withSuspense } from './hoc/withSuspense'
import { initializeApp } from './redux/app-reducer'
import store, { RootStateType } from './redux/redux-store'

const { SubMenu } = Menu
const { Content, Footer, Sider } = Layout
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const SuspendedDialogsContainer = withSuspense(DialogsContainer)
const SuspendedUsersContainer = withSuspense(UsersContainer)

type PropsType = ReturnType<typeof mapStateToProps> & {
  initializeApp: () => void
}
class App extends Component<PropsType & RouteComponentProps> {
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

    const breadcrumbNameMap = {
      'profile': 'Profile',
      'dialogs': 'Dialogs',
      'messages': 'Messages',
      'users': 'Users'
    } as {[key: string]: string}
    const { location } = this.props
    const pathSnippets = location.pathname.split('/').filter(i => i)
    const breadcrumbItems = [
      <Breadcrumb.Item key='home'>Home</Breadcrumb.Item>,
      ...pathSnippets.map(i => <Breadcrumb.Item key={i}>{breadcrumbNameMap[i]}</Breadcrumb.Item>)
    ]

    return (
      <Layout>
        <Header />
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {breadcrumbItems}
          </Breadcrumb>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['profile']}
                defaultOpenKeys={['myProfile']}
                style={{ height: '100%' }}
              >
                <SubMenu key="myProfile" icon={<UserOutlined />} title="My Profile">
                  <Menu.Item key="profile">
                    <Link to='/profile'>Profile</Link>
                  </Menu.Item>
                  <Menu.Item key="dialogs">
                    <Link to='/dialogs'>Dialogs</Link>
                  </Menu.Item>
                </SubMenu>
                <Menu.Item key="messages">
                  <Link to='/messages'>Messages</Link>
                </Menu.Item>
                <Menu.Item key="users">
                  <Link to='/users'>Users</Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
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
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Test ©2020</Footer>
      </Layout>
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
