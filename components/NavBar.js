import React from 'react'
import { View, StyleSheet, Dimensions, Image, TouchableHighlight } from 'react-native'
import { Button } from 'react-native-elements'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class NavBar extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    underlayColor={'transparent'}
                    activeOpacity={0.5}
                    onPress={() => this.props.changeView('Home')}
                    style={styles.button}
                >
                    <Icon 
                        name={this.props.view === 'Home' ? 'home' : 'home-outline'}
                        size={30}
                        color={this.props.theme}
                        style={{
                            marginTop: 14
                        }}
                    />
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor={'transparent'}
                    activeOpacity={0.5}
                    onPress={() => this.props.changeView('Champs')}
                    style={styles.button}
                >
                    <Image 
                        source={this.props.view === 'Champs' ? require('../assets/champs-icon.png') : require('../assets/champs-icon-outline.png')}
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: this.props.theme,
                            marginTop: 14,
                        }}
                    />
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor={'transparent'}
                    activeOpacity={0.5}
                    onPress={() => this.props.changeView('Leaderboards')}
                    style={styles.button}
                >
                    <Icon
                        name={this.props.view === 'Leaderboards' ? 'trophy' : 'trophy-outline'}
                        size={30}
                        color={this.props.theme}
                        style={{
                            marginTop: 14
                        }}
                    />
                </TouchableHighlight>
                 <TouchableHighlight
                    underlayColor={'transparent'}
                    activeOpacity={0.5}
                    onPress={() => this.props.changeView('Settings')}
                    style={styles.button}
                >
                    <Icon 
                        name={this.props.view === 'Settings' ? 'settings' : 'settings-outline'}
                        size={30}
                        color={this.props.theme}
                        style={{
                            marginTop: 14
                        }}
                    />
                </TouchableHighlight>
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
        zIndex: -1,
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