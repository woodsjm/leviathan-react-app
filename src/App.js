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
            loggedIn: false,
            showLogin: true,
            showRegistration: false,
            loginStyling: ["Ship Login", "Login", "Create New Ship"],
            registrationStyling: ["Build Ship", "Create", "Enter Existing Ship"]
        }
    }

    handleLink = (event) => {
        event.preventDefault()
        this.setState({
            showRegistration: !this.state.showRegistration
        })
    }

    render() {
        let login;
        let game;
        let styling;

        if (this.state.showRegistration) {
            styling = this.state.registrationStyling
        } else {
            styling = this.state.loginStyling   
        }

        if (this.state.showLogin) {
            login = <Login clickedLink={this.handleLink} formText={styling}/>
        }
        if (this.state.loggedIn) {
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