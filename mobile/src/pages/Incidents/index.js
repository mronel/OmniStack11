import React, {useState, useEffect} from 'react';
import { Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents(){

    const navigation = useNavigation();
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);

    //Carregamento ao scrollar a tela
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    function navigateToDetail(incident){
        navigation.navigate('Details', { incident });
    }

    async function loadIncidents(){

        //Tratamento para carregamento ao scrollar a tela

        //Verifica se o loading esta como true
        //Não permitindo realizar várias chamadas ao ficar scrollando
        if(loading){
            return;
        }

        //Verifica o total de casos
        // e analisar se o total de incidentes é igual ao total
        // não irá buscar mais informações
        if(total > 0 && incidents.length == total){
            return;
        }

        // Confirmação para que execute a chamada de dados
        setLoading(true);

        //params: passando o número da página
        const response = await api.get('incidents', { 
            params: {page}
        });        
        
        //anexando os dois vetores para que os dados sejam concatenados e exibam os adicionais 
        //com os já carregados ao scrollar a tela
        setIncidents([... incidents, ... response.data]);
        
        //pegando o total do header do response
        setTotal(response.headers['x-total-count']);

        //setando a página carregada
        setPage(page+1);
        
        //finalizando a busca de dados
        setLoading(false);
    }

    //carregando os dados dos incidentes obtidos na api
    useEffect(() => {
            loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}> {total} casos </Text>.
                </Text>
            </View>

                <Text style={styles.title}> Bem vindo!</Text>
                <Text style={styles.description}> Escolha um dos casos abaixo e salve o dia.</Text>        

            <FlatList 
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents} 
                onEndReachedThreshold={0.2} 
                renderItem={({item: incident}) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}> ONG: </Text>
                        <Text style={styles.incidentValue}> {incident.name} </Text>

                        <Text style={styles.incidentProperty}> CASO: </Text>
                        <Text style={styles.incidentValue}> {incident.title} </Text>

                        <Text style={styles.incidentProperty}> Valor: </Text>
                       <Text style={styles.incidentValue}> {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)} </Text>

                        <TouchableOpacity style={styles.detailButton} onPress={() => navigateToDetail(incident)}>
                            <Text style={styles.detailsButtonText}> Ver mais Detalhes </Text>
                            <Feather name='arrow-right' size={16} color='#E02041'/>
                        </TouchableOpacity>
                    </View>  
                )}
            />
        </View>
    );

}