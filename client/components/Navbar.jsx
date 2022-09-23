import React from 'react';

export default class Navbar extends React.Component {

  render() {
    return (
      <>
        <nav className='navbar'>
          <div className='container'>
            <a className='app-name'>SurfWrite</a>
            <a><i className="fa-solid fa-bars"></i></a>
          </div>
        </nav>
        <div className='modal-background-menu'>
          <div className='menu-window'>
            <div className='menu-anchor-div'>
              <a className='menu-anchor'>Home</a>
            </div>
            <div className='menu-anchor-div'>
              <a className='menu-anchor'>Past Logs</a>
            </div>
          </div>
        </div>
      </>
    );
  }
}
