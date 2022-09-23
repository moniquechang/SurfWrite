import React from 'react';
import Navbar from './components/navbar';
import Home from './components/home';

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
