import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './components/CounterComponent/CounterComponent';
import LightSwitch from './components/LightSwitch/LightSwitch';
import LoginForm from './components/LoginForm/LoginForm';
import LoginForm2 from './components/LoginForm/LoginForm2';
import SearchItem from './components/SearchItem/SearchItem';
import SearchAccount from './components/SearchAccount/SearchAccount';
import RegisterForm from './components/RegisterForm/RegisterForm';
function App() {
  return (
    <div >
        <CounterComponent />
        <LightSwitch />
        <LoginForm />
        <LoginForm2 />
        <SearchItem />
        <SearchAccount />
        <RegisterForm />
    </div>
  );
}

export default App;
