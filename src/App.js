import './App.css';
import Home from './components/Home';
import Footer from './components/Footer';
import GameList from './components/GameList';

function App() {
  return (
    <>
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
