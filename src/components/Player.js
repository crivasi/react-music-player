import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Player = ({ currentSong, skipTrackHandler }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    missingProgress: 0
  });
  const audioRef = useRef(null);

  useEffect(() => {
    const autoPlaySong = () => {
      if (isPlaying) {
        // the promise need to be checked before audio plays, else appears an error in the console
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            audioRef.current.play();
          }).catch(() => {
            console.info('Once the audio source is loaded, it will play...');
          });
        }
      }
    }
    autoPlaySong();
  }, [currentSong, isPlaying])

  const playSongHandler = () => {
    audioRef.current.volume = 0.07;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  const secondsToMinutes = (time) => {
    return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
  }

  const updateCurrentMinutes = (e) => {
    const roundedCurrent = e.target.currentTime;
    const roundedDuration = songInfo.duration;
    const percentage = (roundedCurrent / roundedDuration) * 100;
    setSongInfo({ ...songInfo, currentTime: e.target.currentTime, missingProgress: percentage });
  }

  const updateDurationMinutes = (e) => {
    setSongInfo({ ...songInfo, duration: e.target.duration });
  }

  const dragControlHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
  }

  return (
    <div className="player">
      <div className="time-control">
        <p>{secondsToMinutes(songInfo.currentTime)}</p>
        <div
          className="track-progress"
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
        >
          <input
            type="range"
            min="0"
            max={songInfo.duration}
            value={songInfo.currentTime}
            onChange={dragControlHandler}
            step="any"
          />
          <div
            className="track-missing-progress"
            style={{ transform: `translateX(${songInfo.missingProgress}%)` }}
          ></div>
        </div>
        <p>{secondsToMinutes(songInfo.duration)}</p>
      </div>
      <div className="play-controls">
        <FontAwesomeIcon
          icon={faAngleLeft}
          size="2x"
          onClick={() => skipTrackHandler(-1)}
        />
        <FontAwesomeIcon
          icon={isPlaying ? faPause : faPlay}
          size="2x"
          onClick={playSongHandler}
        />
        <FontAwesomeIcon
          icon={faAngleRight}
          size="2x"
          onClick={() => skipTrackHandler(1)}
        />
      </div>
      <audio
        onTimeUpdate={updateCurrentMinutes}
        onLoadedMetadata={updateDurationMinutes}
        src={currentSong.audio}
        ref={audioRef}
        onEnded={() => skipTrackHandler(1)}
      />
    </div>
  )
}

export default Player;
