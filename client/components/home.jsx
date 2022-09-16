import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationLongitude: null,
      locationLatitude: null
    };
  }

  getWeeklyDates(index) {
    const currentDate = new Date();
    const weekArr = [];
    const todayDate = currentDate.getDate();
    const todayDay = currentDate.getDay();

    for (let i = 0; i < 7; i++) {
      const day = new Date(currentDate);
      day.setDate(todayDate + i - todayDay);
      weekArr.push(day);
    }

    const weekDateString = weekArr.map(day => day.toLocaleDateString());
    return weekDateString[index];

  }

  createDayCards() {
    const dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayCards = dayArr.map(day =>
        <div key={day}>
          <div className='col-11 col-md-auto card mb-5'>
            <div className='card-header'>{`${day}: ${this.getWeeklyDates(dayArr.indexOf(day))}`}</div>
            <div className='card-body text-center p-0'>
              <a className='weather-link mt-5'>
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

  render() {
    return (
      <div className='container'>
        <h2 className='mb-5 mt-3'>This week&apos;s waves</h2>
        <div className='row row-cols-md-4'>{this.createDayCards()}</div>
      </div>
    );
  }
}
