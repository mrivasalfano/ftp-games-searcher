import React, { Component } from 'react';

class GameCard extends Component {
    render() {
        const {title, thumbnail, short_description} = this.props;

        return (
            <div className="my-10">
                <h3 className="">{title}</h3>
                <img src={thumbnail} />
                <p>{short_description}</p>
            </div>
        );
    }
}

export default GameCard;