import fromPairs from 'lodash.frompairs'
import React, { useState, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import { getTopRestaurants } from '../utils/actions'
import Loading from '../components/Loading'
import ListTopRestaurants from '../components/ranking/ListTopRestaurants'

export default function TopRestaurants({ navigation }) {
    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(false)

    console.log(restaurants)

    useFocusEffect(
        useCallback(() => {
            async function getData() {
                setLoading(true)
                const response = await getTopRestaurants(10)
                if (response.statusResponse) {
                    setRestaurants(response.restaurants)
                }
                setLoading(false)
            }
            getData()
        }, []
        )
    )

    return (
        <View>
            <ListTopRestaurants
                restaurants={restaurants}
                navigation={navigation}
            />
            <Loading isVisible={loading} text="Por favor espere..." />
        </View>
    )
}

const styles = StyleSheet.create({})
