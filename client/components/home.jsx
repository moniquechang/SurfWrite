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

  render() {
    return (
     <div className='container'>
      <h2 className='mb-5 mt-3'>This week&apos;s waves</h2>
      <div className='row row-cols-md-4'>
        <div>
        <div className='col-11 col-md-auto card mb-5'>
          <div className='card-header'>{`Sunday: ${this.getWeeklyDates(0)}`}</div>
          <div className='card-body'></div>
        </div>
        </div>
        <div>
        <div className='col-11 col-md-auto card mb-5'>
              <div className='card-header'>{`Monday: ${this.getWeeklyDates(1)}`}</div>
          <div className='card-body'></div>
        </div>
        </div>
        <div>
        <div className='col-11 col-md-auto card mb-5'>
              <div className='card-header'>{`Tuesday: ${this.getWeeklyDates(2)}`}</div>
          <div className='card-body'></div>
        </div>
        </div>
        <div>
        <div className='col-11 col-md-auto card mb-5'>
              <div className='card-header'>{`Wednesday: ${this.getWeeklyDates(3)}`}</div>
          <div className='card-body'></div>
        </div>
        </div>
        <div>
        <div className='col-11 col-md-auto card mb-5'>
              <div className='card-header'>{`Thursday: ${this.getWeeklyDates(4)}`}</div>
          <div className='card-body'></div>
        </div>
        </div>
        <div>
        <div className='col-11 col-md-auto card mb-5'>
              <div className='card-header'>{`Friday: ${this.getWeeklyDates(5)}`}</div>
          <div className='card-body'></div>
        </div>
        </div>
        <div>
        <div className='col-11 col-md-auto card mb-5'>
              <div className='card-header'>{`Saturday: ${this.getWeeklyDates(6)}`}</div>
          <div className='card-body'></div>
        </div>
        </div>
      </div>
    </div>
    );
  }
}
