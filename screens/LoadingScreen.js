import React from 'react'
import { Modal, Dimensions, StyleSheet, View } from 'react-native'
import LottieView from 'lottie-react-native'

export default class LoadingScreen extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <View style={styles.container}>
                <LottieView source={require('../assets/animation.json')} autoPlay loop style={{ width: 150 }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 1.3,
        alignItems: 'center',
        justifyContent: 'center'
    }
})