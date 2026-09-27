import { Button, Card, Container, TextField, Typography, Alert } from "@mui/material"
import {Link, useNavigate} from "react-router-dom"
import { useState } from "react"

function LoginPage(){
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const handleLogin = () => {
    if (!email || !password) {
        setError('Введите электронную почту и пароль')
        setSuccess('')
        return
    }

    setError('')
    setSuccess('Успешный вход')
    setTimeout(() => {
            navigate('/profile')
        }, 1000)
    console.log('Вход:', email)
}
    return(
    <Container sx={{ py: 6 }}>
        <Card sx={{ p: 4 }}>

            <Typography
                variant="h4"
                sx={{ mb: 3 }}
            >
                Вход
            </Typography>

            <TextField
                label="Электронная почта"
                fullWidth
                sx={{ mb: 2 }}
                onChange={(event) => setEmail(event.target.value)}
            />

            <TextField
                label="Пароль"
                type="password"
                fullWidth
                sx={{ mb: 3 }}
                onChange={(event) => setPassword(event.target.value)}
            />
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <Button
                variant="contained"
                size="large"
                onClick={handleLogin}
            >
                Войти
            </Button>

            <Typography sx={{ mt: 3 }}>
                Нет аккаунта?{" "}
                <Link to="/register">
                    Зарегистрироваться
                </Link>
            </Typography>

        </Card>
    </Container>
)
}
export default LoginPage