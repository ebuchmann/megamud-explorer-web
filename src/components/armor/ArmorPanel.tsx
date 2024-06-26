import { useParams } from '@solidjs/router';
import { Armor } from '../../types';
import { createEffect, createSignal } from 'solid-js';
import { armorData } from '../../data';
import { Show } from 'solid-js';
import { ArmorTypes, WornSpots } from '../../utils/data-types';
import { ReferencesPanel } from '../references/ReferencesPanel';
import {
  armorPanelSkipKeys,
  getRemainingProperties,
} from '../../utils/formatting';
import { SpellReference } from '../references';

export function ArmorPanel() {
  const params = useParams();
  const [armor, setArmor] = createSignal<Armor>();

  createEffect(() => {
    const number = Number(params.number);
    if (number) {
      const arm = armorData.find((a) => a.Number === number);
      setArmor(arm);
    }
  });

  return (
    <>
      <Show when={armor()}>
        <div class="grid grid-cols-[1fr,2fr]">
          <div>Name</div>
          <div>
            {armor()?.Name} ({armor()?.Number})
          </div>
          <div>Worn</div>
          <div>{WornSpots[armor()!.Worn]}</div>
          <div>Type</div>
          <div>{ArmorTypes[armor()!.ArmourType]}</div>

          <div>Encum</div>
          <div>{armor()?.Encum}</div>
          <div>AC/DR</div>
          <div>
            {(armor()?.ArmourClass ?? 0) / 10}/
            {(armor()?.DamageResist ?? 0) / 10}
          </div>
          {getRemainingProperties(armor()!, armorPanelSkipKeys)}
          <Show when={armor()?.NegateSpell}>
            <div>NegateSpell</div>
            <div>
              {armor()?.NegateSpell?.map((spellNum) => (
                <div>
                  <SpellReference number={spellNum} />
                </div>
              ))}
            </div>
          </Show>
        </div>
        <ReferencesPanel item={armor} />
      </Show>
    </>
  );
}
