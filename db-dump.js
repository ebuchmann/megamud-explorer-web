import fs from 'fs';
import { exec as execCallback } from 'child_process';
import { promisify } from 'util';

const exec = promisify(execCallback, () => {});

const tableList = [
  'Classes',
  'Info',
  'Items',
  'Monsters',
  'Races',
  'Rooms',
  'Shops',
  'Spells',
  'TBInfo',
];

for await (const table of tableList) {
  await exec(
    `mdb-json './db/Paramud Data 1.6 Final 3-13-24.mdb' ${table} > './db/${table.toLowerCase()}.json'`,
  );
}

function formatFile(path) {
  const file = fs.readFileSync(path, 'utf8');

  if (file.startsWith('[')) return;

  const data = `[${file.replaceAll('}\n', '},')}]`.replace(',]', ']');

  fs.writeFileSync(path, data);
}

formatFile('./db/classes.json');
formatFile('./db/items.json');
formatFile('./db/monsters.json');
formatFile('./db/races.json');
formatFile('./db/rooms.json');
formatFile('./db/shops.json');
formatFile('./db/spells.json');
formatFile('./db/tbinfo.json');
