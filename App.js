import React from 'react';
import { View, StyleSheet } from 'react-native'
import { AppLoading, Asset } from 'expo'
import SearchView from './components/SearchView'
import AppHeader from './components/AppHeader'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { isContentLoaded: false, server: 'NA' }
  }

  handleChangeServer = serverName => {
    this.setState({ server: serverName })
  }

  render() {
    if (!this.state.isContentLoaded) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishingLoad}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <AppHeader server={this.state.server} changeServer={this.handleChangeServer} showServer={true} />
          <SearchView />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/icon.png'),
        require('./assets/splash.png'),
      ]),
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error)
  }

  _handleFinishingLoad = () => {
    this.setState({ isContentLoaded: true })
  }
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
});
