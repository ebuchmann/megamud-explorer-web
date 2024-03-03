import { A } from '@solidjs/router';
import { shopData } from '../../data/shops';

type ShopReferenceProps = {
  number: number;
};

export function ShopReference({ number }: ShopReferenceProps) {
  const shop = shopData.find((sh) => sh.Number === number);

  return (
    <A
      class="decoration-dotted underline underline-offset-2"
      href={`/shops/${number}`}
    >
      {shop?.Name}
    </A>
  );
}
