import React from 'react'
import { View, StyleSheet, Dimensions, Text, AsyncStorage } from 'react-native'
import SearchBar from '../components/SearchBar';
import AppHeader from '../components/AppHeader'
import RecentCards from '../components/RecentCards'
import FavCards from '../components/FavsCards'

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = { recent: [], favs: [] } // Default state
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

    handleAddRecent = summoner => {
        let recent = [...this.state.recent] // Creates clone of state array
        let exists = false;
        let index = -1;
        recent.forEach((item, i) => {
            if(summoner.name === item.name) { exists = true;  index = i}
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
                    <Text style={styles.recentText}>Recent Search</Text> 
                    <RecentCards cards={this.state.recent} favs={this.state.favs} addFav={this.handleAddFav} navigation={this.props.navigation}/>
                    <Text style={styles.favText}>Favorites</Text> 
                    <FavCards cards={this.state.favs} />
                </View>
                
            </View>
        );
    }
}

let styles = StyleSheet.create({
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