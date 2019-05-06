import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { BlurView } from 'expo'
import LottieView from 'lottie-react-native'
import { hp } from '../tools/pixel-ratio-helper'

export default class LoadingScreen extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <View style={styles.container}>
                <BlurView intensity={100} tint='light' style={{ width: 150, borderRadius: 10 }}>
                    <LottieView source={require('../assets/animation.json')} autoPlay loop style={{ width: 150 }} />
                </BlurView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: hp('100%'),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        zIndex: 5
    }
})