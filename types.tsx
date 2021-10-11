/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  GeneralInfo: undefined;
  CharacterInfo: {
    character: Character;
  };
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Characters: undefined;
  TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export interface Character {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics: Collection<Comic>;
  series: Collection<Series>;
  stories: Collection<Story>;
  events: Collection<Event>;
  urls: Link[];
}

export interface Thumbnail {
  path: string;
  extension: string
}

export interface Collection<R extends NamedResource> {
  available: number;
  collectionURI: string;
  items: R[];
  returned: number;
}
export interface Comic extends NamedResource {}
export interface Series extends NamedResource {}
export interface Event extends NamedResource {}
export interface Story extends NamedResource {
  type: string
}

export interface Link {
  type: string;
  url: string;
}

interface NamedResource {
  name: string;
  resourceURI: string;
}