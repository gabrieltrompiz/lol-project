import React from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native'
import SearchBar from '../components/SearchBar';
import AppHeader from '../components/AppHeader'

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <AppHeader theme={this.props.screenProps.theme} title='League of Legends' 
                showServer server={this.props.screenProps.server} changeServer={this.props.screenProps.changeServer} 
                changeTheme={this.props.screenProps.changeTheme}/>
                <SearchBar searchSummoner={this.props.screenProps.searchSummoner} navigation={this.props.navigation}
                setLoading={this.props.screenProps.setLoading} />
                <View style={{ alignSelf: 'flex-start'}}>
                    <Text style={styles.recentText}>Recent Search</Text>
                    <View style={styles.recentCard}>

                    </View>
                    <Text style={styles.favText}>Favorites</Text>
                    <View style={styles.favCard}>

                    </View>
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
    },
    recentCard: {
        height: Dimensions.get('window').height / 3.42, 
        width: Dimensions.get('window').width * 0.94,
        left: Dimensions.get('window').width * 0.03,
        top: 0,
        backgroundColor: 'transparent',
        borderColor: '#EAEEF1',
        borderWidth: 1,
        borderRadius: 20
    },
    favCard: {
        height: Dimensions.get('window').height / 3.42,
        width: Dimensions.get('window').width * 0.94,
        left: Dimensions.get('window').width * 0.03,
        top: 10,
        backgroundColor: 'transparent',
        borderColor: '#EAEEF1',
        borderWidth: 1,
        borderRadius: 20
    }
})