import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationLongitude: null,
      locationLatitude: null,
      isClicked: false,
      weatherData: null
    };
    this.handleClickOpenModal = this.handleClickOpenModal.bind(this);
    this.handleClickCloseModal = this.handleClickCloseModal.bind(this);
    this.getLocalDateString = this.getLocalDateString.bind(this);
    this.getIsoDates = this.getIsoDates.bind(this);
    this.modalInfo = this.modalInfo.bind(this);
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
    const dayCards = dayArr.map((day, index) =>
        <div key={index}>
          <div className='col-11 col-md-auto card mb-5'>
            <div className='card-header'>{`${day}: ${this.getLocalDateString(dayArr.indexOf(day))}`}</div>
            <div className='card-body text-center p-0'>
              <a className='weather-link mt-5' onClick={this.handleClickOpenModal} id={index}>
                <i className="fa-solid fa-cloud mt-5"></i>
                Check the Weather
                <i className="fa-solid fa-cloud mt-5"></i>
              </a>
            </div>
          </div>
        </div>
    );

    return dayCards;
  }

  handleClickOpenModal(event) {
    const startDate = this.getIsoDates(event.target.id);
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${this.state.locationLatitude}&longitude=${this.state.locationLongitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,windspeed_10m_max,windgusts_10m_max&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=auto&start_date=${startDate}&end_date=${startDate}`)
      .then(response => response.json())
      .then(result => {
        this.setState({
          isClicked: true,
          weatherData: result
        });
      });
  }

  handleClickCloseModal() {
    this.setState({
      isClicked: false,
      weatherData: null
    });
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

  render() {
    let modalBackgroundClass;
    let modalWindowClass;
    if (this.state.isClicked) {
      modalBackgroundClass = 'modal-background';
      modalWindowClass = 'modal-window';
    } else {
      modalBackgroundClass = 'modal-background hidden';
      modalWindowClass = 'modal-window hidden';
    }
    return (
      <>
        <div className='container'>
          <h2 className='mb-5 mt-3'>This week&apos;s waves</h2>
          <div className='row row-cols-md-4'>{this.createDayCards()}</div>
        </div>
        <div className={modalBackgroundClass}>
          <div className={modalWindowClass}>
            <button className='modal-button' onClick={this.handleClickCloseModal}><i className="fa-solid fa-xmark"></i></button>
            <h4 className='mt-2 mb-4'>Weather Forecast</h4>
            {this.modalInfo(this.state.weatherData)}
          </div>
        </div>
      </>
    );
  }
}
