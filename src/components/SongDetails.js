const SongDetails = ({ currentSong }) => {
  return (
    <div className="song-details">
      <img
        src={currentSong.cover}
        alt={currentSong.name}
      />
      <h1>{currentSong.name}</h1>
      <h2>{currentSong.artist}</h2>
    </div>
  )
}

export default SongDetails
