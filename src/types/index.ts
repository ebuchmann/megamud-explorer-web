export type Weapon = {
  Number: number;
  Name: string;
  WeaponType: number;
  Min: number;
  Max: number;
  Speed: number;
  MinLevel: number;
  StrReq: number;
  Encum: number;
  ArmourClass: number;
  DamageResist: number;
  Accy: number;
  BsAccy: number;
  Crits: number;
  Limit: number;
  // dmg/spd
  // dmg*5
  Magical: number;
};

export type Armor = {
  Number: number;
  Name: string;
  ArmourType: number;
  Worn: number;
  Encum: number;
  ArmourClass: number;
  DamageResist: number;
  MinLevel: number;
  Accy: number;
  Crits: number;
  //ac/enc

  Dodge?: number;
};

export type Class = {
  Number: number;
  Name: string;
  ExpTable: number;
  WeaponType: number;
  ArmourType: number;
  MageryLVL: number;
  MageryType: number;
  CombatLVL: number;
  MinHits: number;
  MaxHits: number;
};

export type Race = {
  Number: number;
  Name: string;
  mINT: number;
  mWIL: number;
  mSTR: number;
  mHEA: number;
  mAGL: number;
  mCHM: number;
  xINT: number;
  xWIL: number;
  xSTR: number;
  xHEA: number;
  xAGL: number;
  xCHM: number;
  HPPerLVL?: number;
  ExpTable: number;
  BaseCP: number;
};

export type Monster = {
  Number: number;
  Name: string;
  Weapon: number;
  ArmourClass: number;
  DamageResist: number;
  MagicRes: number;
  EXP: number;
  HP: number;
  Undead: number;
  Magical: number;
  Rcol?: number;
  Rfir?: number;
  Rlit?: number;
  Dodge?: number;
  ResistStone?: number;
  ImmuPoison?: number;
  ResistWater?: number;
};

export type Character = {
  id: string;
  name: string;
  cls: number;
  race: number;
  level: number;
  str: number;
  int: number;
  wil: number;
  agl: number;
  hea: number;
  chm: number;
  worn: Record<number, number>;
};
