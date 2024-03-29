type Obtained = {
  buy?: number[];
  sell?: number[];
  nogen?: number[];
  item?: string[];
  monster?: string[];
  room?: string[];
  text?: (string | number)[];
};

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
  ItemType: number;
  UseCount: number;
  Price: number;
  Currency: number;
  ArmourClass: number;
  DamageResist: number;
  ArmourType: number;
  Worn: number;
  Gettable: number;
  Accy: number;
  Dodge?: number;
  BsAccy?: number;
  BsMaxDmg?: number;
  BsMinDmg?: number;
  FindTrapsValue?: number;
  PickLocksValue?: number;
  Stealth?: number;
  LoyalItem?: number;
  Cursed?: number;
  Crits?: number;
  Limit: number;
  Magical?: number;
  Quality?: number;
  HitMagic?: number;
  AlterSpDmg?: number;
  BsAccu?: number;
  PunchAcc?: number;
  PunchDmg?: number;
  KickDmg?: number;
  JumpKDmg?: number;
  NotGood?: number;
  EvilOnly?: number;
  NeutralOnly?: number;
  GoodOnly?: number;
  ProtEvil?: number;
  ProtGood?: number;
  CastsSp?: number;
  'Alter HP'?: number;
  'Del@Maint'?: number;
  '% Spell'?: number;
  'M.R.'?: number;
  'S.C.'?: number;
  'AC(Blur)'?: number;
  MaxDamage?: number;
  MaxMana?: number;
  ManaRgn?: number;
  HPRegen?: number;
  Recharge?: number;
  Illu?: number;
  RoomIllu?: number;
  IlluTarget?: number;
  Rcol?: number;
  Rfir?: number;
  Rlit?: number;
  ResistStone?: number;
  ResistWater?: number;
  Accuracy?: number;
  Strength?: number;
  Agility?: number;
  Wisdom?: number;
  Shadow?: number;
  Classes?: number[];
  ClassOk?: number[];
  Obtained?: Obtained;
};

export type Armor = {
  Number: number;
  Name: string;
  Limit: number;
  ItemType: number;
  UseCount: number;
  Price: number;
  Currency: number;
  ArmourType: number;
  WeaponType: number;
  Worn: number;
  Gettable: number;
  StrReq: number;
  Speed: number;
  Encum: number;
  ArmourClass: number;
  DamageResist: number;
  MinLevel: number;
  Min: number;
  Max: number;
  Accy: number;
  AC?: number;
  DR?: number;
  Crits?: number;
  Dodge?: number;
  Magical?: number;
  Stealth?: number;
  'Del@Maint'?: number;
  Percep?: number;
  Illu?: number;
  RoomIllu?: number;
  Accuracy?: number;
  ImmuPoison?: number;
  Quality?: number;
  LoyalItem?: number;
  ManaRgn?: number;
  Rcol?: number;
  Rlit?: number;
  Rfir?: number;
  ResistStone?: number;
  ResistWater?: number;
  HPRegen?: number;
  MaxDamage?: number;
  PunchDmg?: number;
  PunchAcc?: number;
  KickDmg?: number;
  JumpKDmg?: number;
  ProtGood?: number;
  GoodOnly?: number;
  ProtEvil?: number;
  EvilOnly?: number;
  NeutralOnly?: number;
  NotGood?: number;
  'Alter HP'?: number;
  'AC(Blur)'?: number;
  MaxMana?: number;
  Recharge?: number;
  CastsSp?: number;
  'M.R.'?: number;
  'S.C.'?: number;
  BsMinDmg?: number;
  BsMaxDmg?: number;
  BsAccu?: number;
  RemovesSpell?: number;
  FindTrapsValue?: number;
  PickLocksValue?: number;
  Shadow?: number;
  Strength?: number;
  Intellect?: number;
  Wisdom?: number;
  Quickness?: number;
  Cursed?: number;
  AlterSpDmg?: number;
  ClassOk?: number[];
  Classes?: number[];
  Obtained?: Obtained;
};

export type Item = {
  Number: number;
  Name: string;
  ItemType: number;
  UseCount: number;
  Price: number;
  Currency: number;
  Encum: number;
  Magical?: number;
  Quality?: number;

  LearnSp?: number;
  Recharge?: number;
  CastsSp?: number;
  'Del@Maint'?: number;
  'Remove@Maint'?: number;
  Stealth?: number;
  MinLevel?: number;
  ClassOk?: number[];
  Rcol?: number;
  ResistStone?: number;
  LoyalItem?: number;
  Illu?: number;
  IlluTarget?: number;
  RoomIllu?: number;
  Cursed?: number;

  Obtained?: Obtained;
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
  AntiMagic?: number;
  Bash?: number;
  ClassStealth?: number;
  Crits?: number;
  Dodge?: number;
  HitMagic?: number;
  Lockpicking?: number;
  Shadowrest?: number;
  Stealth?: number;
  Thievery?: number;
  Tracking?: number;
  Traps?: number;
  Punch?: number;
  Kick?: number;
  JumpKick?: number;
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
  Accuracy?: number;
  DR?: number;
  AC?: number;
  'M.R.'?: number;
  Illu?: number;
  Encum?: number;
  RacialStealth?: number;
  ManaRgn?: number;
  Dodge?: number;
  Traps?: number;
  Lockpicking?: number;
  Crits?: number;
  ImmuPoison?: number;
  Tracking?: number;
  Rfir?: number;
  Rcol?: number;
  Percep?: number;
};

export type MonsterAttack = {
  Name: string;
  Acc: number;
  'AttTrue%': string;
  Min: number;
  Max: number;
  Energy: number;
  HitSpell?: number;
};

export type MonsterSpell = {
  Name: string;
  'AttTrue%': string;
  Number: number;
  Success: number;
  Level: number;
  Energy: number;
};

export type MonsterDrop = {
  Number: number;
  Percent: number;
};

export type Monster = {
  Number: number;
  Name: string;
  Weapon?: number;
  ArmourClass: number;
  DamageResist: number;
  'Follow%': number;
  MagicRes: number;
  EXP: number;
  HP: number;
  HPRegen: number;
  CharmLVL: number;
  Type: number;
  Undead: number;
  Align: number;
  Magical: number;
  Money: number[];
  RegenTime?: number;
  Rcol?: number;
  Rfir?: number;
  Rlit?: number;
  Dodge?: number;
  ResistStone?: number;
  ImmuPoison?: number;
  NonLiving?: number;
  ResistWater?: number;
  Drops?: MonsterDrop[];
  Attacks?: MonsterAttack[];
  Spells?: MonsterSpell[];
  SummonedBy: string[];
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

export type Spell = {
  Number: number;
  Name: string;
  MinBase: number;
  MaxBase: number;
  Dur: number;
  AttType: number;
  Targets: number;
  TypeOfResists: number;
  Learnable: number;
  ReqLevel: number;
  Magery: number;
  MageryLVL: number;
  ManaCost: number;
  Cap: number;
  MaxIncLVLs: number;
  MaxInc: number;
  MinIncLVLs: number;
  MinInc: number;
  DurIncLVLs: number;
  DurInc: number;
  EnergyCost?: number;
  Short?: string;
  LearnedFrom?: string[];
  Abilities: Record<string, number>;
};

export type ShopInventory = {
  Number: number;
  Max: number;
  Time: number;
  Amount: number;
  Percent: number;
};

export type Shop = {
  Number: number;
  Name: string;
  ShopType: number;
  MinLVL: number;
  MaxLVL: number;
  'Markup%': number;
  ClassRest: number;
  AssignedTo: string[];
  Inventory?: ShopInventory[];
};

export type AllItemTypes = Weapon | Armor | Item;

export type RoomLink = string | string[];

export type Room = {
  Name: string;
  MapNum: number;
  RoomNum: number;
  Spell?: number;
  Shop?: number;
  NPC?: number;
  N?: RoomLink;
  NE?: RoomLink;
  E?: RoomLink;
  SE?: RoomLink;
  S?: RoomLink;
  SW?: RoomLink;
  W?: RoomLink;
  NW?: RoomLink;
  U?: RoomLink;
  D?: RoomLink;
  LairMax?: number;
  Lair?: number[];
};

export type Direction =
  | 'N'
  | 'NE'
  | 'E'
  | 'SE'
  | 'S'
  | 'SW'
  | 'W'
  | 'NW'
  | 'U'
  | 'D';
