import React from "react"

export default function PopupWithForm({ name, title, titleButton, children, isOpen, onClose, onSubmit, isLoading, isValid = true }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onClick={onClose}>
      <div className="popup__container" onClick={(evt => evt.stopPropagation())}>
        <button
          className="popup__close"
          type="button"
          aria-label="close popup edit profile"
          onClick={onClose}
        />
        <h3 className="popup__title">{title}</h3>
        <form
          className="popup__form"
          name={name}
          onSubmit={onSubmit}
        >
          {children}
          <button className={`popup__submit ${isValid ? '' : 'popup__submit_disabled'}`} aria-label="save" type="submit"
            disabled={isLoading}>
            {isLoading ? '...' : titleButton || 'Сохранить'}

          </button>
        </form>
      </div>
    </div>
  )
}
