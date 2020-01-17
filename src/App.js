import React, { Component } from 'react';
import './App.css';
import TopBar from './Header'
import GameContainer from './GameContainer'
import Login from './Login'
import Game from './Game'
import Alert from './Alert'


class App extends React.Component {
    constructor() {
        super()
        this.state = {
            password: '',
            email: '',
            loggedIn: true,
            showLogin: false,
            showRegistration: false,
            loginStyling: ["Ship Login", "Login", "Create New Ship"],
            registrationStyling: ["Build Ship", "Create", "Enter Existing Ship"],
            // Test conditional rendering of required async data
            loading: true,
            showAlert: false
        }
    }

    changeUser = (event) => {
        if (event.target.innerHTML === "Change User") {
            this.setState({
                loggedIn: false,
                showLogin: true,
                // Test conditional rendering of required async data
                loading: true
            })
        }
    }

    closeAlert = (button) => {
        if (button === 'back') {
            this.setState({
                showAlert: false,
                password: '',
                email: ''
            })
        } else if (button === 'Login') {
            this.setState({
                showAlert: false,
                showRegistration: false,
                showLogin: true,
                password: '',
                email: ''
            })
        } else if (button === 'Register') {
            this.setState({
                showAlert: false,
                showRegistration: true,
                showLogin: false,
                password: '',
                email: ''
            })
        }
    }

    login = async () => {
        try {
            const loginResponse = await fetch(`http://localhost:8000/login`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({password: this.state.password, email: this.state.email}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const parsedResponse = await loginResponse.json()
            if (parsedResponse.status.code === 401) {
                this.showAlert().then()
                return 
            } else if (parsedResponse.status.code === 200) { 
                this.setState(() => {
                    return {
                      ...parsedResponse.data,
                      loading: false,
                      loggedIn: true,
                      showRegistration: false,
                      showLogin: false
                    }
                })
                return
            }

        } catch (error) {
            console.error(error)
            return error
        }
    }

    handleChange = (event) => {
        event.preventDefault()
        this.setState({[event.target.name]: event.target.value});
    }

    handleLink = (event) => {
        event.preventDefault()
        if (this.state.showLogin) {
            this.setState({showLogin: false, showRegistration: true})
        } else if (!this.state.showLogin) {
            this.setState({showLogin: true, showRegistration: false})
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if (this.state.showRegistration === true) {
            this.register()
        } else if (this.state.showRegistration === false) {
            this.login()
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

            const parsedResponse = await registerResponse.json();
            if(parsedResponse.status.code === 401) {
                this.showAlert()
                return 
            } else if (parsedResponse.status.code === 201) {
                this.setState(() => {
                    return {
                      ...parsedResponse.data,
                      loading: false,
                      loggedIn: true,
                      showRegistration: false,
                      showLogin: false
                    }
                })
                return 
            }

        } catch(error){
            console.error(error);
            return error
        }
    }

    showAlert = () => {
        this.setState({showAlert: true})
        return
    }
    
    render() {
        let styling;
        let login;
        let game;
        let alert;

        if (this.state.showRegistration) {
            styling = this.state.registrationStyling
        } else {
            styling = this.state.loginStyling   
        }

        if (this.state.showLogin || this.state.showRegistration) {
            login = <Login 
                        clickedLink={this.handleLink} 
                        handleSubmit={this.handleSubmit} 
                        changeValue={this.handleChange} 
                        formText={styling}
                        email={this.state.email}
                        password={this.state.password}
                    />
        } 

        if (this.state.loggedIn) {
            game = <GameContainer changeUser={this.changeUser} />
        }

        if (this.state.showAlert) {
            alert = <Alert 
                        open={this.state.showAlert} 
                        closeAlert={this.closeAlert}
                        login={this.state.showLogin}
                        registration={this.state.showRegistration}
                    />
        }
        return (
            <div className="App">
                {alert}
                {login}
                {game}
            </div>
        );
    }   
}

export default App;