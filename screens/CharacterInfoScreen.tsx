import * as React from 'react';
import {Image, ScrollView, StyleSheet} from 'react-native';
import {Text, View} from '../components/Themed';
import {RootStackScreenProps} from '../types';

export default function CharacterInfoScreen({route}: RootStackScreenProps<'CharacterInfo'>) {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>
                    {route.params.character.name}
                </Text>
                <Image
                    source={{uri: route.params.character.thumbnail.path + "/standard_fantastic." + route.params.character.thumbnail.extension}}
                    style={{width: 250, height: 250}}
                />
                <Text>
                    {route.params.character.description}
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
