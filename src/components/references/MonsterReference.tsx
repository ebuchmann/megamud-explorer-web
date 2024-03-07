import { A } from '@solidjs/router';
import { monsterData } from '../../data';

type MonsterReferenceProps = {
  number: number;
};

export function MonsterReference({ number }: MonsterReferenceProps) {
  const monster = monsterData.find((mon) => mon.Number === number);

  return (
    <A
      class="decoration-dotted underline underline-offset-2 hover:text-sky-300"
      href={`/monsters/${number}`}
    >
      {monster?.Name}
    </A>
  );
}
