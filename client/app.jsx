import React from 'react';
import Navbar from './components/navbar';
import Home from './pages/home';
import PastLogs from './pages/past-logs';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'pastLogs') {
      return <PastLogs />;
    }
  }

  render() {
    return (
      <>
        <Navbar />
        {this.renderPage()}
      </>
    );
  }
}
