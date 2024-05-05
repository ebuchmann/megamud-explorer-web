import {
  characters,
  selectedCharacter,
  setSelectedCharacter,
} from '../../state/character-state';

export function CharacterSelect() {
  return (
    <>
      <fieldset>
        <legend>Highlight Equipment</legend>
        <select
          value={selectedCharacter()}
          onChange={(e) => setSelectedCharacter(e.target.value)}
        >
          <option value="-1">No Character Selected</option>
          {characters.map((char) => (
            <option value={char.id}>{char.name}</option>
          ))}
        </select>
      </fieldset>
    </>
  );
}
