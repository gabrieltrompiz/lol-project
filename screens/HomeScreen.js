import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
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
                <SearchBar searchSummoner={this.props.screenProps.searchSummoner}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        backgroundColor: 'white'
    }
})