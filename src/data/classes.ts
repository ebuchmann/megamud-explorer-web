import { Class } from "../types";

export const classData: Class[] = [
  {
    Number: 1,
    Name: "Warrior",
    MinHits: 7,
    MaxHits: 4,
    ExpTable: 80,
    MageryType: 0,
    MageryLVL: 0,
    WeaponType: 8,
    ArmourType: 9,
    CombatLVL: 6,
    Bash: 0,
  },
  {
    Number: 2,
    Name: "Witchunter",
    MinHits: 7,
    MaxHits: 5,
    ExpTable: 75,
    MageryType: 0,
    MageryLVL: 0,
    WeaponType: 8,
    ArmourType: 8,
    CombatLVL: 7,
    Bash: 0,
    AntiMagic: 0,
    HitMagic: 10,
  },
  {
    Number: 3,
    Name: "Paladin",
    MinHits: 6,
    MaxHits: 4,
    ExpTable: 180,
    MageryType: 2,
    MageryLVL: 1,
    WeaponType: 8,
    ArmourType: 9,
    CombatLVL: 6,
    Bash: 0,
  },
  {
    Number: 4,
    Name: "Cleric",
    MinHits: 5,
    MaxHits: 4,
    ExpTable: 150,
    MageryType: 2,
    MageryLVL: 2,
    WeaponType: 7,
    ArmourType: 9,
    CombatLVL: 5,
    Bash: 0,
  },
  {
    Number: 5,
    Name: "Priest",
    MinHits: 4,
    MaxHits: 3,
    ExpTable: 120,
    MageryType: 2,
    MageryLVL: 3,
    WeaponType: 9,
    ArmourType: 1,
    CombatLVL: 3,
    Bash: 0,
  },
  {
    Number: 6,
    Name: "Missionary",
    MinHits: 5,
    MaxHits: 3,
    ExpTable: 130,
    MageryType: 2,
    MageryLVL: 2,
    WeaponType: 4,
    ArmourType: 6,
    CombatLVL: 5,
    ClassStealth: 0,
    Traps: 0,
    Lockpicking: 0,
    Bash: 0,
    Shadowrest: 0,
  },
  {
    Number: 7,
    Name: "Ninja",
    MinHits: 5,
    MaxHits: 4,
    ExpTable: 125,
    MageryType: 0,
    MageryLVL: 0,
    WeaponType: 8,
    ArmourType: 2,
    CombatLVL: 5,
    Bash: 0,
    ClassStealth: 0,
    Lockpicking: 0,
    Traps: 0,
    Tracking: 0,
    Dodge: 25,
    Crits: 10,
    Shadowrest: 0,
  },
  {
    Number: 8,
    Name: "Thief",
    MinHits: 5,
    MaxHits: 3,
    ExpTable: 50,
    MageryType: 0,
    MageryLVL: 0,
    WeaponType: 4,
    ArmourType: 6,
    CombatLVL: 5,
    ClassStealth: 0,
    Thievery: 10,
    Lockpicking: 0,
    Bash: 0,
    Traps: 10,
    Stealth: 20,
    Shadowrest: 0,
  },
  {
    Number: 9,
    Name: "Bard",
    MinHits: 5,
    MaxHits: 3,
    ExpTable: 120,
    MageryType: 4,
    MageryLVL: 2,
    WeaponType: 4,
    ArmourType: 6,
    CombatLVL: 5,
    ClassStealth: 0,
    Lockpicking: 0,
    Thievery: 0,
    Traps: 0,
    Bash: 0,
    Shadowrest: 0,
  },
  {
    Number: 10,
    Name: "Gypsy",
    MinHits: 5,
    MaxHits: 3,
    ExpTable: 120,
    MageryType: 1,
    MageryLVL: 2,
    WeaponType: 4,
    ArmourType: 6,
    CombatLVL: 4,
    ClassStealth: 0,
    Traps: 0,
    Thievery: 0,
    Lockpicking: 0,
    Bash: 0,
    Shadowrest: 0,
  },
  {
    Number: 11,
    Name: "Warlock",
    MinHits: 5,
    MaxHits: 4,
    ExpTable: 120,
    MageryType: 1,
    MageryLVL: 2,
    WeaponType: 4,
    ArmourType: 7,
    CombatLVL: 5,
    Bash: 0,
  },
  {
    Number: 12,
    Name: "Mage",
    MinHits: 4,
    MaxHits: 3,
    ExpTable: 140,
    MageryType: 1,
    MageryLVL: 3,
    WeaponType: 9,
    ArmourType: 1,
    CombatLVL: 3,
    Bash: 0,
  },
  {
    Number: 13,
    Name: "Druid",
    MinHits: 5,
    MaxHits: 3,
    ExpTable: 145,
    MageryType: 3,
    MageryLVL: 3,
    WeaponType: 7,
    ArmourType: 6,
    CombatLVL: 4,
    Bash: 0,
    ClassOk: [74],
  },
  {
    Number: 14,
    Name: "Ranger",
    MinHits: 6,
    MaxHits: 4,
    ExpTable: 150,
    MageryType: 3,
    MageryLVL: 1,
    WeaponType: 8,
    ArmourType: 6,
    CombatLVL: 6,
    Bash: 0,
    Tracking: 0,
    ClassStealth: 0,
    Shadowrest: 0,
  },
  {
    Number: 15,
    Name: "Mystic",
    MinHits: 5,
    MaxHits: 4,
    ExpTable: 180,
    MageryType: 5,
    MageryLVL: 1,
    WeaponType: 9,
    ArmourType: 1,
    CombatLVL: 5,
    ClassStealth: 0,
    Dodge: 25,
    Punch: 1,
    Kick: 1,
    JumpKick: 1,
    HitMagic: 6,
    Crits: 10,
    Bash: 0,
    Shadowrest: 0,
  },
];
