import fs from 'fs';
import prettier from 'prettier';
import { allValues, specialProperties } from './src/utils/values.js';

const numberRegex = /([0-9.]+)/g;

const itemData = JSON.parse(fs.readFileSync('./db/items.json', 'utf8'));
const classData = JSON.parse(fs.readFileSync('./db/classes.json', 'utf8'));
const raceData = JSON.parse(fs.readFileSync('./db/races.json', 'utf8'));
const monsterData = JSON.parse(fs.readFileSync('./db/monsters.json', 'utf8'));
const spellData = JSON.parse(fs.readFileSync('./db/spells.json', 'utf8'));
const shopData = JSON.parse(fs.readFileSync('./db/shops.json', 'utf8'));

const allWeapons = [];
const allArmor = [];
const allItems = [];
const allClasses = [];
const allRaces = [];
const allMonsters = [];
const allSpells = [];
const allShops = [];

for (const index in itemData) {
  const original = itemData[index];
  if (original['In Game'] === 0) continue;

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

    if (original['Obtained From']) {
      item.Obtained = obtainedFrom(original['Obtained From']);
    }

    allWeapons.push(item);
  } else if (original['ItemType'] === 0) {
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

    if (original['Obtained From']) {
      item.Obtained = obtainedFrom(original['Obtained From']);
    }

    allArmor.push(item);
  } else if (original['ItemType'] > 1) {
    const newItem = {
      Number: original.Number,
      Name: original.Name,
      ItemType: original.ItemType,
      UseCount: original.UseCount,
      Price: original.Price,
      Currency: original.Currency,
      Encum: original.Encum,
    };

    for (let x = 0; x < 20; x++) {
      if (allValues.includes(original[`Abil-${x}`])) {
        const key = specialProperties.get(original[`Abil-${x}`]);
        if (key === 'ClassOk') {
          if (!newItem[key]) newItem[key] = [];
          newItem[key].push(original[`AbilVal-${x}`]);
        } else {
          newItem[key] = original[`AbilVal-${x}`];
        }
      }
    }

    if (original['Obtained From']) {
      newItem.Obtained = obtainedFrom(original['Obtained From']);
    }

    allItems.push(newItem);
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

  for (let x = 0; x < 10; x++) {
    if (original[`DropItem-${x}`] !== 0) {
      if (!item.Drops) item.Drops = [];

      const droppedItem = {
        Number: original[`DropItem-${x}`],
        Percent: original[`DropItem%-${x}`],
      };

      item.Drops.push(droppedItem);
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

      const spell = {
        Name: original[`AttName-${x}`],
        'AttTrue%': original[`AttTrue%-${x}`].toFixed(1),
        Number: original[`AttAcc-${x}`],
        Success: original[`AttMin-${x}`],
        Level: original[`AttMax-${x}`],
        Energy: original[`AttEnergy-${x}`],
      };

      item.Spells.push(spell);
    }
  }

  allMonsters.push(item);
}

for (const index in spellData) {
  const original = spellData[index];

  const item = {
    Number: original.Number,
    Name: original.Name ?? '',
    ReqLevel: original.ReqLevel,
    MinBase: original.MinBase,
    MinInc: original.MinInc,
    MinIncLVLs: original.MinIncLVLs,
    MaxBase: original.MaxBase,
    MaxInc: original.MaxInc,
    MaxIncLVLs: original.MaxIncLVLs,
    Dur: original.Dur,
    DurInc: original.DurInc,
    DurIncLVLs: original.DurIncLVLs,
    Cap: original.Cap,
    Magery: original.Magery,
    MageryLVL: original.MageryLVL,
    ManaCost: original.ManaCost,
    AttType: original.AttType,
    TypeOfResists: original.TypeOfResists,
    Targets: original.Targets,
    Learnable: original.Learnable,
    Short: original.Short,
  };

  if (original.EnergyCost > 0) item.EnergyCost = original.EnergyCost;

  for (let x = 0; x < 10; x++) {
    if (allValues.includes(original[`Abil-${x}`])) {
      const key = specialProperties.get(original[`Abil-${x}`]);

      if (key === 'RemovesSpell') {
        if (!item.RemovesSpell) item.RemovesSpell = [];
        item.RemovesSpell.push(original[`AbilVal-${x}`]);
      } else {
        item[key] = original[`AbilVal-${x}`];
      }
    }
  }

  allSpells.push(item);
}

for (const index in shopData) {
  const original = shopData[index];

  if (original['In Game'] === 0) continue;

  const shop = {
    Number: original.Number,
    Name: original.Name,
    ShopType: original.ShopType,
    MinLVL: original.MinLVL,
    MaxLVL: original.MaxLVL,
    'Markup%': original['Markup%'],
    ClassRest: original.ClassRest,
  };

  for (let x = 0; x < 20; x++) {
    if (original[`Item-${x}`] === 0) continue;

    if (!shop.Inventory) shop.Inventory = [];

    const item = {
      Number: original[`Item-${x}`],
      Max: original[`Max-${x}`],
      Time: original[`Time-${x}`],
      Amount: original[`Amount-${x}`],
      Percent: original[`%-${x}`],
    };

    shop.Inventory.push(item);
  }

  allShops.push(shop);
}

function obtainedFrom(value) {
  const values = value.split(',');
  const Obtained = {};

  values.forEach((val) => {
    if (val.includes('Shop')) {
      if (val.includes('sell')) {
        if (!Obtained.sell) Obtained.sell = [];
        Obtained.sell.push(Number(val.match(numberRegex)[0]));
      } else if (val.includes('nogen')) {
        if (!Obtained.nogen) Obtained.nogen = [];
        Obtained.nogen.push(Number(val.match(numberRegex)[0]));
      } else {
        if (!Obtained.buy) Obtained.buy = [];
        Obtained.buy.push(Number(val.match(numberRegex)[0]));
      }
    } else if (val.includes('Monster')) {
      if (!Obtained.monster) Obtained.monster = [];
      Obtained.monster.push(val.match(numberRegex).join('|'));
    } else if (val.includes('Item')) {
      if (!Obtained.item) Obtained.item = [];
      Obtained.item.push(val.match(numberRegex).join('|'));
    } else if (val.includes('Room')) {
      if (!Obtained.room) Obtained.room = [];
      Obtained.room.push(val.match(numberRegex).join('|'));
    } else if (val.includes('Textblock')) {
      if (!Obtained.text) Obtained.text = [];
      const result = val.match(numberRegex);
      result.length > 1
        ? Obtained.text.push(result.join('|'))
        : Obtained.text.push(Number(result[0]));
    }
  });

  return Obtained;
}

async function formatFile(content, type, name) {
  const contentString = `
    import { ${type} } from '../types'

    export const ${name}: ${type}[] = ${JSON.stringify(content)}
  `;

  return await prettier.format(contentString, { parser: 'babel-ts' });
}

try {
  fs.writeFileSync(
    './src/data/weapons.ts',
    await formatFile(allWeapons, 'Weapon', 'weaponData'),
  );
  fs.writeFileSync(
    './src/data/armor.ts',
    await formatFile(allArmor, 'Armor', 'armorData'),
  );
  fs.writeFileSync(
    './src/data/classes.ts',
    await formatFile(allClasses, 'Class', 'classData'),
  );
  fs.writeFileSync(
    './src/data/races.ts',
    await formatFile(allRaces, 'Race', 'raceData'),
  );
  fs.writeFileSync(
    './src/data/monsters.ts',
    await formatFile(allMonsters, 'Monster', 'monsterData'),
  );
  fs.writeFileSync(
    './src/data/items.ts',
    await formatFile(allItems, 'Item', 'itemData'),
  );
  fs.writeFileSync(
    './src/data/spells.ts',
    await formatFile(allSpells, 'Spell', 'spellData'),
  );
  fs.writeFileSync(
    './src/data/shops.ts',
    await formatFile(allShops, 'Shop', 'shopData'),
  );
} catch (err) {
  console.error(err);
}
