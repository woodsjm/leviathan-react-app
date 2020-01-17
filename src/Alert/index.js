import React, { Component } from 'react'
import { Button, Modal,  } from 'semantic-ui-react'

const Alert = (props) => {
  let modalMessage;
  let redirect;

  if (props.register) {
    modalMessage = 'It looks like this email address is already registered. Would you like to try login instead?'
    redirect = 'Login'
  } else if (props.login) {
    modalMessage = 'That is not a valid email address or password. Would you like to register instead?'
    redirect = 'Register'
  }

  console.log("Here is the redirect: ", redirect)

  return (
    <div>
      <Modal size='mini' open={props.open} >
        <Modal.Content style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
          <h1 style={{margin: '0 auto', padding: '0px 0px 10px 0px', fontSize: '30px'}}>Oops</h1>
          <div style={{textAlign: 'justify', textJustify: 'inter-word'}}>
          
          <p  style={{color: 'grey'}}>{modalMessage}</p>
          </div>
        </Modal.Content>
        <Modal.Actions style={{display: 'flex', justifyContent: 'space-around', flexDirection: 'row'}}>
          <Button onClick={props.closeAlert.bind(null, 'back')} negative icon='undo alternate' content='Back' labelPosition='right'></Button>
          <Button
            onClick={props.closeAlert.bind(null, redirect)}
            positive
            icon='checkmark'
            labelPosition='right'
            content={redirect}
          />
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default Alert