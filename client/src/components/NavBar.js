import React from 'react'
import { Link, useHistory } from "react-router-dom";
function NavBar() {
    const history = useHistory()

    return (
        <nav>
            <div>
                <Link to="/" className="nav-link">Home</Link>
            </div>
            <div>
                <Link to="/teachers" className="nav-link">Teachers</Link>
            </div>
            <div>
                <Link to="/students" className="nav-link">Students</Link>
            </div>
            <div>
                <Link to="/courses" className="nav-link">Courses</Link>
            </div>
        </nav>
    );
}

  export default NavBar