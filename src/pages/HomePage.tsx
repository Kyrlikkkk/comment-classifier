import { Box, Button, Card, Container, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

function HomePage() {
  return <Container maxWidth="lg" className="page-enter" sx={{ py: { xs: 4, md: 8 } }}>
    <Card className="hero-card" sx={{ p: { xs: 3, sm: 5, md: 7 }, mb: 3 }}>
      <Box sx={{ maxWidth: 680, position: 'relative', zIndex: 1 }}>
        <Typography variant="overline" color="primary.main">Простой анализ отзывов</Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: '2.35rem', sm: '3.5rem' }, fontWeight: 750, lineHeight: 1.08, mb: 2 }}>
          Понимайте тон комментариев
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, maxWidth: 560, mb: 3 }}>
          Введите отзыв и быстро определите, положительный он или отрицательный. Результаты можно посмотреть в личном кабинете.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <Button component={Link} to="/classifier" variant="contained" size="large">Попробовать анализ →</Button>
          <Button component={Link} to="/register" variant="outlined" size="large">Создать аккаунт</Button>
        </Stack>
      </Box>
    </Card>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2 }}>
      {[
        { icon: '✳', title: 'Быстрый анализ', text: 'Получите демонстрационную оценку тональности комментария.' },
        { icon: '↺', title: 'История результатов', text: 'Возвращайтесь к предыдущим проверкам в профиле.' },
        { icon: '☺', title: 'Настроение на виду', text: 'Хороший отзыв подсветим зелёным, грустный — красным.' },
      ].map(item => <Card key={item.title} className="feature-card" sx={{ p: 2.5 }}>
        <Typography color="primary.main" variant="h5" aria-hidden="true">{item.icon}</Typography><Typography variant="h6" sx={{ mt: 1, mb: .5 }}>{item.title}</Typography><Typography color="text.secondary">{item.text}</Typography>
      </Card>)}
    </Box>
  </Container>
}

export default HomePage
