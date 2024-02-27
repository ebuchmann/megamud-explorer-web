import { makePersisted } from '@solid-primitives/storage';
import { Character } from '../types';
import { createStore } from 'solid-js/store';
import { createSignal } from 'solid-js';

export const [characters, setCharacters] = makePersisted(
  createStore<Character[]>([]),
  {
    name: 'character-data',
  },
);

export const [selectedCharacter, setSelectedCharacter] = makePersisted(
  createSignal<string>('-1'),
  {
    name: 'selected-character',
  },
);

export const [selectedCharacterData, setSelectedCharacterData] =
  createSignal<Character>();
