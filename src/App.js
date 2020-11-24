
import { useState, useEffect } from 'react';
import importedSongs from './util/data';
import Player from "./components/Player";
import SongDetails from "./components/SongDetails";
import Library from './components/Library';
import Header from './components/Header';

import './styles/app.scss';

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);
  const [showingLibrary, setShowingLibrary] = useState(false);

  useEffect(() => {
    //i tried to simulate something like a fetch with this useeffect
    const songsData = importedSongs();
    setActiveSongWithIndex(songsData);
    setSongs(songsData);
  }, []);

  function setActiveSongWithIndex(songs) {
    const songIndex = songs.findIndex(song => song.active);
    if (songIndex !== -1) {
      setCurrentSongIndex(songIndex);
      setCurrentSong(songs[songIndex]);
    }
  }

  const selectSongHandler = (song, songIndex) => {
    const songsModified = songs.map(mappedSong => {
      return { ...mappedSong, active: mappedSong.id === song.id };
    });
    setSongs(songsModified);
    setCurrentSong(song);
    setCurrentSongIndex(songIndex);
  }

  const skipTrackHandler = (direction) => {
    if (typeof direction !== 'number') {
      return;
    }

    let index = currentSongIndex + direction;
    if (index < 0) {
      index = songs.length - 1;
    }
    if (index > songs.length - 1) {
      index = 0;
    }

    selectSongHandler(songs[index], index);
  }

  return (
    <div className={`App ${showingLibrary ? 'library-is-showing' : ''}`}>
      <Header
        showingLibrary={showingLibrary}
        setShowingLibrary={setShowingLibrary}
      />
      {currentSong ?
        <>
          <SongDetails currentSong={currentSong} />
          <Player
            currentSong={currentSong}
            skipTrackHandler={skipTrackHandler}
          />
        </>
        :
        <div className="loading-active-song">Loading the active song...</div>
      }
      <Library
        songs={songs}
        showingLibrary={showingLibrary}
        selectSongHandler={selectSongHandler}
      />
    </div>
  );
}

export default App;
