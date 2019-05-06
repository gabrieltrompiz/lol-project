import React from 'react'
import { View, Image } from 'react-native'

export default class RankedCrest extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let uriMap = new Map()
        uriMap.set('IRON', '01_iron/images/'); uriMap.set('BRONZE', '02_bronze/images/'); uriMap.set('SILVER', '03_silver/images/'); uriMap.set('GOLD', '04_gold/images/');
        uriMap.set('PLATINUM', '05_platinum/images/'); uriMap.set('DIAMOND', '06_diamond/images/'); uriMap.set('MASTER', '07_master/images/');
        uriMap.set('GRANDMASTER', '08_grandmaster/images/'); uriMap.set('CHALLENGER', '09_challenger/images/');
        let romanMap = new Map()
        romanMap.set('I', 1); romanMap.set('II', 2); romanMap.set('III', 3); romanMap.set('IV', 4) 
        let league = uriMap.get(this.props.league)
        let div = romanMap.get(this.props.division);
        let base = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/rankedcrests/'
        if (this.props.league !== 'MASTER' && this.props.league !== 'GRANDMASTER' && this.props.league !== 'CHALLENGER' && this.props.league !== 'UNRANKED') {
            return(
                <View style={{ borderRadius: this.props.width / 2, shadowColor: 'black', shadowOpacity: this.props.shadow ? 0.3 : 0, 
                width: this.props.width, height: this.props.height }}>
                    <Image source={{ uri: base + league + this.props.league.toLowerCase() + "_base.png", width: this.props.width, height: this.props.height,
                    cache: 'force-cache' }} style={{ position: 'absolute' }}/>
                    <Image source={{ uri: base + league + this.props.league.toLowerCase() + "_face.png", width: this.props.width, height: this.props.height,
                    cache: 'force-cache' }} style={{ position: 'absolute' }}/>
                    <Image source={{ uri: base + league + this.props.league.toLowerCase() + "_crown_d" + div + ".png", width: this.props.width, height: this.props.height,
                    cache: 'force-cache' }} style={{ position: 'absolute' }} />
                </View>
            );
        }
        else if(this.props.league == 'UNRANKED'){
            return(
                <View style={{ borderRadius: this.props.width / 2, shadowColor: 'black', shadowOpacity: this.props.shadow ? 0.3 : 0, 
                width: this.props.width, height: this.props.height }}>
                    <Image source={require('../assets/unranked.png')} style={{ width: this.props.width - 10, height: this.props.height - 10, alignSelf: 'center', top: 5 }} />
                </View>
            );
        }
        else {
            return (
                <View style={{ borderRadius: this.props.width / 2, shadowColor: 'black', shadowOpacity: this.props.shadow ? 0.3 : 0, 
                width: this.props.width, height: this.props.height }}>
                    <Image source={{ uri: base + league + this.props.league.toLowerCase() + "_base.png", width: this.props.width, height: this.props.height,
                    cache: 'force-cache' }} style={{ position: 'absolute' }} />
                    <Image source={{ uri: base + league + this.props.league.toLowerCase() + "_face.png", width: this.props.width, height: this.props.height, 
                    cache: 'force-cache'}} style={{ position: 'absolute' }} />
                    <Image source={{ uri: base + league + this.props.league.toLowerCase() + "_crown.png", width: this.props.width, height: this.props.height,
                    cache: 'force-cache' }} style={{ position: 'absolute' }} />
                </View>
            );
        }
    }
}