import React from 'react';

export default class PastLogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: null
    };
  }

  componentDidMount() {
    fetch('/api/entries', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(result => this.setState({ entries: result }));
  }

  render() {
    if (this.state.entries === null) {
      return null;
    } else {
      // console.log(this.state.entries);
    }
  }
}
