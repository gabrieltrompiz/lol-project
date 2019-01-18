import React from 'react'
import { Header, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Text, Dimensions, ActionSheetIOS } from 'react-native'

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
                            onPress={() => 
                                ActionSheetIOS.showActionSheetWithOptions({
                                    title: '\nSelect Server',
                                    options: serversFull,
                                    cancelButtonIndex: 11
                                },
                                    (index) => { if(index !== 11) this.props.changeServer(serversCodes[index]) } // If checks if cancel was pressed
                                )
                            }
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
                            onPress={() => this.props.changeTheme('#BF360C')}
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

const serversFull = ['Brazil', 'Europe Nordic & East', 'Europe West', 'Korea', 'Latin America North', 'Latin America South', 'North America', 'Oceania', 'Russia', 'Turkey', 'Japan', 'Cancel']
const serversCodes = ['BR', 'EUN', 'EUW', 'KR', 'LAN', 'LAS', 'NA', 'OCE', 'RU', 'TR', 'JP']