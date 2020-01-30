import React, { Component } from 'react';

import Alert from './Alert'
import Game from './Game'
import GameContainer from './GameContainer'
import Login from './Login'
// import TopBar from './Header'

import './App.css';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            account: {password: '', email: ''},
            email: '',
            password: '',
            userId: null,

            loggedIn: true,
            showLogin: false,
            showRegistration: false,

            loginStyling: ["Ship Login", "Login", "Create New Ship"],
            registrationStyling: ["Build Ship", "Create", "Enter Existing Ship"],

            loginModalMessage: 'That is not a valid email address or password. Would you like to register instead?',
            loginRedirect: 'Register',
            registrationModalMessage: 'It looks like this email address is already registered. Would you like to try login instead?',
            registrationRedirect: 'Login',
            // Nee to test conditional rendering of required async data
            loading: true,
            showAlert: false
        }
    }

    // ?? Consider requirements for changing user and logging out being separate ??
    changeUser = (event) => {
        if (event.target.innerHTML === "Change User") {
            this.setState({
                loggedIn: false,
                showLogin: true,
                // Need to test conditional rendering of required async data
                loading: true
            })
        }
    }

    closeAlert = (button) => {
        if (button === 'back') {
            this.setState({
                email: '',
                password: '',
                showAlert: false
            })
        } else if (button === 'Login') {
            this.setState({
                email: '',
                password: '',
                showAlert: false,
                showLogin: true,
                showRegistration: false
            })
        } else if (button === 'Register') {
            this.setState({
                email: '',
                password: '',
                showAlert: false,
                showLogin: false,
                showRegistration: true
            })
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

    handleLogOut = (event) => {
        this.logout()
        if (event.target.innerHTML === "Log Out") {
            this.setState({
                loggedIn: false,
                showLogin: true,
                // Need to test conditional rendering of required async data
                loading: true
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        if (this.state.showRegistration === true) {
            const register = this.register(this.state);

            register.then((data) => {
              if(data.status.message === 'Success'){
                console.log("SUCCESSFUL REGISTRATION!")
              } else {
                console.log(data)
              }
            }).catch((error) => {
              console.log(error)
            })

        } else if (this.state.showRegistration === false) {
            const login = this.login(this.state);

            login.then((data) => {
              if(data.status.message === 'Success'){
                console.log("SUCCESSFUL LOGIN!")
              } else {
                console.log(data)
              }

            }).catch((error) => {
              console.log(error)
            })
        }
    }

    login = async (data) => {
        try {
            const loginResponse = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(data),
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
                      email: '',
                      password: '',
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

    logout = async () => {
        try {
            const logoutResponse = await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
            credentials: 'include'        
            })
            const parsed = await logoutResponse.json()
            console.log(parsed)
    
        } catch (error) {
            console.error(error)
            return error
        }
    }

    register = async (data) => {
        try {
            const registerResponse = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
                method: 'POST',
                credentials: 'include', 
                body: JSON.stringify(data),
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
                      email: '',
                      password: '',
                      
                      loading: false,
                      loggedIn: true,
                      showLogin: false,
                      showRegistration: false
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
        // ----Alert Variables----
        let alert;
        let modalMessage;
        let redirect;
  
        // --Non-Alert Variables--
        let game;
        let login;
        let styling;

        // ----Alert Conditionals----
        if (this.state.showRegistration) {
            modalMessage = this.state.registrationModalMessage
            redirect = this.state.registrationRedirect
        } else if (this.state.showLogin) {
            modalMessage =  this.state.loginModalMessage
            redirect = this.state.loginRedirect
        }

        if (this.state.showAlert) {
            alert = <Alert 
                        closeAlert={this.closeAlert}
                        modalMessage={modalMessage}
                        open={this.state.showAlert} 
                        redirect={redirect}
                    />
        }

        // --Non-Alert Conditionals--
        if (this.state.showRegistration) {
            styling = this.state.registrationStyling
        } else {
            styling = this.state.loginStyling   
        }

        if (this.state.showLogin || this.state.showRegistration) {
            login = <Login 
                        email={this.state.email}
                        changeValue={this.handleChange} 
                        clickedLink={this.handleLink} 
                        formText={styling}
                        handleSubmit={this.handleSubmit} 
                        password={this.state.password}
                    />
        } 

        if (this.state.loggedIn) {
            game = <GameContainer changeUser={this.changeUser} logout={this.handleLogOut}/>
        }

        return (
            <div className="App">
                {alert}
                {login}
                {game}
            </div>
        )
    }   
}

export default App;