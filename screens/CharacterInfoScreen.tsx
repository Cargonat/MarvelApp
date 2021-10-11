import * as React from 'react';
import {Image, ScrollView, StyleSheet} from 'react-native';
import {Text, View} from '../components/Themed';
import {RootStackScreenProps} from '../types';

export default function CharacterInfoScreen({route}: RootStackScreenProps<'CharacterInfo'>) {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text>
                    {route.params.character.name}
                </Text>
                <Image
                    source={{uri: route.params.character.thumbnail.path}}
                    style={{width: 60, height: 60}}
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
        justifyContent: 'center',
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
