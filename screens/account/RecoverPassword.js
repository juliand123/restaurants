import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import Loading from '../../components/Loading'
import { validateEmail } from '../../utils/helpers'

export default function RecoverPassword({ navigation }) {

    const [email, setEmail] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [loading, setLoading] = useState(false)

    const onSubmit = () => {
        if (!validateData()) {
            return
        }
      
    }

    const validateData = () => {
        setErrorEmail(null)
        let valid = true

        if (!validateEmail(email)) {
            setErrorEmail("Debes ingresar un email válido.")
            valid = false

        }
        return valid
    }

    return (
        <View style={styles.formContainer}>
            <Input
                placeholder="Ingresa tu email..."
                containerStyle={styles.inputForm}
                onChange={(e) => setEmail(e.nativeEvent.text)}
                defaultValue={email}
                errorMessage={errorEmail}
                keyboardType="email-address"
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.icon}
                    />
                }
            />
            <Button
                title="Recuperar Contraseña"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnRecover}
                onPress={onSubmit}
            />
            <Loading isVisible={loading} text="Recuperando contraseña..." />
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    inputForm:{
        width: "90%"
    },
    btnContainer:{
        marginTop: 20,
        width: "85%",
        alignSelf: "center"
    },
    btnRecover:{
        backgroundColor: "#df0024"
    },
    icon:{
        color:"#c1c1c1"
    }
})
