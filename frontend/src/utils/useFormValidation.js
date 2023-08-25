import { useCallback, useState } from "react"

export default function useFormValidation() {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)
  const [isInputValid, setIsInputValid] = useState({})


  function handleChange(evt) {
    const name = evt.target.name
    const value = evt.target.value
    const validationMessage = evt.target.validationMessage
    const valid = evt.target.validity.valid
    const form = evt.target.form

    setValues((previousValues) => {
      return { ...previousValues, [name]: value }
    })

    setErrors((previousErrors) => {
      return { ...previousErrors, [name]: validationMessage }
    })

    setIsInputValid((previousInputValid) => {
      return { ...previousInputValid, [name]: valid }
    })

    setIsValid(form.checkValidity())
  }

  function reset(data={}) {
    setValues(data)
    setErrors({})
    setIsValid(false)
    setIsInputValid({})
  }

  const setValue = useCallback((name, value) => {
    setValues((previousValues) => {
      return { ...previousValues, [name]: value }
    })
  }, [])

  return { values, errors, isValid, isInputValid, handleChange, reset, setValue }
}
