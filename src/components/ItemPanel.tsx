import { useParams } from '@solidjs/router';
import { Item } from '../types';
import { createEffect, createSignal } from 'solid-js';
import { itemData } from '../data';
import { Show } from 'solid-js';
import { CurrencyTypes, ItemTypes } from '../utils/data-types';
import { MonsterReference } from './references/MonsterReference';
import { ShopReference } from './references';

export function ItemPanel() {
  const params = useParams();
  const [item, setItem] = createSignal<Item>();

  createEffect(() => {
    const number = Number(params.number);
    if (number) {
      const itm = itemData.find((i: Item) => i.Number === number);
      setItem(itm);
    }
  });

  return (
    <>
      <Show when={item()}>
        <div class="grid grid-cols-[1fr,2fr]">
          <div>Name</div>
          <div>
            {item()?.Name} ({item()?.Number})
          </div>
          <div>Type</div>
          <div>{ItemTypes[item()!.ItemType]}</div>
          <div>Uses</div>
          <div>{item()?.UseCount}</div>
          <div>Base Price</div>
          <div>
            {item()?.Price === 0
              ? 'Free'
              : `${item()?.Price} ${CurrencyTypes[item()!.Currency]}`}
          </div>
          <div>Encum</div>
          <div>{item()?.Encum}</div>
          <Show when={item()?.Magical}>
            <div>Magical</div>
            <div>{item()?.Magical}</div>
          </Show>
          <Show when={item()?.MinLevel}>
            <div>Min Level</div>
            <div>{item()?.MinLevel}</div>
          </Show>
        </div>
        <Show when={item()?.Obtained}>
          <h3 class="my-4">References</h3>
          <div class="grid grid-cols-[1fr,2fr] gap-y-4">
            <Show when={item()?.Obtained?.buy || item()?.Obtained?.nogen}>
              <div>Buy</div>
              <div class="flex flex-col">
                {item()?.Obtained?.buy?.map((buy) => (
                  <ShopReference number={buy} />
                ))}
                {item()?.Obtained?.nogen?.map((buy) => (
                  <div>
                    <ShopReference number={buy} /> (nogen)
                  </div>
                ))}
              </div>
            </Show>
            <Show when={item()?.Obtained?.monster}>
              <div>Monster</div>
              <div>
                {item()?.Obtained?.monster?.map((monster) => {
                  const [number, percent] = monster.split('|');
                  return (
                    <div>
                      <MonsterReference number={Number(number)} /> ({percent}%)
                    </div>
                  );
                })}
              </div>
            </Show>
            <Show when={item()?.Obtained?.sell}>
              <div>Sell</div>
              <div>
                {item()?.Obtained?.sell?.map((sell) => (
                  <ShopReference number={sell} />
                ))}
              </div>
            </Show>
            <Show when={item()?.Obtained?.room}>
              <div>Room</div>
              <div>
                {item()?.Obtained?.room?.map((rm) => {
                  const [map, room] = rm.split('|');
                  return (
                    <div>
                      {map}/{room}
                    </div>
                  );
                })}
              </div>
            </Show>
            <Show when={item()?.Obtained?.text}>
              <div>Text</div>
              <div>
                {item()?.Obtained?.text?.map((txt) => {
                  if (typeof txt === 'string') {
                    const [num, percent] = txt.split('|');
                    return (
                      <div>
                        {num} ({percent}%)
                      </div>
                    );
                  }
                  return <div>{txt}</div>;
                })}
              </div>
            </Show>
          </div>
        </Show>
      </Show>
    </>
  );
}
