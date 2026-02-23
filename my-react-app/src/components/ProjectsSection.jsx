import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Chip,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { supabase } from '../utils/supabase';

const THUM_BASE = 'https://image.thum.io/get/width/600/crop/400/';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error: fetchError } = await supabase
        .from('projects')
        .select('id, title, description, tech_stack, detail_url, sort_order')
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (fetchError) {
        setError('프로젝트를 불러오는 데 실패했습니다.');
      } else {
        setProjects(data ?? []);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <Box id="projects">
      <Typography variant="h2" align="center" gutterBottom>
        Projects
      </Typography>
      <Typography
        variant="body1"
        align="center"
        color="text.secondary"
        sx={{ mb: 5 }}
      >
        직접 만든 프로젝트들을 소개합니다 🚀
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid size={{ xs: 12, sm: 6 }} key={project.id}>
              <Card
                elevation={2}
                sx={{
                  borderRadius: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
              >
                {/* 썸네일 - image.thum.io 실시간 스크린샷 */}
                <Box
                  component="a"
                  href={project.detail_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ display: 'block', textDecoration: 'none' }}
                >
                  <CardMedia
                    component="img"
                    image={`${THUM_BASE}${project.detail_url}`}
                    alt={`${project.title} 스크린샷`}
                    sx={{
                      width: '100%',
                      aspectRatio: '1 / 1',
                      objectFit: 'cover',
                      objectPosition: 'top',
                      bgcolor: 'grey.100',
                    }}
                  />
                </Box>

                <CardContent sx={{ flex: 1, p: 3 }}>
                  <Typography variant="h3" gutterBottom sx={{ fontSize: '1.25rem' }}>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {project.description}
                  </Typography>

                  {/* 기술 스택 태그 */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                    {project.tech_stack.map((tech) => (
                      <Chip
                        key={tech}
                        label={tech}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ fontWeight: 500 }}
                      />
                    ))}
                  </Box>
                </CardContent>

                <CardActions sx={{ px: 3, pb: 3 }}>
                  <Button
                    variant="contained"
                    size="small"
                    endIcon={<OpenInNewIcon />}
                    href={project.detail_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    component="a"
                    sx={{ borderRadius: 2 }}
                  >
                    사이트 보기
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProjectsSection;
