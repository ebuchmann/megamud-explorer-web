import { MainPanel } from '../components/layout/MainPanel';
import { SidePanel } from '../components/layout/SidePanel';
import { RoomPanel } from '../components/rooms/RoomPanel';
import { MapArea } from '../components/mapping/MapArea';
import { createSignal } from 'solid-js';
import { makePersisted } from '@solid-primitives/storage';
import { debounce } from '@solid-primitives/scheduled';

export function RoomsPage() {
  const [drawDistance, setDrawDistance] = makePersisted(
    createSignal<string>('10'),
    { name: 'map-draw-distance' },
  );

  return (
    <div class="flex gap-4 h-[100%]">
      <MainPanel>
        <div class="flex flex-col gap-4">
          <input
            class="p-2 w-32"
            value={drawDistance()}
            onInput={debounce((e) => setDrawDistance(e.target.value), 500)}
            type="number"
            placeholder="Draw distance"
          />
          <MapArea drawDistance={drawDistance} />
        </div>
      </MainPanel>
      <SidePanel>
        <RoomPanel />
      </SidePanel>
    </div>
  );
}
