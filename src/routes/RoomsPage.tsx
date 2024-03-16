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
        <div class="flex flex-col gap-4 h-[100%]">
          <input
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={drawDistance()}
            onInput={debounce((e) => {
              e.stopPropagation();
              setDrawDistance(e.target.value);
            }, 500)}
            type="number"
            placeholder="Draw distance"
          />
          <label
            for="floating_standard"
            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Draw Distance
          </label>
          <MapArea drawDistance={drawDistance} />
        </div>
      </MainPanel>
      <SidePanel>
        <RoomPanel />
      </SidePanel>
    </div>
  );
}
