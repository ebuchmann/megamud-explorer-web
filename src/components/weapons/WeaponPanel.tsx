import { useParams } from '@solidjs/router';
import { Weapon } from '../../types';
import { createEffect, createSignal } from 'solid-js';
import { weaponData } from '../../data';
import { Show } from 'solid-js';
import { WeaponTypes } from '../../utils/data-types';
import { ReferencesPanel } from '../references/ReferencesPanel';
import {
  getRemainingProperties,
  weaponTableSkipKeys,
} from '../../utils/formatting';

export function WeaponPanel() {
  const params = useParams();
  const [weapon, setWeapon] = createSignal<Weapon>();

  createEffect(() => {
    const number = Number(params.number);
    if (number) {
      const wpn = weaponData.find((w) => w.Number === number);
      setWeapon(wpn);
    }
  });

  return (
    <>
      <Show when={weapon()}>
        <div class="grid grid-cols-[1fr,2fr]">
          <div>Name</div>
          <div>
            {weapon()?.Name} ({weapon()?.Number})
          </div>
          <div>Type</div>
          <div>{WeaponTypes[weapon()!.WeaponType]}</div>
          <div>Damage</div>
          <div>
            {weapon()?.Min} - {weapon()?.Max}
          </div>
          <div>Speed</div>
          <div>{weapon()?.Speed}</div>
          <div>Min Level</div>
          <div>{weapon()?.MinLevel}</div>
          <div>Min Strength</div>
          <div>{weapon()?.StrReq}</div>
          <div>Encum</div>
          <div>{weapon()?.Encum}</div>
          <div>AC/DR</div>
          <div>
            {(weapon()?.ArmourClass ?? 0) / 10}/{weapon()?.DamageResist}
          </div>
          <div>Accuracy</div>
          <div>{weapon()?.Accy}</div>
          <Show when={weapon()?.Crits}>
            <div>Crits</div>
            <div>{weapon()?.Crits}</div>
          </Show>
          <Show when={!weapon()?.hasOwnProperty('BsAccu')}>
            <div>Bs Accu</div>
            <div>Can't backstab</div>
          </Show>
          <Show when={weapon()?.Magical}>
            <div>Magical</div>
            <div>{weapon()?.Magical}</div>
          </Show>
          {getRemainingProperties(weapon()!, weaponTableSkipKeys)}
        </div>
        <ReferencesPanel item={weapon} />
      </Show>
    </>
  );
}
