import { useState } from 'react'
import { Alert, Box, Button, Card, Chip, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { getCommentHistory, type CommentAnalysis } from '../entities/comment/model'
import { CURRENT_USER_KEY, getCurrentUser } from '../entities/user/model'

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('ru-RU', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

function CommentCard({ item }: { item: CommentAnalysis }) {
  const positive = item.sentiment === 'positive'
  return <Card variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
    <Typography sx={{ mb: 1 }}>{item.text}</Typography>
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Chip label={positive ? 'Положительный' : 'Отрицательный'} color={positive ? 'success' : 'error'} size="small" />
      <Typography variant="caption" color="text.secondary">{formatDate(item.createdAt)}</Typography>
    </Box>
  </Card>
}

function ProfilePage() {
  const navigate = useNavigate()
  const [showHistory, setShowHistory] = useState(false)
  const [user] = useState(getCurrentUser)
  const [history] = useState(getCommentHistory)

  function handleLogout() {
    localStorage.removeItem(CURRENT_USER_KEY)
    navigate('/login')
  }

  return (
    <Container maxWidth="md" className="page-enter" sx={{ py: { xs: 4, sm: 7 } }}>
      <Card className="content-card" sx={{ overflow: 'hidden' }}>
        <Box sx={{ p: { xs: 3, sm: 4 }, color: 'white', background: 'linear-gradient(120deg, #3157c8, #5279e5)' }}>
          <Typography variant="overline" sx={{ opacity: 0.8 }}>Ваш аккаунт</Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>Личный кабинет</Typography>
        </Box>
        <Box sx={{ p: { xs: 3, sm: 4 } }}>
          {!user ? <Alert severity="info" action={<Button component={Link} to="/login" color="inherit">Войти</Button>}>
            Чтобы посмотреть профиль, войдите в аккаунт.
          </Alert> : <>
            <Typography variant="h6" sx={{ mb: 2 }}>Данные пользователя</Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 4 }}>
              <Card variant="outlined" sx={{ p: 2.5, flex: 1, borderRadius: 2 }}>
                <Typography variant="caption" color="text.secondary">Имя пользователя</Typography>
                <Typography sx={{ fontWeight: 600 }}>{user.username}</Typography>
              </Card>
              <Card variant="outlined" sx={{ p: 2.5, flex: 1, borderRadius: 2 }}>
                <Typography variant="caption" color="text.secondary">Электронная почта</Typography>
                <Typography sx={{ fontWeight: 600 }}>{user.email}</Typography>
              </Card>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Последние запросы</Typography>
              <Chip label={`${history.length} всего`} variant="outlined" />
            </Box>
            {history.length === 0 ? <Alert severity="info">История пока пуста. Попробуйте проанализировать комментарий.</Alert> :
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>{history.slice(0, 2).map(item => <CommentCard key={item.id} item={item} />)}</Box>}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.5, mt: 3 }}>
              <Button component={Link} to="/classifier" variant="contained">Новый анализ</Button>
              <Button variant="outlined" onClick={() => setShowHistory(true)} disabled={history.length === 0}>Вся история</Button>
              <Button color="inherit" onClick={handleLogout} sx={{ ml: { sm: 'auto' } }}>Выйти</Button>
            </Box>
          </>}
        </Box>
      </Card>
      <Dialog open={showHistory} onClose={() => setShowHistory(false)} fullWidth maxWidth="sm">
        <DialogTitle>История запросов</DialogTitle>
        <DialogContent dividers><Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>{history.map(item => <CommentCard key={item.id} item={item} />)}</Box></DialogContent>
        <DialogActions><Button onClick={() => setShowHistory(false)}>Закрыть</Button></DialogActions>
      </Dialog>
    </Container>
  )
}

export default ProfilePage
