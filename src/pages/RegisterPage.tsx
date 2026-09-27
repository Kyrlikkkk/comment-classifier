import { Button, TextField, Alert, Card, Container, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

function RegisterPage(){
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const passwordsMatch = password === confirmPassword
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const handleRegister = () => {
        if (!username || !email || !password || !confirmPassword) {
        setError('Заполните все поля')
        setSuccess('')
        return
    }
        if (!passwordsMatch){
            setError("Пароли не совпадают!")
            setSuccess('')
            return
        }
        setError('')
        setSuccess('Регистрация выполнена')
        setTimeout(() => {
            navigate('/login')
        }, 1000)
    }
    return(
    <Container sx={{ py: 6 }}>
        <Card sx={{ p: 4 }}>

            <Typography
                variant="h4"
                sx={{ mb: 3 }}
            >
                Регистрация
            </Typography>

            <TextField
                label="Имя пользователя"
                fullWidth
                sx={{ mb: 2 }}
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />

            <TextField
                label="Электронная почта"
                fullWidth
                sx={{ mb: 2 }}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />

            <TextField
                label="Пароль"
                type="password"
                fullWidth
                sx={{ mb: 2 }}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />

            <TextField
                label="Подтверждение пароля"
                type="password"
                fullWidth
                sx={{ mb: 3 }}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
            />

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {success}
                </Alert>
            )}

            <Button
                variant="contained"
                size="large"
                onClick={handleRegister}
            >
                Зарегистрироваться
            </Button>

            <Typography sx={{ mt: 3 }}>
                Уже есть аккаунт?{" "}
                <Link to="/login">
                    Войти
                </Link>
            </Typography>

        </Card>
    </Container>
)
}
export default RegisterPage