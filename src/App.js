import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from './pages/register';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import { AuthProvider } from "./Auth";
import PrivateRoute  from "./PrivateRoute";
import ListCoin from './pages/listcoin';
import ExchangeRate from './pages/exchangerate';

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <div>
        <PrivateRoute exact path="/" component={Dashboard}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/listcoin" component={ListCoin}/>
        <Route exact path="/exchangeRate" component={ExchangeRate}/>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
