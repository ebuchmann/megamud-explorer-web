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
