import React from 'react'
import { View, Text, Alert, StyleSheet, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native'
import AppHeader from '../components/AppHeader'
import LoadingScreen from './LoadingScreen'
import QueueCard from '../components/QueueCard'
import MatchCard from '../components/MatchCard'
import * as firebase from 'firebase'
import 'firebase/firestore';

export default class SummonerScreen extends React.Component {
    constructor(props) {
        super(props)
        this.summonerName = this.props.navigation.getParam('summoner', '')
        this.profile = this.props.navigation.getParam('profile', null)
        this.update = this.props.navigation.getParam('update', () => {})
        this.favs = this.props.navigation.getParam('favs', [])
        this.addFav = this.props.navigation.getParam('addFav', () => {})
        this.removeFav = this.props.navigation.getParam('removeFav', () => {})
        this.state = { loading: false, data: this.profile, now: 0, fav: false, matches: this.profile === null ? [] : this.profile.matches.matches, showing: 20 }
        this.mounted = false;
        this.perks = this.props.screenProps.perks
        this.queues = this.props.screenProps.queues
        this.items = this.props.screenProps.items
    }
    
    componentDidMount = async () => {
        this.mounted = true;
        if(this.state.data === null) {
            await this.sendSummoner().then(async () => { await this._init() })
        } else {
            await this._init()
        }
    }

    _init = async () => {
        fetch('http://worldtimeapi.org/api/timezone/America/New_York')
        .then(response => response.json())
        .then(data => { this.mounted && this.setState({ now: data.unixtime }) })
        .catch(() => console.log('Timezone fetch error'))
        this.favs.some((fav, i) => {
            if(fav.name === this.state.data.name) {
                this.setState({ fav: true })
                return true
            }
            return false;
        })
        this.setState({ loading: true })
        await Promise.all(this.state.matches.slice(0, this.state.showing).map(match => {
            return this.fetchMatches(match)
        }))
        .then(result => {
            console.log(result.length)
            this.mounted && this.setState({ matches: result, loading: false })
        })
    }

    fetchMatches = async (match) => {
        return new Promise((resolve, reject) => {
            const firestore = !firebase.apps.length ? firebase.initializeApp(config).firestore() : firebase.app().firestore();
            let firestoreCollection = firestore.collection('matches-' + this.props.screenProps.server.toLowerCase())
            firestoreCollection.doc(match.gameId.toString()).get().then(async (doc) => {
                if(doc.exists) {
                    match.data = doc.data()
                    resolve(match)
                }
                else {
                    let endpoint; // Endpoint for fetch URL
                    switch (this.props.screenProps.server) {
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
                    await fetch('https://' + endpoint + '.api.riotgames.com/lol/match/v4/matches/' + match.gameId + '?api_key=' + riotApiKey,
                    { headers: { "X-Riot-Token": riotApiKey, "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8", "Accept-Language": "en-US,en;q=0.9" } })
                    .then(response => {
                        if(response.status === 200 ) {
                            response.json().then(data => {
                                firestoreCollection.doc(match.gameId.toString()).set(data)
                                .then(() => { match.data = data; resolve(match) })
                                .catch((error) => { console.log('Firebase Error: Writing doc: ' + error) })
                            })
                        }
                        else {
                            console.log(response.status)
                        }
                    })
                    .catch(err => console.log("Error fetching match data."))
                }
            }).catch(err => console.log("Firebase Error: " + err))
        })
    }

    componentWillUnmount = () => {
        this.mounted = false;
    }

    sortQueues = () => {
        function arrayRemove(arr, value) {
            return arr.filter(function(ele){
                return ele != value;
            });
        }
        const queues = Object.assign({}, this.state.data)
        const possibleQueues = ['RANKED_SOLO_5x5', 'RANKED_FLEX_SR', 'RANKED_FLEX_TT']
        let availableQueues =  ['RANKED_SOLO_5x5', 'RANKED_FLEX_SR', 'RANKED_FLEX_TT']
        let rankedQueues = new Array(3)
        possibleQueues.forEach((item, i) => {
            if(queues.q1.queue == item) { 
                rankedQueues[0] = { 'queue': item, 'qObj': queues.q1 }; 
                availableQueues = arrayRemove(availableQueues, item)
            }
            if(queues.q2.queue == item) { 
                rankedQueues[1] = { 'queue': item, 'qObj': queues.q2 }; 
                availableQueues = arrayRemove(availableQueues, item)
            }
            if(queues.q3.queue == item) { 
                rankedQueues[2] = { 'queue': item, 'qObj': queues.q3 }; 
                availableQueues = arrayRemove(availableQueues, item)
            }
        })
        if(typeof rankedQueues[0] === 'undefined') {
            let availableQueue = availableQueues.pop() 
            rankedQueues[0] = { 'queue': availableQueue, 'qObj': {'league': 'UNRANKED', 'rank': '', "lp": '-', 'wins': '-', 'losses': '-', 'queue': availableQueue } } 
        }
        if(typeof rankedQueues[1] === 'undefined') { 
            let availableQueue = availableQueues.pop() 
            rankedQueues[1] = { 'queue': availableQueue, 'qObj': {'league': 'UNRANKED', 'rank': '', "lp": '-', 'wins': '-', 'losses': '-', 'queue': availableQueue } } 
        }
        if(typeof rankedQueues[2] === 'undefined') { 
            let availableQueue = availableQueues.pop() 
            rankedQueues[2] = { 'queue': availableQueue, 'qObj': {'league': 'UNRANKED', 'rank': '', "lp": '-', 'wins': '-', 'losses': '-', 'queue': availableQueue } } 
        }
        let sortedRankedQueues = []
        rankedQueues.forEach(item => {
            if(item.queue == 'RANKED_SOLO_5x5') { sortedRankedQueues[0] = item }
            if(item.queue == 'RANKED_FLEX_SR') { sortedRankedQueues[1] = item }
            if(item.queue == 'RANKED_FLEX_TT') { sortedRankedQueues[2] = item }
        })
        return [sortedRankedQueues[0].qObj, sortedRankedQueues[1].qObj, sortedRankedQueues[2].qObj]
    }

    getDate = seconds => {
        if(seconds < 0) { return 'fetching...' }
        if(seconds <= 10) { return 'a few seconds ago' }
        else if(seconds < 60) { return seconds + ' seconds ago' }
        else if(seconds < 3600) { 
            const unit = Math.trunc(seconds / 60) == 1 ? ' minute ago' : ' minutes ago'
            return Math.trunc(seconds / 60) + unit
        }
        else if(seconds < 86400) { 
            const unit = Math.trunc(seconds / 3600) == 1 ? ' hour ago' : ' hours ago'
            return Math.trunc(seconds / 3600) + unit 
        }
        else if(seconds < 604800) { 
            const unit = Math.trunc(seconds / 86400) == 1 ? ' day ago' : ' days ago'
            return Math.trunc(seconds / 86400) + unit
        }
        else if(seconds < 2419200) {
            const unit = Math.trunc(seconds / 604800) == 1 ? ' week ago' : ' weeks ago'
            return Math.trunc(seconds / 604800) + unit
        }
        else { return 'a long time ago'}
    }

    refresh = async () => {
        this.setState({ loading: true })
        await this.props.screenProps.searchSummoner(this.state.data.name, true)
        .then(data => {
            this.update(data)
            this.mounted && this.setState({ data: data, matches: data.matches.matches, now: data.timestamp })
        }, error => {
            console.log(error)
        })
        await Promise.all(this.state.matches.slice(0, this.state.showing).map(match => {
            return this.fetchMatches(match)
        }))
        .then(result => {
            this.mounted && this.setState({ matches: result, loading: false })
        })
    }

    toggleFav = () => {
        this.setState({ fav: !this.state.fav }, () => {
            if(this.state.fav) {
                this.addFav(this.state.data)
            }
            else {
                this.removeFav(this.state.data)
            }
        })
    }
    
    render() {
        let before = 0;
        if(this.state.data !== null) {
            [soloQ, flex5, flex3] = this.sortQueues()
            before = this.state.data.timestamp
        }
        return (
            <View style={styles.container}>
                <AppHeader theme={this.props.screenProps.theme} title='Summoner' showFav navigation={this.props.navigation} fav={this.state.fav} toggleFav={this.toggleFav}/>
                {this.state.loading && <LoadingScreen />}
                <ScrollView  alwaysBounceVertical showsVerticalScrollIndicator={false}>
                {this.state.data !== null &&
                <View style={{ height: 110, flexDirection: 'row' }}>
                    <Image source={{ uri: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/' + 
                    this.state.data.profileIconId + '.jpg', width: 80, height: 80, cache: 'force-cache' }} 
                    style={{ borderRadius: 40, marginTop: 15, marginLeft: 25 }}/>
                    <View>
                        <Text style={styles.summonerName}>{this.state.data.name}</Text>
                        <Text style={styles.lastUpdate}>Last update: {this.getDate(this.state.now - before)}</Text>
                        <TouchableOpacity
                            style={{ width: 80, height: 30, backgroundColor: '#3F51B5', justifyContent: 'center', alignItems: 'center', top: 5, left: 10, borderRadius: 10 }}
                            onPress={() => this.refresh()}
                        >
                            <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Helvetica Neue', fontWeight: '800' }}>Refresh</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
                {this.state.data !== null &&
                <View style={{ height: 110 }}> 
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <QueueCard queue={soloQ} />
                        <QueueCard queue={flex5} />
                        <QueueCard queue={flex3} /> 
                    </ScrollView>
                </View>}
                {this.state.matches.length > 0 && this.state.matches.map((match, i) => {
                    if(match.hasOwnProperty('data')) {
                        return <MatchCard key={i} match={match} summoner={this.state.data.name} now={this.state.now} perks={this.perks} queues={this.queues} items={this.items}/>
                    }
                })}
                </ScrollView>
            </View>
        );
    }

    sendSummoner = async () => {
        return new Promise((resolve, reject) => {
            if(this.summonerName !== '' && this.mounted) {
                this.setState({ loading: true })
                this.props.screenProps.searchSummoner(this.summonerName).then((data) => {
                    if(this.mounted) { this.setState({ loading: false, data: data, matches: data.matches.matches }, () => { 
                        this.props.navigation.state.params.addRecent(this.state.data) 
                        resolve()
                    }) }
                })
                .catch((reason) => {
                    if(this.mounted) { this.setState({ loading: false, data: null }) } 
                    if (reason.toString().startsWith('Summoner') && this.mounted) {
                        Alert.alert(
                            'Summoner not found',
                            'Please check the summoner name and the selected server.',
                            { text: 'OK' },
                            { cancelable: false })
                    }
                    else if (this.mounted) {
                        Alert.alert(
                            'Network Error',
                            'Please check your internet connection and try again.',
                            { text: 'OK' },
                            { cancelable: false })
                    }
                    reject()
                    this.props.navigation.goBack()
                })
            }
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        backgroundColor: 'white'    
    },
    summonerName: {
        fontSize: 28,
        color: '#282828',
        fontFamily: 'Helvetica Neue',
        fontWeight: '600', 
        marginTop: 15,
        marginLeft: 15
    }, 
    lastUpdate: {
        marginLeft: 15, 
        opacity: 0.8,
        fontFamily: 'Helvetica Neue',
        fontWeight: '300'
    },
    refreshBtn: {

    }
})

const CONFIG = require('../config.json')
const config = { // Firebase config
    apiKey: CONFIG.apiKey,
    authDomain: CONFIG.authDomain,
    databaseURL: CONFIG.databaseURL,
    projectId: CONFIG.projectId,
    storageBucket: CONFIG.storageBucket,
    messagingSenderId: CONFIG.messagingSenderId
};
const riotApiKey = CONFIG.riotApiKey //Permanent Riot API key