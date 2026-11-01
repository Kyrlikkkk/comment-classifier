import { useState, type SubmitEvent } from 'react'
import { Alert, Box, Button, Card, Container, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { DEMO_USER_KEY, getDemoUser, type DemoUser } from '../entities/user/model'
import { emailPattern } from '../shared/validation'

function RegisterPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function handleRegister(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (username.trim().length < 2) {
      setError('Имя пользователя должно содержать не менее 2 символов')
      return
    }
    if (!emailPattern.test(email)) {
      setError('Введите корректный адрес электронной почты')
      return
    }
    if (password.length < 6) {
      setError('Пароль должен содержать не менее 6 символов')
      return
    }
    if (password !== confirmPassword) {
      setError('Пароли не совпадают')
      return
    }
    if (getDemoUser()?.email === email.trim().toLowerCase()) {
      setError('Этот адрес уже зарегистрирован. Войдите в аккаунт.')
      return
    }

    const user: DemoUser = { username: username.trim(), email: email.trim().toLowerCase(), password }
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user))
    setSuccess(true)
    window.setTimeout(() => navigate('/login'), 900)
  }

  return (
    <Container maxWidth="sm" className="page-enter" sx={{ py: { xs: 4, sm: 7 } }}>
      <Card className="form-card" sx={{ p: { xs: 3, sm: 5 } }}>
        <Typography variant="overline" color="primary.main">Создать аккаунт</Typography>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>Регистрация</Typography>
        <Box component="form" onSubmit={handleRegister} noValidate>
          <TextField label="Имя пользователя" value={username} onChange={e => setUsername(e.target.value)} fullWidth required slotProps={{ htmlInput: { minLength: 2 } }} sx={{ mb: 2 }} />
          <TextField label="Электронная почта" type="email" value={email} onChange={e => setEmail(e.target.value)} fullWidth required sx={{ mb: 2 }} />
          <TextField label="Пароль" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth required slotProps={{ htmlInput: { minLength: 6 } }} sx={{ mb: 2 }} />
          <TextField label="Подтверждение пароля" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} fullWidth required sx={{ mb: 2.5 }} />
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>Аккаунт создан. Переходим ко входу…</Alert>}
          <Button type="submit" variant="contained" size="large" fullWidth>Зарегистрироваться</Button>
        </Box>
        <Typography sx={{ mt: 3 }} color="text.secondary">Уже есть аккаунт? <Link to="/login">Войти</Link></Typography>
      </Card>
    </Container>
  )
}

export default RegisterPage
