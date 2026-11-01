import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Главная' },
  { to: '/classifier', label: 'Классификатор' },
  { to: '/profile', label: 'Профиль' },
]

function Navbar() {
  return <AppBar position="sticky" elevation={0} className="site-header">
    <Container maxWidth="lg">
      <Toolbar disableGutters sx={{ minHeight: 68, gap: 1, flexWrap: 'wrap' }}>
        <Typography component={Link} to="/" variant="h6" sx={{ flexGrow: 1, color: 'text.primary', textDecoration: 'none', fontWeight: 750 }}>
          Comment Classifier<span className="brand-dot">.</span>
        </Typography>
        {links.map(link => <Button key={link.to} component={NavLink} to={link.to} end={link.to === '/'} className="nav-link" color="inherit">
          {link.label}
        </Button>)}
        <Button component={Link} to="/register" variant="contained" size="small" sx={{ ml: { xs: 0, sm: 1 } }}>Регистрация</Button>
      </Toolbar>
    </Container>
  </AppBar>
}

export default Navbar
