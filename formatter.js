import fs from 'fs';
import { allValues, specialProperties } from './src/utils/values.js';

const itemData = JSON.parse(fs.readFileSync('./db/items.json', 'utf8'));
const classData = JSON.parse(fs.readFileSync('./db/classes.json', 'utf8'));
const raceData = JSON.parse(fs.readFileSync('./db/races.json', 'utf8'));
const monsterData = JSON.parse(fs.readFileSync('./db/monsters.json', 'utf8'));

const allWeapons = [];
const allArmor = [];
const allClasses = [];
const allRaces = [];
const allMonsters = [];

for (const index in itemData) {
  const original = itemData[index];
  if (original['In Game'] === 0) continue;
  if (original['Gettable'] === 0) continue;

  const item = {
    Number: original.Number,
    Name: original.Name,
    Limit: original.Limit,
    Encum: original.Encum,
    ItemType: original.ItemType,
    UseCount: original.UseCount,
    Price: original.Price,
    Currency: original.Currency,
    Min: original.Min,
    Max: original.Max,
    ArmourClass: original.ArmourClass,
    DamageResist: original.DamageResist,
    WeaponType: original.WeaponType,
    ArmourType: original.ArmourType,
    Worn: original.Worn,
    Accy: original.Accy,
    Gettable: original.Gettable,
    StrReq: original.StrReq,
    Speed: original.Speed,
    MinLevel: 0,
    // 'Not Droppable': 0,
    // 'Destroy On Death': 0,
    // 'Retain After Uses': 1,
  };

  if (original['ItemType'] === 1) {
    for (let x = 0; x < 20; x++) {
      if (allValues.includes(original[`Abil-${x}`])) {
        const key = specialProperties.get(original[`Abil-${x}`]);
        if (key === 'ClassOk') {
          if (!item[key]) item[key] = [];
          item[key].push(original[`AbilVal-${x}`]);
        } else {
          item[key] = original[`AbilVal-${x}`];
        }
      }
    }

    for (let x = 0; x < 10; x++) {
      if (original[`ClassRest-${x}`] > 0) {
        if (!item.Classes) item.Classes = [];
        item.Classes.push(original[`ClassRest-${x}`]);
      }
    }
    allWeapons.push(item);
  } else if (original['Worn'] > 0) {
    // Merge the "Leather" ArmourTypes into one for easier usage
    if ([3, 4, 5, 6].includes(original['ArmourType'])) {
      item.ArmourType = 6;
    }

    for (let x = 0; x < 20; x++) {
      if (allValues.includes(original[`Abil-${x}`])) {
        const key = specialProperties.get(original[`Abil-${x}`]);
        if (key === 'ClassOk') {
          if (!item[key]) item[key] = [];
          item[key].push(original[`AbilVal-${x}`]);
        } else {
          item[key] = original[`AbilVal-${x}`];
        }
      }
    }

    for (let x = 0; x < 10; x++) {
      if (original[`ClassRest-${x}`] > 0) {
        if (!item.Classes) item.Classes = [];
        item.Classes.push(original[`ClassRest-${x}`]);
      }
    }
    allArmor.push(item);
  }
}

for (const index in classData) {
  const original = classData[index];

  const item = {
    Number: original.Number,
    Name: original.Name,
    MinHits: original.MinHits,
    MaxHits: original.MaxHits,
    ExpTable: original.ExpTable,
    MageryType: original.MageryType,
    MageryLVL: original.MageryLVL,
    WeaponType: original.WeaponType,
    ArmourType: original.ArmourType,
    CombatLVL: original.CombatLVL,
  };

  for (let x = 0; x < 20; x++) {
    if (allValues.includes(original[`Abil-${x}`])) {
      const key = specialProperties.get(original[`Abil-${x}`]);
      if (key === 'ClassOk') {
        if (!item[key]) item[key] = [];
        item[key].push(original[`AbilVal-${x}`]);
      } else {
        item[key] = original[`AbilVal-${x}`];
      }
    }
  }

  allClasses.push(item);
}

for (const index in raceData) {
  const original = raceData[index];

  const item = {
    Number: original.Number,
    Name: original.Name,
    mINT: original.mINT,
    mWIL: original.mWIL,
    mSTR: original.mSTR,
    mHEA: original.mHEA,
    mAGL: original.mAGL,
    mCHM: original.mCHM,
    xINT: original.xINT,
    xWIL: original.xWIL,
    xSTR: original.xSTR,
    xHEA: original.xHEA,
    xAGL: original.xAGL,
    xCHM: original.xCHM,
    ExpTable: original.ExpTable,
    BaseCP: original.BaseCP,
  };

  if (original.HPPerLVL > 0) item.HPPerLVL = original.HPPerLVL;

  for (let x = 0; x < 20; x++) {
    if (allValues.includes(original[`Abil-${x}`])) {
      const key = specialProperties.get(original[`Abil-${x}`]);
      if (key === 'ClassOk') {
        if (!item[key]) item[key] = [];
        item[key].push(original[`AbilVal-${x}`]);
      } else if (key === 'DR') {
        item[key] = original[`AbilVal-${x}`] / 10;
      } else {
        item[key] = original[`AbilVal-${x}`];
      }
    }
  }

  allRaces.push(item);
}

for (const index in monsterData) {
  const original = monsterData[index];

  if (original['In Game'] === 0) continue;

  const item = {
    Number: original.Number,
    Name: original.Name,
    Weapon: original.Weapon,
    ArmourClass: original.ArmourClass,
    DamageResist: original.DamageResist,
    'Follow%': original['Follow%'],
    MagicRes: original.MagicRes,
    EXP: original.EXP,
    // ExpMulti: 1,
    HP: original.HP,
    // Energy: 1000,
    // AvgDmg: 9.9,
    // GreetTXT: 23,
    HPRegen: original.HPRegen,
    CharmLVL: original.CharmLVL,
    Type: original.Type,
    Undead: original.Undead,
    Align: original.Align,
    // RegenTime: 0,
    Magical: 0,
  };

  for (let x = 0; x < 10; x++) {
    if (allValues.includes(original[`Abil-${x}`])) {
      const key = specialProperties.get(original[`Abil-${x}`]);

      item[key] = original[`AbilVal-${x}`];
    }
  }

  for (let x = 0; x < 5; x++) {
    if (original[`AttName-${x}`] === 'None') continue;

    if (original[`AttType-${x}`] === 1) {
      if (!item.Attacks) item.Attacks = [];

      const attack = {
        Name: original[`AttName-${x}`],
        Acc: original[`AttAcc-${x}`],
        'AttTrue%': original[`AttTrue%-${x}`].toFixed(1),
        Min: original[`AttMin-${x}`],
        Max: original[`AttMax-${x}`],
        Energy: original[`AttEnergy-${x}`],
      };

      const hitSpell = original[`AttHitSpell-${x}`];
      if (hitSpell > 0) attack.HitSpell = hitSpell;

      item.Attacks.push(attack);
    } else {
      if (!item.Spells) item.Spells = [];

      // "AttName-1": "spiritual hammer",
      // "AttType-1": 2,
      // "AttAcc-1": 5038,
      // "Att%-1": 80,
      // "AttTrue%-1": 47.8,
      // "AttMin-1": 70,
      // "AttMax-1": 10,
      // "AttEnergy-1": 1000,
      // "AttHitSpell-1": 0,
      // "AttName-2": "spiritual hammer",
      // "AttType-2": 2,
      // "AttAcc-2": 5038,
      // "Att%-2": 100,
      // "AttTrue%-2": 19.9,
      // "AttMin-2": 70,
      // "AttMax-2": 10,
      // "AttEnergy-2": 1000,
      // "AttHitSpell-2": 0,

      const spell = {
        Name: original[`AttName-${x}`],
        'AttTrue%': original[`AttTrue%-${x}`].toFixed(1),
        Number: original[`AttAcc-${x}`],
        Success: original[`AttMin-${x}`],
        Level: original[`AttMax-${x}`],
        Energy: original[`AttEnergy-${x}`],
      };

      // Number, Success, Energy, Level
      item.Spells.push(spell);
    }
  }

  allMonsters.push(item);
}

try {
  fs.writeFileSync(
    './src/data/weapons.json',
    JSON.stringify(allWeapons, null, 2),
  );
  fs.writeFileSync('./src/data/armor.json', JSON.stringify(allArmor, null, 2));
  fs.writeFileSync(
    './src/data/classes.json',
    JSON.stringify(allClasses, null, 2),
  );
  fs.writeFileSync('./src/data/races.json', JSON.stringify(allRaces, null, 2));
  fs.writeFileSync(
    './src/data/monsters.json',
    JSON.stringify(allMonsters, null, 2),
  );
} catch (err) {
  console.error(err);
}
