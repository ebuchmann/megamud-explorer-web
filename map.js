import roomsData from './db/rooms.json' assert { type: 'json' };
import prettier from 'prettier';
import fs from 'fs';

async function formatFile(content, type, name) {
  const contentString = `
    import { ${type} } from '../types'

    export const ${name}: ${type}[] = ${JSON.stringify(content)}
  `;

  return await prettier.format(contentString, { parser: 'babel-ts' });
}

const numberRegex = /([0-9.]+)/g;

// const townGate = roomsData[0];
const townGate = roomsData.find(
  (room) => room['Map Number'] === 1 && room['Room Number'] === 736,
);

const directions = [
  ['N', 0, -1, 0],
  ['W', -1, 0, 0],
  ['NE', 1, -1, 0],
  ['E', 1, 0, 0],
  ['SE', 1, 1, 0],
  ['S', 0, 1, 0],
  ['SW', -1, 1, 0],
  ['NW', -1, -1, 0],
  // ['U', 0, 0, 1],
  // ['D', 0, 0, -1],
];

// These rooms / exits end up teleporting you to another spot in the area, which messes up the mapper
const ancientCryptIgnoreList = [
  [1839, 'N'],
  [1881, 'N'],
  [1883, 'W'],
  [1885, 'E'],
  [1904, 'W'],
  [1906, 'E'],
  [1921, 'S'],
  [1923, 'N'],
  [1928, 'S'],
  [1972, 'N'],
  [1974, 'S'],
  [1989, 'E'],
  [2009, 'W'],
  [2028, 'W'],
  [2031, 'E'],
  [2037, 'W'],
  [2052, 'S'],
  [2087, 'S'],
  [2097, 'N'],
  [2101, 'W'],
  [2104, 'W'],
];

const data = [];

const getLairInfo = (room) => {
  const [count, ...rest] = room.Lair.match(numberRegex);

  return {
    LairMax: Number(count),
    Lair: rest.map(Number),
  };
};

const getNextRoomNumbers = (directionValue) => {
  if (directionValue.startsWith('Action')) {
    console.log('no action yet');
    return [];
  }
  const [mapRoomValue, extra] = directionValue.split(' ');
  const [map, room] = mapRoomValue.match(numberRegex);

  if (extra) {
    if (directionValue.includes('1/296 (Level: 0 to 5)')) {
      // Newhaven overlaps the river
    } else if (
      // Need to add at some point for extra info
      extra === '(Door)' ||
      extra === '(Door' ||
      extra === '(Toll:' ||
      extra === '(Alignment:' ||
      extra === '(Text:' ||
      extra === '(Key:' ||
      extra === '(Hidden/Needs' ||
      extra === '(Hidden/Searchable)'
      // extra === '(Level:'
    ) {
    } else {
      console.log(extra);
      return [];
    }
  }

  return [Number(map), Number(room)];
};

const traverse = (room, x, y, z) => {
  if (room.Visited || room['Map Number'] !== 1) return;

  if (room['Room Number'] === 2149) y = y - 2; // Newhaven, to avoid overlapping river
  const thisRoom = {
    Name: room.Name,
    MapNum: room['Map Number'],
    RoomNum: room['Room Number'],
    x,
    y,
    z,
    // org: room,
  };

  if (room.Shop !== 0) thisRoom.Shop = room.Shop;
  if (room.NPC !== 0) thisRoom.NPC = room.NPC;
  if (room.Lair) {
    const { LairMax, Lair } = getLairInfo(room);
    thisRoom.LairMax = LairMax;
    thisRoom.Lair = Lair;
  }

  room.Visited = true;

  directions.forEach(([dir, nextX, nextY, nextZ]) => {
    if (room[dir] !== '0') {
      const [nextMapNum, nextRoomNum] = getNextRoomNumbers(room[dir]);
      const nextRoom = roomsData.find(
        (rm) =>
          rm['Map Number'] === nextMapNum && rm['Room Number'] === nextRoomNum,
      );
      for (let index in ancientCryptIgnoreList) {
        const [ignoreNum, ignoreDir] = ancientCryptIgnoreList[index];
        if (thisRoom.RoomNum === ignoreNum && dir === ignoreDir) {
          thisRoom[dir] =
            `${nextRoom['Map Number']}/${nextRoom['Room Number']}|WARP`;
          return;
        }
      }
      if (nextRoom) {
        thisRoom[dir] = `${nextRoom['Map Number']}/${nextRoom['Room Number']}`;
        traverse(nextRoom, x + nextX, y + nextY, z + nextZ);
      }
    }
  });

  data.push(thisRoom);
};

// traverse(townGate, 0, 0, 0);

const allMapData = [];
const allMapDataObj = {};

const dirs = ['N', 'E', 'S', 'W', 'NE', 'SE', 'SW', 'NW'];

for (const index in roomsData) {
  const original = roomsData[index];

  if (original['Map Number'] !== 1) continue;

  const item = {
    MapNum: original['Map Number'],
    RoomNum: original['Room Number'],
    Name: original.Name,
  };

  if (original.Lair) {
    const { LairMax, Lair } = getLairInfo(original);
    item.LairMax = LairMax;
    item.Lair = Lair;
  }

  dirs.forEach((dir) => {
    if (original[dir] !== '0') {
      const val = getNextRoomNumbers(original[dir]);
      item[dir] = val.join('/');
    }
  });

  allMapData.push(item);
  allMapDataObj[item.RoomNum] = item;
}

fs.writeFileSync(
  './src/data/rooms.ts',
  await formatFile(allMapData, 'Room', 'roomData'),
);

fs.writeFileSync(
  './src/data/roomsObj.ts',
  await formatFile(allMapDataObj, 'Room', 'roomData'),
);
