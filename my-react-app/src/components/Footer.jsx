import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      py: 4,
      bgcolor: 'background.paper',
      borderTop: '1px solid',
      borderColor: 'divider',
    }}
  >
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          ©2026 김하미. All Rights Reserved.
        </Typography>

        <Box sx={{ display: 'flex', gap: 3 }}>
          <Link
            href="mailto:computer.busan@gmail.com"
            variant="body2"
            color="text.secondary"
            underline="hover"
            sx={{ '&:hover': { color: 'primary.main' }, transition: 'color 0.2s' }}
          >
            이메일
          </Link>
          <Link
            href="https://github.com/computerbusan-bit/my-portfolio"
            target="_blank"
            rel="noopener noreferrer"
            variant="body2"
            color="text.secondary"
            underline="hover"
            sx={{ '&:hover': { color: 'primary.main' }, transition: 'color 0.2s' }}
          >
            GitHub
          </Link>
        </Box>
      </Box>
    </Container>
  </Box>
);

export default Footer;
