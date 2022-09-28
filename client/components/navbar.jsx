import React from 'react';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };

    this.handleClickMenu = this.handleClickMenu.bind(this);
  }

  handleClickMenu() {
    if (this.state.isClicked) {
      this.setState({ isClicked: false });
    } else {
      this.setState({ isClicked: true });
    }
  }

  render() {
    let menuModalBackground;
    let menuModalWindow;
    if (this.state.isClicked) {
      menuModalBackground = 'modal-background-menu';
      menuModalWindow = 'menu-window';
    } else {
      menuModalBackground = 'modal-background-menu hidden';
      menuModalWindow = 'menu-window hidden';
    }
    return (
      <>
        <nav className='navbar'>
          <div className='container'>
            <div>
              <a href='#' className='navbar-brand app-name'>SurfWrite</a>
              <a href='#pastLogs' className='logs-link-navbar'>Logs</a>
            </div>
            <a><i className="fa-solid fa-bars" onClick={this.handleClickMenu}></i></a>
          </div>
        </nav>

        <div className={menuModalBackground} onClick={this.handleClickMenu}></div>
        <div className={menuModalWindow}>
          <div>
            <div className='menu-anchor-div'>
              <a href='#' className='menu-anchor' onClick={this.handleClickMenu}>Home</a>
            </div>
            <div className='menu-anchor-div'>
              <a href='#pastLogs' className='menu-anchor' onClick={this.handleClickMenu}>Past Logs</a>
            </div>
            <div className='menu-anchor-div'>
              <a className='menu-anchor' onClick={this.handleClickMenu}></a>
            </div>
          </div>
          <div>
          <img className='menu-image' src='/images/app-drawer-pic.png'></img>
          </div>
        </div>
      </>
    );
  }
}
