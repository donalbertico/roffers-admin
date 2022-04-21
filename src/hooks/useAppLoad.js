import * as React from 'react'
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import { Auth, Hub, DataStore } from 'aws-amplify'

export default function useAppLoad(){
  const [isAuth, setAuth] = React.useState()
  const [user, setUser] = React.useState({})

  React.useEffect(() => {
    Amplify.configure(awsconfig);
    Auth.currentUserInfo().then(user => {
        console.log(user);
        if(user && Object.keys(user).length > 0 ) {
          Auth.currentSession().then((token) => {
            console.log(token);
            user.groups = token.accessToken.payload["cognito:groups"]
            if(user.groups.includes('admin')) {
              setUser(user)
              setAuth(true)
            } else {
              Auth.signOut()
            }
          }).catch(e => console.log(e))
        }
        else setAuth(false)
    })
  },[])

  const listener = (data) => {
    switch (data.payload.event) {
      case 'signIn':
           setAuth(true)
           break;
       case 'signOut':
          setUser({})
          setAuth(false)
          DataStore.clear()
          break;
      default:
    }
  }

  Hub.listen('auth', listener);

  return [isAuth, user]
}
