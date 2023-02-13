import React, { useState } from 'react'
import { Input, Button, Select } from 'antd';
import { Link } from 'react-router-dom';
import "./exchangerate.css"

const { Option } = Select;

const ExchangeRate = () => {
    const [from, setFrom] = useState();
    const [to, setTo] = useState();

    const handleExchange = () => {};

    const selectAfter = (
        <Select defaultValue=".com">
          <Option value=".com">.com</Option>
          <Option value=".jp">.jp</Option>
          <Option value=".cn">.cn</Option>
          <Option value=".org">.org</Option>
        </Select>
      );

  return (
    <div className='card-body'>
        <div className='card'>
        <form onSubmit={handleExchange} >
            <label style={{fontSize: "1.5rem"}}>
                From Currency
            </label>
            <span>
                {/* <Input placeholder="From Currency" /> */}
                <Input addonAfter={selectAfter} placeholder="From Amount" />
            </span>
            <label style={{fontSize: "1.5rem"}}>
                To Currency
            </label>
            <span>
                <Input addonAfter={selectAfter} placeholder="To Amount" />
            </span>
            <span>
                <Button style={{width: "100%", height: "2.5rem", marginTop: "3rem"}} type="primary">Exchange</Button>
            </span>
        </form>
        </div>
        <div>
            <h3><Link to="/">Back to Dashboard</Link></h3>
        </div>
    </div>
  )
}

export default ExchangeRate