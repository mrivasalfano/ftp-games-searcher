import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="w-screen bg-gray-900 py-10 px-4 text-gray-200">
                <h5 className="text-lg mb-4">Credits:</h5>
                <div className="mb-6">Logo icon made by <a href="https://www.flaticon.com/authors/iconixar" title="iconixar">iconixar</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                <div>Games are searched with Free to game API from <a href="https://www.flaticon.com/" title="Free to game">https://www.freetogame.com/api-doc</a></div>
            </footer>
        );
    }
}

export default Footer;