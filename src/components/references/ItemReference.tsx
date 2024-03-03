import { A } from '@solidjs/router';
import { itemData } from '../../data';

type ItemReferenceProps = {
  number: number;
};

export function ItemReference({ number }: ItemReferenceProps) {
  const item = itemData.find((itm) => itm.Number === number);

  return (
    <A
      class="decoration-dotted underline underline-offset-2"
      href={`/items/${number}`}
    >
      {item?.Name}
    </A>
  );
}
