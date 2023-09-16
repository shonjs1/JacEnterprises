import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <ul className="nav nav-pills sticky-top justify-content-center">
      <li className="nav-item">
        <NavLink to='/' className="nav-link">HOME</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to='/temp' className="nav-link">MYSTERY EDUCATOR</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to='/about-us' className="nav-link">ABOUT US</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to='/contact' className="nav-link">CONTACT</NavLink>
      </li>
    </ul>
  );
};

export default Navbar;