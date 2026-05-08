import React, { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-scroll';

const Navbar = () => {
  const [show, setShow] = useState(false);
  return (
    <nav>
      <div className="logo">RIDMA EVENT PLANNER</div>
      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          <Link to="landing" spy={true} smooth={true} duration={500} onClick={() => setShow(false)}>HOME</Link>
          <Link to="services" spy={true} smooth={true} duration={500} onClick={() => setShow(false)}>SERVICES</Link>
          <Link to="about" spy={true} smooth={true} duration={500} onClick={() => setShow(false)}>ABOUT</Link>
          <Link to="contact" spy={true} smooth={true} duration={500} onClick={() => setShow(false)}>CONTACT</Link>
        </div>
      </div>
      <div className="hamburger" onClick={() => setShow(!show)}>
        <GiHamburgerMenu />
      </div>

    </nav>
  )
}

export default Navbar
