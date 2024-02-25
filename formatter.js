import data from './items.json' with { type: 'json' };
import fs from 'fs';
import { allValues, specialProperties } from './src/utils/values.js';

const allWeapons = [];
const allArmor = [];

for (const index in data) {
  const original = data[index];
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
    // Merge the three "Leather" ArmourTypes into one
    if ([4, 5, 6].includes(original['ArmourType'])) {
      item.ArmourType = 3;
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

try {
  fs.writeFileSync(
    './src/data/weapons.json',
    JSON.stringify(allWeapons, null, 2),
  );
  fs.writeFileSync('./src/data/armor.json', JSON.stringify(allArmor, null, 2));
  // file written successfully
} catch (err) {
  console.error(err);
}
