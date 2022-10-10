import React from 'react';

export function CreateWeatherModal(data) {
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
        <div className='row'>
          <div className='col-12 weather-info-row'>
            <p><i className="fa-regular fa-sun"></i> sunrise time:</p>
            <p>{`${sunrise.substring(12)} AM`}</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 weather-info-row'>
            <p><i className="fa-regular fa-sun"></i> sunset time:</p>
            <p>{`${sunset.substring(12)} PM`}</p>
          </div>
        </div>
        <br></br>
        <div className='row'>
          <div className='col-12 weather-info-row'>
            <p><i className="fa-solid fa-cloud-showers-heavy"></i> total precipitation:</p>
            <p>{`${rain} inches`}</p>
          </div>
        </div>
        <br></br>
        <div className='row'>
          <div className='col-12 weather-info-row'>
            <p><i className="fa-solid fa-temperature-arrow-up"></i> max. temperature:</p>
            <p>{`${maxTemp} °F`}</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 weather-info-row'>
            <p><i className="fa-solid fa-temperature-arrow-down"></i> min. temperature:</p>
            <p>{`${minTemp} °F`}</p>
          </div>
        </div>
        <br></br>
        <div className='row'>
          <div className='col-12 weather-info-row'>
            <p><i className="fa-solid fa-wind"></i> wind speed:</p>
            <p>{`${windSpeed} mph`}</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 weather-info-row'>
            <p><i className="fa-solid fa-wind"></i> wind gusts:</p>
            <p>{`${windGusts} mph`}</p>
          </div>
        </div>
      </>
    );
    return modalWindowInfo;
  }
  return (
      <div className='row text-center'>
        <p>An error occured... Please try again!</p>
      </div>
  );
}
