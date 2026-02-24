import { useState } from 'react';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import CursorGlow from './components/CursorGlow';

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* 로딩 화면 */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* 마우스 커서 효과 (전역) */}
      <CursorGlow />

      {/* 앱 본문 */}
      <Navbar />
      <Box component="main">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </Box>
      <Footer />
    </>
  );
};

export default App;
