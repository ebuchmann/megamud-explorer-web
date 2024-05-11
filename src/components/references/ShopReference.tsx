import { A } from '@solidjs/router';
import { shopData } from '../../data/shops';
import { Tooltip } from '../Tooltip';

type ShopReferenceProps = {
  number: number;
};

export function ShopReference({ number }: ShopReferenceProps) {
  const shop = shopData.find((sh) => sh.Number === number);

  return (
    <Tooltip
      placement="left"
      content={
        <div class="flex flex-col">
          <div>Markup: {shop?.['Markup%']}%</div>
        </div>
      }
    >
      <A
        class="decoration-dotted underline underline-offset-2 hover:text-sky-300"
        href={`/shops/${number}`}
      >
        {shop?.Name}
      </A>
    </Tooltip>
  );
}
