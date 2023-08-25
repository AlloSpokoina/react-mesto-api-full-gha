import { useContext, useEffect } from "react"
import useFormValidation from "../../utils/useFormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm"
import CurrentUserContext from "../../contexts/CurrentUserContext"

export default function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
  const currentUser = useContext(CurrentUserContext)
  const { values, errors, isValid, isInputValid, handleChange, reset, setValue } = useFormValidation()

useEffect(() => {
  setValue("name", currentUser.name)
  setValue("info", currentUser.about)
}, [currentUser, setValue])

function resetClose() {
  onClose()
  reset({name: currentUser.name, info: currentUser.about})
}

function handleSubmit(evt) {
  evt.preventDefault()
  onUpdateUser({name: values.name, info: values.info}, reset)
}

  return (
    <PopupWithForm
          name='popupProfile'
          title='Редактировать профиль'
          isOpen={isOpen}
          onClose={resetClose}
          isValid={isValid}
          isLoading={isLoading}
          onSubmit={handleSubmit}
        > <input
            className={`popup__input popup__input_type_name ${isInputValid.name === undefined || isInputValid.name ? '' : 'popup__error'}`}
            type="text"
            name="name"
            minLength={2}
            maxLength={40}
            placeholder="Имя"
            id="popupProfileName"
            required=""
            value={values.name ? values.name : ''}
            disabled={isLoading}
            onChange={handleChange}
          />
          <span className="popup__error" id="popupProfileName-error" >
            {errors.name}
          </span>
          <input
            className={`popup__input popup__input_type_info ${isInputValid.info === undefined || isInputValid.info ? '' : 'popup__error'}`}
            type="text"
            name="info"
            minLength={2}
            maxLength={200}
            placeholder="О себе"
            id="popupProfileInfo"
            required=""
            value={values.info ? values.info : ''}
            disabled={isLoading}
            onChange={handleChange}
          />
          <span className="popup__error" id="popupProfileInfo-error" >
            {errors.info}
          </span>
        </PopupWithForm>
  )
}
