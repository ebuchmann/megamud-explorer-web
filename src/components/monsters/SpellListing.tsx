import spellJSON from '../../data/spells.json';
import { MonsterSpell, Spell } from '../../types';
import { getNumberString } from '../../utils/formatting';
import { specialProperties, allSpellValuesAbilities } from '../../utils/values';

type SpellListingProps = {
  spell: MonsterSpell;
};

export function SpellListing({ spell }: SpellListingProps) {
  const spellData: Spell = spellJSON.find(
    (data) => data.Number === spell.Number,
  ) as Spell;

  if (spellData.AttType === 4 && spellData.hasOwnProperty('NonMagicalSpell')) {
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
                if (spellData.hasOwnProperty(key)) {
                  if (key === 'Accuracy') {
                    curr += `${key} ${spellData.MinBase}, `;
                  } else if (key === 'HoldPerson') {
                    curr += `${spellData.MinBase} damage, ${key}${getNumberString(spellData[key])}`;
                  } else if (key === 'Poison') {
                    curr += `${key} ${spellData.MinBase} to ${spellData.MaxBase}, `;
                  } else {
                    curr += `${key}${getNumberString(spellData[key])}, `;
                  }
                }

                return curr;
              }, '')
              .replace(/,\s*$/, '')}
            {spellData.Dur && ` for ${spellData.Dur} rounds`}
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
          {spellData.MinBase} - {spellData.MaxBase}
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
