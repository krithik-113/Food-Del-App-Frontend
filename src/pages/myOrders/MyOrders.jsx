import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'

const MyOrders = () => {

    const [data, setData] = useState([])
    const { token } = useContext(StoreContext)
    
    const fetchOrders = async () => {
        const res = await axios.post('/api/order/userorders', {}, { headers: { token } })
        setData(res.data.data)
    }
    useEffect(() => {
        if (token) {
            fetchOrders();
        }
        
    },[token])
  return (
      <div className='my-orders'>
          <h2>My Orders</h2>
          <div className="container">
              {data.map((item, index) => {
                  return (
                      <div className='my-orders-order' key={index}>
                          <img src={assets.parcel_icon} alt="" />
                          <p>{item.items.map((order, index) => {
                              if (index === item.items.length - 1) {
                                  return order.name+" X "+order.quantity
                              } else {
                                   return order.name + " X " + order.quantity+", ";
                              }
                          })}</p>
                          <p>${item.amount}.00</p>
                          <p>Items: {item.items.length}</p>
                          <p> <span>&#x25cf;</span> <b>{item.status}</b> </p>
                          <button onClick={fetchOrders}>Track Order</button>
                      </div>
                  )
              })}
          </div>
    </div>
  )
}

export default MyOrders