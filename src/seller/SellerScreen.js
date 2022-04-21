import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Auth, API, DataStore } from 'aws-amplify'
import { Seller, Offer } from '../models/index.js'


export default function SellerScreen(props) {
  const routeParams = useParams()
  const [email, setEmail] = React.useState()
  const [name, setName] = React.useState()
  const [sellers, setSellers] = React.useState()

  const createSeller = () => {
    API.post('adminApi','/seller/create',{
      body : {
        email : email,
        businessName: name
      }
    }).then( (res) => {
      console.log(res);
    }).catch( error => {
      console.log(error);
    })
  }
  const aproveSeller = async (seller) => {
    await DataStore.save(
      Seller.copyOf(seller, updated => {
        updated.verified = true
      })
    )
    let newSellers = await DataStore.query(Seller, s => s.verified('eq',false))
    setSellers(newSellers)
  }
  const unverifiedSellers = sellers ?
      sellers.map((seller) =>
        <div>
          {seller.name} {seller.owner}
          <button onClick={(e) => aproveSeller(seller)}>verify</button>
        </div>)
      : ([])
  React.useEffect(() => {
    if(routeParams?.sellerId === 'requests') {
      DataStore.query(Seller, s => s.verified('eq',false)).then(s => setSellers(s)).catch(e => console.log(e))
    }
  },[routeParams])

  return (
    <main>
      { routeParams?.sellerId ? (
          routeParams.sellerId === 'requests' ? (
              <div>
                nuevas adqisiciones
                {unverifiedSellers}
              </div>
          ) : (
              <div>
              </div>
          )
      ) : (
        <div>
          <p>Confirme</p>
          <input placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input placeholder='name' value={name} onChange={(e) => setName(e.target.value)}/>
          <button onClick={createSeller}>create</button>
        </div>
      )}
    </main>
  )
}
