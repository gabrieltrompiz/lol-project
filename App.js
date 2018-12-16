import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { AppLoading, Asset, Fonts, Icon } from 'expo'

export default class App extends React.Component {

  state = {
    isContentLoaded: false
  }

  render() {
    if(!this.state.isContentLoaded) {
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
            {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
            <Text>Hello, loaded assets: {this.state.isContentLoaded.toString()}</Text>
            {/* Here goes TabsView Component */}
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
