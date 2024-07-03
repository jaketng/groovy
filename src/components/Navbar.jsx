import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Input Track</Link>
        </li>
        <li>
          <Link to="/discover-tracks">Discover Tracks</Link>
        </li>
        <li>
          <Link to="/liked-tracks">Liked Tracks</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
