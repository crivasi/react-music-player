import LibrarySong from "./LibrarySong"

const Library = ({ songs, selectSongHandler, showingLibrary }) => {
  return (
    <div className={`library ${showingLibrary ? 'library--shown' : ''}`}>
      <h2>Library</h2>
      {songs.map(
        (song, index) =>
          <LibrarySong
            song={song}
            songIndex={index}
            key={song.id}
            selectSongHandler={selectSongHandler}
          />
      )}
    </div>
  )
}

export default Library;
