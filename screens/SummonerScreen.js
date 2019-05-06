import React from 'react'
import { View, Text, Alert, StyleSheet, ScrollView, Dimensions, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import AppHeader from '../components/AppHeader'
import LoadingScreen from './LoadingScreen'
import QueueCard from '../components/QueueCard'
import 'firebase/firestore';

export default class SummonerScreen extends React.Component {
    constructor(props) {
        super(props)
        this.summonerName = this.props.navigation.getParam('summoner', '')
        this.profile = this.props.navigation.getParam('profile', null)
        this.update = this.props.navigation.getParam('update', () => { console.log('Error') })
        this.state = { loading: false, data: this.profile, now: 0 }
    }

    componentDidMount = () => {
        this.mounted = true;
        fetch('http://worldtimeapi.org/api/timezone/America/New_York').then(response => {
                response.json().then(data => { this.setState({ now: data.unixtime }) })
        })
        .catch(() => console.log('Timezone fetch error'))
        if(this.state.data === null) { this.sendSummoner() }
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
        if(seconds <= 0) { return 'a few seconds ago' }
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
        .then(async (data) => {
            this.update(data)
            this.setState({ loading: false, data: data })
        }, error => {
            console.log(error)
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
                <AppHeader theme={this.props.screenProps.theme} title='Summoner' showBack navigation={this.props.navigation}/>
                {this.state.loading && <LoadingScreen />}
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
            </View>
        );
    }

    sendSummoner = async () => {
        if(this.summonerName !== '' && this.mounted) {
            this.setState({ loading: true })
            this.props.screenProps.searchSummoner(this.summonerName).then((data) => {
                if(this.mounted) { this.setState({ loading: false, data: data }) }
                this.props.navigation.state.params.addRecent(this.state.data)
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
                this.props.navigation.goBack()
            })
        }
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