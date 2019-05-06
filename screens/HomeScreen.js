import React from 'react'
import { View, StyleSheet, Dimensions, Text, AsyncStorage, TouchableOpacity, Alert} from 'react-native'
import SearchBar from '../components/SearchBar';
import AppHeader from '../components/AppHeader'
import RecentCards from '../components/RecentCards'
import FavCards from '../components/FavsCards'
import { wp, hp } from '../tools/pixel-ratio-helper'

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = { recent: [], favs: [] } // Default state
        this.updateSummoner = this.updateSummoner.bind(this)
    }

    componentDidMount = () => {
        this._retrieveState()
    }

    _retrieveState = async () => {
        let recent = await AsyncStorage.getItem('RECENT')
        let favs = await AsyncStorage.getItem('FAVS')
        if(recent !== null) { this.setState({ recent: JSON.parse(recent) }) }
        if(favs !== null) { this.setState({ favs: JSON.parse(favs) }) }
    }

    updateSummoner = summoner => {
        let recent = [...this.state.recent]
        let favs = [...this.state.favs]
        recent.forEach((item, i) => {
            if(summoner.name === item.name) {
                recent[i] = summoner
            }
        })
        favs.forEach((item, i) => {
            if(summoner.name === item.name) {
                favs[i] = summoner
            }
        })
        this.setState({ recent: recent, favs: favs }, () => {
            AsyncStorage.setItem('RECENT', JSON.stringify(this.state.recent))
            AsyncStorage.setItem('FAVS', JSON.stringify(this.state.favs))
        })
    }

    handleAddRecent = summoner => {
        let recent = [...this.state.recent] // Creates clone of state array
        let exists = false;
        let index = -1;
        recent.forEach((item, i) => {
            if(summoner.name === item.name) { exists = true;  index = i }
        })
        if (exists && recent.length > 1) {
            for(let i = index; i > 0; i--) {
                recent[i] = recent[i - 1]
            }
            recent[0] = summoner
        }
        else if (recent.length === 0) { recent[0] = summoner }
        else if (!exists) {
            for(let i = recent.length - 1; i >= 0; i--) {
                recent[i + 1] = recent[i]
            }
            recent[0] = summoner
            if(recent.length === 9) { recent.pop() }
        }
        this.setState({ recent: recent }, () => {
            AsyncStorage.setItem('RECENT', JSON.stringify(this.state.recent))
        })
    }

    clearRecents = () => {
        Alert.alert(
            'Do you want to clear the search history?',
            'You cannot undo this action',
            [{ text: 'Cancel', style: 'cancel', onPress: () => {} },
            { text: 'OK', onPress: () => { AsyncStorage.removeItem('RECENT'); this.setState({ recent: [] }) } }],
            { cancelable: false }
        )
    }

    handleAddFav = async (summoner) => {
        let favs = [...this.state.favs]
        favs.forEach(item => {
            if(summoner.name === item.name) { return; }
        })
        favs.push(summoner)
        await AsyncStorage.setItem('FAVS', JSON.stringify(this.state.favs))
        this.setState({ favs: favs })
    }

    handleRemoveFav = (summoner) => {
        let favs = [...this.state.favs]
        favs.forEach((item, i) => {
            if(summoner.name === item.name) { favs.splice(i, 1) }
        })
        this.setState({ favs: favs }, () => {
            AsyncStorage.setItem('FAVS', JSON.stringify(this.state.favs))
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <AppHeader theme={this.props.screenProps.theme} title='League of Legends' 
                showServer server={this.props.screenProps.server} changeServer={this.props.screenProps.changeServer}/>
                <SearchBar navigation={this.props.navigation} addRecent={this.handleAddRecent}/>
                <View style={{ alignSelf: 'flex-start' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.recentText}>Recent Search</Text>
                        <TouchableOpacity 
                            style={{ left: wp('36%'), width: 50, height: 20, justifyContent: 'center', alignItems: 'center', top: 2 }}
                            onPress={() => this.clearRecents()}
                        >
                            <Text style={{ fontSize: 20, fontWeight: '200', fontFamily: 'Helvetica Neue' }}>Clear</Text>
                        </TouchableOpacity>
                    </View>
                    <RecentCards cards={this.state.recent} favs={this.state.favs} addFav={this.handleAddFav} navigation={this.props.navigation} updateSummoner={this.updateSummoner}/>
                    <Text style={styles.favText}>Favorites</Text> 
                    <FavCards cards={this.state.favs} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        backgroundColor: '#FAFAFC'
    },
    recentText: { 
        fontSize: 30, 
        color: '#282828', 
        fontFamily: 'Helvetica Neue', 
        fontWeight: '600', 
        top: -5, 
        left: 20,
        textAlign: 'left'
    },
    favText: {
        fontSize: 30,
        color: '#282828',
        fontFamily: 'Helvetica Neue',
        fontWeight: '600',
        top: 5,
        left: 20,
        textAlign: 'left'
    }
})