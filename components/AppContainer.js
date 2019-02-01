import React from 'react'
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Image } from 'react-native'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import ChampsScreen from '../screens/ChampsScreen'
import LeaderboardsScreen from '../screens/LeaderboardsScreen'
import SummonerScreen from '../screens/SummonerScreen'

export default class AppContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const HomeStack = createStackNavigator({ // HomeScreen stack navigator
            Home: HomeScreen,
            Summoner: SummonerScreen
        }, { headerMode: 'none' })
        const ChampsStack = createStackNavigator({
            Champions: ChampsScreen
        }, { headerMode: 'none' })
        const LeaderboardsStack = createStackNavigator({
            Leaderboards: LeaderboardsScreen 
        }, { headerMode: 'none' })
        const SettingsStack = createStackNavigator({
            Settings: SettingsScreen
        }, { headerMode: 'none' })
        const TabNav = createBottomTabNavigator({ // tabnav component with screens
            Home: HomeStack,
            Champions: ChampsStack,
            Leaderboards: LeaderboardsStack,
            Settings: SettingsStack
        },
        {
            initialRouteName: 'Home',
            tabBarOptions: {
                activeTintColor: this.props.screenProps.theme,
                labelStyle: { fontWeight: '600', top: 1 },
                
            },
            defaultNavigationOptions: ({ navigation }) => ({
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    const { routeName } = navigation.state
                    let iconName;
                    switch (routeName) {
                        case 'Home': iconName = focused ? 'home' : 'home-outline'; break;
                        case 'Leaderboards': iconName = focused ? 'trophy' : 'trophy-outline'; break;
                        case 'Settings': iconName = focused ? 'settings' : 'settings-outline'; break;
                    }
                    if (routeName === 'Champions') {
                        return <Image
                            source={focused ? require('../assets/champs-icon.png') : require('../assets/champs-icon-outline.png')}
                            style={{
                                width: 28,
                                height: 28,
                                bottom: 5,
                                tintColor: tintColor,
                                marginTop: 14,
                            }}
                        />
                    }
                    return <Icon name={iconName} size={28} color={tintColor} style={{ top: 5 }} />
                }
            })
        })
        let AppContainer = createAppContainer(TabNav)
        return <AppContainer style={{backgroundColor: 'transparent'}} screenProps={this.props.screenProps} />
    }
}