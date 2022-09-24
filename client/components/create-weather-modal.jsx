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
