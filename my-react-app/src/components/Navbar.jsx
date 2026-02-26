import { useState, useEffect, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Divider,
} from '@mui/material';
import DarkModeToggle from './DarkModeToggle';

const NAV_ITEMS = [
  { label: 'About',    href: '#about',    id: 'about' },
  { label: 'Skills',   href: '#skills',   id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Contact',  href: '#contact',  id: 'contact' },
];

// ─── SVG 로고 ────────────────────────────────────────────────────────────────

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
    <Box component="svg" width="38" height="38" viewBox="0 0 38 38" sx={{ display: 'block' }}>
      <circle cx="19" cy="19" r="17.5" fill="none" stroke="#1976d2" strokeWidth="1" strokeDasharray="3 2.5" opacity="0.45" />
      <circle cx="19" cy="2.5"  r="1.5" fill="#1976d2" opacity="0.5" />
      <circle cx="19" cy="35.5" r="1.5" fill="#1976d2" opacity="0.5" />
      <circle cx="2.5"  cy="19" r="1.5" fill="#1976d2" opacity="0.5" />
      <circle cx="35.5" cy="19" r="1.5" fill="#1976d2" opacity="0.5" />
      <circle cx="19" cy="19" r="13.5" fill="#1976d2" />
      <circle cx="19" cy="19" r="11.5" fill="none" stroke="white" strokeWidth="0.6" opacity="0.2" />
      <path d="M11 13L11 25M11 19L18 13M11 19L18 25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M21 13L21 25M27 13L27 25M21 19L27 19"  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Box>
  </Box>
);

// ─── 햄버거 → X 버튼 ─────────────────────────────────────────────────────────

const HamburgerBtn = ({ open, onClick }) => (
  <Box
    component="button"
    onClick={onClick}
    aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
    aria-expanded={open}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '5px',
      width: 40,
      height: 40,
      border: 'none',
      bgcolor: 'transparent',
      cursor: 'pointer',
      p: 0,
    }}
  >
    {[0, 1, 2].map((i) => (
      <Box
        key={i}
        sx={{
          width: 22,
          height: 2,
          borderRadius: 1,
          bgcolor: 'text.primary',
          transition: 'transform 0.28s ease, opacity 0.28s ease',
          transformOrigin: 'center',
          ...(i === 0 && open && { transform: 'translateY(7px) rotate(45deg)' }),
          ...(i === 1 && open && { opacity: 0, transform: 'scaleX(0)' }),
          ...(i === 2 && open && { transform: 'translateY(-7px) rotate(-45deg)' }),
        }}
      />
    ))}
  </Box>
);

// ─── 컴포넌트 ─────────────────────────────────────────────────────────────────

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [progress,   setProgress]   = useState(0);
  const [activeId,   setActiveId]   = useState('');
  const prevScrollRef = useRef(0);

  const theme   = useTheme();
  const isDark  = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // ── 스크롤 방향 감지 + 진행률 바 ──────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const curr = window.scrollY;
      const prev = prevScrollRef.current;
      const maxScroll = document.body.scrollHeight - window.innerHeight;

      setScrolled(curr > 50);
      setProgress(maxScroll > 0 ? (curr / maxScroll) * 100 : 0);

      if (curr < 80 || drawerOpen) {
        setNavVisible(true);
      } else if (curr < prev) {
        setNavVisible(true);
      } else if (curr > prev) {
        setNavVisible(false);
      }

      prevScrollRef.current = curr;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [drawerOpen]);

  // ── Active 섹션 감지 ───────────────────────────────────────────────────────
  useEffect(() => {
    const targets = NAV_ITEMS.map(({ id }) => document.getElementById(id)).filter(Boolean);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -65% 0px' }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: scrolled
            ? isDark ? 'rgba(15,17,23,0.88)' : 'rgba(255,255,255,0.88)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: '1px solid',
          borderColor: scrolled ? 'divider' : 'transparent',
          color: 'text.primary',
          transform: navVisible ? 'translateY(0)' : 'translateY(-100%)',
          transition: [
            'transform 0.3s ease',
            'background-color 0.3s ease',
            'backdrop-filter 0.3s ease',
            'border-color 0.3s ease',
          ].join(', '),
        }}
      >
        {/* 읽기 진행률 바 */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: 2,
            width: `${progress}%`,
            bgcolor: 'primary.main',
            transition: 'width 0.1s linear',
            zIndex: 1,
          }}
        />

        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 5 } }}>
          <KHLogo />

          {/* 데스크톱: 메뉴 링크 + 다크모드 토글 */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {NAV_ITEMS.map(({ label, href, id }) => {
                  const isActive = activeId === id;
                  return (
                    <Button
                      key={label}
                      href={href}
                      sx={{
                        color: isActive ? 'primary.main' : 'text.primary',
                        fontWeight: 500,
                        px: 2,
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 4,
                          left: '50%',
                          transform: isActive ? 'translateX(-50%) scaleX(1)' : 'translateX(-50%) scaleX(0)',
                          transformOrigin: 'center',
                          width: '60%',
                          height: '2px',
                          bgcolor: 'primary.main',
                          borderRadius: 1,
                          transition: 'transform 0.25s ease',
                        },
                        '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
                      }}
                    >
                      {label}
                    </Button>
                  );
                })}
              </Box>

              <DarkModeToggle />
            </Box>
          )}

          {/* 모바일: 다크모드 토글 + 햄버거 */}
          {isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DarkModeToggle />
              <HamburgerBtn open={drawerOpen} onClick={() => setDrawerOpen((v) => !v)} />
            </Box>
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
          <HamburgerBtn open={drawerOpen} onClick={() => setDrawerOpen(false)} />
        </Box>
        <List sx={{ px: 1 }}>
          {NAV_ITEMS.map(({ label, href, id }) => {
            const isActive = activeId === id;
            return (
              <ListItemButton
                key={label}
                component="a"
                href={href}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  px: 2.5,
                  borderLeft: isActive ? '3px solid' : '3px solid transparent',
                  borderColor: isActive ? 'primary.main' : 'transparent',
                  bgcolor: isActive ? 'rgba(25,118,210,0.06)' : 'transparent',
                  transition: 'background-color 0.2s ease, border-color 0.2s ease',
                }}
              >
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 700 : 600,
                    fontSize: '1rem',
                    color: isActive ? 'primary.main' : 'text.primary',
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>

        {/* 드로어 하단: 다크모드 토글 */}
        <Divider sx={{ mx: 2 }} />
        <Box sx={{ px: 3, py: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <DarkModeToggle />
          <Box component="span" sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>
            {isDark ? '다크 모드' : '라이트 모드'}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
