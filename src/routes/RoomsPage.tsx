import { MainPanel } from '../components/layout/MainPanel';
import { SidePanel } from '../components/layout/SidePanel';
import { RoomPanel } from '../components/rooms/RoomPanel';
import { MapArea } from '../components/mapping/MapArea';
import { createSignal } from 'solid-js';
import { makePersisted } from '@solid-primitives/storage';
import { debounce } from '@solid-primitives/scheduled';
import { TextInput } from '../components/TextInput';
import { useNavigate } from '@solidjs/router';
import { setStopAtMap, stopAtMap } from '../state/map-options';

export function RoomsPage() {
  const navigate = useNavigate();
  const [mapNum, setMapNum] = createSignal<string>();
  const [roomNum, setRoomNum] = createSignal<string>();
  const [drawDistance, setDrawDistance] = makePersisted(
    createSignal<string>('10'),
    { name: 'map-draw-distance' },
  );

  return (
    <div class="flex gap-4 h-[100%]">
      <MainPanel>
        <div class="flex flex-col gap-4 h-[100%]">
          <div class="flex justify-between">
            <TextInput
              class="w-32"
              label="Draw Distance"
              value={drawDistance}
              debounce={500}
              onInput={(e) => setDrawDistance(e.target.value)}
            />
            <label>
              <input
                type="checkbox"
                checked={stopAtMap() === 'true'}
                onChange={(e) => setStopAtMap(String(e.target.checked))}
              />{' '}
              Stop at map #
            </label>
            <form
              onsubmit={(e) => {
                e.preventDefault();
                navigate(`${mapNum()}/${roomNum()}`);
              }}
              class="flex flex-row gap-4"
            >
              <TextInput
                class="w-12"
                label="Map #"
                value={mapNum}
                onInput={(e) => setMapNum(e.target.value)}
              />
              <TextInput
                class="w-16"
                label="Room #"
                value={roomNum}
                onInput={(e) => setRoomNum(e.target.value)}
              />
              <button type="submit">Goto</button>
            </form>
          </div>
          <MapArea drawDistance={drawDistance} />
        </div>
      </MainPanel>
      <SidePanel>
        <RoomPanel />
      </SidePanel>
    </div>
  );
}
