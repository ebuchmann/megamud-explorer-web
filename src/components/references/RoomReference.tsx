import { A } from '@solidjs/router';
import { roomData } from '../../data';
import { createEffect, createSignal } from 'solid-js';
import { Room } from '../../types';

type RoomReferenceProps = {
  number: string;
};

export function RoomReference(props: RoomReferenceProps) {
  const [room, setRoom] = createSignal<Room>();

  createEffect(() => {
    const [mapNum, roomNum] = props.number.split('/');
    const foundRoom = roomData.find(
      (rm) => rm.MapNum === Number(mapNum) && rm.RoomNum === Number(roomNum),
    );

    setRoom(foundRoom);
  });

  return (
    <A
      class="decoration-dotted underline underline-offset-2 hover:text-sky-300"
      href={`/rooms/${room()?.MapNum}/${room()?.RoomNum}`}
    >
      {room()?.Name}
    </A>
  );
}
