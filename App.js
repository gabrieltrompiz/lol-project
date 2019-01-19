import React from 'react';
import { StyleSheet, Alert, Image, View, Dimensions, Platform, StatusBar, AsyncStorage } from 'react-native'
import { AppLoading, Asset, Font } from 'expo'
import * as firebase from 'firebase'
import 'firebase/firestore'
import LoadingScreen from './screens/LoadingScreen';
import AppContainer from './components/AppContainer'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isContentLoaded: false, server: 'NA', theme: '#24292E', loading: false } // Default state
    this.searchSummoner = this.searchSummoner.bind(this)
    this._retrieveState() // Looks for state in AsyncStorage, if null will use default state
  }

  _retrieveState = async () => {
    const server = await AsyncStorage.getItem('SERVER')
    const theme = await AsyncStorage.getItem('THEME')
    if(server !== null) { this.setState({ server: server }) }
    else { AsyncStorage.setItem('SERVER', this.state.server) } // Loads default state to AsyncStorage
    if(theme !== null) { this.setState({ theme: theme }) } 
    else { AsyncStorage.setItem('THEME', this.state.theme) } // Loads default state to AsyncStorage
  } 

  handleChangeServer = server => {
    this.setState({ server: server })
    AsyncStorage.setItem('SERVER', server) // Saves new state to  AsyncStorage
  }

  handleChangeTheme = theme => {
    this.setState({ theme: theme })
    AsyncStorage.setItem('THEME', theme) // Saves new state to AsyncStorage
  }

  handleChangeLoading = loading => {
    this.setState({ loading: loading })
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
          {Platform.OS === 'ios' && <StatusBar barStyle='light-content'/>}
          <AppContainer screenProps={{
            theme: this.state.theme,
            changeTheme: this.handleChangeTheme,
            server: this.state.server,
            changeServer: this.handleChangeServer,
            searchSummoner: this.searchSummoner,
            setLoading: this.handleChangeLoading
          }}/>
          {this.state.loading && <LoadingScreen />}
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
      Font.loadAsync({'roboto': require('./assets/Roboto-Medium.ttf')})
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error)
  }

  _handleFinishingLoad = () => {
    this.setState({ isContentLoaded: true })
  }

  searchSummoner(summonerName) { //FIXME: do TODOs!!! Data will go to SummonerScreen (StackNavigator, probably will use Fluid Transitions)
    return new Promise((resolve, reject) => {
      const firestore = !firebase.apps.length ? firebase.initializeApp(config).firestore() : firebase.app().firestore();
      if (summonerName !== '') {
        let firestoreCollection = firestore.collection('users-' + this.state.server.toLowerCase())
        firestoreCollection.doc(summonerName.toLowerCase()).get().then(doc => {
          if (doc.exists) {
            resolve(doc.data())
          }
          else {
            let endpoint;
            switch (this.state.server) {
              case 'NA': endpoint = 'na1'; break;
              case 'LAN': endpoint = 'la1'; break;
              case 'LAS': endpoint = 'la2'; break;
              case 'KR': endpoint = 'kr'; break;
              case 'BR': endpoint = 'br1'; break;
              case 'RU': endpoint = 'ru'; break;
              case 'OCE': endpoint = 'oc1'; break;
              case 'JP': endpoint = 'jp1'; break;
              case 'EUN': endpoint = 'eun1'; break;
              case 'EUW': endpoint = 'euw1'; break;
              case 'TR': endpoint = 'tr1'; break;
            }
            fetch('https://' + endpoint + '.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + encodeURI(summonerName) + '?api_key=' + riotApiKey,
              { headers: { "X-Riot-Token": riotApiKey, "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8", "Accept-Language": "en-US,en;q=0.9" } })
              .then(response => {
                if (response.status === 200) {
                  response.json().then(data => {
                    firestoreCollection.doc(summonerName.toLowerCase()).set({
                      accountId: data.accountId,
                      id: data.id,
                      profileIconId: data.profileIconId,
                      puuid: data.puuid,
                      revisionDate: data.revisionDate,
                      summonerLevel: data.summonerLevel
                    })
                    .then(() => resolve(data))
                    .catch(err => reject('Firebase Error:' + err))
                  })
                }
                else if (response.status === 404) { //TODO: Probably will have to consider rest of HTTP status codes
                  reject("Summoner not found")
                }
              })
              .catch(err => reject("Fetch error: " + err))// TODO: Show alert here
          } // End of else
        }) // End of doc
      } // End of if
    })
  }
}

const CONFIG = require('./config.json') // File that contains API keys and sensitive information (included in .gitignore)

const riotApiKey = CONFIG.riotApiKey //Permanent Riot API key

const config = { // Firebase config
  apiKey: CONFIG.apiKey,
  authDomain: CONFIG.authDomain,
  databaseURL: CONFIG.databaseURL,
  projectId: CONFIG.projectId,
  storageBucket: CONFIG.storageBucket,
  messagingSenderId: CONFIG.messagingSenderId
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'transparent'
  }
})