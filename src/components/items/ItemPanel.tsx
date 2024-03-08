import { useParams } from '@solidjs/router';
import { Item } from '../../types';
import { createEffect, createSignal } from 'solid-js';
import { itemData } from '../../data';
import { Show } from 'solid-js';
import { CurrencyTypes, ItemTypes } from '../../utils/data-types';
import { ReferencesPanel } from '../references/ReferencesPanel';
import { getRemainingProperties, itemSkipKeys } from '../../utils/formatting';

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
          {getRemainingProperties(item()!, itemSkipKeys)}
        </div>
        <ReferencesPanel item={item} />
      </Show>
    </>
  );
}
