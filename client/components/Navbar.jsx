import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className='navbar'>
        <div className='container'>
          <a className='app-name'>SurfWrite</a>
          <a><i className="fa-solid fa-bars"></i></a>
        </div>
      </nav>
    );
  }
}
