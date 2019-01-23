import React from 'react'
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native'
import AppHeader from '../components/AppHeader'
import LoadingScreen from './LoadingScreen'

export default class SummonerScreen extends React.Component {
    constructor(props) {
        super(props)
        this.summonerName = this.props.navigation.getParam('summoner', '')
        this.profile = this.props.navigation.getParam('profile', null)
        this.state = { loading: false, data: this.profile }
    }

    componentDidMount = () => {
        this.mounted = true;
        if(this.state.data === null) { this.sendSummoner() }
    }

    componentWillUnmount = () => {
        this.mounted = false;
    }

    render() {
        return (
            <View style={styles.container}>
                <AppHeader theme={this.props.screenProps.theme} title='Summoner' showBack navigation={this.props.navigation}/>
                {this.state.loading && <LoadingScreen />}
                {this.state.data &&
                <Text>{JSON.stringify(this.state.data)}</Text>
                }
            </View>
        );
    }

    sendSummoner = async () => {
        if(this.summonerName !== '' && this.mounted) {
            this.setState({ loading: true })
            this.props.screenProps.searchSummoner(this.summonerName).then((data) => {
                if(this.mounted) { this.setState({ loading: false, data: data }) }
                this.props.navigation.state.params.addRecent(this.state.data)
            })
            .catch((reason) => {
                console.log(reason)
                if(this.mounted) { this.setState({ loading: false, data: null }) } 
                if (reason.toString().startsWith('Summoner') && this.mounted) {
                    Alert.alert(
                        'Summoner not found',
                        'Please check the summoner name and the selected server.',
                        { text: 'OK' },
                        { cancelable: false })
                }
                else if (this.mounted) {
                    Alert.alert(
                        'Network Error',
                        'Please check your internet connection and try again.',
                        { text: 'OK' },
                        { cancelable: false })
                }
                this.props.navigation.goBack()
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        backgroundColor: 'white',
        
    }
})