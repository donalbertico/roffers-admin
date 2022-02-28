import * as React from 'react'
import { Auth, Hub } from 'aws-amplify'

export default function SignInScreen(props){
  const [email, setEmail] = React.useState()
  const [password, setPss] = React.useState()
  const login = async () => {
    console.log('??');
      try {
           const user = await Auth.signIn(email, password);
       } catch (error) {
           console.log('error signing in', error);
       }
  }
  const listener = (data) => {
    switch (data.payload.event) {
      case 'signIn':
           console.log('yala');
           break;
      default:
    }
  }

  React.useState(() => {
    Hub.listen('auth', listener);
  },[])

  return (
    <div>
      <input placeholder='pegelo' value={email} onChange={ (e) => setEmail(e.target.value)}/>
      <input placeholder='password' value={password} onChange={(e) => setPss(e)}/>
      <button onClick={login}>confirme</button>
    </div>
  )
}
