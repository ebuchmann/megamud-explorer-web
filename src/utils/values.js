export const specialProperties = new Map([
  [2, 'AC'],
  [3, 'Rcol'],
  [4, 'MaxDamage'],
  [5, 'Rfir'],
  [7, 'DR'],
  [9, 'Shadow'],
  [10, 'AC(Blur)'],
  [13, 'Illu'],
  [14, 'RoomIllu'],
  [15, 'AlterHunger'],
  [17, 'Damage(-MR)'],
  [19, 'Poison'],
  [21, 'ImmuPoison'], // armor
  [22, 'Accuracy'],
  [24, 'ProtEvil'],
  [25, 'ProtGood'],
  [27, 'Stealth'],
  [28, 'Magical'],
  [31, 'Bash'],
  [32, 'Smash'],
  [34, 'Dodge'],
  [36, 'M.R.'],
  [43, 'CastsSp'],
  [44, 'Intellect'],
  [45, 'Wisdom'],
  [46, 'Strength'],
  [48, 'Agility'],
  [51, 'AntiMagic'],
  [54, 'IlluTarget'],
  [58, 'Crits'],
  [59, 'ClassOk'],
  [65, 'ResistStone'],
  [66, 'Rlit'],
  [67, 'Quickness'],
  [69, 'MaxMana'],
  [70, 'S.C.'],
  [74, 'HoldPerson'],
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
  [102, 'RacialStealth'],
  [103, 'ClassStealth'],
  [107, 'BlindUser'],
  [108, 'AffectsLivingOnly'],
  [109, 'NonLiving'], // monsters, not that useful as undead -> 1 is the same
  [110, 'NotGood'],
  [112, 'NeutralOnly'], // unused?
  [114, '% Spell'],
  [116, 'BsAccu'],
  [117, 'BsMinDmg'],
  [118, 'BsMaxDmg'],
  [119, 'Del@Maint'],
  [120, 'StartMsg'],
  [121, 'Recharge'],
  [122, 'RemovesSpell'],
  [123, 'HPRegen'],
  [135, 'MinLevel'],
  [142, 'HitMagic'],
  [144, 'NonMagicalSpell'],
  [145, 'ManaRgn'],
  [146, 'MonsGuards'],
  [147, 'ResistWater'],
  [151, 'EndCast'],
  [164, 'EndCast%'],
  [165, 'AlterSpDmg'],
  [179, 'FindTrapsValue'],
  [180, 'PickLocksValue'],
  [1001, 'Thievery'],
  [1002, 'Lockpicking'],
  [1003, 'Traps'],
  [1004, 'Tracking'],
  [1103, 'Shadowrest'],
  [9998, 'HPPerLVL'],
  [9999, 'Classes'],
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

// Used to display the Abilities for classes
export const allClassValuesAbilities = allValues.filter(
  (value) => ![59].includes(value),
);

// Used to display the Abilities for monsters
export const allMonsterValuesAbilities = allValues.filter(
  (value) => ![109, 123].includes(value),
);

// Used to display extra info on spells
export const allSpellValuesAbilities = allValues.filter(
  (value) => ![144].includes(value),
);
