import * as React from 'react'
import { Auth } from 'aws-amplify'

export default function SignInScreen(props){
  const [email, setEmail] = React.useState('')
  const [user, setUser] = React.useState()
  const [password, setPassword] = React.useState('')
  const [passChangeRequired, setChangeRequired] = React.useState(false)

  const login = () => {
      Auth.signIn(email, password).then(user => {
        if(user.challengeName == 'NEW_PASSWORD_REQUIRED') {
          setPassword('')
          setUser(user)
          setChangeRequired(true)
        }
      }).catch((e) => {
        console.log(e);
      })
  }
  const changePassword = () => {
    Auth.completeNewPassword(
               user,               // the Cognito User Object
               password        // the new passwor
           ).then(user => {
               console.log(user);
           }).catch(e => {
             console.log(e);
           });
  }

  return (
    <main>
      { passChangeRequired ? (
        <div>
          <input placeholder='your new password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button onClick={changePassword}>change</button>
        </div>
      ) : (
        <div>
          <input placeholder='email' value={email} onChange={ (e) => setEmail(e.target.value)}/>
          <input placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button onClick={login}>confirme</button>
        </div>
      )}
    </main>
  )
}
