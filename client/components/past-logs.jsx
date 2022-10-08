import React from 'react';
import { CreateWeatherModal } from './create-weather-modal';

const styles = {
  row: {
    justifyContent: 'start'
  }
};

export default class PastLogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: null,
      isClickedWeather: false,
      targetDayWeather: null,
      isLoading: false
    };

    this.handleClickWeatherModal = this.handleClickWeatherModal.bind(this);
  }

  componentDidMount() {
    fetch('/api/entries', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(result => this.setState({
        entries: result,
        isLoading: true
      }))
      .catch(err => {
        console.error(err);
        window.alert('A network error occured. Please try again.');
      });
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
              <a className='weather-link mt-5' id={index} onClick={this.handleClickWeatherModal}>
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

  handleClickWeatherModal(event) {
    const targetDay = this.state.entries[event.target.id];
    if (this.state.isClickedWeather) {
      this.setState({
        isClickedWeather: false,
        targetDayWeather: null
      });
    } else {
      this.setState({
        isClickedWeather: true,
        targetDayWeather: targetDay.weather
      });
    }
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <>
          <div className='loading-div'>
            <h2 className='loading-text'>Your logs are loading...</h2>
            <i className="fa-solid fa-person-swimming"></i>
          </div>
        </>
      );
    }

    if (!this.state.entries[0]) {
      return (
      <div className='no-logs-div'>
        <h2>No Past Logs Yet!</h2>
      </div>
      );
    }

    let modalBackgroundClass;
    if (this.state.isClickedWeather) {
      modalBackgroundClass = 'modal-background';
    } else {
      modalBackgroundClass = 'modal-background hidden';
    }
    return (
      <>
        <div className='container'>
          <h2 className='mb-5 mt-3'>Past Logs</h2>
          <div style={styles.row} className='row row-cols-md-2 row-cols-lg-4'>{this.createPastLogCards()}</div>
        </div>
        <div className={modalBackgroundClass}>
          <div className='modal-window'>
            <button className='modal-button' onClick={this.handleClickWeatherModal}><i className="fa-solid fa-xmark"></i></button>
            <h4 className='mt-2 mb-4'>Weather Forecast</h4>
            {CreateWeatherModal(this.state.targetDayWeather)}
          </div>
        </div>
      </>
    );
  }
}
