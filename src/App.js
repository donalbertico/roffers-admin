import * as React from 'react'
import logo from './logo.svg';
import { UserProvider } from './context/userContext.js'
import {
  BrowserRouter,
  useRouteMatch,
  Routes,
  Route
} from 'react-router-dom'
import useAppLoad from './hooks/useAppLoad'
import SignInScreen from './auth/SignInScreen'
import SellerScreen from './seller/SellerScreen'
import DashboardScreen from './offer/DashboardScreen'


function App() {
  const [auth, user] = useAppLoad()

  return (
    <BrowserRouter>
      <Routes>
        {auth ? (
          <Route path="*" element={ <MainElement user={user}/> }/>
        ) : (
          <>
            <Route path="/" element={ <SignInScreen/> }/>
            <Route path="*" element={ <div>noay cafe</div> }/>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

function MainElement (props) {
  return (
    <UserProvider user={props.user}>
      <Routes>
        <Route path="/" element={ <DashboardScreen/> }/>
        <Route path="/seller" element={ <SellerScreen/> }>
          <Route path=":sellerId" element={ <SellerScreen/> }/>
        </Route>
        <Route path="*" element={ <div>noay cafe</div> }/>
      </Routes>
    </UserProvider>
  )
}

export default App;
