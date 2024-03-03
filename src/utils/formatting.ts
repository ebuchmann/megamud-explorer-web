import { specialProperties } from './values';
import { spellData } from '../data';
import { Spell } from '../types';

export const getNumberString = (value: number): string => {
  if (value > 0) return ` +${value}`;
  if (value < 0) return ` ${value}`;
  return '';
};

const removeTrailingComma = (value: string): string =>
  value.replace(/,\s*$/, '');

const onlyKeys = [100, 119];

export const expandKeyValue = (key: string, value: number): string => {
  if (onlyKeys.some((num) => specialProperties.get(num) === key)) {
    return key;
  }
  if (specialProperties.get(43) === key) {
    return `Casts ${formatSpell(value)}`;
  }
  return `${key}${getNumberString(value)}`;
};

const spellEffects = [20, 58, 87];

export const formatSpell = (number: number): string => {
  const spell = spellData.find((sp) => sp.Number === number);
  if (!spell) return '<spell not found>';

  let value = spell.Name + ' [';

  const hasEffects = spellEffects.some((effNum) =>
    spell.hasOwnProperty(specialProperties.get(effNum)),
  );

  if (hasEffects) {
    spellEffects.forEach((effNum) => {
      const effectName = specialProperties.get(effNum);
      if (spell.hasOwnProperty(effectName)) {
        const effectValue = spell[effectName as keyof Spell] as number;

        value += `${effectName} ${getNumberString(effectValue > 0 ? effectValue : spell.MinBase)}, `;
      }
    });

    value = removeTrailingComma(value);
  }

  // Effects with ranges
  if (spell.hasOwnProperty(specialProperties.get(165))) {
    value += `${specialProperties.get(165)} ${getNumberString(spell.MinBase)} to ${getNumberString(spell.MaxBase)}`;
  }

  // Effects with single values
  if (spell.hasOwnProperty(specialProperties.get(4))) {
    const property = specialProperties.get(4);
    value += `${property} ${getNumberString(spell[property] || spell.MinBase)}`;
  }

  if (spell.Dur) value += ` for ${spell.Dur} rounds`;

  if (spell.hasOwnProperty('RemovesSpell')) {
    value += ` - Removes Spell(`;
    spell.RemovesSpell?.forEach((removeNumber) => {
      const spellToRemove = spellData.find(
        (sp) => sp.Number === removeNumber,
      ) as Spell;
      value += spellToRemove.Name + ', ';
    });
    value = removeTrailingComma(value) + ')';
  }

  value += ']';

  return value;
};
