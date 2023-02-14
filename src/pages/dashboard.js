import React from 'react'
import { Link } from "react-router-dom";
import app from "../base"
import "./dashboard.css"

const Dashboard = () => {
  return (
    <div className='dash-body'>
        <h1 style={{color: 'pink'}}>WITHBLOOM</h1>
        <span className='routes'>
        <div className='route'><Link to="/listCoin">List Coin</Link></div>
        <div className='route'><Link to="/exchangeRate">Exchange Rate</Link></div>
        </span>
        <span className='sign-out'>
        <Link onClick={() => {app.auth().signOut()}}>Sign Out</Link>
        </span>
    </div>
  )
}

export default Dashboard