import React from 'react'
import { View, Dimensions, StyleSheet, Text, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Button } from 'react-native-elements'

export default class SummonersCard extends React.Component {
    constructor(props) {
        super(props)
        this.source = this.props.summoner.profileIconId
    }

    componentWillReceiveProps = async (nextProps) => {
        this.source = nextProps.summoner.profileIconId
    }

    getHighestQ = () => {
        let romanMap = new Map()
        romanMap.set('I', 1); romanMap.set('II', 2); romanMap.set('III', 3); romanMap.set('IV', 4) // Map for ranks
        let leagueMap = new Map()
        leagueMap.set('IRON', 0); leagueMap.set('BRONZE', 1); leagueMap.set('SILVER', 2); leagueMap.set('GOLD', 3); leagueMap.set('PLATINUM', 4);
        leagueMap.set('DIAMOND', 5), leagueMap.set('MASTER', 6); leagueMap.set('GRANDMASTER', 7); leagueMap.set('CHALLENGER', 8); // Map for leagues
        const q1 = this.props.summoner.q1.league != 'UNRANKED'  ? { 'weight': leagueMap.get(this.props.summoner.q1.league), 'queue': this.props.summoner.q1.queue,
        'rank': romanMap.get(this.props.summoner.q1.rank) } : { 'weight': -1, "queue": "" } // JSON with data about league
        const q2 = this.props.summoner.q2.league != 'UNRANKED' ? { 'weight': leagueMap.get(this.props.summoner.q2.league), 'queue': this.props.summoner.q2.queue,
        'rank': romanMap.get(this.props.summoner.q2.rank) } : { 'weight': -1, "queue": "" }  // JSON with data about league
        const q3 = this.props.summoner.q3.league != 'UNRANKED' ? { 'weight': leagueMap.get(this.props.summoner.q3.league), 'queue': this.props.summoner.q3.queue,
        'rank': romanMap.get(this.props.summoner.q3.rank) } : { 'weight': -1, "queue": "" }  // JSON with data about league
        const weights = [q1, q2, q3] // Array with Qs
        const highest = Math.max(weights[0].weight, weights[1].weight, weights[2].weight) // Highest Q
        let winners = []
        weights.forEach((item) => {
            if (item.weight === highest) { winners.push(item) } // Get winner Q
        })
        if (winners[0].weight === -1) {
            return 'UNRANKED';
        }
        else if (winners.length === 1) { return winners[0].queue }
        else if (winners.length === 2) {
            let tieBreaker = winners[0].rank <= winners[1].rank ? winners[0] : winners[1]
            return tieBreaker.queue;
        }
        else if (winners.length === 3) {
            let tieBreaker = winners[0].rank <= winners[1].rank ? winners[0].rank <= winners[2].rank ? winners[0] : winners[2] : winners[1].rank <= winners[2].rank
            ? winners[1] : winners[2]
            return tieBreaker.queue;
        }
    }

    render() {
        let source = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/' + this.source + '.jpg'
        const bestQ = this.getHighestQ()
        let queue;
        if(this.props.summoner.q1.queue == bestQ) { queue = this.props.summoner.q1 }
        else if(this.props.summoner.q2.queue == bestQ) { queue = this.props.summoner.q2 }
        else if(this.props.summoner.q3.queue == bestQ) { queue = this.props.summoner.q3 }
        else { queue = { "league": "UNRANKED" } }
        let ranked = 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-league-tier-names/global/default/assets/images/ranked-mini-regalia/' +
        queue.league.toLowerCase() + '.png'
        let league = queue.league
        return(
            <View>
                <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.navigate('Summoner', { "profile": this.props.summoner })}>
                    {this.props.fav &&
                    <Button
                        title=''
                        icon={
                            <Icon name='star' size={20} color='red' />
                        }
                        buttonStyle={{ width: 25, height: 25, position: 'absolute', left: Dimensions.get('window').width * 0.15, backgroundColor: 'transparent', top: -5 }}
                        onPress={() => {
                            if(!this.state.fav) { this.setState({ fav: true }, () => this.props.addFav(this.props.summoner)) }
                        }}
                    />}
                    <Image source={{ uri: source, width: 40, height: 40 }} style={{ borderRadius: 20 }}/>
                    <Text style={{ fontWeight: '800', fontSize: 16, fontFamily: 'Helvetica Neue' }}>{this.props.summoner.summonerLevel}</Text>
                    <Text style={{ fontWeight: '500', fontFamily: 'Helvetica Neue' }} >{this.props.summoner.name}</Text>
                    {!withoutRank.includes(league) &&
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{league.charAt(0) + league.slice(1).toLowerCase() + " " + queue.rank}</Text>
                        <Image source={{ uri: ranked, width: 15, height: 15 }} style={{ left: 2 }} />
                    </View>}
                    {withoutRank.includes(league) && 
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{league.charAt(0) + league.slice(1).toLowerCase()}</Text>
                        {league != 'UNRANKED' && <Image source={{ uri: ranked, width: 15, height: 15 }} style={{ left: 2 }} />}
                    </View>}
                </TouchableOpacity>
            </View>
        );
    }
}

const withoutRank = ['UNRANKED', 'CHALLENGER', 'GRANDMASTER', 'MASTER']

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
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    }
})