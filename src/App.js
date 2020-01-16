import React, { Component } from 'react';
import './App.css';
import TopBar from './Header'
import GameContainer from './GameContainer'
import Login from './Login'
import Game from './Game'


class App extends React.Component {
    constructor() {
        super()
        this.state = {
            password: '',
            email: '',
            loggedIn: false
        }
    }

    render() {
        let game;
        let login;

        if (this.state.loggedIn === false) {
            login = <Login />
        } else if (this.state.loggedIn === true) {
            game = <GameContainer />
        }

        return (
        <div className="App">
            {login}
            {game}
        </div>
    );
    }
    
}

export default App;