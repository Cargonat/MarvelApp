import React from 'react';
import {Character, RootTabScreenProps} from '../types';
import {Text, View} from './Themed';
import {Image, Pressable, StyleSheet} from 'react-native';

interface Props {
    character: Character;
    navigation: RootTabScreenProps<'Characters'>
}

export default function CharacterItem({character, navigation}: Props) {
    return (
        <Pressable
            onPress={() => navigation.navigation.navigate('CharacterInfo', {character})}
            style={({pressed}) => ({opacity: pressed ? 0.5 : 1,})}>
            <View style={styles.itemContainer}>
                <Image
                    source={{uri: character.thumbnail.path+"/portrait_small." + character.thumbnail.extension}}
                    style={{width: 50, height: 75}}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>
                        {character.name}
                    </Text>
                    <Text style={styles.description}>
                        {character.description}
                    </Text>
                </View>
            </View>
        </Pressable>);
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 5,
    },
    name: {
        fontSize: 20,
    },
    description: {
        color: 'grey'
    }
});