import { useParams } from '@solidjs/router';
import { Spell } from '../../types';
import { createEffect, createSignal } from 'solid-js';
import { spellData } from '../../data';
import { Show } from 'solid-js';
import { SpellReference } from '../references';
import { formatSpellPanelJSX, getPerLevelInc } from '../../utils/formatting';
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
        <div class="grid grid-cols-[1fr,2fr] gap-x-4">
          <div>Name</div>
          <div>
            {spell()?.Name} ({spell()?.Number})
          </div>
          <div>Mana</div>
          <div>{spell()?.ManaCost}</div>
          <div>Targets</div>
          <div>{TargetTypes[spell()?.Targets ?? 0]}</div>
          <div>Attack Type</div>
          <div>{AttackType[spell()?.AttType ?? 0]}</div>
          <div>Req Lvl</div>
          <div>{spell()?.ReqLevel}</div>

          {formatSpellPanelJSX(spell()?.Number ?? 0)}

          <Show when={calulcations()?.minLvlDur}>
            <div>Duration</div>
            <div>
              {calulcations()?.minLvlDur} rounds
              {calulcations()?.hasDurInc && ` @ lvl ${spell()?.ReqLevel}`}
            </div>
            <Show
              when={calulcations()?.minLvlDur !== calulcations()?.maxLvlDur}
            >
              <div></div>
              <div>
                {calulcations()?.maxLvlDur} rounds
                {calulcations()?.hasDurInc && ` @ lvl ${spell()?.Cap}`}
              </div>
            </Show>
            <Show when={calulcations()?.hasDurInc}>
              <div>Dur Inc</div>
              <div>+{calulcations()?.durIncPerLvl} * lvl</div>
            </Show>
          </Show>
          <Show when={(spell()?.EnergyCost ?? 0) > 0}>
            <div>Energy</div>
            <div>
              {spell()?.EnergyCost} ({1000 / (spell()?.EnergyCost ?? 1000)}
              x/round)
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
