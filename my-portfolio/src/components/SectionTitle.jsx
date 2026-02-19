import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function SectionTitle({ children, subtitle }) {
  return (
    <Box sx={{ textAlign: 'center', mb: 6 }}>
      <Typography
        variant="h3"
        component="h2"
        sx={{
          fontWeight: 800,
          mb: 1,
          position: 'relative',
          display: 'inline-block',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 60,
            height: 4,
            bgcolor: 'secondary.main',
            borderRadius: 2,
          },
        }}
      >
        {children}
      </Typography>
      {subtitle && (
        <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

export default SectionTitle;
