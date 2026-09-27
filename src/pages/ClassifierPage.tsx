import { useState } from "react"
import { Button, Card, Container, TextField, Typography, Alert } from "@mui/material"

function ClassifierPage() {
    const [comment, setComment] = useState('')
    const [result, setResult] = useState('')
    const [error, setError] = useState('')

    const handleAnalyze = () => {
        if (!comment) {
            setError('Введите комментарий для анализа')
            setResult('')
            return
        }

        setError('')
        const negativeWords = ['плохо', 'ужасно', 'ненавижу', 'плохой', 'отвратительно']
        const hasNegativeWord = negativeWords.some(word =>
            comment.toLowerCase().includes(word)
        )
        if (hasNegativeWord) {
            setResult('Отрицательный')
        } else {
            setResult('Положительный')
        }
    }

    return (
        <Container sx={{ py: 6 }}>
            <Card sx={{ py: 4 }}>
                <Typography variant="h4"
                            sx={{ mb: 2 }}>
                    Классификатор комментариев
                </Typography>

                <Typography
                        variant="body1"
                        sx={{ mb: 3 }}>
                    Введите комментарий, чтобы определить его тональность.
                </Typography>

                <TextField
                    label="Комментарий"
                    multiline
                    rows={5}
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    fullWidth
                    sx={{ mb: 3 }}
                />

                <Button
                    variant="contained"
                    onClick={handleAnalyze}
                    size="large"
                >
                    Анализировать
                </Button>
                {error && (
                    <Alert severity="error"
                            sx={{ mt: 3 }}>
                        {error}
                    </Alert>
                )}

                {result && (
                    <Alert severity={result === 'Положительный' ? 'success' : 'error'}
                            sx={{ mt: 3 }}>
                        Результат: {result}
                    </Alert>
                )}
            </Card>
        </Container>
    )
}

export default ClassifierPage