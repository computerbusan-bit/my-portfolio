import { Container, Typography, Divider } from '@mui/material';
import CardSection from './components/CardSection';
import DragDropSection from './components/DragDropSection';
import ContactSection from './components/ContactSection';
import ProjectsSection from './components/ProjectsSection';

const App = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h1" align="center" gutterBottom>
        AI 서비스
      </Typography>
      <Typography
        variant="body1"
        align="center"
        color="text.secondary"
        sx={{ mb: 5 }}
      >
        다양한 AI 기술을 활용한 서비스를 살펴보세요.
      </Typography>

      <CardSection />

      <Divider sx={{ my: 6 }} />

      <DragDropSection />

      <Divider sx={{ my: 6 }} />

      <ProjectsSection />

      <Divider sx={{ my: 6 }} />

      <ContactSection />
    </Container>
  );
};

export default App;
