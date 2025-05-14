import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>GUC Internship System</h1>
      <div className="nav-links">
        <Link to="/">Logout</Link>
      </div>
    </nav>
  );
}
