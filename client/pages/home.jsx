import React from 'react';
import { CreateWeatherModal } from './components/create-weather-modal';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      locationLongitude: null,
      locationLatitude: null,
      isClickedWeather: false,
      isClickedAddEntry: false,
      entryValueContent: '',
      entryValueDate: '',
      entryValueWeather: '',
      selectedDay: null,
      days: [
        {
          weather: null,
          isClicked: false,
          content: null
        }, {
          weather: null,
          isClicked: false,
          content: null
        }, {
          weather: null,
          isClicked: false,
          content: null
        }, {
          weather: null,
          isClicked: false,
          content: null
        }, {
          weather: null,
          isClicked: false,
          content: null
        }, {
          weather: null,
          isClicked: false,
          content: null
        }, {
          weather: null,
          isClicked: false,
          content: null
        }]
    };
    this.handleClickOpenWeatherModal = this.handleClickOpenWeatherModal.bind(this);
    this.handleClickCloseWeatherModal = this.handleClickCloseWeatherModal.bind(this);
    this.getLocalDateString = this.getLocalDateString.bind(this);
    this.getIsoDates = this.getIsoDates.bind(this);
    this.handleChangeSurfBox = this.handleChangeSurfBox.bind(this);
    this.handleClickEntriesModal = this.handleClickEntriesModal.bind(this);
    this.handleChangeEntriesTextbox = this.handleChangeEntriesTextbox.bind(this);
    this.handleSubmitEntryForm = this.handleSubmitEntryForm.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        locationLongitude: position.coords.longitude,
        locationLatitude: position.coords.latitude,
        isLoading: true
      });
    });
  }

  getWeeklyDates() {
    const currentDate = new Date();
    const weekArr = [];
    const todayDate = currentDate.getDate();
    const todayDay = currentDate.getDay();

    for (let i = 0; i < 7; i++) {
      const day = new Date(currentDate);
      day.setDate(todayDate + i - todayDay);
      weekArr.push(day);
    }

    return weekArr;
  }

  getLocalDateString(index) {
    const weekDates = this.getWeeklyDates();
    const localDateString = weekDates.map(day => day.toLocaleDateString());

    return localDateString[index];
  }

  getIsoDates(index) {
    const weekDates = this.getWeeklyDates();
    const IsoString = weekDates.map(day => day.toISOString());
    const finalDates = IsoString.map(day => day.substring(0, 10));

    return finalDates[index];
  }

  createDayCards() {
    const dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let cardHeaderClass;
    return this.state.days.map((day, index) => {
      const handleCheckChange = event => {
        const isChecked = event.target.checked;
        this.handleChangeSurfBox(isChecked, index);
      };
      if (day.isClicked) {
        cardHeaderClass = 'card-header card-header-blue';
      } else {
        cardHeaderClass = 'card-header';
      }
      return (
        <div key={index}>
          <div className='col-11 col-md-auto card mb-5'>
            <div className={cardHeaderClass}>{`${dayArr[index]}: ${this.getLocalDateString(index)}`}</div>
            <div className='card-body text-center p-0'>
              <div className='surf-question-div'>
                <label className='surf-question-label'>Surf?</label>
                <input type='checkbox' name='surf?' value='yes' id='surf' disabled={day.content !== null} onChange={handleCheckChange}></input>
              </div>
              {
                day.isClicked && day.content === null &&
                <div className='text-start'>
                  <a className='add-log-link' onClick={this.handleClickEntriesModal} id={index}>Add a log...</a>
                </div>
              }
              {
                day.content !== null &&
                <div className='text-start'>
                  <p className='entry-content'>{day.content}</p>
                </div>
              }
              <a className='weather-link mt-5' onClick={this.handleClickOpenWeatherModal} id={index}>
                <i className="fa-solid fa-cloud mt-5"></i>
                Check the Weather
                <i className="fa-solid fa-cloud mt-5"></i>
              </a>
            </div>
          </div>
        </div>
      );
    });
  }

  handleClickOpenWeatherModal(event) {
    const startDate = this.getIsoDates(event.target.id);
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${this.state.locationLatitude}&longitude=${this.state.locationLongitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,windspeed_10m_max,windgusts_10m_max&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=auto&start_date=${startDate}&end_date=${startDate}`)
      .then(response => response.json())
      .then(result => {
        const copyArr = this.state.days.map(day => day);
        copyArr[event.target.id].weather = result;
        this.setState({
          isClickedWeather: true,
          days: copyArr,
          entryValueWeather: result
        });
      });
  }

  handleClickCloseWeatherModal() {
    this.setState({
      isClickedWeather: false,
      entryValueWeather: ''
    });
  }

  handleClickEntriesModal(event) {
    this.setState({ selectedDay: event.target.id });
    if (!this.state.isClickedAddEntry && this.state.days[event.target.id].weather === null) {
      const startDate = this.getIsoDates(event.target.id);
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${this.state.locationLatitude}&longitude=${this.state.locationLongitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,windspeed_10m_max,windgusts_10m_max&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=auto&start_date=${startDate}&end_date=${startDate}`)
        .then(response => response.json())
        .then(result => {
          const copyDaysArr = this.state.days.map(day => day);
          copyDaysArr[event.target.id].weather = result;
          this.setState({
            days: copyDaysArr,
            isClickedAddEntry: true,
            entryValueDate: this.getLocalDateString(event.target.id),
            entryValueWeather: result
          });
        });
    } else if (!this.state.isClickedAddEntry && this.state.days[event.target.id].weather !== null) {
      this.setState({
        isClickedAddEntry: true,
        entryValueDate: this.getLocalDateString(event.target.id),
        entryValueWeather: this.state.days[event.target.id].weather
      });
    } else if (this.state.isClickedAddEntry) {
      this.setState({
        isClickedAddEntry: false,
        selectedDay: null,
        entryValueDate: '',
        entryValueContent: '',
        entryValueWeather: ''
      });
    }
  }

  handleChangeSurfBox(isChecked, index) {
    const copyDaysArr = this.state.days.slice();
    const copyDay = Object.assign({}, copyDaysArr[index]);
    copyDay.isClicked = isChecked;
    copyDaysArr[index] = copyDay;
    this.setState({
      days: copyDaysArr
    });
  }

  handleChangeEntriesTextbox(event) {
    this.setState({ entryValueContent: event.target.value });
  }

  handleSubmitEntryForm(event) {
    event.preventDefault();
    fetch('/api/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: this.state.entryValueContent,
        date: this.state.entryValueDate,
        weather: this.state.entryValueWeather,
        userId: 1
      })
    })
      .then(res => res.json())
      .then(result => {
        const copyDay = Object.assign({}, this.state.days[this.state.selectedDay], result);
        const copyDayArr = this.state.days.slice();
        copyDayArr[this.state.selectedDay] = copyDay;
        this.setState({
          days: copyDayArr,
          isClickedAddEntry: false,
          entryValueContent: '',
          entryValueDate: '',
          entryValueWeather: '',
          selectedDay: null
        });
      })
      .catch(err => {
        console.error(err);
        window.alert('A network error occured. Please try again.');
      });
  }

  render() {
    if (!this.state.isLoading) {
      return (
          <>
            <div className='loading-div'>
              <h2 className='loading-text'>Your week is loading...</h2>
              <i className="fa-solid fa-person-swimming"></i>
            </div>
         </>
      );
    }

    let modalBackgroundClass;
    let entriesModalClass;

    if (this.state.isClickedWeather) {
      modalBackgroundClass = 'modal-background';
    } else {
      modalBackgroundClass = 'modal-background hidden';
    }

    if (this.state.isClickedAddEntry) {
      entriesModalClass = 'modal-background';
    } else {
      entriesModalClass = 'modal-background hidden';
    }

    return (
      <>
        <div className='container'>
          <h2 className='mb-5 mt-3'>This week&apos;s waves</h2>
          <div className='row row-cols-md-4'>{this.createDayCards()}</div>
        </div>
        <div className={modalBackgroundClass}>
          <div className='modal-window'>
            <button className='modal-button' onClick={this.handleClickCloseWeatherModal}><i className="fa-solid fa-xmark"></i></button>
            <h4 className='mt-2 mb-4'>Weather Forecast</h4>
            {CreateWeatherModal(this.state.entryValueWeather)}
          </div>
        </div>
        <div className={entriesModalClass}>
          <div className='modal-window-entries'>
            <button className='modal-button' onClick={this.handleClickEntriesModal}><i className="fa-solid fa-xmark fa-xmark-blue"></i></button>
            <form className='text-center' onSubmit={this.handleSubmitEntryForm}>
              <textarea rows='7' placeholder='Start writing here...' value={this.state.entryValueContent} onChange={this.handleChangeEntriesTextbox} required='required'></textarea>
              <button type="submit" className="btn btn-outline-primary mt-4">SAVE</button>
            </form>
          </div>
        </div>
      </>
    );
  }
}
