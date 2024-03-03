import { A } from '@solidjs/router';
import { armorData } from '../../data';

type ArmorReferenceProps = {
  number: number;
};

export function ArmorReference({ number }: ArmorReferenceProps) {
  const armor = armorData.find((arm) => arm.Number === number);

  return (
    <A
      class="decoration-dotted underline underline-offset-2"
      href={`/armor/${number}`}
    >
      {armor?.Name}
    </A>
  );
}
