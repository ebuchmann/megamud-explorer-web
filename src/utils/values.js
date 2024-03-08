export const specialProperties = new Map([
  [1, 'Damage(No AC)'],
  [2, 'AC'],
  [3, 'Rcol'],
  [4, 'MaxDamage'],
  [5, 'Rfir'],
  [6, 'Enslave'],
  [7, 'DR'],
  [8, 'Drain'],
  [9, 'Shadow'],
  [10, 'AC(Blur)'],
  [12, 'Summon'],
  [13, 'Illu'],
  [14, 'RoomIllu'],
  [15, 'AlterHunger'],
  [17, 'Damage(-MR)'],
  [18, 'Heal'],
  [19, 'Poison'],
  [20, 'CurePoison'],
  [21, 'ImmuPoison'],
  [22, 'Accuracy'],
  [23, 'AffectUndead'],
  [24, 'ProtEvil'],
  [25, 'ProtGood'],
  [27, 'Stealth'],
  [28, 'Magical'],
  [29, 'Punch'],
  [30, 'Kick'],
  [31, 'Bash'],
  [32, 'Smash'],
  [34, 'Dodge'],
  [35, 'JumpKick'],
  [36, 'M.R.'],
  [37, 'Picklocks'],
  [38, 'Tracking'],
  [39, 'Thievery'],
  [40, 'FindTraps'],
  [41, 'DisarmTraps'],
  [42, 'LearnSp'],
  [43, 'CastsSp'],
  [44, 'Intellect'],
  [45, 'Wisdom'],
  [46, 'Strength'],
  [47, 'Health'],
  [48, 'Agility'],
  [49, 'Charm'],
  [50, 'MagebaneQuest'],
  [51, 'AntiMagic'],
  [52, 'EvilInCombat'],
  [54, 'IlluTarget'],
  [56, 'RechargeItem'],
  [57, 'SeeHidden'],
  [58, 'Crits'],
  [59, 'ClassOk'],
  [65, 'ResistStone'],
  [66, 'Rlit'],
  [67, 'Quickness'],
  [68, 'Slowness'],
  [69, 'MaxMana'],
  [70, 'S.C.'],
  [71, 'Confusion'],
  [72, 'ShockShield'],
  [73, 'Dispel'],
  [74, 'HoldPerson'],
  [77, 'Percep'],
  [78, 'Animal'],
  [79, 'MageBind'],
  [80, 'AffectsAnimals'],
  [81, 'Freedom'],
  [82, 'Cursed'],
  [83, 'MajorCurse'],
  [84, 'RemoveCurse'],
  [85, 'Shatter'],
  [86, 'Quality'],
  [87, 'Speed'],
  [88, 'Alter HP'],
  [89, 'PunchAcc'],
  [90, 'KickAcy'],
  [91, 'JumpKAcy'],
  [92, 'PunchDmg'],
  [93, 'KickDmg'],
  [94, 'JumpKDmg'],
  [96, 'Encum'],
  [97, 'GoodOnly'],
  [98, 'EvilOnly'],
  [99, 'AlterDRpercent'],
  [100, 'LoyalItem'],
  [101, 'ConfuseMsg'],
  [102, 'RacialStealth'],
  [103, 'ClassStealth'],
  [107, 'BlindUser'],
  [108, 'AffectsLivingOnly'],
  [109, 'NonLiving'], // monsters, not that useful as undead -> 1 is the same
  [110, 'NotGood'],
  [111, 'NotEvil'],
  [112, 'NeutralOnly'],
  [113, 'NotNeutral'],
  [114, '% Spell'],
  [115, 'DescMsg'],
  [116, 'BsAccu'],
  [117, 'BsMinDmg'],
  [118, 'BsMaxDmg'],
  [119, 'Del@Maint'],
  [120, 'StartMsg'],
  [121, 'Recharge'],
  [122, 'RemovesSpell'],
  [123, 'HPRegen'],
  [124, 'Negate Ability'],
  // [125, 'IceSorceressQst'],
  // [126, 'GoodQuest'],
  // [127, 'NeutralQuest'],
  // [128, 'EvilQuest'],
  // [129, 'DarkDruidQuest'],
  // [130, 'BloodChampQuest'],
  // [131, 'AdultRedDragon'],
  // [132, 'WereratQuest'],
  // [133, 'PhoenixQuest'],
  // [134, 'DaoLordQuest'],
  [135, 'MinLevel'],
  [136, 'MaxLevel'],
  // [137, 'ShockMsg'],
  // [138, 'RoomVisible'],
  [139, 'SpellImmune'],
  // [140, 'Teleport Room'],
  // [141, 'Teleport map'],
  [142, 'HitMagic'],
  [143, 'Clear'],
  [144, 'NonMagicalSpell'],
  [145, 'ManaRgn'],
  [146, 'MonsGuards'],
  [147, 'ResistWater'],
  [149, 'Remove@Maint'],
  [150, 'HealMana'],
  [151, 'EndCast'],
  [158, 'ReqToHit'],
  [164, 'EndCast%'],
  [165, 'AlterSpDmg'],
  [166, 'AlterSpLength'],
  [170, 'Sleep'],
  [178, 'Shadowform'],
  [179, 'FindTrapsValue'],
  [180, 'PickLocksValue'],
  [189, 'Witchy badges'],
  [1001, 'Thievery'],
  [1002, 'Lockpicking'],
  [1003, 'Traps'],
  [1004, 'Tracking'],
  [1103, 'Shadowrest'],
  [1109, 'Enchant'],
  [1113, 'VileWard'],
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

export const allItemValuesAbilities = allValues.filter(
  (value) => ![28, 96].includes(value),
);
