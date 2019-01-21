import React from 'react'
import { View, StyleSheet, Dimensions, Text, AsyncStorage } from 'react-native'
import SearchBar from '../components/SearchBar';
import AppHeader from '../components/AppHeader'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
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
        if(recent !== null) { this.setState({ recent: recent }) }
        if(favs !== null) { this.setState({ favs: favs }) }
    }

    handleAddRecent = summoner => {
        let recent = this.state.recent
        recent.push(summoner)
        this.setState({ recent: recent }, () => {
            AsyncStorage.setItem('RECENT', this.state.recent)
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <AppHeader theme={this.props.screenProps.theme} title='League of Legends' 
                showServer server={this.props.screenProps.server} changeServer={this.props.screenProps.changeServer} />
                <SearchBar searchSummoner={this.props.screenProps.searchSummoner} navigation={this.props.navigation}
                setLoading={this.props.screenProps.setLoading} />
                <View style={{ alignSelf: 'flex-start' }}>
                    <Text style={styles.recentText}>Recent Search</Text> 
                    <RecentCards cards={this.state.recent} />
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