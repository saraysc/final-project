import React from 'react';

export default function Header(props) {
  return (
    <header className='header'>
      <nav className="navbar navbar-expand-lg navbar-light white">
        <a className="link main-link-margin" href="#">Postis</a>
        <button className="navbar-toggler white" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="link" href="#">My Group</a>
            </li>
            <li className="nav-item">
              <a className="link" href="#">My Comments</a>
            </li>
          </ul>
          <span className="navbar-toggler-icon white" />
        </div>
      </nav>
    </header>
  );
}
