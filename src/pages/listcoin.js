import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'antd';
import { CoinSearch } from "../components/coinsearch";
import "./listcoin.css"

const ListCoin = () => {
    const [coinPair, setCoinPair] = useState({});
    const [search, setSearch] = useState([]);
    console.log(coinPair);

    useEffect(() => {
       fetch('https://staging-biz.coinprofile.co/v3/currency/rate')
          .then((response) => response.json())
          .then((data) => {
             console.log(data);
             setCoinPair((prevState) => ({ ...prevState, data: data.data.rates}));
          })
          .catch((err) => {
             console.log(err.message);
          });
    }, []);

    useEffect(() => {
        
     }, []);

     let searchedData = [];

     let data = [];
      
     for (var key in coinPair.data) {
       if (coinPair.data.hasOwnProperty(key)) {
           data.push({key: Math.floor(Math.random() * 1000), coin: key, rate: (coinPair.data[key].rate).toFixed(4)})
           // console.log(key + " -> " + coinPair.data[key].rate);
       }
   }
   console.log(data)
     
    const handleSearch = (searchText) => {
        console.log(data)
        setSearch(true)
        const filteredEvents = data.filter(({ coin }) => {
          coin = coin.toLowerCase();
          return coin.includes(searchText);
        });
        // data.length = 0
        setSearch([...filteredEvents])
        console.log(searchedData)
      };

    const columns = [
        {
          title: 'Coin Pair',
          dataIndex: 'coin',
          key: 'coin',
          render: (text) => <a>{text}</a>,
          width: 500
        },
        {
          title: 'Rate',
          dataIndex: 'rate',
          key: 'rate',
          width: 150
        },
      ];

  return (
    <div className='list-body'>
        <h2 style={{color: 'pink'}}>WITHBLOOM COIN LISTINGS</h2>
        <CoinSearch onSearch={handleSearch} className="search" />
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Table columns={columns} dataSource={search.length ? [...search] : data} />
            <h5 style={{marginTop: '-2rem'}}><Link to="/">Back to Dashboard</Link></h5>
        </div>
    </div>
  )
}

export default ListCoin