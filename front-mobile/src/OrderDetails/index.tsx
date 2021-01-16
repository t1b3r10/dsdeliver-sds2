import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Alert } from 'react-native';
import Header from '../Header';
import { Order } from '../types';
import OrderCard from '../OrderCard';
import { RectButton } from 'react-native-gesture-handler';
import { confirmDelivery } from '../api';

type Props = {
    route: {
        params: {
            order: Order;
        }
    }
}

function OrderDetails({ route }: Props) {

    const { order } = route.params;
    const navigation = useNavigation();

    const handleOnPress = () => {
        navigation.navigate('Orders');
    }

    const handleOnCancel = () => {
        navigation.navigate('Orders');
    }

    const handleOnConfirmDelivery = () => {
        confirmDelivery(order.id)
            .then(() => {
                Alert.alert(`Pedido ${order.id} confirmado com sucesso!`)
                navigation.navigate('Orders');
            })
            .catch(() => {
                Alert.alert(`Houve um erro ao tentar confirmar o pedido ${order.id}!`)
            })
        navigation.navigate('Orders');
    }


    return (
        <>
            <Header />
            <View style={styles.container}>
                <OrderCard order={order} />

                <RectButton style={styles.button} onPress={handleOnPress}>
                    <Text style={styles.buttonText}>
                        INICIAR NAVEGACAO
                    </Text>
                </RectButton>
                <RectButton style={styles.button} onPress={handleOnConfirmDelivery}>
                    <Text style={styles.buttonText}>
                        CONFIRMAR ENTREGA
                    </Text>
                </RectButton>
                <RectButton style={styles.button} onPress={handleOnCancel}>
                    <Text style={styles.buttonText}>
                        CANCELAR
                    </Text>
                </RectButton>

            </View>
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        paddingRight: '5%',
        paddingLeft: '5%'
    },
    button: {
        backgroundColor: '#DA5C5C',
        flexDirection: 'row',
        borderRadius: 10,
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 50,
        paddingRight: 50,
        fontWeight: 'bold',
        fontSize: 18,
        color: '#FFF',
        letterSpacing: -0.24,
        fontFamily: 'OpenSans_700Bold'
    }
});

export default OrderDetails;