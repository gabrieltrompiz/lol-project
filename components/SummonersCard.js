import React from 'react'
import { View, Dimensions, StyleSheet, Text } from 'react-native'

export default class SummonersCard extends React.Component {
    super(props) {
        constructor(props)
    }

    render() {
        return(
            <View style={styles.container}>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width * 0.45,
        height: Dimensions.get('window').height * 0.13,
        marginBottom: 5,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        borderColor: '#F0F0F2',
        borderWidth: 1,
        shadowOpacity: 0.1,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black', 
        shadowRadius: 4,
        borderRadius: 20,
        backgroundColor: 'white'
    }
})