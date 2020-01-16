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

    handleChange = (event) => {
        event.preventDefault()
        this.setState({[event.target.name]: event.target.value});
    }

    handleLink = (event) => {
        event.preventDefault()
        this.setState({
            showRegistration: !this.state.showRegistration
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({
            loggedIn: true,
            showRegistration: false,
            showLogin: false
        })
    }

    changeUser = (event) => {
        console.log(event.target.innerHTML)
        if (event.target.innerHTML === "Change User") {
            this.setState({
                loggedIn: false,
                showLogin: true
            })
        }
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
            login = <Login clickedLink={this.handleLink} handleSubmit={this.handleSubmit} changeValue={this.handleChange} formText={styling}/>
        }
        if (this.state.loggedIn) {
            game = <GameContainer changeUser={this.changeUser} />
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