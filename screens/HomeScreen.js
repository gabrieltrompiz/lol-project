import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import SearchBar from '../components/SearchBar';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <SearchBar />

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