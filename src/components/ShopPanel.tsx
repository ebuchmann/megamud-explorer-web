import { useParams } from '@solidjs/router';
import { Shop } from '../types';
import { For, createEffect, createSignal } from 'solid-js';
import { shopData } from '../data';
import { Show } from 'solid-js';
import { ShopTypes } from '../utils/data-types';
import { UnknownReference } from './references';

export function ShopPanel() {
  const params = useParams();
  const [shop, setShop] = createSignal<Shop>();

  createEffect(() => {
    const number = Number(params.number);
    if (number) {
      const shp = shopData.find((s) => s.Number === number);
      setShop(shp);
    }
  });

  return (
    <>
      <Show when={shop()}>
        <div class="grid grid-cols-[1fr,2fr]">
          <div>Name</div>
          <div>
            {shop()?.Name} ({shop()?.Number})
          </div>
          <div>Type</div>
          <div>{ShopTypes[shop()!.ShopType]}</div>
          <div>Level</div>
          <div>
            {shop()?.MinLVL} - {shop()?.MaxLVL}
          </div>
          <div>Markup</div>
          <div>{shop()?.['Markup%']}%</div>
        </div>
        <Show when={shop()?.Inventory}>
          <h3 class="my-4">Inventory</h3>
          <div>item name - max - regen time - cost</div>
          <For each={shop()?.Inventory}>
            {(inv) => {
              return (
                <div>
                  {inv.Max} <UnknownReference number={inv.Number} /> for 30 Gold
                </div>
              );
            }}
          </For>
        </Show>
      </Show>
    </>
  );
}
