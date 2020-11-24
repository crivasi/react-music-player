const LibrarySong = ({ song, songIndex, selectSongHandler }) => {
  return (
    <div
      className={`library-song ${song.active ? 'active' : ''}`}
      onClick={() => selectSongHandler(song, songIndex)}>
      <img
        src={song.cover}
        alt={song.name}
      />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  )
}

export default LibrarySong
