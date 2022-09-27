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
    if (this.state.isClicked) {
      menuModalBackground = 'modal-background-menu';
    } else {
      menuModalBackground = 'modal-background-menu hidden';
    }
    return (
      <>
        <nav className='navbar'>
          <div className='container'>
            <div>
              <a href='#' className='navbar-brand app-name'>SurfingFuze</a>
              <a href='#pastLogs' className='logs-link-navbar'>Logs</a>
            </div>
            <a><i className="fa-solid fa-bars" onClick={this.handleClickMenu}></i></a>
          </div>
        </nav>

        <div className={menuModalBackground}>
          <div className='menu-window'>
            <div>
              <div className='menu-anchor-div'>
                <a href='#' className='menu-anchor'>Home</a>
              </div>
              <div className='menu-anchor-div'>
                <a href='#pastLogs' className='menu-anchor'>Past Logs</a>
              </div>
              <div className='menu-anchor-div'>
                <a href='#pastLogs' className='menu-anchor'>Sign Out</a>
              </div>
            </div>
            <div>
            <img src='/images/app-drawer-pic.png'></img>
            </div>
          </div>
        </div>
      </>
    );
  }
}
