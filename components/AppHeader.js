import React from 'react'
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Text, View, Alert } from 'react-native'

export default class AppHeader extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.showServer) {
            return (
                <Header
                    rightComponent={
                        <Icon.Button
                            name='menu-down-outline'
                            backgroundColor='transparent'
                            iconStyle={{ marginRight: 0 }}
                            server='LAN'
                            onPress={(e) => this.props.changeServer('LAN')}
                        >
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>{this.props.server}</Text>
                        </Icon.Button>
                    }
                    centerComponent={{
                        text: 'League of Legends', style: { color: 'white', fontSize: 22, fontWeight: '700' }
                    }}
                    containerStyle={{
                        height: 100,
                        backgroundColor: 'rgba(36, 41, 46, 1)'
                    }}
                />
            );
        } else {
            return (
                <Header
                    centerComponent={{
                        text: 'League of Legends', style: { color: 'white', fontSize: 22, fontWeight: '700' }
                    }}
                    containerStyle={{
                        height: 100,
                        backgroundColor: 'rgba(36, 41, 46, 1)'
                    }}
                />
            );
        }
    }
}