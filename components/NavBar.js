import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Button } from 'react-native-elements'
import { ifIphoneX } from 'react-native-iphone-x-helper'

export default class NavBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    icon={{
                        name: this.props.view === 'Home' ? 'home' : 'home-outline',
                        size: 30,
                        color: this.props.theme,
                        type: 'material-community'
                    }}
                    title=''
                    buttonStyle= {styles.button}
                    onPress={() => this.props.changeView('Home')}
                />
                <Button
                    icon={{
                        name: 'a',
                        size: 30,
                        color: this.props.theme,
                        type: 'material-community'
                    }}
                    title=''
                    buttonStyle={styles.button}
                    onPress={() => this.props.changeView('Champions')}
                />
                <Button
                    icon={{
                        name: 'search',
                        size: 30,
                        color: this.props.theme,
                        type: 'material-community'
                    }}
                    title=''
                    buttonStyle={styles.button}
                    onPress={() => this.props.changeView('Leaderboards')}
                />
                <Button
                    icon={{
                        name: this.props.view === 'Settings' ? 'settings' : 'settings-outline',
                        size: 30,
                        color: this.props.theme,
                        type: 'material-community'
                    }}
                    title=''
                    buttonStyle={styles.button}
                    onPress={() => this.props.changeView('Settings')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        borderTopColor: '#DFDFDF',
        borderTopWidth: 1,
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        ...ifIphoneX({
            height: 84
        }, {
            height: 60
        })
    },
    button: {
        backgroundColor: 'white',
        height: 62,
        paddingLeft: 15,
        paddingRight: 15,
        elevation: 0
    }
})