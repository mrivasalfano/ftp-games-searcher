import React, { Component } from 'react';
import { getAll} from '../utils/gameApiRequests';
import GameCard from './GameCard';
import { MdNavigateNext, MdNavigateBefore, MdFilterList, MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
class GameList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [],
            selectedSort: 'relevance',
            gamesToShow: 10,
            showGamesFrom: 0,
            selectedTags: [],
            selectedPlatform: '',
            showFilters: false
        }
    }

    componentDidMount = () => {
        this.getAllGames();
        this.calculateGamesToShow();

        window.addEventListener('resize', this.calculateGamesToShow);
    }

    getAllGames = async() => {
        try {
            const response = await getAll(this.state.selectedSort, this.state.selectedTags, this.state.selectedPlatform);

            if (response.status === 200)
                this.setState({games: response.data})
        } catch (error) {
            console.log(error);
        }
    }

    calculateGamesToShow = () => {
        const screenWidth = window.screen.width;

        if (screenWidth >= 640 && screenWidth < 768)
            this.setState({gamesToShow: 20});
        
        if (screenWidth >= 768 && screenWidth < 1024)
            this.setState({ gamesToShow: 18 });

        if (screenWidth >= 1024)
            this.setState({ gamesToShow: 20 });
    }
    
    renderGames = (games, from, quantity) => {
        const gamesElements = [];

        if (games.length > 0) {
            let i = from;

            while (i < from+quantity && i < games.length ) {
                const game = games[i];
                gamesElements.push(<GameCard key={i} title={game.title} genre={game.genre} thumbnail={game.thumbnail} short_description={game.short_description} game_site={game.game_url}/>);
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

    showFilters = () => {
        this.setState({showFilters: true});
    }

    selectSortParam = (e) => {
        const sortParam = e.target.getAttribute('sort-name');
        this.setState({selectedSort: sortParam});
    }

    selectPlatform = (e) => {
        const platform = e.target.getAttribute('platform');
        
        if (this.state.selectedPlatform === platform)
            this.setState({ selectedPlatform: '' });
        else
            this.setState({ selectedPlatform: platform });
    }

    addTagToFilter = (e) => {
        console.log(e.target);
        const tag = e.target.getAttribute('tag');
        const selectedTags = [...this.state.selectedTags];
        selectedTags.push(tag);
        this.setState({selectedTags})
    }

    clearFilters = () => {
        this.setState({selectedSort: 'relevance'});
        this.setState({selectedTags: []});
        this.setState({selectedPlatform: ''});
    }

    applyFilters = () => {
        this.getAllGames();
        this.setState({showFilters: false});
    }

    removeTagFromFilter = (e) => {
        console.log(e.target);
        const tag = e.target.getAttribute('tag');
        let selectedTags = [...this.state.selectedTags];
        selectedTags = selectedTags.filter(val => val !== tag);
        this.setState({ selectedTags })
    }

    render() {
        const {games, showGamesFrom, gamesToShow, showFilters, selectedSort, selectedPlatform, selectedTags} = this.state;
        const tags = ["mmorpg", "shooter", "strategy", "moba", "racing", "sports", "social", "sandbox", "open-world", "survival", "pvp", "pve", "pixel", "voxel", "zombie", "turn-based", "first-person", "third-Person", "top-down", "tank", "space", "sailing", "side-scroller", "superhero", "permadeath", "card", "battle-royale", "mmo", "mmofps", "mmotps", "3d", "2d", "anime", "fantasy", "sci-fi", "fighting", "action-rpg", "action", "military", "martial-arts", "flight", "low-spec", "tower-defense", "horror", "mmorts"];
        console.log(games[0]);
        return (
            <>
                {/* RESULTADOS Y BOTON FILTROS */}
                <div className="flex bg-gray-100 justify-between items-center px-4 py-2">
                    <span>{games.length} resultados</span>
                    <div onClick={this.showFilters} className="flex items-center">
                        <MdFilterList className="mr-2"/>
                        <span>Filtros</span>
                    </div>
                </div>

                {/* LISTA DE JUEGOS Y NAVEGACION */}
                <div className="w-screen px-6 py-5 sm:grid sm:gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {this.renderGames(games, showGamesFrom, gamesToShow)}
                </div>

                <div className="text-center">
                    <MdNavigateBefore style={{ fontSize: "40px" }} className="inline-block" onClick={this.showPreviousGames}/>
                    <span className="mx-10">{showGamesFrom + gamesToShow < games.length ? `${showGamesFrom + 1} - ${showGamesFrom + gamesToShow}` : `${showGamesFrom + 1} - ${games.length}`}</span>
                    <MdNavigateNext style={{fontSize: "40px"}} className="inline-block" onClick={this.showNextGames}/>
                </div>

                {/* FILTROS */}
                <div className={"flex flex-col fixed top-0 h-screen w-screen bg-gray-50 transition duration-200 ease-in-out transform " + (showFilters ? 'translate-x-0' : 'translate-x-full')}>
                    <div className="overflow-y-auto flex-grow p-4">
                        <div className="mb-10">
                            <label className="block mb-2">Ordenar por</label>
                            <div>
                                <button onClick={this.selectSortParam} sort-name="relevance"  className={"focus:outline-none border-gray-400 py-1 px-2 border-2 rounded-full m-2 " + (selectedSort === 'relevance'    && 'bg-gray-900 text-white')}>Relevancia</button>
                                <button onClick={this.selectSortParam} sort-name="popularity" className={"focus:outline-none border-gray-400 py-1 px-2 border-2 rounded-full m-2 " + (selectedSort === 'popularity'   && 'bg-gray-900 text-white')}>Popularidad</button>
                                <button onClick={this.selectSortParam} sort-name="release-date" className={"focus:outline-none border-gray-400 py-1 px-2 border-2 rounded-full m-2 " + (selectedSort === 'release-date' && 'bg-gray-900 text-white')}>Salida</button>
                                <button onClick={this.selectSortParam} sort-name="alphabetical" className={"focus:outline-none border-gray-400 py-1 px-2 border-2 rounded-full m-2 " + (selectedSort === 'alphabetical' && 'bg-gray-900 text-white')}>Nombre</button>
                            </div>
                        </div>
                        <div className="mb-10">
                            <label className="block mb-2">Plataforma</label>
                            <div>
                                <button onClick={this.selectPlatform} platform="pc" className={"focus:outline-none border-gray-400 py-1 px-2 border-2 rounded-full m-2 " + (selectedPlatform === 'pc' && 'bg-gray-900 text-white')}>PC</button>
                                <button onClick={this.selectPlatform} platform="browser" className={"focus:outline-none border-gray-400 py-1 px-2 border-2 rounded-full m-2 " + (selectedPlatform === 'browser' && 'bg-gray-900 text-white')}>Navegador</button>
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2">Categorías</label>
                            {tags.map((tag, index) => (
                                <div key={index} className="flex items-center">
                                    {selectedTags.find(val => val === tag)
                                        ? <div tag={tag} onClick={this.removeTagFromFilter} className="mr-2"><MdCheckBox className="pointer-events-none text-xl"/></div>
                                        : <div tag={tag} onClick={this.addTagToFilter} className="mr-2"><MdCheckBoxOutlineBlank className="pointer-events-none text-xl" /></div>
                                    }
                                    <span>{tag}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-around py-4 border-t-2 border-gray-200">
                    <button onClick={this.clearFilters} className="focus:outline-none py-2 px-4 border-2 border-gray-900 rounded-md">Borrar</button>
                    <button onClick={this.applyFilters} className="focus:outline-none text-white py-2 px-4 bg-gray-900 rounded-md">Aplicar</button>
                    </div>
                </div>
            </>
        );
    }
}

export default GameList;