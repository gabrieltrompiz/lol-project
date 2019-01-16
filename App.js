import React from 'react';
import { View, StyleSheet, Platform, StatusBar, Dimensions, Alert } from 'react-native'
import { AppLoading, Asset } from 'expo'
import HomeScreen from './screens/HomeScreen'
import AppHeader from './components/AppHeader'
import NavBar from './components/NavBar';
import SettingsScreen from './screens/SettingsScreen';
import * as firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/functions' //TODO: Move this to ChampionsScreen.js
import LoadingScreen from './screens/LoadingScreen'; //TODO: IMPLEMENT REACT-NAVIGATION!!!

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { isContentLoaded: false, server: 'NA', theme: '#24292E', view: 'Home', loading: false }
    this.searchSummoner = this.searchSummoner.bind(this)
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
          {this.state.view === 'Home' && <HomeScreen searchSummoner={this.searchSummoner} />}
          {this.state.view === 'Champs' && <AppHeader theme={this.state.theme} server={this.state.server} changeServer={this.handleChangeServer} title='Champions' />}
          {this.state.view === 'Champs' && <SettingsScreen />}
          {this.state.view === 'Leaderboards' && <AppHeader theme ={this.state.theme} server={this.state.server} changeServer={this.handleChangeServer} title='Leaderboards' />}
          {this.state.view === 'Leaderboards' && <SettingsScreen />}
          {this.state.view === 'Settings' && <AppHeader theme={this.state.theme} server={this.state.server} changeServer={this.handleChangeServer} title='Settings' />}
          {this.state.view === 'Settings' && <SettingsScreen />}
          {this.state.loading && <LoadingScreen />} 
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

  searchSummoner(summonerName) {
    const firestore = !firebase.apps.length ? firebase.initializeApp(config).firestore() : firebase.app().firestore();
    firestore.settings({ timestampsInSnapshots: true })
    if(summonerName !== '') {
      this.setState({ loading: true })
      let firestoreCollection = firestore.collection('users-' + this.state.server.toLowerCase())
      firestoreCollection.doc(summonerName.toLowerCase()).get().then(doc => {
        if(doc.exists) { //TODO: Display data of doc
          console.log(doc.data())
          this.setState({ loading: false })
        }
        else { //TODO: Display data after adding doc to Firestore
          let endpoint;
          switch(this.state.server) {
            case 'NA': endpoint = 'na1'; break;
            case 'LAN': endpoint = 'la1'; break;
            case 'LAS': endpoint = 'la2'; break;
            case 'KR': endpoint = 'kr'; break;
            case 'BR': endpoint = 'br1'; break;
            case 'RU': endpoint = 'ru'; break;
            case 'OC': endpoint = 'oc1'; break;
            case 'JP': endpoint = 'jp1'; break;
            case 'EUN': endpoint = 'eun1'; break;
            case 'EUW': endpoint = 'euw1'; break;
            case 'TR': endpoint = 'tr1'; break;
          }
          fetch('https://' + endpoint + '.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + encodeURI(summonerName) + '?api_key='  + riotApiKey, 
            { headers: { "X-Riot-Token": riotApiKey, "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8", "Accept-Language": "en-US,en;q=0.9" } })
          .then(response => {
            if(response.status === 200) {
              response.json().then(data => {
                firestoreCollection.doc(summonerName.toLowerCase()).set({
                  accountId: data.accountId,
                  id: data.id,
                  profileIconId: data.profileIconId,
                  puuid: data.puuid,
                  revisionDate: data.revisionDate,
                  summonerLevel: data.summonerLevel
                })
                .then(() => { 
                  console.log('Added ' + summonerName + ' to Firestore successfully')
                  this.setState({ loading: false })
                })
                .catch(err => {
                  console.log('Firebase error: ' + err)
                  this.setState({ loading: false })
                })
              })
            }
            else if(response.status === 404) {
              Alert.alert(
                'Summoner not found',
                'Please check the summoner name and the server.',
                {text: 'OK'},
                { cancelable: false }
              )
              this.setState({ loading: false })
            }
          })
          .catch(err => { //TODO: Probably will show alert here 
            console.log('Fetch error: ' + err)
            this.setState({ loading: false })
          })
        } // End of else
      }) // End of doc
    } // End of if
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

const riotApiKey = CONFIG.riotApiKey //Permanent Riot API key

const config = {
  apiKey: CONFIG.apiKey,
  authDomain: CONFIG.authDomain,
  databaseURL: CONFIG.databaseURL,
  projectId: CONFIG.projectId,
  storageBucket: CONFIG.storageBucket,
  messagingSenderId: CONFIG.messagingSenderId
};

const CONFIG = require('./config.json')