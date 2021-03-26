import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { Image } from 'react-native-elements'
import Carousel from 'react-native-snap-carousel'

export default function CarouselIImages({ images, height, width }) {
    const renderItem = ({ item }) => {
        return (
            <Image
                style={{ width, height }}
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                source={{ uri: item }}
            />
        )
    }
    return (
        <View>
            <Carousel
                layout={"default"}
                data={images}
                sliderWidth={width}
                itemWidth={width}
                itemHeight={height}
                renderItem={renderItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({})
