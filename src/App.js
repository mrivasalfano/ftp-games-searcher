import './App.css';
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
