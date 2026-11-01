import { useState, type SubmitEvent } from 'react'
import { Alert, Box, Button, Card, Container, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { CURRENT_USER_KEY, getDemoUser } from '../entities/user/model'

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleLogin(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const user = getDemoUser()
    if (!user) {
      setError('Сначала создайте аккаунт на странице регистрации')
      return
    }
    if (email.trim().toLowerCase() !== user.email || password !== user.password) {
      setError('Проверьте электронную почту и пароль')
      return
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    navigate('/profile')
  }

  return (
    <Container maxWidth="sm" className="page-enter" sx={{ py: { xs: 4, sm: 7 } }}>
      <Card className="form-card" sx={{ p: { xs: 3, sm: 5 } }}>
        <Typography variant="overline" color="primary.main">Рады вас видеть</Typography>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>Вход</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>Войдите в аккаунт</Typography>
        <Box component="form" onSubmit={handleLogin}>
          <TextField label="Электронная почта" type="email" value={email} onChange={e => setEmail(e.target.value)} fullWidth required sx={{ mb: 2 }} />
          <TextField label="Пароль" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth required sx={{ mb: 2.5 }} />
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Button type="submit" variant="contained" size="large" fullWidth>Войти</Button>
        </Box>
        <Typography sx={{ mt: 3 }} color="text.secondary">Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></Typography>
      </Card>
    </Container>
  )
}

export default LoginPage
