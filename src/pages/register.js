import React, { useEffect, useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import { Input, Button, Col, Form, Row } from "antd";
import { withRouter } from "react-router";
import app from "../base";
import "./login.css"

const Register = ({ history }) => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);

  useEffect(() => {
    console.log(email, password)
  }, [email, password])
  

  const handleValue = (e) => {
    console.log("Something is changed in the textarea");
    const {name, value} = e.target
    console.log(email, password)
    if(name === "email"){
      setEmail(value)
    } else {
      setPassword(value)
    }
  }

  const handleSignUp = async () => {
    console.log(email, password)
      try {
          await app.auth().createUserWithEmailAndPassword(email, password);
          history.push("/");
      } catch (error) {
          // alert(error);
          console.log(error)
          setError(true)
          setErrorText('Enter a valid email and password')
          setTimeout(() => {
            setError(false)
            setErrorText('')
          }, 4000);
      }
  };

  return (
    <div className='login-body'>
        <h1 style={{color: 'pink'}}>WITHBLOOM</h1>
        <div className='login-card'>
        <h2 style={{marginTop: '0', marginBottom: '0'}}>Sign Up</h2>
        <form>
          <Row gutter={2} style={{display: 'flex', flexDirection: 'column', color: 'white' }}>
            <Col span={25}>
              <Form.Item>
                <label style={{ fontSize: "1.5rem", width: "25rem", color: 'white'   }}> Email </label>
                <Input
                  style={{ width: "100%" }}
                  name="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={handleValue}
                  />
              </Form.Item>
            </Col>
            <Col span={25}>
              <Form.Item>
                <label style={{ fontSize: "1.5rem", width: "25rem", color: 'white'   }}> Password </label>
                <Input
                  style={{ width: "100%" }}
                  name="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={handleValue}
                  type='password'
                  />
              </Form.Item>
            </Col>
          </Row>
          <div style={{height: '1rem'}}>
          {error && 
            <p style={{fontSize: '1.16rem', position: 'fixed', color: 'red'}}>{errorText}</p>
          }
          </div>
          <span>
            <Button
              onClick={handleSignUp}
              style={{ width: "100%", height: "2.5rem", marginTop: "2rem" }}
              type="primary"
              >
              Sign Up
            </Button>
          </span>
        </form>
      </div>
      <p style={{fontSize: '1.16rem', position: 'relative', color: 'white'}}>Already have an account? <Link to="/login">Log In</Link></p>
    </div>
  )
}

export default withRouter(Register);