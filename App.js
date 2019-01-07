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
          {Platform.OS === 'ios' && <StatusBar barStyle='light-content' />}
          {this.state.view === 'Home' && <AppHeader theme={this.state.theme} server={this.state.server} changeServer={this.handleChangeServer} showServer title='League of Legends' />}
          {this.state.view === 'Home' && <HomeScreen />}
          {this.state.view === 'Champs' && <AppHeader theme={this.state.theme} server={this.state.server} changeServer={this.handleChangeServer} title='Champions' />}
          {this.state.view === 'Champs' && <SettingsScreen />}
          {this.state.view === 'Leaderboards' && <AppHeader theme ={this.state.theme} server={this.state.server} changeServer={this.handleChangeServer} title='Leaderboards' />}
          {this.state.view === 'Leaderboards' && <SettingsScreen />}
          {this.state.view === 'Settings' && <AppHeader theme={this.state.theme} server={this.state.server} changeServer={this.handleChangeServer} title='Settings' />}
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
        require('./assets/champs-icon.png'),
        require('./assets/champs-icon-outline.png')
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

const apiKey = ''