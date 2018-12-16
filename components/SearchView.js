import React from 'react'
import { View, StyleSheet, Dimensions, Alert, Text } from 'react-native'
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class SearchView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', marginTop: 50 }}>
                    <Input
                        placeholder='Summoner Search'
                        leftIcon={
                            <Icon
                                name='sword-cross'
                                size={20}
                                color='rgba(36, 41, 46, 1)'
                            />
                        }
                        inputContainerStyle={{
                            borderColor: 'transparent',
                            borderRadius: 5,

                        }}
                        containerStyle={{
                            width: 250,
                            borderRadius: 20,
                            borderColor: 'rgba(36, 41, 46, 0.8)',
                            borderWidth: 2,
                            paddingTop: 2
                        }}
                    />
                    <Button
                        title=''
                        onPress={() => {
                            Alert.alert('ouch')
                        }}
                        icon={{
                            name: 'search',
                            size: 20,
                            color: 'white'
                        }}
                        buttonStyle={{
                            width: 100,
                            marginLeft: 10,
                            backgroundColor: 'rgba(36, 41, 46, 1)',
                            borderColor: 'transparent',
                            borderRadius: 100,
                            height: 40,
                            width: 40,
                            marginTop: 5
                        }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        alignItems: 'center'
    }
})