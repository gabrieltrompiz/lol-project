import React from 'react'
import { View, TextInput, StyleSheet, Dimensions } from 'react-native'
import { Button } from 'react-native-elements'

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = { summonerName: ''}
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    ref={this.textInput}
                    placeholder='Summoner Search'
                    placeholderTextColor='#97A0A7'
                    returnKeyType='search'
                    onSubmitEditing={() => this.props.navigation.navigate('Summoner', { summoner: this.state.summonerName, addRecent: this.props.addRecent })}
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
                    onPress={() => this.props.navigation.navigate('Summoner', { summoner: this.state.summonerName, addRecent: this.props.addRecent })}
                />
            </View>
        );
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