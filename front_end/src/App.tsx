import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Main } from "./features/Main"
import { ChainId, DAppProvider } from "@usedapp/core"
import { Container } from "@material-ui/core"

export const App = () => {
  return (
    <DAppProvider config={{
      supportedChains: [ChainId.Kovan, ChainId.Rinkeby],
      notifications: {
        expirationPeriod: 1000,
        checkInterval: 1000
      }
    }}>

      <Container maxWidth="md">
        <Main />
      </Container>
    </DAppProvider>
  )
}
export default App


/*

import { getUnreadNotifications } from '../actions/notification'
import { getUnreadMessages } from '../actions/message'

import Header from './others/header/header'
import NotiSpeak from './others/noti-speak'
import SideBar from './others/sidebar/sidebar'
import AppRoutes from './App-routes'

class App extends Component {
  componentDidMount = () => {
    let { dispatch } = this.props
    dispatch(getUnreadNotifications())
    dispatch(getUnreadMessages())
  }

  render() {
    let { unreadNotifications, unreadMessages } = this.props

    return (
      <Router>
        <div className="app">
          <Header />
          <NotiSpeak un={unreadNotifications} />
          <SideBar un={unreadNotifications} uc={unreadMessages} />
          <AppRoutes />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = store => ({
  unreadNotifications: store.Notification.unreadNotifications,
  unreadMessages: store.Message.unreadMessages,
})

export default connect(mapStateToProps)(App)
export { App as PureApp }

*/