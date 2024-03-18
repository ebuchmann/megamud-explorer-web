import { A } from '@solidjs/router';
import { createEffect, createSignal } from 'solid-js';
import { Room } from '../../types';
import { getRoom } from '../../utils/rooms';

type RoomReferenceProps = {
  number: string;
};

export function RoomReference(props: RoomReferenceProps) {
  const [room, setRoom] = createSignal<Room>();

  createEffect(() => {
    const foundRoom = getRoom(props.number);

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
