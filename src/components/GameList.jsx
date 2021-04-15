import React, { Component } from 'react';
import { getAllSortedByParam} from '../utils/gameApiRequests';
import GameCard from './GameCard';

class GameList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [],
            sortParam: 'relevance',
            gamesToShow: 2,
            showGamesFrom: 0,
        }
    }

    componentDidMount = () => {
        this.getAllGames();
    }

    getAllGames = async() => {
        try {
            const response = await getAllSortedByParam(this.state.sortParam);
            console.log('obtengo juegos');
            if (response.status === 200)
                this.setState({games: response.data})
        } catch (error) {
            console.log(error);
        }
    }
    
    renderGames = (games, from, quantity) => {
        const gamesElements = [];

        if (games.length > 0) {
            for (let i = from; i < from+quantity; i++) {
                const game = games[i];
                gamesElements.push(<GameCard title={game.title} thumbnail={game.thumbnail} short_description={game.short_description}/>);
            }
        }

        return gamesElements;
    }

    showNextGames = () => {
        this.setState({ showGamesFrom: this.state.showGamesFrom + this.state.gamesToShow});
    }
    
    render() {
        const {games, showGamesFrom, gamesToShow} = this.state;

        return (
            <div className="bg-gray-200 w-screen py-20 px-6">
                {this.renderGames(games, showGamesFrom, gamesToShow)}
                <button onClick={this.showNextGames}>Siguiente</button>
            </div>
        );
    }
}

export default GameList;