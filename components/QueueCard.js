import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import RankedCrest from './RankedCrest'
import { wp } from '../tools/pixel-ratio-helper'

export default class QueueCard extends React.Component {
    constructor(props) {
        super(props)
    }

    getColor = color => {
        switch(color) {
            case 'IRON': return '#47403F';
            case 'BRONZE': return '#5D3625'
            case 'SILVER': return '#7E969D'
            case 'GOLD': return '#DCA850'
            case 'PLATINUM': return '#1EB05A'
            case 'DIAMOND': return '#5553A9'
            case 'MASTER': return '#D144E4'
            case 'GRANDMASTER': return '#B71A21'
            case 'CHALLENGER': return '#34C0FF'
            case 'UNRANKED': return 'black'
        }
    }

    render() {
        let queueType = new Map()
        queueType.set('RANKED_SOLO_5x5', 'Ranked Solo'); queueType.set('RANKED_FLEX_SR', 'Ranked Flex 5:5'); queueType.set('RANKED_FLEX_TT', 'Ranked Flex 3:3')
        let winRate = (this.props.queue.wins * 100 / (this.props.queue.wins + this.props.queue.losses)).toFixed(2)
        if (isNaN(winRate)) { winRate = '-' }
        return(
            <View style={styles.rankedCard}>
                <View style={{ alignSelf: 'center', right: 5 }}>
                    <RankedCrest league={this.props.queue.league} division={this.props.queue.rank} width={80} height={80} shadow />
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', right: 5 }}>
                    <Text style={styles.rankedText}>{queueType.get(this.props.queue.queue)}</Text>
                    {!withoutRank.includes(this.props.queue.league) &&
                    <Text style={{ color: this.getColor(this.props.queue.league), marginBottom: 2 }}>
                        {this.props.queue.league.charAt(0) + this.props.queue.league.slice(1).toLowerCase() + " " + this.props.queue.rank}
                    </Text >}
                    {withoutRank.includes(this.props.queue.league) &&
                    <Text style={{ color: this.getColor(this.props.queue.league), marginBottom: 2 }}>
                        {this.props.queue.league.charAt(0) + this.props.queue.league.slice(1).toLowerCase()}
                    </Text>}
                    <Text style={{ marginBottom: 2 }}>{this.props.queue.lp} LP</Text>
                    <Text style={{ fontWeight: '100', fontSize: 12 }}>
                        {this.props.queue.wins}W {this.props.queue.losses}L ({winRate}%)
                    </Text>
                </View>
            </View>
        );
    }
}
const withoutRank = ['UNRANKED', 'CHALLENGER', 'MASTER', 'GRANDMASTER']

const styles = StyleSheet.create({
    rankedCard: {
        flexDirection: 'row',
        width: wp('55%'),
        height: 100,
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
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    rankedText: {
        fontWeight: '600', 
        fontSize: 16, 
        fontFamily: 'Helvetica Neue', 
        color: '#3a3a3a',
        marginBottom: 5
    }
})