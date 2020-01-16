import React from 'react'
import './login.css'
import '../GameContainer/game-container.css'

const Login = () => {
    return(
        <div>
            <div>HELLO</div>



            <div className="main" augmented-ui="r-clip bl-clip exe">
                <p className="sign glitch" align="center">Ship Login</p>

                <form className="form1">
                    <div>
                        <div>
                            <input className="un" type="text"  placeholder="Email" />
                        </div>
                        <div>
                            <input className="pass" type="password"  placeholder="Password" />
                        </div>
                      <a className="submit" >Login</a>
                      <p className="forgot" align="center"><a href="#"></a>Forgot Password?</p>
                    
                    </div>
                </form>           
            </div>

        </div>

    )
}

export default Login