import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationLongitude: null,
      locationLatitude: null,
      isClickedWeather: false,
      weatherData: null,
      isClickedSurfbox: [false, false, false, false, false, false, false],
      isClickedAddEntry: false
    };
    this.handleClickOpenWeatherModal = this.handleClickOpenWeatherModal.bind(this);
    this.handleClickCloseWeatherModal = this.handleClickCloseWeatherModal.bind(this);
    this.getLocalDateString = this.getLocalDateString.bind(this);
    this.getIsoDates = this.getIsoDates.bind(this);
    this.modalInfo = this.modalInfo.bind(this);
    this.handleChangeSurfBox = this.handleChangeSurfBox.bind(this);
    this.handleClickEntriesModal = this.handleClickEntriesModal.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        locationLongitude: position.coords.longitude,
        locationLatitude: position.coords.latitude
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
    let addLogDivClass;
    return dayArr.map((day, index) => {
      const handleCheckChange = event => {
        const isChecked = event.target.checked;
        this.handleChangeSurfBox(isChecked, index);
      };
      if (this.state.isClickedSurfbox[index]) {
        cardHeaderClass = 'card-header card-header-blue';
        addLogDivClass = 'text-start';
      } else {
        cardHeaderClass = 'card-header';
        addLogDivClass = 'text-start hidden';
      }
      return (
        <div key={index}>
          <div className='col-11 col-md-auto card mb-5'>
            <div className={cardHeaderClass}>{`${day}: ${this.getLocalDateString(index)}`}</div>
            <div className='card-body text-center p-0'>
              <div className='surf-question-div'>
                <label className='surf-question-label'>Surf?</label>
                <input type='checkbox' name='surf?' value='yes' id='surf' onChange={handleCheckChange}></input>
              </div>
              <div className={addLogDivClass}>
                <a className='add-log-link' onClick={this.handleClickEntriesModal}>Add a log...</a>
              </div>
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
        this.setState({
          isClickedWeather: true,
          weatherData: result
        });
      });
  }

  handleClickCloseWeatherModal() {
    this.setState({
      isClickedWeather: false,
      weatherData: null
    });
  }

  handleClickEntriesModal() {
    if (this.state.isClickedAddEntry) {
      this.setState({ isClickedAddEntry: false });
    } else {
      this.setState({ isClickedAddEntry: true });
    }
  }

  modalInfo(data) {
    if (data) {
      const sunrise = data.daily.sunrise.toString();
      const sunset = data.daily.sunset.toString();
      const rain = data.daily.precipitation_sum.toString();
      const maxTemp = data.daily.temperature_2m_max.toString();
      const minTemp = data.daily.temperature_2m_min.toString();
      const windSpeed = data.daily.windspeed_10m_max.toString();
      const windGusts = data.daily.windgusts_10m_max.toString();
      const modalWindowInfo = (
    <>
      <div className='row modal-info-row'>
        <div className='col-6 left-col'>
          <p><i className="fa-regular fa-sun"></i> sunrise time:</p>
          <p><i className="fa-regular fa-sun"></i> sunset time:</p>
          <br></br>
          <p><i className="fa-solid fa-cloud-showers-heavy"></i> rain amount:</p>
          <br></br>
          <p><i className="fa-solid fa-temperature-arrow-up"></i> max. temp.:</p>
          <p><i className="fa-solid fa-temperature-arrow-down"></i> min. temp.:</p>
          <br></br>
          <p><i className="fa-solid fa-wind"></i> wind speed:</p>
          <p><i className="fa-solid fa-wind"></i> wind gusts:</p>
        </div>
        <div className='col-6 right-col'>
          <p>{`${sunrise.substring(12)} AM`}</p>
          <p>{`${sunset.substring(12)} PM`}</p>
          <br></br>
          <p>{`${rain} inches`}</p>
          <br></br>
          <p>{`${maxTemp} °F`}</p>
          <p>{`${minTemp} °F`}</p>
          <br></br>
          <p>{`${windSpeed} mph`}</p>
          <p>{`${windGusts} mph`}</p>
        </div>
      </div>
    </>
      );
      return modalWindowInfo;
    }
  }

  handleChangeSurfBox(isChecked, index) {
    if (isChecked) {
      const copyArr = this.state.isClickedSurfbox.map(checked => checked);
      copyArr.splice(index, 1, true);
      this.setState({ isClickedSurfbox: copyArr });

    } else {
      const copyArr = this.state.isClickedSurfbox.map(checked => checked);
      copyArr.splice(index, 1, false);
      this.setState({ isClickedSurfbox: copyArr });
    }
  }

  render() {
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
            {this.modalInfo(this.state.weatherData)}
          </div>
        </div>
        <div className={entriesModalClass}>
          <div className='modal-window-entries'>
            <button className='modal-button' onClick={this.handleClickEntriesModal}><i className="fa-solid fa-xmark fa-xmark-blue"></i></button>
            <form className='text-center'>
              <textarea rows='7' placeholder='Start writing here...'></textarea>
              <button type="submit" className="btn btn-outline-primary mt-4">SAVE</button>
            </form>
          </div>
        </div>
      </>
    );
  }
}
