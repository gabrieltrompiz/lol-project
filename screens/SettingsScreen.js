import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import AppHeader from '../components/AppHeader'

export default class SettingsScreen extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <View style={styles.container}>
                <AppHeader theme={this.props.screenProps.theme} title='Settings' />
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