import React from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import SummonersCard from './SummonersCard'
import { wp, hp } from '../tools/pixel-ratio-helper'

export default class RecentCards extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if(this.props.cards.length === 0) {
            return(
                <View style={styles.container}>
                    <Icon
                        name='exclamation'
                        color='#CDD0D3'
                        size={35}
                        style={{ alignSelf: 'center', bottom: 20 }}
                    />
                    <Text style={{ alignSelf: 'center', bottom: 20, color: '#CDD0D3', fontSize: 20 }}>
                        There are no recent searches
                    </Text>
                </View>
            );
        }
        else {
            const scrollable = this.props.cards.length > 4
            return(
                <View style={styles.scrollable}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEnabled={scrollable} contentInset={{ right: 20 }}>
                        <View>
                            <SummonersCard summoner={this.props.cards[0]} navigation={this.props.navigation} updateSummoner={this.props.updateSummoner} favs={this.props.favs}
                            addFav={this.props.handleAddFav} removeFav={this.props.handleRemoveFav} />
                            {this.props.cards.length >= 2 && 
                            <SummonersCard summoner={this.props.cards[1]} navigation={this.props.navigation} updateSummoner={this.props.updateSummoner} favs={this.props.favs}
                            addFav={this.props.handleAddFav} removeFav={this.props.handleRemoveFav} />}
                        </View>
                        {this.props.cards.length > 2 && 
                        <View>
                            <SummonersCard summoner={this.props.cards[2]} navigation={this.props.navigation} updateSummoner={this.props.updateSummoner} favs={this.props.favs}
                            addFav={this.props.handleAddFav} removeFav={this.props.handleRemoveFav} />
                            {this.props.cards.length >= 4 && 
                            <SummonersCard summoner={this.props.cards[3]} navigation={this.props.navigation} updateSummoner={this.props.updateSummoner} favs={this.props.favs}
                            addFav={this.props.handleAddFav} removeFav={this.props.handleRemoveFav} />}
                        </View>}
                        {this.props.cards.length > 4 && 
                        <View>
                            <SummonersCard summoner={this.props.cards[4]} navigation={this.props.navigation} updateSummoner={this.props.updateSummoner} favs={this.props.favs}
                            addFav={this.props.handleAddFav} removeFav={this.props.handleRemoveFav} />
                            {this.props.cards.length >= 6 && 
                            <SummonersCard summoner={this.props.cards[5]} navigation={this.props.navigation} updateSummoner={this.props.updateSummoner} favs={this.props.favs}
                            addFav={this.props.handleAddFav} removeFav={this.props.handleRemoveFav} />}
                        </View>}
                        {this.props.cards.length > 6 && 
                        <View>
                            <SummonersCard summoner={this.props.cards[6]} navigation={this.props.navigation} updateSummoner={this.props.updateSummoner} favs={this.props.favs}
                            addFav={this.props.handleAddFav} removeFav={this.props.handleRemoveFav} />
                            {this.props.cards.length >= 8 &&
                            <SummonersCard summoner={this.props.cards[7]} navigation={this.props.navigation} updateSummoner={this.props.updateSummoner} favs={this.props.favs}
                            addFav={this.props.handleAddFav} removeFav={this.props.handleRemoveFav}/>}
                        </View>}
                    </ScrollView>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        height: hp('29%'),
        width: wp('96%'),
        top: 0,
        left: wp('2%'),
        backgroundColor: 'transparent',
        borderColor: '#CDD0D3',
        borderWidth: 1.3,
        borderRadius: 20,
        borderStyle: 'dashed',
        justifyContent: 'center'
    },
    scrollable: {
        height: hp('29%'),
        width: wp('98%'),
        top: 0,
        left: wp('2%'),
    } 
})