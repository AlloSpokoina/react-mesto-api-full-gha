import { useRef } from "react"
import useFormValidation from "../../utils/useFormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm"


export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {

  const { values, errors, isValid, isInputValid, handleChange, reset, } = useFormValidation()
  const input = useRef()
  function resetClose() {
    onClose()
    reset()
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateAvatar({avatar: input.current.value}, reset)
  }

  return (

    <PopupWithForm
      name='popupAvatar'
      title='Обновить аватар'
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={resetClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        className={`popup__input popup__input_type_link ${isInputValid.avatar === undefined || isInputValid.avatar ? '' : 'popup__error'}`}
        ref={input}
        id="cardInputLinkAvatar"
        type="url"
        name="avatar"
        placeholder="Ссылка на изображение"
        required=""
        value={values.avatar ? values.avatar : ''}
        disabled={isLoading}
        onChange={handleChange}
      />
      <span className="popup__error" id="cardInputLinkAvatar-error">{errors.avatar}</span>
    </PopupWithForm>
  )
}
