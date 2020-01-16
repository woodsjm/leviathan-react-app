import React from 'react'
import './login.css'
import '../GameContainer/game-container.css'

const Login = (props) => {
     



    return(
        <div>
            <div style={{height: '30px'}}></div>

            <div className="header" augmented-ui="b-clip-x exe">
                <div style={{height: '20px'}}></div>
                <h1 className="header-text glitch">THE EXPANSE</h1>
            </div>



            <div className="main" augmented-ui="r-clip tr-clip tl-clip exe">
                <p className="sign glitch" align="center">{props.formText[0]}</p>

                <form className="form1">
                    <div>
                        <div>
                            <input className="un" type="text"  placeholder="Email" />
                        </div>
                        <div>
                            <input className="pass" type="password"  placeholder="Password" />
                        </div>
                      <a className="submit" >{props.formText[1]}</a>
                      <p className="forgot" align="center" onClick={props.clickedLink}><a></a>{props.formText[2]}</p>
                    
                    </div>
                </form>           
            </div>

        </div>

    )
}

export default Login