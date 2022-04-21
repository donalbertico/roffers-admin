import * as React from 'react'
import { DataStore, Auth } from 'aws-amplify'
import { Seller, Offer } from '../models/index.js'

export default function DashboardScreen(){
  const [sellers, setSellers] = React.useState([])
  const [offers, setOffers] = React.useState([])
  const [offerOwn, setOfferOwn] = React.useState()
  const [offer, setOffer] = React.useState({})

  const signout = async () => {
      await Auth.signOut()
  }
  const sellerItems = sellers.map((seller) => <button onClick={() => setOfferOwn(seller)}>{seller.name}</button>)
  const offerItems = offers.map((offer) => <div>{offer.sellerID}</div>)
  const createOffer = async () => {
    let date = new Date()
    try {
      const off = await DataStore.save(new Offer({ expires : date.toISOString(), sellerID : offerOwn.id}))
    } catch (e) {
      console.log(e);
    }
  }
  React.useEffect(() => {
    DataStore.query(Seller, s => s.verified('eq',true)).then(s => setSellers(s)).catch(e => console.log(e))
    DataStore.query(Offer).then(o => setOffers(o)).catch(e => console.log(e))
  },[])
  React.useEffect(() => {
    console.log(sellers);
  },[sellers])

  return (
    <main>
      <div>amilcaar</div>
      <button onClick={signout}>logout</button>
      {sellerItems}
      {offerItems}
      { offerOwn && (
        <div>
          <h3>new popeta</h3>
          <input placeholder='name' value={offer?.name} onChange={(e) => setOffer({name : e.target.value})}/>
          <button onClick={createOffer} >new offer</button>
        </div>
      ) }
    </main>
  )
}
