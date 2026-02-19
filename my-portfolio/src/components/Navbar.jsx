import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const navItems = [
  { label: 'Home', id: 'hero' },
  { label: 'About Me', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

function Navbar() {
  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'background.default',
        borderBottom: '2px dashed',
        borderColor: 'custom.borderLight',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h5"
            onClick={() => handleScroll('hero')}
            sx={{
              fontWeight: 800,
              color: 'primary.main',
              cursor: 'pointer',
              letterSpacing: '-0.02em',
            }}
          >
            Portfolio
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  '&:hover': { color: 'error.main' },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
