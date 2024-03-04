import infoJSON from '../data/info.json';

export function MainPage() {
  return (
    <div>
      <div>NMR Version: {infoJSON['NMR Version']}</div>
      <div>Dat File Version: {infoJSON['Dat File Version']}</div>
      <div>Date: {infoJSON.Date}</div>
      <div>Time: {infoJSON.Time}</div>
      <div>Custom: {infoJSON.Custom}</div>
    </div>
  );
}
