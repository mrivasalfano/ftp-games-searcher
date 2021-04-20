import React, { Component } from 'react';
import { getAll} from '../utils/gameApiRequests';
import GameCard from './GameCard';
import { MdNavigateNext } from 'react-icons/md';
import { MdNavigateBefore } from 'react-icons/md';
import { MdExpandMore } from 'react-icons/md';
class GameList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [],
            selectedSort: 'relevance',
            gamesToShow: 5,
            showGamesFrom: 0,
            selectedTags: [],
            selectedPlatform: ''
        }
    }

    componentDidMount = () => {
        this.getAllGames();
    }

    getAllGames = async() => {
        try {
            const response = await getAll(this.state.selectedSort, this.state.selectedTags, this.state.selectedPlatform);
            console.log(response.data.length);
            if (response.status === 200)
                this.setState({games: response.data})
        } catch (error) {
            console.log(error);
        }
    }
    
    renderGames = (games, from, quantity) => {
        const gamesElements = [];

        if (games.length > 0) {
            let i = from;

            while (i < from+quantity && i < games.length ) {
                const game = games[i];
                gamesElements.push(<GameCard key={i} title={game.title} thumbnail={game.thumbnail} short_description={game.short_description}/>);
                i++;
            }
        }

        return gamesElements;
    }

    showNextGames = () => {
        if (this.state.showGamesFrom >= this.state.games.length - this.state.gamesToShow)
            return;

        let showGamesFrom = this.state.showGamesFrom + this.state.gamesToShow;

        if (showGamesFrom > this.state.games.length)
            return;

        this.setState({showGamesFrom});
        document.getElementsByTagName('main')[0].scrollIntoView();
    }

    showPreviousGames = () => {
        if (this.state.showGamesFrom === 0)
            return;
        let showGamesFrom = this.state.showGamesFrom - this.state.gamesToShow;

        if (showGamesFrom < 0)
            showGamesFrom = 0;

        this.setState({ showGamesFrom });
        document.getElementsByTagName('main')[0].scrollIntoView();
    }

    render() {
        const {games, showGamesFrom, gamesToShow} = this.state;

        return (
            <div className="bg-gray-100 w-screen px-6 py-5">
                <span>{games.length} resultados</span>
                {this.renderGames(games, showGamesFrom, gamesToShow)}

                <div className="text-center">
                    <MdNavigateBefore style={{ fontSize: "40px" }} className="inline-block" onClick={this.showPreviousGames}/>
                    <span className="mx-10">{showGamesFrom + gamesToShow < games.length ? `${showGamesFrom + 1} - ${showGamesFrom + gamesToShow}` : `${showGamesFrom + 1} - ${games.length}`}</span>
                    <MdNavigateNext style={{fontSize: "40px"}} className="inline-block" onClick={this.showNextGames}/>
                </div>

            </div>
        );
    }
}

export default GameList;