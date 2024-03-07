import { A } from '@solidjs/router';
import { spellData } from '../../data';

type SpellReferenceProps = {
  number: number;
};

export function SpellReference({ number }: SpellReferenceProps) {
  const spell = spellData.find((sp) => sp.Number === number);

  return (
    <A
      class="decoration-dotted underline underline-offset-2 hover:text-sky-300"
      href={`/spells/${number}`}
    >
      {spell?.Name}
    </A>
  );
}
