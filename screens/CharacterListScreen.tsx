import * as React from 'react';
import {Dimensions, NativeScrollEvent, ScrollView, StyleSheet} from 'react-native';
import {View} from '../components/Themed';
import {Character, RootTabScreenProps} from '../types';
import CharacterItem from "../components/CharacterItem";
import MD5 from "crypto-js/md5";
import debounce from "lodash/debounce";
import {privateKey, publicKey} from '../apiconfig.json';
import SearchBar from 'react-native-dynamic-search-bar';

export default function CharacterListScreen(navigation: RootTabScreenProps<'Characters'>) {
    let [characters, setCharacters] = React.useState<Character[]>([]);
    let [currentSearchPrefix, setCurrentSearchPrefix] = React.useState<string>('');

    let fetchCharacters = debounce(async (nameStartsWith: string) => {
        const clearCharacters = nameStartsWith !== currentSearchPrefix;

        const ts = Date.now();
        const hash = MD5(ts + privateKey + publicKey).toString();
        const url = 'http://gateway.marvel.com/v1/public/characters';
        const params = {
            ts: ts,
            apikey: publicKey,
            hash: hash,
            offset: clearCharacters ? 0 : characters.length,
            nameStartsWith: nameStartsWith
        }
        const urlWithParams = url + '?' +
            Object.entries(params)
                .filter(e => e[1])
                .map(e => e[0] + "=" + e[1])
                .join('&');

        await fetch(urlWithParams, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(r => {
            if (r.status == 200) {
                r.json().then(body => {
                    if (clearCharacters) {
                        setCharacters(body.data.results);
                        setCurrentSearchPrefix(nameStartsWith);
                    } else {
                        const responseCharacters: Character[] = body.data.results;
                        const currentCharacterIds: number[] = characters.map(c => c.id);
                        const addedCharacters: Character[] = responseCharacters.filter(c => !(c.id in currentCharacterIds))
                        setCharacters(characters.concat(addedCharacters));
                    }
                });
            } else {
                r.json().then(body => alert(JSON.stringify(body)));
            }
        })
    }, 500, {leading: true});

    React.useEffect(() => {
        fetchCharacters('');
    }, []);

    return (
        <View>
            <SearchBar
                style={styles.search}
                placeholder='Search' onChangeText={(search) => fetchCharacters(search)}
                onClearPress={() => fetchCharacters('')}/>
            <ScrollView
                scrollEventThrottle={500}
                onScroll={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) fetchCharacters(currentSearchPrefix);
                }}>
                <View style={styles.container}>
                    {characters.map(character =>
                        <View key={character.id}>
                            <CharacterItem character={character} navigation={navigation}/>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}: NativeScrollEvent) => {
    const paddingToBottom = Dimensions.get("screen").height;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    search: {
        marginVertical: 5
    }
});
