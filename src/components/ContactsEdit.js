import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";

function ContactsEdit (props) {
  const navigate = useNavigate()
  const params = useParams()
  const [formData, setForm] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    email: '',
    linkedIn: '',
    twitter: ''
  })

  const [contact, setContact] = useState(false)
  const { setContacts } = props
  useEffect(() => {
    fetch(`http://localhost:4000/contacts/${params.id}`)
      .then(res => res.json())
      .then(res => {
        setContact(res)
        setForm(res)
      })
    //note
    //the params var that should be in the dependences array caoused a memory leack 
    //(unmounted components) and instead of returning a cleaning function I removed it
  }, [])

  function handleChange (e) {
    const { name, value } = e.target
    setForm(x => { return { ...x, [name]: value } })
  }

  if (!contact) {
    return <div className="spinner-border"></div>
  }

  function handleSubmit (e) {
    e.preventDefault()
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }
    fetch(`http://localhost:4000/contacts/${params.id}`, options)
      .then(res => res.json())
      .then(res => {
        setContacts(x => x.map(c => c.id === params.id ? res : c))
        setForm({
          firstName: '',
          lastName: '',
          street: '',
          city: '',
          email: '',
          linkedIn: '',
          twitter: ''
        })
        navigate('/')
      })

  }

  return (
    <form className="form-stack contact-form" onSubmit={ handleSubmit }>
      <h2>Edit Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" onChange={ handleChange }
        value={ formData.firstName } required />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" onChange={ handleChange }
        value={ formData.lastName } required />

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" onChange={ handleChange }
        value={ formData.street } required />

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" onChange={ handleChange }
        value={ formData.city } required />

      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" onChange={ handleChange }
        value={ formData.email } required />

      <label htmlFor="linkedIn">LinkedIn:</label>
      <input id="linkedIn" name="linkedIn" type="text" onChange={ handleChange }
        value={ formData.linkedIn } required />

      <label htmlFor="twitter">Twitter:</label>
      <input id="twitter" name="twitter" type="text" onChange={ handleChange }
        value={ formData.twitter } required />

      <div className="actions-section">
        <button className="button blue" type="submit" >
          Save
        </button>
      </div>
    </form>
  )
}

export default ContactsEdit
