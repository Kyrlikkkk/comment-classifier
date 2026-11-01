import { useState, type SubmitEvent } from 'react'
import { Alert, Button, Card, CircularProgress, Container, Stack, TextField, Typography } from '@mui/material'
import { getCommentHistory, saveCommentAnalysis, type CommentAnalysis } from '../entities/comment/model'

const negativeWords = ['плохо', 'ужасно', 'ненавижу', 'плохой', 'отвратительно', 'ужасный', 'не понрав']

function ClassifierPage() {
  const [comment, setComment] = useState('')
  const [result, setResult] = useState<CommentAnalysis | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleAnalyze(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const text = comment.trim()
    if (!text) {
      setError('Введите комментарий для анализа')
      setResult(null)
      return
    }

    setError('')
    setResult(null)
    setLoading(true)
    window.setTimeout(() => {
      const lowerText = text.toLowerCase()
      const sentiment: CommentAnalysis['sentiment'] = negativeWords.some(word => lowerText.includes(word)) ? 'negative' : 'positive'
      const analysis: CommentAnalysis = { id: crypto.randomUUID(), text, sentiment, createdAt: new Date().toISOString() }
      saveCommentAnalysis(analysis)
      setResult(analysis)
      setLoading(false)
    }, 350)
  }

  const historyCount = getCommentHistory().length

  return (
    <Container maxWidth="md" className="page-enter" sx={{ py: { xs: 4, sm: 7 } }}>
      <Card className="content-card" sx={{ p: { xs: 3, sm: 5 } }}>
        <Typography variant="overline" color="primary.main">Быстрый анализ</Typography>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>Классификатор комментариев</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>Введите отзыв — определим его тональность и сохраним результат в истории этого браузера.</Typography>
        <Stack component="form" onSubmit={handleAnalyze} spacing={2}>
          <TextField label="Комментарий" placeholder="Например: Отличный товар, всё понравилось!" multiline minRows={5} maxRows={10} value={comment} onChange={event => { setComment(event.target.value); setError('') }} error={Boolean(error)} helperText={error} fullWidth />
          <Button type="submit" variant="contained" size="large" disabled={loading} sx={{ alignSelf: 'flex-start', minWidth: 190 }}>
            {loading ? <><CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />Анализируем…</> : 'Анализировать'}
          </Button>
        </Stack>
        {result && <Alert className="result-enter" severity={result.sentiment === 'positive' ? 'success' : 'error'} sx={{ mt: 3 }}>
          Результат: <strong>{result.sentiment === 'positive' ? 'Положительный' : 'Отрицательный'}</strong>
        </Alert>}
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 3 }}>
          Сохранено в истории: {historyCount}.
        </Typography>
      </Card>
    </Container>
  )
}

export default ClassifierPage
