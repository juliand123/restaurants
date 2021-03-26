import React, { useState, useEffect } from 'react'
import { ScrollView, Alert, Dimensions, StyleSheet, Text, View } from 'react-native'

import { getDocumentById } from '../../utils/actions'
import CarouselIImages from '../CarouselIImages'
import Loading from '../Loading'

const widthScreen = Dimensions.get("window").width

export default function Restaurant({ navigation, route }) {
    const { id, name } = route.params
    const [restaurant, setRestaurant] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0)

    navigation.setOptions({ title: name })
    useEffect(() => {
        (async () => {
            const response = await getDocumentById("restaurants", id)
            if (response.statusResponse) {
                setRestaurant(response.document)
            }
            else {
                setRestaurant({})
                Alert.alert("Ocurrión un problema cargando el restaurante, intente mas tarde.")
            }
        })()
    }, [])

    if (!restaurant) {
        return <Loading isVisible={true} text="Cargando..." />
    }

    return (
        <ScrollView style={styles.viewBody}>
            <CarouselIImages 
            images={restaurant.images}
            height={250}
            width={widthScreen}
            activeSlide={activeSlide}
            setActiveSlide={setActiveSlide}
            />
            <Text>{restaurant.description}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
viewBody: {
    flex: 1
}

})
