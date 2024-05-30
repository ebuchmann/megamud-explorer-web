import { A } from '@solidjs/router';
import { monsterData } from '../../data';
import { Tooltip } from '../Tooltip';
import { Show } from 'solid-js';

type MonsterReferenceProps = {
  number: number;
};

export function MonsterReference({ number }: MonsterReferenceProps) {
  const monster = monsterData.find((mon) => mon.Number === number);

  return (
    <Tooltip
      placement="left"
      content={
        <div class="flex flex-col">
          <div>
            {monster?.Name} ({monster?.Number})
          </div>
          <div>
            HP: {monster?.HP}, Exp: {monster?.EXP}
          </div>
          <div>
            AC/DR: {monster?.ArmourClass}/{monster?.DamageResist}, MR:{' '}
            {monster?.MagicRes}
          </div>
          <Show when={monster?.Magical ?? 0 > 0}>
            <div>Mag: {monster?.Magical}</div>
          </Show>
          <Show when={monster?.hasOwnProperty('SeeHidden')}>SeeHidden</Show>
        </div>
      }
    >
      <A
        class="decoration-dotted underline underline-offset-2 hover:text-sky-300"
        href={`/monsters/${number}`}
      >
        {monster?.Name}
      </A>
    </Tooltip>
  );
}
