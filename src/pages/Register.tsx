import React, { FormEvent, useState } from 'react'
import classes from './Register.module.css'
import { useAuth } from '../providers/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import toast from 'react-hot-toast'

const Register = () => {
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) return
    setSubmitting(true)

    try {
      if (passwordInput !== passwordConfirm) {
        setPasswordConfirm('')
        setPasswordInput('')
        return alert('Password Not Match!!!')
      }

      await register(usernameInput, nameInput, passwordInput)

      toast.success('Successful Registration.')

      navigate('/login')
    } catch (err) {
      console.log(err)
      toast.error('Unsuccessful Registration')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={classes.register}>
      <div className="text-2xl text-white">REGISTER</div>
      <div className="text-left m-auto">
        <label className="text-l flex flex-col text-white my-1">Username</label>
        <input
          type="text"
          value={usernameInput}
          className="px-2 py-0.5 rounded"
          onChange={(e) => setUsernameInput(e.target.value)}
          required
        />
      </div>
      <div className="text-left m-auto">
        <label className="text-l flex flex-col text-white my-1">Name</label>
        <input
          type="text"
          value={nameInput}
          className="px-2 py-0.5 rounded"
          onChange={(e) => setNameInput(e.target.value)}
          required
        />
      </div>
      <div className="text-left m-auto">
        <label className="text-l flex flex-col text-white my-1">Password</label>
        <input
          type="password"
          value={passwordInput}
          className="px-2 py-0.5 rounded"
          onChange={(e) => setPasswordInput(e.target.value)}
          required
        />
      </div>
      <div className="text-left m-auto mb-2">
        <label className="text-l flex flex-col text-white my-1 ">Password Confirm</label>
        <input
          type="password"
          value={passwordConfirm}
          className="px-2 py-0.5 rounded"
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
        />
      </div>

      <Button type="submit" variant="contained" disabled={isSubmitting}>
        Register
      </Button>

      <Link to="/login" className="text-l text-white">
        Already have an account? Login
      </Link>
    </form>
  )
}

export default Register
