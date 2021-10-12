import * as React from 'react';
import {Image, ScrollView, StyleSheet} from 'react-native';
import {Text, View} from '../components/Themed';
import {Character, RootStackScreenProps} from '../types';

export default function CharacterInfoScreen({route}: RootStackScreenProps<'CharacterInfo'>) {
    const character = route.params.character;


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.title}>
                        {character.name}
                    </Text>
                    <Text style={{color: 'grey'}}>
                        ID: {character.id}
                    </Text>
                </View>
                <Image
                    source={{uri: character.thumbnail.path + "/standard_fantastic." + character.thumbnail.extension}}
                    style={{width: 250, height: 250}}
                />
                <View style={styles.collections}>
                    {getCollectionView(character, 'comics')}
                    {getCollectionView(character, 'series')}
                    {getCollectionView(character, 'stories')}
                    {getCollectionView(character, 'events')}
                </View>
                <Text style={styles.description}>
                    {character.description}
                </Text>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
                <Text style={{color: 'grey'}}>
                    {JSON.stringify(character, null, 4)}
                </Text>
            </View>
        </ScrollView>
    );
}

function getCollectionView(character: Character, type: 'comics' | 'series' | 'stories' | 'events') {
    return <View style={styles.collection}>
        <Text>
            {type[0].toUpperCase() + type.substring(1)}
        </Text>
        <Text>
            {character[type].available}
        </Text>
    </View>;
}

const styles = StyleSheet.create({
    collection: {
        alignItems: "center",
        marginHorizontal: 10
    },
    collections: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 30,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    description: {
        marginHorizontal: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
