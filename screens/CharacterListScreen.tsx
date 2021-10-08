import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {View} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import CharacterItem from "../components/CharacterItem";

export default function CharacterListScreen({navigation}: RootTabScreenProps<'Characters'>) {
    return (
        <ScrollView>
            <View style={styles.container}>
              {[...Array(15)].map(_ =>
                <CharacterItem name="Iron Man"
                               imageUrl="https://static.wikia.nocookie.net/marvelcinematicuniverse/images/3/35/IronMan-EndgameProfile.jpg/revision/latest/scale-to-width-down/699?cb=20190423175213"/>
              )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
