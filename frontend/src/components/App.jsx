import { Routes, Route, useNavigate, Navigate, Router, Switch } from 'react-router-dom';
import Header from "./Header/Header.jsx";
import Register from './Register/Register.jsx';
import Login from './Login/Login.jsx';
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import React, { useCallback, useEffect, useState } from "react";
import CurrentUserContext from '../contexts/CurrentUserContext.js'
import api from '../utils/api.js'
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import { register, login, getUserData } from "../utils/authorization.js";
import ProtectedRoute from './ProtectedRoute/ProtectedRoute.jsx';
import InfoTooltip from './InfoTooltip/InfoTooltip.jsx';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopup, setIsImagePopup] = useState(false)
  const [isDeletePopup, setDeletePopup] = useState(false)

  const [currentUser, setCurrentUser] = useState({})

  const [loading, setLoading] = useState(true)
  const [cards, setCards] = useState([])
  const [deleteCardId, setDeleteCardId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);


  const setStatesForCloseAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setisEditAvatarPopupOpen(false)
    setIsImagePopup(false)
    setDeletePopup(false)
    setIsInfoToolTipPopupOpen(false)
  }, [])

  const closeAllPopups = useCallback(() => {
    setStatesForCloseAllPopups()
  }, [setStatesForCloseAllPopups]);

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopup;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
    }

    return () => {
      document.removeEventListener('keydown', closeByEscape);
    }
  }, [isOpen]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setIsImagePopup(true)
  }

  function handleDeletePopup(cardId) {
    setDeleteCardId(cardId)
    setDeletePopup(true)
  }


  function handleUpdateUser(dataUser, reset) {
    setIsLoading(true)
    api.setUserInfo(dataUser, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
      })
      .catch((error) => console.error(`Ошибка при вводе данных ${error}`))
      .finally(() => setIsLoading(false))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser);
    api
      .changeLikeCardStatus(card._id, localStorage.jwt, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.error(`Ошибка ${error}`));
  }


  function handleUpdateAvatar(dataUser, reset) {
    setIsLoading(true)
    api.setAddNewAvatar(dataUser, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
      })
      .catch((error) => console.error(`Ошибка при обновлении аватара ${error}`))
      .finally(() => setIsLoading(false))
  }

  function handleSubmitPlace(dataCard, reset) {
    setIsLoading(true)
    api.addCard(dataCard, localStorage.jwt)
      .then((res) => {
        setCards([res, ...cards])
        closeAllPopups()
        reset()
      })
      .catch((error) => console.error(`Ошибка добавления карточки ${error}`))
      .finally(() => setIsLoading(false))
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/sign-in');
  }

  useEffect(() => {
    setLoading(true)
    if (loggedIn) {
      Promise.all([api.getInfo(localStorage.jwt), api.getCards(localStorage.jwt)])
        .then(([dataUser, dataCards]) => {
          setCurrentUser(dataUser)
          setCards(dataCards)
          setLoading(false)
        })
        .catch((error) => console.error(`Ошибка при загрузке данных ${error}`));
    }
  }, [loggedIn])

  useEffect(() => {
    if (localStorage.jwt) {
      getUserData(localStorage.jwt)
      .then(res => {
        setUserEmail(res.data.email)
        setLoggedIn(true)
          navigate('/')
        })
        .catch(error => console.error(`Ошибка авторизации ${error}`))
    } else {
      setLoggedIn(false)
    }
  }, [navigate])


  function handleDeleteSubmit(evt) {
    evt.preventDefault()
    setIsLoading(true)
    api.deleteCard(deleteCardId, localStorage.jwt)
      .then(() => {
        setCards(cards.filter(card => {
          return card._id !== deleteCardId
        }))
        closeAllPopups()
      })
      .catch((error) => console.error(`Ошибка удаления карточки ${error}`))
      .finally(() => setIsLoading(false))
  }


  function handleRegister(email, password) {
    register(email, password)
      .then((res) => {
        setIsInfoToolTipPopupOpen(true)
        setIsSuccessful(true)
        navigate('/sign-in')
      })
      .catch((err) => {
        setIsInfoToolTipPopupOpen(true);
        setIsSuccessful(false);
        console.error(`Ошибка регистрации ${err}`)
      })
  }

  function handleLogin(email, password) {
    login(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token)
        setLoggedIn(true)
        navigate('/')
      })
      .catch((err) => {
        setIsInfoToolTipPopupOpen(true)
        setIsSuccessful(false)
        console.error(`Ошибка авторизации ${err}`)
      })
  }

  function handleSignOut() {
    localStorage.removeItem('jwt')
    setLoggedIn(false)
    navigate('/sign-in')
  }

  function handleTokenCheck(token) {
    getUserData(token)
      .then(res => {
        setLoggedIn(res.data != null)
        setUserEmail(res.data.email)
        navigate('/')
      })
      .catch(() => console.log('error'))
  }

  return (
    <div className="page__container">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          userEmail={userEmail}
          onSignOut={handleSignOut}
          loggedIn={loggedIn} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                userEmail={userEmail}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                loading={loading}
                onDelete={handleDeletePopup}
                onCardLike={handleCardLike}
              />}></Route>

          <Route path='/sign-up' element={<Register
            onRegister={handleRegister}
          />} />

          <Route path='/sign-in' element={<Login
            onLogin={handleLogin}
            onTokenCheck={handleTokenCheck}
          />} />

          <Route path='*' element={<Navigate to='/' replace />} />


        </Routes>
        <Footer />

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleSubmitPlace}
          onClose={closeAllPopups}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
        />

        <PopupWithForm
          name='popupDelete'
          title='Вы уверенны'
          titleButton='Да'
          isOpen={isDeletePopup}
          onSubmit={handleDeleteSubmit}
          isLoading={isLoading}
          onClose={closeAllPopups}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopup}
          onClose={closeAllPopups} />

        <InfoTooltip
          isOpen={isInfoToolTipPopupOpen}
          isSuccess={isSuccessful}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>

  );
}

export default App;
