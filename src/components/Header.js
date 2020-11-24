import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from '@fortawesome/free-solid-svg-icons';

const Header = ({ showingLibrary, setShowingLibrary }) => {
  const showLibrary = () => {
    setShowingLibrary(!showingLibrary);
  }
  return (
    <header>
      <h1>Player instinct</h1>
      <nav>
        <button
          className={showingLibrary ? 'active' : ''}
          onClick={showLibrary}>
          <FontAwesomeIcon icon={faMusic} />
          Library
        </button>
      </nav>
    </header>
  )
}

export default Header;
