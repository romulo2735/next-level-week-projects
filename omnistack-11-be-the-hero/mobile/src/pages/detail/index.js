import React from 'react';
import {Image, Linking, Text, TouchableOpacity, View} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import styles from "./styles";
import logo from "../../assets/logo.png";

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const value = Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL'}).format(incident.value);
    const message = `Olá ${incident.name}, estou entrando em contato com o caso ${incident.title} com o valor: ${value}`;

    function navigateBack() {
        navigation.goBack();
    }

    function sendEmail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        });
    }

    function sendWhastapp() {
        Linking.openURL(`https://api.whatsapp.com/send?phone=5585987517074&text=${message}`);
        // Linking.openURL(`https://api.whatsapp.com/send?phone=${incident.whatsapp}text=${message}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo}/>
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e82041"/>
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.indentProperty, {marginTop: 0}]}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.UF}</Text>

                <Text style={styles.indentProperty}>CASO: </Text>
                <Text style={styles.incidentValue}>{incident.description}</Text>

                <Text style={styles.indentProperty}>VALOR: </Text>
                <Text style={styles.incidentValue}>
                    {
                        Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(incident.value)
                    }
                </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions} onPress={() => {
                }}>
                    <TouchableOpacity style={styles.action} onPress={sendWhastapp}>
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendEmail}>
                        <Text style={styles.actionText}>E-Mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
