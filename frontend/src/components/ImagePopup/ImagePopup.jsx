import React from "react"

export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`} onClick={onClose}>
      <div className="popup__image-container" onClick={(evt => evt.stopPropagation())}>
        <button
          type="button"
          className="popup__close"
          aria-label="close"
          id="closeImageButton"
          onClick={onClose}
        />
        <img className="popup__image" src={card.link} alt={`Изображение ${card.name}`} />
        <p className="popup__image-description">{card.name}</p>
      </div>
    </div>
  )
}
