import React from 'react'
import { View, Dimensions, StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'

export default class LoadingScreen extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <View style={styles.container}>
                <LottieView source={require('../assets/animation.json')}  autoPlay loop style={{ width: 150 }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: 'rgba(38, 12, 25, 0.1)',
        position: 'absolute',
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})