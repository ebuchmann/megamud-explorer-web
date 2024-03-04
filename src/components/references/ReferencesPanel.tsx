import { Accessor, Show } from 'solid-js';
import { Item, Weapon } from '../../types';
import { ShopReference } from './ShopReference';
import { MonsterReference } from './MonsterReference';
import { ItemReference } from './ItemReference';

type ReferencesPanelProps = {
  item: Accessor<Weapon | Item | undefined>;
};

export function ReferencesPanel({ item }: ReferencesPanelProps) {
  return (
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
        <Show when={item()?.Obtained?.item}>
          <div>Item</div>
          <div>
            {item()?.Obtained?.item?.map((itm) => {
              const [num, percent] = itm.split('|');
              return (
                <div>
                  <ItemReference number={Number(num)} /> ({percent}%)
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
  );
}
