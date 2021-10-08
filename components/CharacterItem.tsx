import React from 'react';
import {Character} from "../types";
import {Text, View} from "./Themed";
import {Image} from "react-native";

export default function CharacterItem({name, imageUrl}: {name: string, imageUrl: string}) {
    return (<View>
        <Image
            source={{uri: imageUrl}}
            style={{ width: 40, height: 40 }}
        />
        <Text>
            {name}
        </Text>
    </View>);
};
