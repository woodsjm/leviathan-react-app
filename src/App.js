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
        this.state.showRegistration === true ? this.register() : console.log("login")
        this.setState({
            loggedIn: true,
            showRegistration: false,
            showLogin: false
        })
    }

    changeUser = (event) => {
        if (event.target.innerHTML === "Change User") {
            this.setState({
                loggedIn: false,
                showLogin: true
            })
        }
    }

    register = async () => {
        try {
          const registerResponse = await fetch(`http://localhost:8000/register`, {
            method: 'POST',
            credentials: 'include', 
            body: JSON.stringify({password: this.state.password, email: this.state.email}),
            headers: {
              'Content-Type': 'application/json' 
            }
          })

          if(registerResponse.status === 401) {
            console.log("you are not allowed to do that");
          }

          const parsedResponse = await registerResponse.json();
          console.log(parsedResponse)

        } catch(err){
          console.error(err);
          return err
        }
    }
    
    render() {
        let styling;
        let login;
        let game;

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