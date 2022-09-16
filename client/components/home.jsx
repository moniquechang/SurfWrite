import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationLongitude: null,
      locationLatitude: null,
      isClicked: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.getLocalDateString = this.getLocalDateString.bind(this);
    this.getIsoDates = this.getIsoDates.bind(this);
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
              <a className='weather-link mt-5' onClick={this.handleClick} id={index}>
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

  handleClick(event) {
    const startDate = this.getIsoDates(event.target.id);
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${this.state.locationLatitude}&longitude=${this.state.locationLongitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,windspeed_10m_max,windgusts_10m_max&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=auto&start_date=${startDate}&end_date=${startDate}`)
      .then(response => response.json())
      .then(result => this.modalInfo(result));
  }

  modalInfo(data) {

  }

  render() {
    return (
      <div className='container'>
        <h2 className='mb-5 mt-3'>This week&apos;s waves</h2>
        <div className='row row-cols-md-4'>{this.createDayCards()}</div>
      </div>
    );
  }
}
