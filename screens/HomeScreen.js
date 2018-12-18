import React from 'react'
import { View, StyleSheet, Dimensions, TextInput } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import SearchBar from '../components/SearchBar';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: {
            visible: false
        }
    };

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <SearchBar />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        backgroundColor: 'white'
    }
})