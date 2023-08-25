import { Link, useLocation } from 'react-router-dom'
import logo from '../../images/logo.svg'

export default function Header({ onSignOut, loggedIn, userEmail }) {
  const { pathname } = useLocation();



  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Логотип"
      />
      <div className='header__nav'>
      {loggedIn && <p className='header__email'>{userEmail}</p>}
      {loggedIn
        ? (
          <Link to="/sign-in" className="header__link" onClick={onSignOut}>
            Выйти
          </Link>
        )
        : (
          pathname === '/sign-in'
            ?
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
            :
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>)}
            </div>
    </header>
  )
}
