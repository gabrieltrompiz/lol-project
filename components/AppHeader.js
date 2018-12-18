import React from 'react'
import { Header, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Text } from 'react-native'

export default class AppHeader extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.showServer) {
            return (
                <Header
                    leftComponent={
                        <Button
                            title={this.props.server}
                            icon={
                                <Icon
                                    name='menu-down-outline'
                                    color='black'
                                    size={15}
                                />
                            }
                            iconRight
                            titleStyle={{ color: 'black', fontSize: 18, fontWeight: '700' }}
                            buttonStyle={{ backgroundColor: 'transparent' }}
                            server='LAN'
                            onPress={(e) => this.props.changeServer('LAN')}
                        >
                            <Text style={{ color: 'black', fontSize: 18, fontWeight: '700' }}>{this.props.server}</Text>
                        </Button>
                    }
                    centerComponent={{
                        text: this.props.title, style: { color: 'black', fontSize: 22, fontWeight: '700' }
                    }}
                    rightComponent={
                        <Icon
                            name='account-outline'
                            color='black'
                            size={22}
                        />
                    }
                    containerStyle={{
                        height: 100,
                        //backgroundColor: 'rgba(36, 41, 46, 1)'
                        backgroundColor: 'white',
                        borderBottomColor: '#EFEFF0',
                        borderBottomWidth: 1
                    }}
                />
            );
        } else {
            return (
                <Header
                    centerComponent={{
                        text: this.props.title, style: { color: 'white', fontSize: 22, fontWeight: '700' }
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