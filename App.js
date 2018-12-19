import React from 'react';
import { View, StyleSheet, Platform, StatusBar, Dimensions } from 'react-native'
import { AppLoading, Asset } from 'expo'
import HomeScreen from './screens/HomeScreen'
import AppHeader from './components/AppHeader'
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';
import SettingsScreen from './screens/SettingsScreen';

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { isContentLoaded: false, server: 'NA', theme: '#24292E', view: 'Home' }
  }

  handleChangeServer = server => {
    this.setState({ server: server })
  }

  handleChangeView = view => {
    this.setState({ view: view })
  }

  handleChangeTheme = theme => {
    this.setState({ theme: theme })
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
          {Platform.OS === 'ios' && <StatusBar barStyle='dark-content' />}
          {this.state.view === 'Home' && <AppHeader server={this.state.server} changeServer={this.handleChangeServer} showServer={true} title='League of Legends' />}
          {this.state.view === 'Home' && <HomeScreen />}
          {this.state.view === 'Settings' && <AppHeader server={this.state.server} changeServer={this.handleChangeServer} showServer={false} title='Settings' />}
          {this.state.view === 'Settings' && <SettingsScreen />}
          <NavBar theme={this.state.theme} changeTheme={this.handleChangeTheme} view={this.state.view} changeView={this.handleChangeView} />
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
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
});
