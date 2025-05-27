import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'
import Button from '../../components/Button'

const LoginForm = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login('fake-token')
    navigate('/')
  }

  return (
    <div className="login-container">
      <h1 style={{ marginBottom: '1rem' }}>Login</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem' }}>
        <input type="email" placeholder="Email address" required />
        <input type="password" placeholder="Password" required />
        <Button type="submit">Log in</Button>
      </form>
    </div>
  )
}

export default LoginForm
