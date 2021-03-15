import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { isEmpty, size } from 'lodash'

import { reauthenticate, updatePassword } from '../../utils/actions'

export default function ChangePasswordForm({ setShowModal, toastRef }) {
    const [newPassword, setNewPassword] = useState(null)
    const [curretPassword, setCurrentPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [errorNewPassword, setErrorNewPassword] = useState(null)
    const [errorCurretPassword, setErrorCurretPassword] = useState(null)
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)


    const onSubmit = async () => {
        if (!validateForm()) {
            return
        }

        setLoading(true)
        const resultReauthenticate = await reauthenticate(curretPassword)
        if (!resultReauthenticate.statusResponse) {
            setLoading(false)
            setErrorCurretPassword("Contraseña incorrecta.")
            return
        }

        const resultUpdatePassword = await updatePassword(newPassword)
        setLoading(false)

        if (!resultUpdatePassword.statusResponse) {
            setErrorNewPassword("Hubo un problema cambiando la contraseña, por favor intente mas tarde.")
            return
        }

        toastRef.current.show("Se ha actualizado la contraseña.", 3000)
        setShowModal(false)
    }

    const validateForm = () => {
        setErrorNewPassword(null)
        setErrorCurretPassword(null)
        setErrorConfirmPassword(null)

        let isValid = true

        if (isEmpty(curretPassword)) {
            setErrorCurretPassword("Debes tu contraseña actual.")
            isValid = false
        }
        if (size(newPassword) < 6) {
            setErrorNewPassword("Debes ingresar una nueva contraseña de al menos 6 caracteres.")
            isValid = false
        }
        if (size(confirmPassword) < 6) {
            setErrorConfirmPassword("Debes ingresar una confirmación de tu contraseña de al menos 6 caracteres.")
            isValid = false
        }

        if (newPassword !== confirmPassword) {
            setErrorNewPassword("La nueva contraseña y la confirmación no coinciden.")
            setErrorConfirmPassword("La nueva contraseña y la confirmación no coinciden.")
            isValid = false
        }

        if (newPassword === curretPassword) {
            setErrorNewPassword("Debes ingresar una contraseña diferente a la actual.")
            setErrorCurretPassword("Debes ingresar una contraseña diferente a la actual.")
            setErrorConfirmPassword("Debes ingresar una contraseña diferente a la actual.")
            isValid = false
        }


        return isValid
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingresa tu contraseña actual..."
                containerStyle={styles.input}
                defaultValue={setCurrentPassword}
                onChange={(e) => setCurrentPassword(e.nativeEvent.text)}
                errorMessage={errorCurretPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={{ color: "#c2c2c2" }}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Input
                placeholder="Ingresa tu nueva contraseña..."
                containerStyle={styles.input}
                defaultValue={newPassword}
                onChange={(e) => setNewPassword(e.nativeEvent.text)}
                errorMessage={errorNewPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={{ color: "#c2c2c2" }}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Input
                placeholder="Ingresa tu confirmación de nueva contraseña..."
                containerStyle={styles.input}
                defaultValue={confirmPassword}
                onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
                errorMessage={errorConfirmPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={{ color: "#c2c2c2" }}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Button
                title="Cambiar contraseña"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingVertical: 10
    },
    input: {
        marginBottom: 10,
    },
    btnContainer: {
        width: "95%"
    },
    btn: {
        backgroundColor: "#df0024"
    }
})
