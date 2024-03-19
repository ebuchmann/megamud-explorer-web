import { Room } from '../types';
import rooms1 from '../data/rooms/1';
import rooms2 from '../data/rooms/2';
import rooms3 from '../data/rooms/3';
import rooms4 from '../data/rooms/4';
import rooms5 from '../data/rooms/5';
import rooms6 from '../data/rooms/6';
import rooms7 from '../data/rooms/7';
import rooms8 from '../data/rooms/8';
import rooms9 from '../data/rooms/9';
import rooms10 from '../data/rooms/10';
import rooms11 from '../data/rooms/11';
import rooms12 from '../data/rooms/12';
import rooms13 from '../data/rooms/13';
import rooms14 from '../data/rooms/14';
import rooms15 from '../data/rooms/15';
import rooms16 from '../data/rooms/16';
import rooms17 from '../data/rooms/17';

const allRooms: Record<string, Room[]> = {
  '1': rooms1,
  '2': rooms2,
  '3': rooms3,
  '4': rooms4,
  '5': rooms5,
  '6': rooms6,
  '7': rooms7,
  '8': rooms8,
  '9': rooms9,
  '10': rooms10,
  '11': rooms11,
  '12': rooms12,
  '13': rooms13,
  '14': rooms14,
  '15': rooms15,
  '16': rooms16,
  '17': rooms17,
};

export function cleanRoomNum(number: string): string {
  return number.split('|')[0];
}

export function getRoom(number: string): Room {
  console.log(number);
  const [mapNum, roomNum] = number.split('|')[0].split('/');

  return allRooms[mapNum].find((room) => room.RoomNum === Number(roomNum))!;
}
