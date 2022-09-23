import React from 'react';
import Navbar from './components/navbar';
// import Home from './components/home';
import PastLogs from './components/past-logs';

export default class App extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <PastLogs />
      </>
    );
  }
}
