import { useParams } from '@solidjs/router';
import { Spell } from '../../types';
import { createEffect, createSignal } from 'solid-js';
import { spellData } from '../../data';
import { Show } from 'solid-js';
import { SpellReference } from '../references';
import { getPerLevelInc } from '../../utils/formatting';
import { AttackType, TargetTypes } from '../../utils/data-types';

export function SpellPanel() {
  const params = useParams();
  const [spell, setSpell] = createSignal<Spell>();
  const [calulcations, setCalculations] =
    createSignal<ReturnType<typeof getPerLevelInc>>();

  createEffect(() => {
    const number = Number(params.number);
    if (number) {
      const sp = spellData.find((s) => s.Number === number) as Spell;
      setSpell(sp);
      setCalculations(getPerLevelInc(sp));
    }
  });

  return (
    <>
      <Show when={spell()}>
        <div class="grid grid-cols-[1fr,2fr]">
          <div>Name</div>
          <div>
            {spell()?.Name} ({spell()?.Number})
          </div>
          <div>Mana</div>
          <div>{spell()?.ManaCost}</div>
          <div>Targets</div>
          <div>{TargetTypes[spell()?.Targets]}</div>
          <div>Attack Type</div>
          <div>{AttackType[spell()?.AttType]}</div>
          <div>Req Lvl</div>
          <div>{spell()?.ReqLevel}</div>
          <Show when={true}>
            <div>Min Range</div>
            <div>
              {calulcations()?.minLvlVal} to {calulcations()?.maxLvlVal} @ lvl{' '}
              {spell()?.ReqLevel}
            </div>
            <div>Max Range</div>
            <div>
              {calulcations()?.minCapVal} to {calulcations()?.maxCapVal} @ lvl{' '}
              {spell()?.Cap}
            </div>
            <div>Inc Per Lvl</div>
            <div>
              +{calulcations()?.minIncPerLvl} to +{calulcations()?.maxIncPerLvl}
            </div>
          </Show>
          <Show when={(spell()?.EnergyCost ?? 0) > 0}>
            <div>Energy</div>
            <div>
              {spell()?.EnergyCost} ({1000 / spell()?.EnergyCost}x/round)
            </div>
          </Show>

          <Show when={spell()?.RemovesSpell}>
            <div>Removes</div>
            <div>
              {spell()?.RemovesSpell?.map((number) => (
                <>
                  <SpellReference number={number} />
                  <br />
                </>
              ))}
            </div>
          </Show>
        </div>
      </Show>
    </>
  );
}
