import React, { useState, useEffect } from 'react';
import FooterPage from "./components/pages/FooterPage";
import HomePage from "./components/pages/HomePage";
import AccountPage from "./components/pages/AccountPage";

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Listen for hash changes to handle navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash === 'account') {
        setCurrentPage('account');
      } else {
        setCurrentPage('home');
      }
    };

    // Initial check
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'account':
        return <AccountPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
   <div>
    {renderCurrentPage()}
    <FooterPage />
   </div>
  );
}

export default App;
