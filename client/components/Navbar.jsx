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
              <a className='navbar-brand app-name'>SurfWrite</a>
              <a className='logs-link-navbar'>Logs</a>
            </div>
            <a><i className="fa-solid fa-bars" onClick={this.handleClickMenu}></i></a>
          </div>
        </nav>

        <div className={menuModalBackground}>
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
