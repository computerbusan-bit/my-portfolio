import { Box, Container, Typography, AppBar, Toolbar } from '@mui/material'
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed'
import Feed from './components/Feed'

const App = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky" color="primary" elevation={1}>
        <Toolbar>
          <DynamicFeedIcon sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 1 }}>
            Mini SNS
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ py: 3 }}>
        <Feed />
      </Container>
    </Box>
  )
}

export default App
