import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        mt: 'auto',
        bgcolor: 'primary.main',
        borderTop: '4px solid',
        borderColor: 'secondary.main',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="body2"
          align="center"
          sx={{ color: 'common.white', fontWeight: 500 }}
        >
          &copy; {new Date().getFullYear()} My Portfolio. Built with React & MUI.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
