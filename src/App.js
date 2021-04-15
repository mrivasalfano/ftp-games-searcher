import logo from './logo.svg';
import './App.css';
import {getAll, get} from './utils/gameApiRequests';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import GameList from './components/GameList';

function App() {
  return (
    <>
      {/* <Navbar/> */}
      <header>
        <Home/>
      </header>
      <main>
      <GameList/>
      </main>
      <Footer/>
    </>
  );
}

export default App;
