import { specialProperties } from './values';
import { classData, spellData } from '../data';
import { AllItemTypes, Item, Spell, Weapon } from '../types';
import { MonsterReference, SpellReference } from '../components/references';
import { JSX } from 'solid-js';

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

export const getPerLevelInc = (spell: Spell) => {
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
  const minCapVal =
    Math.floor(spell.MinBase + minIncPerLvl * spell.Cap) || spell.MaxBase;
  const maxCapVal =
    Math.floor(spell.MaxBase + maxIncPerLvl * spell.Cap) || spell.MaxBase;
  const minLvlVal =
    Math.floor(spell.MinBase + minIncPerLvl * spell.ReqLevel) || spell.MinBase;
  const maxLvlVal =
    Math.floor(spell.MaxBase + maxIncPerLvl * spell.ReqLevel) || spell.MaxBase;
  const hasRange = minLvlVal !== maxLvlVal;
  const minLvlDur =
    Math.floor(spell.Dur + durIncPerLvl * spell.ReqLevel) || spell.Dur;
  const maxLvlDur =
    Math.floor(spell.Dur + durIncPerLvl * spell.Cap) || spell.Dur;

  return {
    hasMinInc,
    hasMaxInc,
    hasDurInc,
    minIncPerLvl,
    maxIncPerLvl,
    durIncPerLvl,
    minMaxSame,
    minCapVal,
    maxCapVal,
    minLvlVal,
    maxLvlVal,
    minLvlDur,
    maxLvlDur,
    hasRange,
  };
};

const onlyShowAbilityName = [
  specialProperties.get(6),
  specialProperties.get(23),
  specialProperties.get(52),
  specialProperties.get(97),
  specialProperties.get(98),
  specialProperties.get(108),
  specialProperties.get(111),
  specialProperties.get(112),
  specialProperties.get(144),
];

export const formatSpell = (number: number): string => {
  const spell = spellData.find((sp) => sp.Number === number);
  if (!spell) return '<spell not found>';

  const { minMaxSame, minLvlVal, maxLvlVal, hasRange } = getPerLevelInc(spell);

  let value = '';

  Object.entries(spell.Abilities).forEach(([ability, val]) => {
    if (onlyShowAbilityName.includes(ability)) {
      value += `${ability}, `;
      return;
    }
    // Dispel
    if (specialProperties.get(73) === ability) {
      value += `${ability} ${specialProperties.get(val)}`;
      return;
    }
    if (val !== 0) {
      // For items that don't increase or change at all
      value += `${ability} ${getNumberString(val)}, `;
    } else {
      // For items that use + per level elements
      if (!hasRange) {
        value += `${ability} ${getNumberString(minLvlVal)}, `;
      } else {
        value += `${ability} ${minLvlVal}${!minMaxSame ? ` to ${maxLvlVal}` : ''}, `;
      }
    }
  });

  return removeTrailingComma(value);
};

// For the table column
export const formatSpellJSX = (value: number | Spell): JSX.Element => {
  const spell =
    typeof value === 'number'
      ? spellData.find((sp) => sp.Number === value)
      : value;
  if (!spell) return '<spell not found>';

  const { minLvlVal, maxLvlVal, hasRange } = getPerLevelInc(spell);

  const values: JSX.Element[] = [];

  Object.entries(spell.Abilities).forEach(([ability, val]) => {
    if (specialProperties.get(164) === ability) return; // EndCast%
    if (onlyShowAbilityName.includes(ability)) {
      values.push(<>{ability}</>);
      return;
    }

    // Dispel
    if (specialProperties.get(73) === ability) {
      values.push(
        <>
          {ability} {specialProperties.get(val)}
        </>,
      );
      return;
    }
    // Casts spell
    if (specialProperties.get(43) === ability) {
      values.push(
        <>
          Casts <SpellReference number={val} />
        </>,
      );
      return;
    }
    // EndCast
    if (specialProperties.get(151) === ability) {
      values.push(
        <>
          EndCast <SpellReference number={val} />
          {spell.Abilities.hasOwnProperty(specialProperties.get(164)) && (
            <> ({spell.Abilities[specialProperties.get(164)]}%)</>
          )}
        </>,
      );
      return;
    }

    // Summon monster
    if (specialProperties.get(12) === ability) {
      values.push(
        <>
          Summons <MonsterReference number={val || spell.MinBase} />
        </>,
      );
      return;
    }
    if (val !== 0) {
      // For items that don't increase or change at all
      values.push(
        <>
          {ability} {getNumberString(val)}
        </>,
      );
      return;
    }
    // For items that use + per level elements
    if (!hasRange) {
      values.push(
        <>
          {ability} {getNumberString(minLvlVal)}
        </>,
      );
      return;
    }

    values.push(
      <>
        {ability} {minLvlVal}
        {minLvlVal !== maxLvlVal ? ` to ${maxLvlVal}` : ''}
      </>,
    );
  });

  return values.map((val, index) => (
    <>
      {val}
      {index !== values.length - 1 && ', '}
    </>
  ));
};

export const formatSpellPanelJSX = (number: number): JSX.Element => {
  const spell = spellData.find((sp) => sp.Number === number);
  if (!spell) return '<spell not found>';

  const {
    minLvlVal,
    maxLvlVal,
    hasRange,
    hasMinInc,
    minCapVal,
    maxCapVal,
    minIncPerLvl,
    maxIncPerLvl,
  } = getPerLevelInc(spell);

  const values: JSX.Element[] = [];

  Object.entries(spell.Abilities).forEach(([ability, val]) => {
    if (specialProperties.get(164) === ability) return; // EndCast%
    if (onlyShowAbilityName.includes(ability)) {
      values.push(
        <>
          <div></div>
          <div>{ability}</div>
        </>,
      );
      return;
    }

    // Dispel
    if (specialProperties.get(73) === ability) {
      values.push(
        <>
          <div>{ability}</div>
          <div>{specialProperties.get(val)}</div>
        </>,
      );
      return;
    }
    // Casts spell
    if (specialProperties.get(43) === ability) {
      values.push(
        <>
          <div>Casts</div>
          <div>
            <SpellReference number={val} />
          </div>
        </>,
      );
      return;
    }
    // EndCast
    if (specialProperties.get(151) === ability) {
      values.push(
        <>
          EndCast <SpellReference number={val} />
          {spell.Abilities.hasOwnProperty(specialProperties.get(164)) && (
            <> ({spell.Abilities[specialProperties.get(164)]}%)</>
          )}
        </>,
      );
      return;
    }

    // Summon monster
    if (specialProperties.get(12) === ability) {
      values.push(
        <>
          Summons <MonsterReference number={val || spell.MinBase} />
        </>,
      );
      return;
    }
    if (val !== 0) {
      // For items that don't increase or change at all
      values.push(
        <>
          <div>{ability}</div>
          <div>{getNumberString(val)}</div>
        </>,
      );
      return;
    }
    if (minLvlVal !== minCapVal && !hasRange) {
      values.push(
        <>
          <div>{ability}</div>
          <div>
            {getNumberString(minLvlVal)} @ lvl {spell.ReqLevel}
            <br />
            {getNumberString(minCapVal)} @ lvl {spell.Cap}
            <br />
            {getNumberString(minIncPerLvl)} * lvl
          </div>
        </>,
      );
      return;
    }
    // For items that use + per level elements
    if (!hasRange) {
      values.push(
        <>
          <div>{ability}</div>
          <div>{getNumberString(minLvlVal)}</div>
        </>,
      );
      return;
    }

    values.push(
      <>
        <div>{ability}</div>
        <div>
          {minLvlVal}
          {minLvlVal !== maxLvlVal ? ` to ${maxLvlVal}` : ''}
          {hasMinInc ? ` @ lvl ${spell.ReqLevel}` : ''}
          {spell.Cap > 0 ? (
            <>
              <br />
              {minCapVal} to {maxCapVal} @ lvl {spell.Cap}
              <br />
              {getNumberString(minIncPerLvl)} / {getNumberString(maxIncPerLvl)}{' '}
              * lvl
            </>
          ) : (
            ''
          )}
        </div>
      </>,
    );
  });

  return values;
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
  'spdDmg',
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
