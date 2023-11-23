import {useState} from 'react'
import './index.css'

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [showFirstNameError, setShowFirstNameError] = useState(false)
  const [showLastNameError, setShowLastNameError] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onBlurInput = (input, setShowError) => {
    setShowError(!input.trim())
  }

  const onChangeInput = (input, setInput) => event => {
    setInput(event.target.value)
  }

  const validateInput = input => input.trim() !== ''

  const onSubmitForm = async event => {
    event.preventDefault()

    const isValidFirstName = validateInput(firstName)
    const isValidLastName = validateInput(lastName)

    if (isValidFirstName && isValidLastName) {
      setIsLoading(true)

      // Simulate a form submission delay (you can replace this with an actual API call)
      setTimeout(() => {
        setIsFormSubmitted(true)
        setIsLoading(false)
      }, 1000)
    } else {
      setShowFirstNameError(!isValidFirstName)
      setShowLastNameError(!isValidLastName)
      setIsFormSubmitted(false)
    }
  }

  const onClickSubmitAnotherResponse = () => {
    setFirstName('')
    setLastName('')
    setIsFormSubmitted(false)
  }

  const renderSubmissionSuccessView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
        className={`success-image ${isFormSubmitted ? 'rotate-twice' : ''}`}
      />
      <p>Submitted Successfully</p>
      <button
        type="button"
        className="submit-button"
        onClick={onClickSubmitAnotherResponse}
      >
        Submit Another Response
      </button>
    </>
  )

  const renderRegistrationForm = () => (
    <form className="form-container" onSubmit={onSubmitForm}>
      <div className="input-container">
        <label className="input-label" htmlFor="firstName">
          FIRST NAME
        </label>
        <input
          type="text"
          id="firstName"
          className={`name-input-field ${
            showFirstNameError ? 'error-field' : ''
          }`}
          value={firstName}
          placeholder="First name"
          onChange={onChangeInput(firstName, setFirstName)}
          onBlur={() => onBlurInput(firstName, setShowFirstNameError)}
        />
        {showFirstNameError && <p className="error-message">Required</p>}
      </div>

      <div className="input-container">
        <label className="input-label" htmlFor="lastName">
          LAST NAME
        </label>
        <input
          type="text"
          id="lastName"
          className={`name-input-field ${
            showLastNameError ? 'error-field' : ''
          }`}
          value={lastName}
          placeholder="Last name"
          onChange={onChangeInput(lastName, setLastName)}
          onBlur={() => onBlurInput(lastName, setShowLastNameError)}
        />
        {showLastNameError && <p className="error-message">Required</p>}
      </div>

      <button type="submit" className="submit-button" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )

  return (
    <div className="registration-form-container">
      <h1 className="form-title">Registration</h1>
      <div className="view-container">
        {isFormSubmitted
          ? renderSubmissionSuccessView()
          : renderRegistrationForm()}
      </div>
    </div>
  )
}

export default RegistrationForm
