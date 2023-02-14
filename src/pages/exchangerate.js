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
  const [available, setAvailable] = useState(true)

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

  const handle = () => {
    let coinPair = `${fromCurrency}${toCurrency}`
    console.log(coinPair)
    const pair = data.filter(({ coin }) => {
        // coin = coin.toLowerCase();
        return coin.includes(coinPair);
      });
      if(pair.length){   
        setAvailable(true)       
          const rate = pair[0].rate
          setRate(rate)
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
    } else {
        let fromCoinPair = `${fromCurrency}NGN`
        let toCoinPair = `${toCurrency}NGN`

        if(fromCurrency === 'NGN' || toCurrency === 'NGN'){
          let fromCoinPair = `USD${fromCurrency}`
          let toCoinPair = `USD${toCurrency}`
          reExchange(fromCoinPair, toCoinPair)
        } else {
          exchange(fromCoinPair, toCoinPair)
        }

        setAvailable(false)
        setTimeout(() => {
            setAvailable(true)
        }, 5000);
    }
}

  const exchange = (fromCoinPair, toCoinPair) => {
    const fromPair = data.filter(({ coin }) => {
      return coin.includes(fromCoinPair);
    });
  const toPair = data.filter(({ coin }) => {
      return coin.includes(toCoinPair);
    });
  const fromRate = fromPair[0].rate
  const toRate = toPair[0].rate
  console.log('fromRate:', fromRate)
  console.log('toRate:', toRate)


  const realRate = fromRate / toRate
  console.log('realRate:', realRate)


  let ans;
  if (from) {
      ans = from * realRate;
      console.log('rate', rate)
      setTo(ans);
    } else {
      ans = to / realRate;
      setFrom(ans);
    }
  }

  const reExchange = (fromCoinPair, toCoinPair) => {
    const fromPair = data.filter(({ coin }) => {
      return coin.includes(fromCoinPair);
    });
  const toPair = data.filter(({ coin }) => {
      return coin.includes(toCoinPair);
    });
  const fromRate = fromPair[0].rate
  const toRate = toPair[0].rate
  console.log('fromRate:', fromRate)
  console.log('toRate:', toRate)


  const realRate = toRate / fromRate
  console.log('realRate:', realRate)


  let ans;
  if (from) {
      ans = from * realRate;
      console.log('rate', rate)
      setTo(ans);
    } else {
      ans = to / realRate;
      setFrom(ans);
    }
  }

  const handleExchange = async () => {
    handle()
  };

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
        <h1 style={{color: 'pink'}}>WITHBLOOM EXCHANGE</h1>

      <div className="card">
        <form>
          <Row gutter={10} style={{display: 'flex', justifyContent: 'space-between', color: 'white' }}>
            <Col span={8}>
              <Form.Item>
                <label style={{ fontSize: "1.5rem", width: "25rem", color: 'white'   }}> From Amount </label>
                <Input
                  style={{ width: "20rem" }}
                  name="from"
                  placeholder="From Amount"
                  value={from}
                  onChange={handleValue}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                <label style={{ fontSize: "1.5rem", color: 'white'  }}> Currency </label>
                <Select
                  style={{ width: "10rem" }}
                  size="medium"
                  placeholder="Currency"
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
          <Row gutter={10} style={{display: 'flex', justifyContent: 'space-between'}}>
            <Col span={8}>
              <Form.Item>
                <label style={{ fontSize: "1.5rem", width: "25rem", color: 'white'  }}> To Amount </label>
                <Input
                  style={{ width: "20rem" }}
                  name="to"
                  placeholder="To Amount"
                  value={to}
                  onChange={handleValue}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                <label style={{ fontSize: "1.5rem", color: 'white'  }}> Currency </label>
                <Select
                  style={{ width: "10rem" }}
                  size="medium"
                  placeholder="Currency"
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
          {!available && <div style={{width: '100%', fontSize: '1.2rem', textAlign: "center", color: 'pink'}}>Pair exchange data not directly available. This result is calculated using NGN as a standard.</div>}
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
