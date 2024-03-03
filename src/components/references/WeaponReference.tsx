import { A } from '@solidjs/router';
import { weaponData } from '../../data';

type WeaponReferenceProps = {
  number: number;
};

export function WeaponReference({ number }: WeaponReferenceProps) {
  const weapon = weaponData.find((mon) => mon.Number === number);

  return (
    <A
      class="decoration-dotted underline underline-offset-2"
      href={`/weapons/${number}`}
    >
      {weapon?.Name}
    </A>
  );
}
