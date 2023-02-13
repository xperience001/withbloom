import React, { useEffect, useState } from "react";
import { Input, Button, Select, Col, Form, Row } from "antd";
import { Link } from "react-router-dom";
import "./exchangerate.css";

const { Option } = Select;

const ExchangeRate = () => {
  const [from, setFrom] = useState();
  const [fromCurrency, setFromCurrency] = useState();
  const [rate, setRate] = useState("");
  const [to, setTo] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [coinPairData, setCoinPairData] = useState({});

  useEffect(() => {
    fetch('https://staging-biz.coinprofile.co/v3/currency/rate')
       .then((response) => response.json())
       .then((data) => {
          console.log(data);
          setCoinPairData((prevState) => ({ ...prevState, data: data.data.rates}));
       })
       .catch((err) => {
          console.log(err.message);
       });
 }, []);

  const handleSelectChange = (e) => {
    console.log(e.target.name)
    const {name, value} = e.target
    if(name === "fromCurrency"){
        setFromCurrency(value)
    } else {
        setToCurrency(value)
    }
  }

  const handleValue = (e) => {
    console.log(e.target.name, e.target.value);
    if (e.target.name === "from") {
      setFrom(e.target.value);
    } else {
      setTo(e.target.value);
    }
  };

  let data = [];
  for (var key in coinPairData.data) {
      if (coinPairData.data.hasOwnProperty(key)) {
          data.push({key: Math.floor(Math.random() * 1000), coin: key, rate: coinPairData.data[key].rate})
      }
  }

  const handleExchange = () => {
    const handle = () => {
        let coinPair = `${fromCurrency}${toCurrency}`
        console.log(coinPair)
        const pair = data.filter(({ coin }) => {
            // coin = coin.toLowerCase();
            return coin.includes(coinPair);
          });
        setRate(pair[0].rate)
        // setRate(rate)
        let ans;
        if (from) {
          ans = from * rate;
          console.log('rate', rate)
          setTo(ans);
        } else {
          ans = to / rate;
          setFrom(ans);
        }
    }
    handle()
    setTimeout(() => {
        handle()
    }, 3000);
  };

  const selectAfter = (
    <Select defaultValue="USD">
      <Option value="BNB">BNB</Option>
      <Option value="BTC">BTC</Option>
      <Option value="ETH">ETH</Option>
      <Option value="BUSD">BUSD</Option>
      <Option value="CUSD">CUSD</Option>
      <Option value="USDT">USDT</Option>
      <Option value="DASH">DASH</Option>
      <Option value="USD">USD</Option>
      <Option value="NGN">NGN</Option>
      <Option value="TRON">TRON</Option>
      <Option value="TRON_USDT">TRON USDT</Option>
    </Select>
  );

  const currencyOptions = [
    { key: "BNB", text: "BNB", value: "BNB" },
    { key: "BTC", text: "BTC", value: "BTC" },
    { key: "ETH", text: "ETH", value: "ETH" },
    { key: "BUSD", text: "BUSD", value: "BUSD" },
    { key: "CUSD", text: "CUSD", value: "CUSD" },
    { key: "USDT", text: "USDT", value: "USDT" },
    { key: "DASH", text: "DASH", value: "DASH" },
    { key: "USD", text: "USD", value: "USD" },
    { key: "NGN", text: "NGN", value: "NGN" },
    { key: "TRON", text: "TRON", value: "TRON" },
    { key: "TRON_USDT", text: "TRON USDT", value: "TRON_USDT" },
  ];

  return (
    <div className="card-body">
      <div className="card">
        <form>
          <Row gutter={65}>
            <Col span={8}>
              <Form.Item>
                <label style={{ fontSize: "1.5rem" }}> From Amount </label>
                <Input
                  name="from"
                  placeholder="From Amount"
                  value={from}
                  onChange={handleValue}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                <label style={{ fontSize: "1.5rem" }}> Currency </label>
                <Select
                  style={{ width: "10rem" }}
                  size="medium"
                  placeholder="USD"
                  onChange={(v) =>
                    handleSelectChange({
                      target: { name: "fromCurrency", value: v },
                    })
                  }
                >
                  {currencyOptions.map((option) => {
                    return (
                      <Option key={option.key} value={option.value}>
                        {option.text}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={65}>
            <Col span={8}>
              <Form.Item>
                <label style={{ fontSize: "1.5rem" }}> To Amount </label>
                <Input
                  name="to"
                  placeholder="To Amount"
                  value={to}
                  onChange={handleValue}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                <label style={{ fontSize: "1.5rem" }}> Currency </label>
                <Select
                  style={{ width: "10rem" }}
                  size="medium"
                  placeholder="USD"
                  onChange={(v) =>
                    handleSelectChange({
                      target: { name: "toCurrency", value: v },
                    })
                  }
                >
                  {currencyOptions.map((option) => {
                    return (
                      <Option key={option.key} value={option.value}>
                        {option.text}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <span>
            <Button
              onClick={handleExchange}
              style={{ width: "100%", height: "2.5rem", marginTop: "3rem" }}
              type="primary"
            >
              Exchange
            </Button>
          </span>
        </form>
      </div>
      <div>
        <h3>
          <Link to="/">Back to Dashboard</Link>
        </h3>
      </div>
    </div>
  );
};

export default ExchangeRate;
