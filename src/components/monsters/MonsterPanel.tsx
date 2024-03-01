import { createEffect, createSignal } from 'solid-js';
import monsterJSON from '../../data/monsters.json';
import weaponsJSON from '../../data/weapons.json';
import armorJSON from '../../data/armor.json';
import { Show, For } from 'solid-js';
import { useParams } from '@solidjs/router';
import { Monster } from '../../types';
import {
  allMonsterValuesAbilities,
  specialProperties,
} from '../../utils/values';
import { getNumberString } from '../../utils/formatting';
import { SpellListing } from './SpellListing';
import { Alignments, MonsterTypes } from '../../utils/data-types';
import { ItemInfo } from '../ItemInfo';

export function MonsterPanel() {
  const params = useParams();
  const [monster, setMonster] = createSignal<Monster>();

  createEffect(() => {
    const number = Number(params.number);
    if (number) {
      const monster = monsterJSON.find((mon: Monster) => mon.Number === number);
      setMonster(monster);
    }
  });

  const abilities = (): string =>
    allMonsterValuesAbilities
      .reduce((curr: string, mapKey: number) => {
        const key: keyof Monster = specialProperties.get(mapKey);
        if (monster()?.[key]) {
          curr += `${key} ${getNumberString(monster()[key])}, `;
        }

        return curr;
      }, '')
      .replace(/,\s*$/, '');

  return (
    <>
      <Show when={!monster()}>Select a monster...</Show>
      <Show when={monster()}>
        <div class="grid grid-cols-[1fr,2fr]">
          <div>Name</div>
          <div>
            {monster()!.Name} ({monster()!.Number})
          </div>
          <div>Experience</div>
          <div>{monster()!.EXP}</div>
          <div>Type</div>
          <div>{MonsterTypes[monster()!.Type]}</div>
          <div>Alignment</div>
          <div>{Alignments[monster()!.Align]}</div>
          <div>Hps</div>
          <div>
            {monster()!.HP} (+{monster()?.HPRegen} HPs/tick)
          </div>
          <div>AC/DR</div>
          <div>
            {monster()!.ArmourClass}/{monster()?.DamageResist}
          </div>
          <div>MR</div>
          <div>{monster()!.MagicRes}</div>
          <div>Follow</div>
          <div>{monster()!['Follow%']}%</div>
          <div>Charm LVL</div>
          <div>{monster()!.CharmLVL}</div>
          <Show when={monster()?.Weapon}>
            <div>Weapon</div>
            <div>
              <ItemInfo Number={monster()!.Weapon} />
            </div>
          </Show>
          <Show when={abilities()}>
            <>
              <div>Abilities</div>
              <div>{abilities()}</div>
            </>
          </Show>
        </div>
        <Show when={monster()?.Drops}>
          <h3 class="my-4">Drops</h3>
          <For each={monster()!.Drops}>
            {(drop) => (
              <div>
                <ItemInfo Number={drop.Number} /> ({drop.Percent}%)
              </div>
            )}
          </For>
        </Show>
        <Show when={monster()?.Attacks}>
          <h3 class="my-4">Attacks</h3>
          <For each={monster()?.Attacks}>
            {(attack) => (
              <div class="mb-4">
                <div>
                  {attack.Name} ({attack['AttTrue%']}%)
                </div>
                <div class="grid grid-cols-[1fr,2fr]">
                  <div>Damage</div>
                  <div>
                    {attack.Min} - {attack.Max}
                  </div>
                  <div>Accuracy</div>
                  <div>{attack.Acc}</div>
                  <div>Energy</div>
                  <div>
                    {attack.Energy} (Max {Math.floor(1000 / attack.Energy)}
                    x/round)
                  </div>
                  <Show when={attack.HitSpell}>
                    <div>Hit spell</div>
                    <div>{attack.HitSpell}</div>
                  </Show>
                </div>
              </div>
            )}
          </For>
        </Show>
        <Show when={monster()?.Spells}>
          <h3 class="my-4">Spells</h3>
          <For each={monster()?.Spells}>
            {(spell) => <SpellListing spell={spell} />}
          </For>
        </Show>
      </Show>
    </>
  );
}
