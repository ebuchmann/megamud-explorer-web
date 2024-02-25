export const specialProperties = new Map([
  [3, 'Rcol'],
  [4, 'MaxDamage'],
  [5, 'Rfir'],
  [9, 'Shadow'],
  [10, 'AC(Blur)'],
  [13, 'Illu'],
  [14, 'RoomIllu'],
  [21, 'ImmuPoison'], // armor
  [22, 'Accuracy'],
  [24, 'ProtEvil'],
  [25, 'ProtGood'],
  [27, 'Stealth'],
  [28, 'Magical'],
  [34, 'Dodge'],
  [36, 'M.R.'],
  [43, 'CastsSp'],
  [45, 'Wisdom'],
  [46, 'Strength'],
  [48, 'Agility'],
  [54, 'IlluTarget'],
  [58, 'Crits'],
  [59, 'ClassOk'],
  [65, 'ResistStone'],
  [66, 'Rlit'],
  [67, 'Quickness'],
  [69, 'MaxMana'],
  [70, 'S.C.'],
  [77, 'Percep'],
  [82, 'Cursed'],
  [86, 'Quality'],
  [87, 'Speed'],
  [88, 'Alter HP'],
  [89, 'PunchAcc'],
  [92, 'PunchDmg'],
  [93, 'KickDmg'],
  [94, 'JumpKDmg'],
  [96, 'Encum'],
  [97, 'GoodOnly'], // maybe not used?
  [98, 'EvilOnly'],
  [100, 'LoyalItem'],
  [110, 'NotGood'],
  [112, 'NeutralOnly'], // unused?
  [114, '% Spell'],
  [116, 'BsAccu'],
  [117, 'BsMinDmg'],
  [118, 'BsMaxDmg'],
  [119, 'Del@Maint'],
  [121, 'Recharge'],
  [123, 'HPRegen'],
  [135, 'MinLevel'],
  [142, 'HitMagic'],
  [145, 'ManaRgn'],
  [147, 'ResistWater'],
  [165, 'AlterSpDmg'],
  [179, 'FindTrapsValue'],
  [180, 'PickLocksValue'],
  [999, 'Classes'],
]);

export const armorValues = [58, 135];
export const armorExtraValues = [4, 27, 34, 97, 98];
export const armorAllValues = [...armorValues, ...armorExtraValues];

export const allValues = [...specialProperties.keys()];

// Used to display the Abilities column for armor
export const allArmorValuesAbilities = allValues.filter(
  (value) => ![58, 87, 96, 135].includes(value),
);

// Used to display the Abilities column for weapons
export const allWeaponValuesAbilities = allValues.filter(
  (value) => ![58, 87, 96, 116, 135].includes(value),
);
