import React, { Component } from 'react';
import Logo from '../utils/logo.svg';
class Home extends Component {
    render() {
        return (
            <div className="min-h-screen w-screen bg-gray-900 py-10 px-4">
                <img src={Logo} className="w-40 mx-auto mb-10"/>
                <h1 className="font-semibold leading-none text-4xl text-center font-sans mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-purple-500 to-blue-400">FTP Searcher</h1>
                <h3 className="text-gray-200 text-2xl text-left font-serif">Encuentra los mejores video juegos gratuitos para PC y navegadores.</h3>
            </div>
        );
    }
}

export default Home;