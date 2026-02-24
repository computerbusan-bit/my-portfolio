import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

// ─── SVG 일러스트 로고 ────────────────────────────────────────────────────────

const KHLogo = () => (
  <Box
    component="a"
    href="#"
    aria-label="홈으로"
    sx={{
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      transition: 'transform 0.25s ease',
      '&:hover': { transform: 'scale(1.07)' },
    }}
  >
    <Box
      component="svg"
      width="38"
      height="38"
      viewBox="0 0 38 38"
      sx={{ display: 'block' }}
    >
      {/* 바깥 점선 링 */}
      <circle
        cx="19" cy="19" r="17.5"
        fill="none"
        stroke="#1976d2"
        strokeWidth="1"
        strokeDasharray="3 2.5"
        opacity="0.45"
      />
      {/* 사방 포인트 점 */}
      <circle cx="19" cy="2.5" r="1.5" fill="#1976d2" opacity="0.5" />
      <circle cx="19" cy="35.5" r="1.5" fill="#1976d2" opacity="0.5" />
      <circle cx="2.5" cy="19" r="1.5" fill="#1976d2" opacity="0.5" />
      <circle cx="35.5" cy="19" r="1.5" fill="#1976d2" opacity="0.5" />
      {/* 안쪽 채운 원 */}
      <circle cx="19" cy="19" r="13.5" fill="#1976d2" />
      {/* 안쪽 얇은 링 (레이어감) */}
      <circle cx="19" cy="19" r="11.5" fill="none" stroke="white" strokeWidth="0.6" opacity="0.2" />
      {/* K 자형 */}
      <path
        d="M11 13L11 25M11 19L18 13M11 19L18 25"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* H 자형 */}
      <path
        d="M21 13L21 25M27 13L27 25M21 19L27 19"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Box>
  </Box>
);

// ─── 컴포넌트 ─────────────────────────────────────────────────────────────────

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: scrolled ? 'rgba(255,255,255,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid' : 'none',
          borderColor: 'divider',
          transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease, border-bottom 0.3s ease',
          color: 'text.primary',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 5 } }}>
          <KHLogo />

          {/* 데스크톱 메뉴 */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {NAV_ITEMS.map((item) => (
                <Button
                  key={item.label}
                  href={item.href}
                  sx={{
                    color: 'text.primary',
                    fontWeight: 500,
                    px: 2,
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: 'transparent',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* 모바일 햄버거 */}
          {isMobile && (
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* 모바일 드로어 */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 240 } }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ px: 1 }}>
          {NAV_ITEMS.map((item) => (
            <ListItemButton
              key={item.label}
              component="a"
              href={item.href}
              onClick={() => setDrawerOpen(false)}
              sx={{ borderRadius: 2, py: 1.5, px: 2.5 }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontWeight: 600, fontSize: '1rem' }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
