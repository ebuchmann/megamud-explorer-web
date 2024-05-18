import roomsData from './db/rooms.json' assert { type: 'json' };
import prettier from 'prettier';
import fs from 'fs';

async function formatFile(content, type, name) {
  const contentString = `
    import { ${type} } from '../../types'

    const ${name}: ${type}[] = ${JSON.stringify(content)}

    export default ${name}
  `;

  return await prettier.format(contentString, { parser: 'babel-ts' });
}

const numberRegex = /([0-9.]+)/g;

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
    // console.log('no action yet');
    return [];
  }
  const [mapRoomValue, extra] = directionValue.split(' ');
  const [map, room] = mapRoomValue.match(numberRegex);

  const returnValue = [Number(map), Number(room)];

  if (extra) {
    switch (extra) {
      case '(Door)': {
        returnValue.push('Door');
        break;
      }
      case '(Key:': {
        const numbers = directionValue.match(/(\d+)/g);
        returnValue.push(`Key: ${numbers[2]}`);
        if (
          directionValue.includes('picklocks') ||
          directionValue.includes('strength')
        ) {
          const types = [];
          if (directionValue.includes('picklocks')) types.push('Picklocks');
          if (directionValue.includes('strength')) types.push('Strength');
          returnValue.push(`${numbers[3] || 'any'} ${types.join('/')}`);
        }
        break;
      }
      case '(Door': {
        const numbers = directionValue.match(/(\d+)/g);
        let doorValue = 'Door';
        if (
          directionValue.includes('picklocks') ||
          directionValue.includes('strength')
        ) {
          const types = [];
          if (directionValue.includes('picklocks')) types.push('Picklocks');
          if (directionValue.includes('strength')) types.push('Strength');
          doorValue += ` (${numbers[2] || 'any'} ${types.join('/')})`;
        }
        returnValue.push(doorValue);
        break;
      }
      case '(Hidden/Searchable)': {
        returnValue.push('Hidden/Searchable');
        break;
      }
      case '(Hidden/Passable)': {
        returnValue.push('Hidden/Passable');
        break;
      }
      case '(Toll:': {
        returnValue.push(`Toll: ${directionValue.match(/(\d+)/g)[2]} gold`);
        break;
      }
      case '(Text:':
      case '(Timed:':
      case '(Level:':
      case '(Alignment:': {
        const stuff = directionValue
          .match(/\(([^\)]+)\)/gm)[0]
          .replace('(', '')
          .replace(')', '');
        returnValue.push(stuff);
        break;
      }
      case '(Trap,': {
        returnValue.push(`Trap: ${directionValue.match(/(\d+)/g)[2]} damage`);
        break;
      }
      case '(Spell': {
        returnValue.push(`Trap: ${directionValue.match(/(\d+)/g)[2]} spell`);
        break;
      }
      case '(Cast:': {
        const [, , pre, post] = directionValue.match(/(\d+)/g);
        returnValue.push(`Cast: ${pre}|${post}`);
        break;
      }
      case '(Hidden/Needs': {
        break;
      }
    }
  }

  return returnValue;
};

const allMapData = {};

const dirs = ['N', 'E', 'S', 'W', 'NE', 'SE', 'SW', 'NW', 'U', 'D'];

for (const index in roomsData) {
  const original = roomsData[index];

  // if (original['Map Number'] !== 1) continue;

  const item = {
    MapNum: original['Map Number'],
    RoomNum: original['Room Number'],
    Name: original.Name,
    Light: original.Light,
  };

  if (original.Shop !== 0) item.Shop = original.Shop;
  if (original.Spell !== 0) item.Spell = original.Spell;
  if (original.NPC !== 0) item.NPC = original.NPC;

  if (original.Lair) {
    const { LairMax, Lair } = getLairInfo(original);
    item.LairMax = LairMax;
    item.Lair = Lair;
  }

  dirs.forEach((dir) => {
    if (original[dir] !== '0') {
      const [mapNum, roomNum, ...extra] = getNextRoomNumbers(original[dir]);
      let directionValue = `${mapNum}/${roomNum}`;
      if (mapNum === undefined) return;
      if (extra.length > 0) {
        item[dir] = [directionValue, ...extra];
      } else {
        item[dir] = directionValue;
      }
    }
  });

  if (!allMapData[item.MapNum]) allMapData[item.MapNum] = [];

  allMapData[item.MapNum].push(item);
}

// Apply fixes for warp rooms (ancient crypt)
ancientCryptIgnoreList.forEach(([roomNum, direction]) => {
  const room = allMapData['1'].find((rm) => rm.RoomNum === roomNum);

  room[direction] = `${room[direction]}|warp`;
});

Object.keys(allMapData).forEach(async (mapNum) => {
  fs.writeFileSync(
    `./src/data/rooms/${mapNum}.ts`,
    await formatFile(allMapData[mapNum], 'Room', 'roomData'),
  );
});
