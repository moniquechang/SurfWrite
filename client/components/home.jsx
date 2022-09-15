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
      <div className='row-1'>
        <div className='col card mb-3'>
          <div className='card-header'>Sunday:</div>
          <div className='card-body'></div>
        </div>
        <div className='col card mb-3'>
          <div className='card-header'>Monday:</div>
          <div className='card-body'></div>
        </div>
        <div className='col card mb-3'>
          <div className='card-header'>Tuesday:</div>
          <div className='card-body'></div>
        </div>
        <div className='col card mb-3'>
          <div className='card-header'>Wednesday:</div>
          <div className='card-body'></div>
        </div>
        <div className='col card mb-3'>
          <div className='card-header'>Thursday:</div>
          <div className='card-body'></div>
        </div>
        <div className='col card mb-3'>
          <div className='card-header'>Friday:</div>
          <div className='card-body'></div>
        </div>
        <div className='col card mb-3'>
          <div className='card-header'>Saturday:</div>
          <div className='card-body'></div>
        </div>
      </div>
    </div>
    );
  }
}
