import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../contexts/AuthProvider/context';
import { getTokenData, isAuthenticated } from '../../util/auth';
import { removeAuth } from '../../util/storage';
import './styles.css';

const Navbar = () => {

  const { authContextData, setAuthContextData } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData()
      });
    }
    else {
      setAuthContextData({
        authenticated: false
      })
    }
  }, [setAuthContextData]);

  const logout = () => {
    removeAuth();
    setAuthContextData({
      authenticated: false
    });
    navigate('/')
  }

  return (
    <nav className="container-fluid p-0 primary-bg-color">
      <div className="container d-flex align-items-center justify-content-between" id="links-container">
        <Link to="/movies" className="text-black" id="banner-link">MovieFlix</Link>
        { authContextData.authenticated && (
          <a
            href='#'
            className="text-black"
            id="logout-link"
            onClick={() => logout()}
          >Sair</a>
        ) }
      </div>
    </nav>
  );
}

export default Navbar;
