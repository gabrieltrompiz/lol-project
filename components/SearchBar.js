import React from 'react'
import { View, TextInput, StyleSheet, Dimensions, Keyboard } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = { summonerName: '' }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder='Summoner Search'
                    placeholderTextColor='rgba(104, 104, 104, 0.6)'
                    returnKeyType='search'
                    onSubmitEditing={() => { 
                        Keyboard.dismiss() 
                        this.props.searchSummoner(this.state.summonerName)
                    }}
                    style={styles.textInput}
                    onChangeText={ (textInput) => this.setState({ summonerName: textInput })}
                />
                <Button
                    icon={{
                        name: 'search',
                        size: 25,
                        color: 'rgba(36, 41, 46, 1)'
                    }}
                    title=''
                    buttonStyle={styles.button}
                    onPress={() => {
                        Keyboard.dismiss()
                        this.props.searchSummoner(this.state.summonerName)
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFF0',
        paddingBottom: 15,
        width: Dimensions.get('window').width,
        alignItems: 'center',
    },
    textInput: {
        fontSize: 20,
        fontWeight: '400',
        flex: 1,
        marginLeft: 20,
        backgroundColor: '#f7f7f7',
        height: 36,
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