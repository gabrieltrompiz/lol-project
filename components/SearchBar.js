import React from 'react'
import { View, TextInput, StyleSheet, Dimensions, Keyboard, Alert } from 'react-native'
import { Button } from 'react-native-elements'
import LoadingScreen from '../screens/LoadingScreen';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = { summonerName: '', loading: false }
        this.sendSummoner = this.sendSummoner.bind(this)
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.loading && <LoadingScreen />}
                <TextInput
                    ref={this.textInput}
                    placeholder='Summoner Search'
                    placeholderTextColor='#97A0A7'
                    returnKeyType='search'
                    onSubmitEditing={this.sendSummoner}
                    multiline={false}
                    style={styles.textInput}
                    onChangeText={ (textInput) => this.setState({ summonerName: textInput })}
                />
                <Button
                    icon={{
                        name: 'search',
                        size: 26,
                        color: 'rgba(36, 41, 46, 1)'
                    }}
                    title=''
                    buttonStyle={styles.button}
                    onPress={this.sendSummoner}
                />
            </View>
        );
    }

    sendSummoner = () => {
        if(this.state.summonerName !== '') {
            Keyboard.dismiss()
            this.setState({ loading: true })
            this.props.searchSummoner(this.state.summonerName).then((data) => {
                this.setState({ loading: false })
                this.props.navigation.navigate('Summoner', { data: data }) // Data will be sent from here
            })
            .catch((reason) => {
                console.log(reason)
                this.setState({ loading: false })
                if (reason.toString().startsWith('Summoner')) {
                    setTimeout(() => {
                        Alert.alert(
                            'Summoner not found',
                            'Please check the summoner name and the selected server.',
                            { text: 'OK' },
                            { cancelable: false })
                    }, 50) // React Native workaround (bug with Modal and Alert)
                }
                else {
                    setTimeout(() => {
                        Alert.alert(
                            'Network Error',
                            'Please check your internet connection and try again.',
                            { text: 'OK' },
                            { cancelable: false })
                    }, 50) // React Native workaround (bug with Modal and Alert)
                }
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15,
        width: Dimensions.get('window').width,
        alignItems: 'center',
    },
    textInput: {
        fontSize: 20,
        fontWeight: '400',
        flex: 1,
        marginLeft: 20,
        backgroundColor: '#EAEEF1',
        height: 40,
        paddingLeft: 10,
        borderRadius: 5,
        marginRight: 5,
    },
    button: {
        backgroundColor: 'transparent',
        marginRight: 15,
        elevation: 0,
        borderRadius: 20
    }
})