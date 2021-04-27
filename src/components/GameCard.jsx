import React, { Component } from 'react';

class GameCard extends Component {
    render() {
        const {title, genre, thumbnail, game_site, short_description} = this.props;

        return (
            <div onClick={() => window.open(game_site)} className="shadow-md rounded my-10">
                <img src={thumbnail} alt="game"/>
                <h3 className="text-xl uppercase font-bold ml-2 mt-3">{title}</h3>
                <span className="ml-2 mt-3">{genre}</span>
                <p className="ml-2 mt-5">{short_description}</p>
            </div>
        );
    }
}

export default GameCard;