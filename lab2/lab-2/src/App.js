import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
function App() {
  return (
    <div >
      <Navbar />
      <Hero />
      <Menu />
      <BookingForm />
      <Footer />
    </div>
  );
}

export default App;
