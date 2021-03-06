import React from 'react';
import "./../css/sidebar.css";
import logo from '../images/carecloud-logo.png'; // Tell Webpack this JS file uses this image

// import Menu from './Menu'

class SideBar extends React.Component {

   render() {
      return (
        <div className="rectangle-2-copy sidebar">
          <img className="carelogos1" src={logo} alt="carecloud icd-10 codes"/>

          <ul className="menu">
            <li>
              <a href="/icd10" className="menu-item home">Home</a>
            </li>
            <li>
              <a href="/icd10/bookmarks" className="menu-item bookmarks">Bookmarks</a>
            </li>
            <li>
              <a href="/icd10/chapters" className="menu-item chapters">Chapters</a>
            </li>
            <li>
              <a href="/icd10/history" className="menu-item history">History</a>
            </li>
          </ul>
          <a href="#" onClick={() => this.props.onOpenModal()} className="menu-item account">{this.props.isLoggedIn ? "Account" : "Sign up" }</a>
       </div>
      )
   }
}

export default SideBar;
