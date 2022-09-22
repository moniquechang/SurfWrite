import React from 'react';
import Home from './components/home';
import Navbar from './components/Navbar';

export default class App extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <Home />
      </>
    );
  }
}
