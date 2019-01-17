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
                                    color='white'
                                    size={15}
                                />
                            }
                            iconRight
                            titleStyle={{ color: 'white', fontSize: 18, fontWeight: '500' }}
                            buttonStyle={{ backgroundColor: 'transparent', elevation: 0 }}
                            onPress={() => this.props.changeServer('LAN')}
                        >
                            <Text style={{ color: 'black', fontSize: 18, fontWeight: '500' }}>{this.props.server}</Text>
                        </Button>
                    }
                    centerComponent={{
                        text: this.props.title, style: { color: 'white', fontSize: 22, fontWeight: '600' }
                    }}
                    rightComponent={
                        <Button 
                            title=''
                            icon={
                                <Icon 
                                    name='account'
                                    color='white'
                                    size={20}
                                />
                            }
                            buttonStyle={{ backgroundColor: 'transparent', elevation: 0, right: 5 }}
                            onPress={() => console.log('account')}
                        />
                    }
                    containerStyle={{
                        height: 100,
                        backgroundColor: this.props.theme,
                        borderBottomColor: '#EFEFF0',
                        borderBottomWidth: 1
                    }}
                />
            );
        } else {
            return (
                <Header
                    centerComponent={{
                        text: this.props.title, style: { color: 'white', fontSize: 22, fontWeight: '600' }
                    }}
                    containerStyle={{
                        height: 100,
                        backgroundColor: this.props.theme,
                        borderBottomColor: '#EFEFF0',
                        borderBottomWidth: 1
                    }}
                />
            );
        }
    }
}