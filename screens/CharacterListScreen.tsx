import * as React from 'react';
import {NativeScrollEvent, ScrollView, StyleSheet} from 'react-native';
import {View} from '../components/Themed';
import {Character, RootTabScreenProps} from '../types';
import CharacterItem from "../components/CharacterItem";
import MD5 from "crypto-js/md5";
import debounce from "lodash/debounce";
import {privateKey, publicKey} from '../apiconfig.json';
import SearchBar from 'react-native-dynamic-search-bar';
import * as FileSystem from 'expo-file-system';

export default function CharacterListScreen(navigation: RootTabScreenProps<'Characters'>) {
    let [characters, setCharacters] = React.useState<Character[]>([]);
    let [currentSearchPrefix, setCurrentSearchPrefix] = React.useState<string>('');
    const cacheUri = FileSystem.cacheDirectory + "characters.json";

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
            nameStartsWith: nameStartsWith,
            limit: 100
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
                    let newCharacters: Character[];
                    if (clearCharacters) {
                        newCharacters = body.data.results;
                        setCurrentSearchPrefix(nameStartsWith);
                    } else {
                        const responseCharacters: Character[] = body.data.results;
                        const currentCharacterIds: number[] = characters.map(c => c.id);
                        const addedCharacters: Character[] = responseCharacters.filter(c => !(c.id in currentCharacterIds))
                        newCharacters = characters.concat(addedCharacters);
                    }
                    setCharacters(newCharacters);
                    if (nameStartsWith === '')
                        persistCharacters(newCharacters);
                });
            } else {
                r.json().then(body => alert(JSON.stringify(body)));
            }
        })
    }, 500, {leading: true});

    const persistCharacters = async (charactersToCache: Character[]) => {
        await FileSystem.writeAsStringAsync(cacheUri, JSON.stringify(charactersToCache));
    }

    const initializeCharacters = async () => {
        const characterJson = await FileSystem.readAsStringAsync(cacheUri);
        if (characterJson !== '') {
            const charactersFromCache: Character[] = JSON.parse(characterJson);
            setCharacters(charactersFromCache);
        } else {
            fetchCharacters('');
        }
    }

    React.useEffect(() => {
        initializeCharacters().then();
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
    const paddingToBottom = 1000;
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
