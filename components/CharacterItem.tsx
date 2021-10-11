import React from 'react';
import {Character} from "../types";
import {Text, View} from "./Themed";
import {Image, StyleSheet} from "react-native";

export default function CharacterItem({character}: {character: Character}) {
    return (<View style={styles.itemContainer}>
        <Image
            source={{uri: character.thumbnail.path}}
            style={{ width: 60, height: 60 }}
        />
        <View style={styles.textContainer}>
            <Text style={styles.name}>
                {character.name}
            </Text>
            <Text style={styles.description}>
                {character.description}
            </Text>
        </View>
    </View>);
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: "row",
        padding: 5,
    },
    textContainer: {
        flex: 1,
        flexDirection: "column",
        paddingHorizontal: 5,
    },
    name: {
        fontSize: 20,
    },
    description: {
        color: "grey"
    }
});