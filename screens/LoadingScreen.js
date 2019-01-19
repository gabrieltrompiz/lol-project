import React from 'react'
import { Modal, Dimensions, StyleSheet, View } from 'react-native'
import LottieView from 'lottie-react-native'

export default class LoadingScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {visibleModal: false}
    }

    render() {
        return(
            <Modal transparent onRequestClose={() => this.setState({ visibleModal: false })}
                visibleModal={this.state.visibleModal} onDismiss={() => this.setState({ visibleModal: false })}>
                <View style={styles.container}>
                    <LottieView source={require('../assets/animation.json')} autoPlay loop style={{ width: 150 }} />
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: 'rgba(38, 12, 25, 0.1)',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    }
})