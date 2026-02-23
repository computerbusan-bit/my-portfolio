import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import AddIcon from '@mui/icons-material/Add'
import LoginIcon from '@mui/icons-material/Login'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <AppBar position="sticky" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Box
            onClick={() => navigate('/')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              flexGrow: 1,
            }}
          >
            <FitnessCenterIcon sx={{ color: 'primary.main', fontSize: 32 }} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                background: 'linear-gradient(90deg, #FF6B00, #E53935)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1,
              }}
            >
              CrossFit World
            </Typography>
          </Box>
          <Button
            variant="text"
            onClick={() => navigate('/')}
            sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
          >
            커뮤니티
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/create')}
            size="small"
          >
            글쓰기
          </Button>
          <Button
            variant="outlined"
            startIcon={<LoginIcon />}
            onClick={() => navigate('/login')}
            size="small"
            sx={{ borderColor: '#2a2a2a', color: 'text.secondary', '&:hover': { borderColor: 'primary.main', color: 'primary.main' } }}
          >
            로그인
          </Button>
          <Button
            variant="outlined"
            startIcon={<PersonAddIcon />}
            onClick={() => navigate('/register')}
            size="small"
            sx={{ borderColor: 'primary.main', color: 'primary.main' }}
          >
            회원가입
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
