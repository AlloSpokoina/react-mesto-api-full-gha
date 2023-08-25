import useFormValidation from "../../utils/useFormValidation";


export default function Login({ onLogin }) {
  const { handleChange, values, errors, isInputValid } = useFormValidation();

  function handleSubmit(evt) {
    evt.preventDefault()
    onLogin(values.email, values.password)
  }

  return (
    <div className="popup__container popup__container_auth">
      <h2 className="popup__title popup__title_type_auth">Вход</h2>
      <form className="popup__form" onSubmit={handleSubmit}>
        <input
          className={`popup__input popup__input_type_auth ${isInputValid.email === undefined || isInputValid.email ? '' : 'popup__input_type_error'}`}
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          value={values.email || ''}
        />
        <span className="popup__error">{errors.email}</span>
        <input
          className={`popup__input popup__input_type_auth ${isInputValid.password === undefined || isInputValid.password ? '' : 'popup__input_type_error'}`}
          id="password"
          type="password"
          name="password"
          placeholder="Пароль"
          required
          minLength={6}
          maxLength={30}
          onChange={handleChange}
          value={values.password || ''}
        />
        <span className="popup__error">{errors.password}</span>
        <button
          className='popup__submit popup__submit_register'
          type="submit"
          aria-label="Войти"
        >Войти</button>
      </form>
    </div >
  )
}
