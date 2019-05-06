import { Dimensions, PixelRatio } from 'react-native'

const widthPercentage = percentage => {
    const screenWidth = Dimensions.get('window').width
    const elemWidth = parseFloat(percentage);
    return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100)
}

const heightPercentage = percentage => {
    const screenHeight = Dimensions.get('window').height
    const elemHeight = parseFloat(percentage)
    return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100)
}

export {
    widthPercentage as wp,
    heightPercentage as hp
}