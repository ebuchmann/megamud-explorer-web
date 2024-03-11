import { A } from '@solidjs/router';
import { shopData } from '../../data/shops';
import { createEffect, createSignal } from 'solid-js';
import { Shop } from '../../types';

type ShopReferenceProps = {
  number: number;
};

export function ShopReference(props: ShopReferenceProps) {
  const [shop, setShop] = createSignal<Shop>();

  createEffect(() => {
    setShop(shopData.find((sh) => sh.Number === props.number));
  });

  return (
    <A
      class="decoration-dotted underline underline-offset-2 hover:text-sky-300"
      href={`/shops/${props.number}`}
    >
      {shop()?.Name}
    </A>
  );
}
