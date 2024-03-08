import { specialProperties } from './values';
import { classData, spellData } from '../data';
import { AllItemTypes, Armor, Item, Spell, Weapon } from '../types';
import { SpellReference } from '../components/references';
import { spec } from 'node:test/reporters';

export const getNumberString = (value: number): string => {
  if (value > 0) return ` +${value}`;
  if (value < 0) return ` ${value}`;
  return '';
};

const removeTrailingComma = (value: string): string =>
  value.replace(/,\s*$/, '');

const onlyKeys = [100, 119];

export const getClassList = (values: number[]): string =>
  values
    .map((value) => classData.find((cls) => cls.Number === value)?.Name)
    .join(' / ');

export const expandKeyValue = (key: string, value: number): string => {
  if (onlyKeys.some((num) => specialProperties.get(num) === key)) {
    return key;
  }
  if (specialProperties.get(43) === key) {
    return `Casts ${formatSpell(value)}`;
  }
  return `${key}${getNumberString(value)}`;
};

// For use in the table Abilities column
export const expandKeyValueJSX = (
  key: string,
  value: string | number | number[],
  item: Weapon | Item,
) => {
  if (specialProperties.get(9999) === key && typeof value === 'object') {
    return `${getClassList(value)} Only`;
  }
  if (specialProperties.get(59) === key && typeof value === 'object') {
    return `${getClassList(value)} Ok`;
  }
  if (specialProperties.get(42) === key && typeof value === 'number') {
    return (
      <>
        Learn <SpellReference number={value} />
      </>
    );
  }
  if (specialProperties.get(43) === key && typeof value === 'number') {
    const percent = item[specialProperties.get(114)];
    return (
      <>
        Casts <SpellReference number={value} />
        {percent && ` ${percent}% on hit`}
        {/* {formatSpell(value)} */}
      </>
    );
  }
  if (onlyKeys.some((num) => specialProperties.get(num) === key)) {
    return <>{key}</>;
  }

  return (
    <>
      {key}
      {getNumberString(value)}
    </>
  );
};

// For use in the table Abilities column
export const expandKeyValueJSXDetails = (
  key: string,
  value: string | number | number[],
  item: Weapon | Item,
) => {
  if (
    (specialProperties.get(9999) === key ||
      specialProperties.get(59) === key) &&
    typeof value === 'object'
  ) {
    return (
      <>
        <div>Classes</div>
        <div>{getClassList(value)}</div>
      </>
    );
  }
  if (specialProperties.get(42) === key && typeof value === 'number') {
    return (
      <>
        <div>Learn</div>
        <div>
          <SpellReference number={value} />
        </div>
      </>
    );
  }
  if (specialProperties.get(43) === key && typeof value === 'number') {
    const percent = item[specialProperties.get(114)];
    return (
      <>
        <div>Casts</div>
        <div>
          <SpellReference number={value} /> {percent && ` ${percent}% on hit`}
        </div>
      </>
    );
  }
  if (onlyKeys.some((num) => specialProperties.get(num) === key)) {
    return (
      <>
        <div></div>
        {key}
      </>
    );
  }

  return (
    <>
      <div>{key}</div>
      <div>{value}</div>
    </>
  );
};

const getPerLevelInc = (spell: Spell) => {
  const hasMinInc = spell.MinInc > 0;
  const hasMaxInc = spell.MaxInc > 0;
  const minIncPerLvl =
    Math.round((spell.MinInc / spell.MinIncLVLs) * 100) / 100;
  const maxIncPerLvl =
    Math.round((spell.MaxInc / spell.MaxIncLVLs) * 100) / 100;
  const hasDurInc = spell.DurInc > 0;
  const durIncPerLvl =
    Math.round((spell.DurInc / spell.DurIncLVLs) * 100) / 100;
  const minMaxSame = minIncPerLvl === maxIncPerLvl;

  return {
    hasMinInc,
    hasMaxInc,
    hasDurInc,
    minIncPerLvl,
    maxIncPerLvl,
    durIncPerLvl,
    minMaxSame,
  };
};

const spellEffects = [20, 58, 87];
const singleEffects = [3, 4, 5, 10, 22, 24, 36, 1113];
const singleEffectsNoRange = [2, 7];

export const formatSpell = (number: number): string => {
  const spell = spellData.find((sp) => sp.Number === number);
  if (!spell) return '<spell not found>';

  const {
    hasMaxInc,
    hasMinInc,
    minIncPerLvl,
    maxIncPerLvl,
    hasDurInc,
    durIncPerLvl,
    minMaxSame,
  } = getPerLevelInc(spell);

  let value = '';

  const hasEffects = spellEffects.some((effNum) =>
    spell.hasOwnProperty(specialProperties.get(effNum)),
  );
  const hasSingleEffects = singleEffects.some((effNum) =>
    spell.hasOwnProperty(specialProperties.get(effNum)),
  );
  const hasSingleEffectsNoRange = singleEffectsNoRange.some((effNum) =>
    spell.hasOwnProperty(specialProperties.get(effNum)),
  );

  if (
    spell.hasOwnProperty(specialProperties.get(1)) ||
    spell.hasOwnProperty(specialProperties.get(17))
  ) {
    const armorType = spell.hasOwnProperty(specialProperties.get(1))
      ? specialProperties.get(1)
      : specialProperties.get(17);

    value += `${armorType} ${spell.MinBase}${hasMinInc ? `+(${minIncPerLvl}*lvl)` : ''} to ${spell.MaxBase}${hasMaxInc ? `+(${maxIncPerLvl}*lvl)` : ''}`;
  }

  if (hasEffects) {
    spellEffects.forEach((effNum) => {
      const effectName = specialProperties.get(effNum);
      if (spell.hasOwnProperty(effectName)) {
        const effectValue = spell[effectName as keyof Spell] as number;

        value += `${effectName} ${getNumberString(effectValue > 0 ? effectValue : spell.MinBase)}, `;
      }
    });
  }

  // if (hasMinInc && hasMaxInc) {
  //   value += `${specialProperties.get()}`
  // }

  if (hasSingleEffects) {
    singleEffects.forEach((effNum) => {
      const effectName = specialProperties.get(effNum);
      if (spell.hasOwnProperty(effectName)) {
        const effectValue =
          (spell[effectName as keyof Spell] as number) || spell.MinBase;

        value += `${effectName} ${effectValue}${hasMinInc ? `+(${minIncPerLvl}*lvl)` : ''}${hasMaxInc && !minMaxSame ? ` to ${effectValue}+(${maxIncPerLvl}*lvl)` : ''}, `;
      }
    });
  }

  if (hasSingleEffectsNoRange) {
    singleEffectsNoRange.forEach((effNum) => {
      const effectName = specialProperties.get(effNum);
      if (spell.hasOwnProperty(effectName)) {
        const effectValue =
          (spell[effectName as keyof Spell] as number) || spell.MinBase;

        value += `${effectName} ${getNumberString(effectValue)}, `;
      }
    });
  }

  // // Effects with ranges
  // if (spell.hasOwnProperty(specialProperties.get(165))) {
  //   value += `${specialProperties.get(165)} ${getNumberString(spell.MinBase)} to ${getNumberString(spell.MaxBase)}`;
  // }

  // // Effects with single values
  // if (spell.hasOwnProperty(specialProperties.get(4))) {
  //   const property = specialProperties.get(4);
  //   value += `${property} ${getNumberString(spell[property] || spell.MinBase)}`;
  // }

  value = removeTrailingComma(value);

  if (spell.Dur)
    value += ` for ${spell.Dur}${hasDurInc ? `+(${durIncPerLvl}*lvl)` : ''} rounds`;

  if (spell.hasOwnProperty('RemovesSpell')) {
    value += ` - Removes Spell(`;
    spell.RemovesSpell?.forEach((removeNumber) => {
      const spellToRemove = spellData.find((sp) => sp.Number === removeNumber);
      if (!spellToRemove) value += `<unknown spell ${removeNumber}>, `;
      else value += spellToRemove.Name + ', ';
    });
    value = removeTrailingComma(value) + ')';
  }

  return value;
};

const commonSkipKeys = [
  'Number',
  'Name',
  'Limit',
  'UseCount',
  'Encum',
  'Price',
  'Currency',
  'Worn',
  'Gettable',
  'Obtained',
  'Speed',
  'ArmourType',
  'WeaponType',
  'ArmourClass',
  'DamageResist',
  'ItemType',
  'StrReq',
  'Min',
  'Max',
];

const weaponSkipKeys = ['MinLevel', 'Magical', 'Accy', 'Crits', '% Spell'];

export const itemSkipKeys = [
  'Number',
  'Name',
  'ItemType',
  'UseCount',
  'Price',
  'Currency',
  'Encum',
  'Magical',
  'Obtained',
];

export const weaponTableSkipKeys = [
  ...commonSkipKeys,
  ...weaponSkipKeys,
  'BsAccu',
];
export const weaponPanelSkipKeys = [...commonSkipKeys, ...weaponSkipKeys];

export const armorPanelSkipKeys = [...commonSkipKeys];
export const armorTableSkipKeys = [
  ...commonSkipKeys,
  'Accy',
  'MinLevel',
  'Crits',
  'Magical',
];

// [97, 'GoodOnly'],
// [98, 'EvilOnly'],
// [110, 'NotGood'],
// [111, 'NotEvil'],
// [112, 'NeutralOnly'],
// [113, 'NotNeutral'],

const alignmentProperties = [
  specialProperties.get(97), // GoodOnly
  specialProperties.get(98), // EvilOnly
  specialProperties.get(110), // NotGood
  specialProperties.get(111), // NotEvil
  specialProperties.get(112), // NeutralOnly
  specialProperties.get(113), // NotNeutral
];

// For use on side panels
export const getRemainingProperties = (
  item: AllItemTypes,
  skipKeys: string[],
) => {
  const properties = Object.keys(item)
    .filter((key) => !skipKeys.includes(key))
    .map((key) => key);

  const formatted = properties.map((property) => {
    const value = item[property as keyof Omit<AllItemTypes, 'Obtained'>];
    if (value === undefined) return;
    if (alignmentProperties.includes(property))
      return (
        <>
          <div>Align</div>
          <div>{property}</div>
        </>
      );
    if (value === 0) return;
    return <>{expandKeyValueJSXDetails(property, value, item)}</>;
  });

  return formatted;
};

// For use on table abilities column
export const getRemainingPropertiesTable = (
  item: AllItemTypes,
  skipKeys: string[],
) => {
  const properties = Object.keys(item)
    .filter((key) => !skipKeys.includes(key))
    .map((key) => key);

  const formatted = properties.map((property, index) => {
    const value = item[property as keyof Omit<AllItemTypes, 'Obtained'>];
    if (value === undefined) return;
    const lastItem = properties.length === index + 1;

    return (
      <>
        {expandKeyValueJSX(property, value, item)}
        {!lastItem && ', '}
      </>
    );
  });

  return formatted;
};
