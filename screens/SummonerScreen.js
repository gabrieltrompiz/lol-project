import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import AppHeader from '../components/AppHeader'

export default class SummonerScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const data = this.props.navigation.getParam('data', 'Empty' )
        return (
            <View style={styles.container}>
                <AppHeader theme={this.props.screenProps.theme} title='Summoner' showBack navigation={this.props.navigation}/>
                <Text style={{ alignSelf: 'flex-start', fontWeight: '600' }}>Summoner Name:</Text><Text style={{ alignSelf: 'flex-start' }}>{data.name}</Text>
                <Text style={{ alignSelf: 'flex-start', fontWeight: '600' }}>Account ID:</Text><Text style={{ alignSelf: 'flex-start' }}>{data.accountId}</Text>
                <Text style={{ alignSelf: 'flex-start', fontWeight: '600' }}>ID:</Text><Text style={{ alignSelf: 'flex-start' }}>{data.id}</Text>
                <Text style={{ alignSelf: 'flex-start', fontWeight: '600' }}>Profile Icon ID:</Text><Text style={{ alignSelf: 'flex-start' }}>{data.profileIconId}</Text>
                <Text style={{ alignSelf: 'flex-start', fontWeight: '600' }}>PUUID:</Text><Text style={{ alignSelf: 'flex-start' }}>{data.puuid}</Text>
                <Text style={{ alignSelf: 'flex-start', fontWeight: '600' }}>Revision Date:</Text><Text style={{ alignSelf: 'flex-start' }}>{data.revisionDate}</Text>
                <Text style={{ alignSelf: 'flex-start', fontWeight: '600' }}>Summoner Level:</Text><Text style={{ alignSelf: 'flex-start' }}>{data.summonerLevel}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        backgroundColor: 'white',
        
    }
})