import { spellData } from '../../data';
import { MonsterSpell, Spell } from '../../types';
import { getNumberString } from '../../utils/formatting';
import { specialProperties, allSpellValuesAbilities } from '../../utils/values';

type SpellListingProps = {
  spell: MonsterSpell;
};

export function SpellListing({ spell }: SpellListingProps) {
  const sp: Spell = spellData.find(
    (data) => data.Number === spell.Number,
  ) as Spell;

  if (sp.AttType === 4 && sp.hasOwnProperty('NonMagicalSpell')) {
    return (
      <>
        <div class="mb-4">
          <div>
            {spell.Name} ({spell['AttTrue%']}%)
          </div>
          <div class="grid grid-cols-[1fr,2fr]">
            <div>Success</div>
            <div>{spell.Success}%</div>

            <div>Energy</div>
            <div>
              {spell.Energy} (Max {Math.floor(1000 / spell.Energy)}
              x/round)
            </div>
          </div>
          <div>Effects:</div>
          <div>
            {allSpellValuesAbilities
              .reduce((curr: string, mapKey: number) => {
                const key = specialProperties.get(mapKey);
                if (sp.hasOwnProperty(key)) {
                  if (key === 'Accuracy') {
                    curr += `${key} ${sp.MinBase}, `;
                  } else if (key === 'HoldPerson') {
                    curr += `${sp.MinBase} damage, ${key}${getNumberString(sp[key])}`;
                  } else if (key === 'Poison') {
                    curr += `${key} ${sp.MinBase} to ${sp.MaxBase}, `;
                  } else {
                    curr += `${key}${getNumberString(sp[key])}, `;
                  }
                }

                return curr;
              }, '')
              .replace(/,\s*$/, '')}
            {sp.Dur && ` for ${sp.Dur} rounds`}
          </div>
        </div>
      </>
    );
  }

  return (
    <div class="mb-4">
      <div>
        {spell.Name} ({spell['AttTrue%']}%)
      </div>
      <div class="grid grid-cols-[1fr,2fr]">
        <div>Damage</div>
        <div>
          {sp.MinBase} - {sp.MaxBase}
        </div>
        <div>Success</div>
        <div>{spell.Success}%</div>
        <div>Energy</div>
        <div>
          {spell.Energy} (Max {Math.floor(1000 / spell.Energy)}
          x/round)
        </div>
      </div>
    </div>
  );
}
