import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Chip,
  Button,
  Skeleton,
  Alert,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { supabase } from '../utils/supabase';
import useIntersection from '../hooks/useIntersection';

const THUM_BASE = 'https://image.thum.io/get/width/600/crop/338/';

// ─── 커스텀 로딩 스피너 ───────────────────────────────────────────────────────
const LoadingSpinner = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 5,
      gap: 2,
    }}
  >
    {/* 이중 링 스피너 */}
    <Box sx={{ position: 'relative', width: 56, height: 56 }}>
      {/* 외부 링 */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          border: '3px solid',
          borderColor: 'divider',
          borderTopColor: 'primary.main',
          borderRadius: '50%',
          animation: 'spinOuter 0.9s linear infinite',
          '@keyframes spinOuter': { to: { transform: 'rotate(360deg)' } },
        }}
      />
      {/* 내부 링 (역방향) */}
      <Box
        sx={{
          position: 'absolute',
          inset: 10,
          border: '2px solid transparent',
          borderBottomColor: 'secondary.main',
          borderRadius: '50%',
          animation: 'spinInner 0.7s linear infinite reverse',
          '@keyframes spinInner': { to: { transform: 'rotate(360deg)' } },
        }}
      />
    </Box>
    <Typography variant="caption" color="text.disabled" sx={{ letterSpacing: '0.08em' }}>
      프로젝트 불러오는 중...
    </Typography>
  </Box>
);

const ProjectCardSkeleton = () => (
  <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
    <Skeleton variant="rectangular" sx={{ width: '100%', aspectRatio: '16 / 9' }} />
    <CardContent sx={{ p: 3 }}>
      <Skeleton variant="text" width="55%" height={28} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="80%" sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Skeleton variant="rounded" width={56} height={24} />
        <Skeleton variant="rounded" width={56} height={24} />
        <Skeleton variant="rounded" width={56} height={24} />
      </Box>
    </CardContent>
    <Box sx={{ px: 3, pb: 3 }}>
      <Skeleton variant="rounded" width={100} height={34} />
    </Box>
  </Card>
);

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [headerRef, headerVisible] = useIntersection();
  const [cardsRef, cardsVisible] = useIntersection(0.05);

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
    <Box
      id="projects"
      component="section"
      sx={{ py: { xs: 10, md: 14 }, bgcolor: 'background.paper' }}
    >
      <Container maxWidth="lg">
        {/* 섹션 헤더 */}
        <Box
          ref={headerRef}
          sx={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            mb: 6,
          }}
        >
          <Typography
            variant="body2"
            color="primary"
            fontWeight={600}
            sx={{ letterSpacing: '0.1em', textTransform: 'uppercase', mb: 1 }}
          >
            Projects
          </Typography>
          <Typography variant="h2" sx={{ mb: 1.5 }}>
            직접 만든 것들
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 440 }}>
            아이디어를 코드로 구현한 프로젝트들입니다.
          </Typography>
        </Box>

        {/* 에러 */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* 스피너 + 스켈레톤 로딩 */}
        {loading && (
          <>
            <LoadingSpinner />
            <Grid container spacing={3}>
              {[1, 2, 3, 4].map((i) => (
                <Grid size={{ xs: 12, sm: 6 }} key={i}>
                  <ProjectCardSkeleton />
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {/* 프로젝트 카드 */}
        {!loading && !error && (
          <Box ref={cardsRef}>
            <Grid container spacing={3}>
              {projects.map((project, index) => (
                <Grid size={{ xs: 12, sm: 6 }} key={project.id}>
                  <Card
                    elevation={0}
                    // CSS custom property로 짝/홀 카드 슬라이드 방향 제어
                    style={{ '--ix': index % 2 === 0 ? '-38px' : '38px' }}
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      // animation으로 입장 처리 → transitionDelay 없이 hover 즉시 반응
                      willChange: 'transform',
                      opacity: cardsVisible ? undefined : 0,
                      animation: cardsVisible
                        ? `projIn 0.65s cubic-bezier(0.22,1,0.36,1) ${(index * 0.1).toFixed(1)}s both`
                        : 'none',
                      '@keyframes projIn': {
                        from: { opacity: 0, transform: 'translate3d(var(--ix, 0px), 22px, 0)' },
                        to:   { opacity: 1, transform: 'translate3d(0, 0, 0)' },
                      },
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.12), 0 6px 16px rgba(25,118,210,0.1)',
                        borderColor: 'primary.main',
                      },
                    }}
                  >
                    {/* 16:9 썸네일 */}
                    <Box
                      component="a"
                      href={project.detail_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: 'block',
                        position: 'relative',
                        textDecoration: 'none',
                        overflow: 'hidden',
                        borderRadius: '16px 16px 0 0',
                        '&:hover .project-img': {
                          transform: 'scale(1.08)',
                          filter: 'brightness(0.72)',
                        },
                        '&:hover .project-overlay': { opacity: 1 },
                      }}
                    >
                      <CardMedia
                        className="project-img"
                        component="img"
                        image={`${THUM_BASE}${project.detail_url}`}
                        alt={`${project.title} 스크린샷`}
                        sx={{
                          width: '100%',
                          aspectRatio: '16 / 9',
                          objectFit: 'cover',
                          objectPosition: 'top',
                          bgcolor: 'grey.100',
                          transition: 'transform 0.4s ease, filter 0.4s ease',
                          willChange: 'transform',
                        }}
                      />
                      {/* 호버 오버레이 */}
                      <Box
                        className="project-overlay"
                        aria-hidden="true"
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 1,
                          opacity: 0,
                          transition: 'opacity 0.35s ease',
                          pointerEvents: 'none',
                          color: 'white',
                        }}
                      >
                        <OpenInNewIcon sx={{ fontSize: 30 }} />
                        <Typography variant="body2" fontWeight={700} sx={{ color: 'white', letterSpacing: '0.04em' }}>
                          사이트 보기
                        </Typography>
                      </Box>
                    </Box>

                    <CardContent sx={{ flex: 1, p: 3 }}>
                      <Typography variant="h3" gutterBottom sx={{ fontSize: '1.125rem' }}>
                        {project.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                        {project.description}
                      </Typography>

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
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProjectsSection;
