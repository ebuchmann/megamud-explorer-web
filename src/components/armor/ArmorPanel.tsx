import { useParams } from '@solidjs/router';
import { Armor } from '../../types';
import { createEffect, createSignal } from 'solid-js';
import { armorData } from '../../data';
import { Show } from 'solid-js';
import { WeaponTypes } from '../../utils/data-types';
import { ReferencesPanel } from '../references/ReferencesPanel';

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
          <div>Type</div>
          <div>{WeaponTypes[armor()!.WeaponType]}</div>
          <div>Damage</div>
          <div>
            {armor()?.Min} - {armor()?.Max}
          </div>
          <div>Speed</div>
          <div>{armor()?.Speed}</div>
          <div>Min Level</div>
          <div>{armor()?.MinLevel}</div>
          <div>Min Strength</div>
          <div>{armor()?.StrReq}</div>
          <div>Encum</div>
          <div>{armor()?.Encum}</div>
          <div>AC/DR</div>
          <div>
            {(armor()?.ArmourClass ?? 0) / 10}/
            {(armor()?.DamageResist ?? 0) / 10}
          </div>
          <div>Crits</div>
          <div>{armor()?.Crits}</div>
          <div>Magical</div>
          <div>{armor()?.Magical}</div>
        </div>
        <ReferencesPanel item={armor} />
      </Show>
    </>
  );
}
