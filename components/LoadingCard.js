import React from 'react';
import { View, Text } from 'react-native'
import LottieView from 'lottie-react-native'

export default class LoadingCard extends React.Component {
    render() {
        return(
            <View style={{ width: '90%', left: '5%', alignItems: 'center', justifyContent: 'center', borderColor: '#F0F0F2', borderWidth: 1, shadowOpacity: 0.1, fontSize: 20,
            shadowOffset: { width: 1, height: 1 }, shadowColor: 'black', shadowRadius: 4, borderRadius: 20, backgroundColor: 'white', justifyContent: 'center', marginTop: 10 }}>
                <LottieView source={require('../assets/cardanimation.json')} autoPlay loop style={{ width: 50, marginTop: 3, marginBottom: 15 }}/>
                <Text style={{ fontFamily: 'Helvetica Neue', fontWeight: '600', marginBottom: 10 }}>Refreshing...</Text>
            </View>
        );
    }
}