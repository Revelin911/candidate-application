import { Link } from 'react-router-dom';

const Nav = () => {
  //Displays the navigation bar and link between the pages

  return (
    <nav>
      <ul>
        <li>
        {/* className={({ isActive }) => (isActive ? 'active' : '')}  */}
          <Link to='/' > Home </Link>
        </li>
        <li>
        {/* className={({ isActive }) => (isActive ? 'active' : '')}  */}
          <Link to='/SavedCandidates' > Potential Candidates </Link>
        </li>
      </ul>
      </nav>
  )
};

export default Nav;
