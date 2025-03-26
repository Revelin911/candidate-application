import { Link } from 'react-router-dom';

const Nav = () => {
  //Displays the navigation bar and link between the pages

  return (
    <nav>
      <ul>
        <li>
          <Link to='/' className={({ isActive }) => (isActive ? 'active' : '')} > Home </Link>
        </li>
        <li>
          <Link to='/SavedCandidates' className={({ isActive }) => (isActive ? 'active' : '')} > Potential Candidates </Link>
        </li>
      </ul>
      </nav>
  )
};

export default Nav;
