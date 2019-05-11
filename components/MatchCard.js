import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { wp, hp } from '../tools/pixel-ratio-helper'
import { Image } from 'react-native-elements';

export default class MatchCard extends React.Component {
    constructor(props) {
        super(props)
        this.match = this.props.match.data
        this.blueTeam = this.match.participantIdentities.slice(0, this.match.participantIdentities.length / 2)
        this.redTeam = this.match.participantIdentities.slice(this.match.participantIdentities.length / 2, this.match.participantIdentities.length)
        this.match.participantIdentities.forEach((participant, i) => {
            if(participant.player.summonerName === this.props.summoner) {
                this.playerIndex = i
            }
        })
        this.playerTeam = this.playerIndex < this.match.participantIdentities.length / 2 ? 0 : 1
        this.stats = this.match.participants[this.playerIndex].stats
        this.kda = ((this.stats.kills + this.stats.assists) / this.stats.deaths).toFixed(2)
        this.won = this.match.teams[this.playerTeam].win.toLowerCase() === 'win'
        this.champ = {}
        this.state = { champSrc: '' }
        this.props.perks.forEach((perk) => {
            if(perk.id === this.stats.perk0) { this.perk0 = perk }
            else if(perk.id === this.stats.perk1) { this.perk1 = perk }
            else if(perk.id === this.stats.perk2) { this.perk2 = perk }
            else if(perk.id === this.stats.perk3) { this.perk3 = perk }
            else if(perk.id === this.stats.perk4) { this.perk4 = perk }
            else if(perk.id === this.stats.perk5) { this.perk5 = perk }
        })
        this.primaryBranch = this.perk0.iconPath.split('/')[6]
        this.secondaryBranch = this.perk5.iconPath.split('/')[6]
        this.perk0.iconPath2 = this.perk0.iconPath.split('/')[7]
        this.perk5.iconPath2 = this.perk5.iconPath.split('/')[7]
        this.codes = new Map()
        this.codes.set('Domination', '7200_domination.png')
        this.codes.set('Precision', '7201_precision.png')
        this.codes.set('Sorcery', '7202_sorcery.png')
        this.codes.set('Inspiration', '7203_whimsy.png')
        this.codes.set('Resolve', '7204_resolve.png')
        this.items = [{id: 0}, {id: 0}, {id: 0}, {id: 0}, {id: 0}, {id: 0}]
        this.props.items.forEach(item => {
            if(item.id === this.stats.item0) { this.items[0] = item; this.items[0].iconPath = item.iconPath.split('/')[(item.iconPath.split('/').length) - 1] }
            if(item.id === this.stats.item1) { this.items[1] = item; this.items[1].iconPath = item.iconPath.split('/')[(item.iconPath.split('/').length) - 1] }
            if(item.id === this.stats.item2) { this.items[2] = item; this.items[2].iconPath = item.iconPath.split('/')[(item.iconPath.split('/').length) - 1] }
            if(item.id === this.stats.item3) { this.items[3] = item; this.items[3].iconPath = item.iconPath.split('/')[(item.iconPath.split('/').length) - 1] }
            if(item.id === this.stats.item4) { this.items[4] = item; this.items[4].iconPath = item.iconPath.split('/')[(item.iconPath.split('/').length) - 1] }
            if(item.id === this.stats.item5) { this.items[5] = item; this.items[5].iconPath = item.iconPath.split('/')[(item.iconPath.split('/').length) - 1] }
        })
    }

    componentDidMount = async () => {
        await fetch('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/' + this.match.participants[this.playerIndex].championId + ".json")
        .then(response => {
            if(response.status === 200 ) {
                response.json()
                .then(data => {
                    this.champ = data
                })
            }
        }).catch(err => {
            console.log(err)
        })
        .then(() => {
            this.setState({ champSrc: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/' + 
            this.match.participants[this.playerIndex].championId + ".png" })
        })
    }

    getDate = seconds => {
        if(seconds < 0) { return 'N/A' }
        if(seconds <= 10) { return 'a few seconds ago' }
        else if(seconds < 60) { return seconds + ' seconds ago' }
        else if(seconds < 3600) { 
            const unit = Math.trunc(seconds / 60) == 1 ? ' minute ago' : ' minutes ago'
            return Math.trunc(seconds / 60) + unit
        }
        else if(seconds < 86400) { 
            const unit = Math.trunc(seconds / 3600) == 1 ? ' hour ago' : ' hours ago'
            return Math.trunc(seconds / 3600) + unit 
        }
        else if(seconds < 604800) { 
            const unit = Math.trunc(seconds / 86400) == 1 ? ' day ago' : ' days ago'
            return Math.trunc(seconds / 86400) + unit
        }
        else if(seconds < 2419200) {
            const unit = Math.trunc(seconds / 604800) == 1 ? ' week ago' : ' weeks ago'
            return Math.trunc(seconds / 604800) + unit
        }
        else { return 'a long time ago'}
    }

    render() {
        const styles = this.getStyles()   
        const primaryPerk = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/' + this.primaryBranch.toLowerCase() + "/" 
        + this.perk0.iconPath2.toLowerCase() + "/" + (this.perk0.iconPath2.toLowerCase() === 'lethaltempo' ? 'lethaltempotemp' : this.perk0.iconPath2.toLowerCase()) + ".png"
        const secondaryPerk = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/' + this.codes.get(this.secondaryBranch)
        return(
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: wp('2%'), height: 118, backgroundColor: this.won ? '#29B6F6' : '#FF5252', marginTop: 6, marginLeft: wp('1%') }}/>
                <View style={styles.matchCard}>
                    <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center', backgroundColor: this.won ? '#29B6F6' : '#FF5252' }}>
                        <Text style={{ color: 'white', fontFamily: 'Helvetica Neue', fontWeight: '900', fontSize: 30 }}>{this.won ? 'W' : 'L'}</Text>
                        <View style={{ width: '50%', height: 2, backgroundColor: 'rgba(255, 255, 255, 0.5)', marginTop: 5, marginBottom: 5 }}/>
                        <Text style={{ fontFamily: 'roboto', color: 'white' }}>
                            {Math.trunc(this.match.gameDuration / 60) + ":" + (Math.round(parseFloat("0." + (this.match.gameDuration / 60).toString().split(".")[1]) * 60)) }
                        </Text>
                    </View>
                    <View style={{ width: '80%', height: '100%' }}>
                        <View style={{ width: '100%', height: 40, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', borderBottomColor: 'lightgrey',
                        borderStyle: 'black', borderBottomWidth: 0.5 }}>
                            <Text style={styles.boldText}>{this.props.queues[this.match.queueId].description}</Text>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontFamily: 'Helvetica Neue' }}>
                                    <Text style={{ fontWeight: '900' }}>{this.stats.kills + " "}</Text>
                                    <Text>/</Text>
                                    <Text style={{ fontWeight: '900', color: '#FF5252' }}>{" " + this.stats.deaths + " "}</Text>
                                    <Text>/</Text>
                                    <Text style={{ fontWeight: '900' }}>{" " + this.stats.assists}</Text>
                                </Text>
                                <Text style={{ fontFamily: 'Helvetica Neue', fontWeight: '400', fontSize: 12, color: 'black' }}>
                                    KDA:
                                    <Text style={{ color: this.kda >= 4 ? 'orange' : this.kda >= 3 ? 'teal' : this.kda < 1 ? '#FF5252' : 'black' , fontWeight: '900', fontSize: 13 }}>
                                        {" " + (isNaN(this.kda) ? '-' : this.kda)}
                                    </Text>
                                </Text>
                            </View>
                            <Text style={{ fontFamily: 'Helvetica Neue' }}>{this.getDate(this.props.now - this.match.gameCreation / 1000)}</Text>
                        </View>
                        <View style={{ width: '100%', height: 78, paddingLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 50, alignItems: 'center' }}>
                                {this.state.champSrc !== '' && 
                                <Image 
                                    source={{ uri: this.state.champSrc, width: 50, height: 50, cache: 'force-cache' }}
                                    style={{ borderRadius: 25 }}
                                />}
                            </View>
                            <View style={{ fontFamily: 'roboto', marginLeft: 5, width: 50, alignItems: 'center', justifyContent: 'space-around', height: 50 }}>
                                <Text>{this.stats.totalMinionsKilled + " CS"}</Text>
                                <Text>
                                    {"(" + (this.stats.totalMinionsKilled / (this.match.gameDuration / 60)).toFixed(1) + ")"}
                                </Text>
                                <Text>Level {this.stats.champLevel}</Text>
                            </View>
                            <View style={{ top: -5, width: 45, height: 45, borderRadius: '100%', backgroundColor: '#F0F0F0', justifyContent: 'center', 
                            alignItems: 'center' }}>
                                <Image 
                                    source={{ uri: primaryPerk, width: 40, height: 40, cache: 'force-cache' }}
                                />
                                <View style={{ position: 'absolute', backgroundColor: '#E0E0E0', borderRadius: 10, width: 30, height: 30, borderRadius: '100%', justifyContent: 'center',
                                alignItems: 'center', top: 27.5, left: 30 }}>
                                    <Image 
                                        source={{ uri: secondaryPerk, width: 20, height: 20, cache: 'force-cache' }}
                                    />
                                </View>
                            </View>
                            <View style={{ left: 18, width: 98, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    {this.items.slice(0, 3).map((item, i) => {
                                        if(item.id === 0) {
                                            return <View style={{ width: 27, height: 27, backgroundColor: '#E0E0E0', borderRadius: 4, margin: 1 }} key={i} />
                                        }
                                        else {
                                            return (
                                                <Image 
                                                    source={{ uri: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/items/icons2d/' + item.iconPath.toLowerCase(),
                                                    width: 27, height: 27, cache: 'force-cache' }}
                                                    style={{ borderRadius: 4, margin: 1 }}
                                                    key={i}
                                                />
                                            )
                                        }
                                    })}
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    {this.items.slice(3).map((item, i) => {
                                        if(item.id === 0) {
                                            return <View style={{ width: 27, height: 27, backgroundColor: '#EFEFEF', borderRadius: 4, margin: 1 }} key={i} />
                                        }
                                        else {
                                            return(
                                                <Image 
                                                    source={{ uri: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/items/icons2d/' + item.iconPath.toLowerCase(),
                                                    width: 27, height: 27, cache: 'force-cache' }}
                                                    style={{ borderRadius: 4, margin: 1 }}
                                                    key={i}
                                                />
                                            )
                                        }
                                    })}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    getStyles = () => {
        const styles = StyleSheet.create({
            matchCard: {
                flexDirection: 'row',
                width: wp('95%'),
                height: 120,
                marginBottom: 5,
                marginTop: 5,
                borderColor: '#F0F0F2',
                borderWidth: 1,
                backgroundColor: 'white',
                marginLeft: wp('0.5%'),
                borderWidth: 1,
                shadowOpacity: 0.1,
                shadowOffset: { width: 1, height: 1 },
                shadowColor: 'black', 
                shadowRadius: 4,
            },
            boldText: {
                fontFamily: 'Helvetica Neue', 
                fontWeight: '600', 
                fontSize: 16
            }
        })
        return styles;
    }
}