import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationLongitude: null,
      locationLatitude: null
    };
  }

  render() {
    return (
     <div className='container'>
      <h2 className='mb-5 mt-3'>This week&apos;s waves</h2>
      <div className='row row-cols-md-4'>
        <div>
        <div className='col-11 col-md-auto card mb-5'>
          <div className='card-header'>Sunday:</div>
          <div className='card-body'></div>
        </div>
        </div>
        <div>
        <div className='col-11 col-md-auto card mb-5'>
          <div className='card-header'>Monday:</div>
          <div className='card-body'></div>
        </div>
        </div>
        <div>
        <div className='col-11 col-md-auto card mb-5'>
          <div className='card-header'>Tuesday:</div>
          <div className='card-body'></div>
        </div>
        </div>
        <div>
        <div className='col-11 col-md-auto card mb-5'>
          <div className='card-header'>Wednesday:</div>
          <div className='card-body'></div>
        </div>
        </div>
        <div>
        <div className='col-11 col-md-auto card mb-5'>
          <div className='card-header'>Thursday:</div>
          <div className='card-body'></div>
        </div>
        </div>
        <div>
        <div className='col-11 col-md-auto card mb-5'>
          <div className='card-header'>Friday:</div>
          <div className='card-body'></div>
        </div>
        </div>
        <div>
        <div className='col-11 col-md-auto card mb-5'>
          <div className='card-header'>Saturday:</div>
          <div className='card-body'></div>
        </div>
        </div>
      </div>
    </div>
    );
  }
}
