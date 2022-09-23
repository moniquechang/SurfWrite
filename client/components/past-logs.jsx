import React from 'react';

const styles = {
  row: {
    justifyContent: 'start'
  }
};

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

  createPastLogCards() {
    return this.state.entries.map((day, index) => {
      return (
        <div key={index}>
          <div className='col-11 col-md-auto card mb-5'>
            <div className='card-header card-header-blue'>{day.date}</div>
            <div className='card-body text-center p-0'>
              <div className='text-start'>
                <p className='entry-content'>{day.content}</p>
              </div>
              <a className='weather-link mt-5' id={index}>
                <i className="fa-solid fa-cloud mt-5"></i>
                The Weather
                <i className="fa-solid fa-cloud mt-5"></i>
              </a>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    if (this.state.entries === null) {
      return null;
    }
    return (
      <>
        <div className='container'>
          <h2 className='mb-5 mt-3'>Past Logs</h2>
          <div style={styles.row} className='row row-cols-md-2 row-cols-lg-4'>{this.createPastLogCards()}</div>
        </div>
      </>
    );
  }
}
