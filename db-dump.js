import fs from 'fs';

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
