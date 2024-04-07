import { A } from '@solidjs/router';
import { spellData } from '../../data';
import { Tooltip } from '../Tooltip';
import { formatSpellJSX } from '../../utils/formatting';

type SpellReferenceProps = {
  number: number;
};

export function SpellReference({ number }: SpellReferenceProps) {
  const spell = spellData.find((sp) => sp.Number === number)!;

  return (
    <Tooltip
      placement="top"
      content={<div class="flex flex-col">{formatSpellJSX(spell)}</div>}
    >
      <A
        class="decoration-dotted underline underline-offset-2 hover:text-sky-300"
        href={`/spells/${number}`}
      >
        {spell?.Name}
      </A>
    </Tooltip>
  );
}
