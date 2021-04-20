import React, { Component } from 'react';

class GameCard extends Component {
    render() {
        const {title, thumbnail, short_description} = this.props;

        return (
            <div className="shadow-md rounded my-10">
                <img src={thumbnail} />
                <h3 className="text-xl uppercase font-bold ml-2 mt-3">{title}</h3>
                <p className="ml-2 mt-5">{short_description}</p>
            </div>
        );
    }
}

export default GameCard;