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
