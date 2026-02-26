import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Avatar,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Collapse,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import SendIcon from '@mui/icons-material/Send';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { supabase } from '../utils/supabase';
import useIntersection from '../hooks/useIntersection';

const EMOJI_OPTIONS = ['👋', '🔥', '✨', '💡', '🎉', '💬', '🙌', '❤️'];

const AGE_GROUP_OPTIONS = ['10대', '20대', '30대', '40대', '50대 이상', '비공개'];

const KEYWORD_OPTIONS = [
  '개발자', '디자이너', '기획자', '마케터', '학생', '창업가',
  '아이디어맨', '호기심왕', '커피러버', '밤샘러', '열정가득',
];

const SNS_LINKS = [
  {
    icon: <EmailIcon />,
    label: '이메일',
    keyword: '빠른 회신',
    href: 'mailto:computer.busan@gmail.com',
    color: '#EA4335',
  },
  {
    icon: <GitHubIcon />,
    label: 'GitHub',
    keyword: '코드 구경',
    href: 'https://github.com/computerbusan-bit/my-portfolio',
    color: '#181717',
  },
];

const INITIAL_FORM = {
  name: '',
  message: '',
  emoji: '👋',
  email: '',
  sns_account: '',
  affiliation: '',
  age_group: '',
  keyword: '',
};

const ContactSection = () => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState(INITIAL_FORM);
  const [showOptional, setShowOptional] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [headerRef,  headerVisible]  = useIntersection();
  const [cardsRef,   cardsVisible]   = useIntersection(0.1);
  const [entriesRef, entriesVisible] = useIntersection(0.05);

  const fetchEntries = async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from('guestbook')
      .select('id, name, message, emoji, affiliation, age_group, keyword, sns_account, created_at')
      .order('created_at', { ascending: false })
      .limit(20);

    if (!fetchError) setEntries(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEmojiSelect = (emoji) => {
    setForm((prev) => ({ ...prev, emoji }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.message.trim()) return;

    setSubmitting(true);
    setError(null);

    const payload = {
      name: form.name.trim() || '익명',
      message: form.message.trim(),
      emoji: form.emoji,
      ...(form.email.trim() && { email: form.email.trim() }),
      ...(form.sns_account.trim() && { sns_account: form.sns_account.trim() }),
      ...(form.affiliation.trim() && { affiliation: form.affiliation.trim() }),
      ...(form.age_group && { age_group: form.age_group }),
      ...(form.keyword && { keyword: form.keyword }),
    };

    const { error: insertError } = await supabase.from('guestbook').insert([payload]);

    if (insertError) {
      setError('메시지 전송에 실패했습니다. 다시 시도해주세요.');
    } else {
      setSuccess(true);
      setForm(INITIAL_FORM);
      setShowOptional(false);
      await fetchEntries();
      setTimeout(() => setSuccess(false), 3000);
    }

    setSubmitting(false);
  };

  const formatDate = (iso) => {
    const date = new Date(iso);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Box
      id="contact"
      component="section"
      sx={{ py: { xs: 10, md: 14 }, bgcolor: 'background.default' }}
    >
      <Container maxWidth="lg">
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
          Contact
        </Typography>
        <Typography variant="h2" sx={{ mb: 1.5 }}>
          함께 이야기해요
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 440 }}>
          언제든지 연락주세요. 반갑게 답변드리겠습니다.
        </Typography>
      </Box>

      {/* 연락처 카드 */}
      <Card
        elevation={2}
        sx={{
          mb: 6,
          borderRadius: 3,
          background: isDark
            ? 'linear-gradient(135deg, #141827 0%, #1a1d2e 100%)'
            : 'linear-gradient(135deg, #f5f7ff 0%, #ffffff 100%)',
          transition: 'background 0.4s ease',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h3" gutterBottom sx={{ mb: 3 }}>
            📬 연락 방법
          </Typography>

          <Box ref={cardsRef}>
          <Grid container spacing={2}>
            {SNS_LINKS.map(({ icon, label, keyword, href, color }, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={label}>
                <Tooltip title={label} arrow>
                  <Card
                    component="a"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    elevation={0}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      p: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                      textDecoration: 'none',
                      color: 'text.primary',
                      willChange: 'transform',
                      opacity: cardsVisible ? undefined : 0,
                      animation: cardsVisible
                        ? `contactIn 0.5s cubic-bezier(0.22,1,0.36,1) ${(i * 0.1).toFixed(1)}s both`
                        : 'none',
                      '@keyframes contactIn': {
                        from: { opacity: 0, transform: 'translate3d(0, 28px, 0)' },
                        to:   { opacity: 1, transform: 'translate3d(0, 0, 0)' },
                      },
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: color,
                        boxShadow: `0 0 0 2px ${color}33, 0 12px 28px ${color}28`,
                        transform: 'translateY(-6px) perspective(600px) rotateX(-4deg)',
                        '& .contact-icon-btn': {
                          transform: 'scale(1.2) rotate(-8deg)',
                          boxShadow: `0 4px 12px ${color}44`,
                        },
                      },
                    }}
                  >
                    <IconButton
                      size="small"
                      className="contact-icon-btn"
                      sx={{
                        bgcolor: `${color}18`,
                        color,
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': { bgcolor: `${color}18` },
                      }}
                    >
                      {icon}
                    </IconButton>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {keyword}
                      </Typography>
                    </Box>
                  </Card>
                </Tooltip>
              </Grid>
            ))}
          </Grid>
          </Box>
        </CardContent>
      </Card>

      {/* 방명록 */}
      <Typography variant="h3" gutterBottom sx={{ mb: 1 }}>
        📖 방명록
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        방문해주셔서 감사해요! 한마디 남겨주세요 ✍️
      </Typography>

      {/* 작성 폼 */}
      <Card elevation={1} sx={{ mb: 4, borderRadius: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box component="form" onSubmit={handleSubmit}>
            {/* 필수 항목 */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  name="name"
                  label="이름 (선택)"
                  value={form.name}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  placeholder="익명"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 8 }}>
                <TextField
                  name="message"
                  label="메시지 *"
                  value={form.message}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  required
                  placeholder="한마디 남겨주세요!"
                />
              </Grid>
            </Grid>

            {/* 이모지 선택 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              <Typography variant="caption" color="text.secondary">
                이모지:
              </Typography>
              {EMOJI_OPTIONS.map((emoji) => (
                <Box
                  key={emoji}
                  onClick={() => handleEmojiSelect(emoji)}
                  sx={{
                    fontSize: '1.25rem',
                    cursor: 'pointer',
                    p: 0.5,
                    borderRadius: 1,
                    border: '2px solid',
                    borderColor: form.emoji === emoji ? 'primary.main' : 'transparent',
                    transition: 'all 0.15s',
                    '&:hover': { transform: 'scale(1.2)' },
                  }}
                >
                  {emoji}
                </Box>
              ))}
            </Box>

            {/* 선택 항목 토글 */}
            <Button
              size="small"
              variant="text"
              color="inherit"
              onClick={() => setShowOptional((v) => !v)}
              endIcon={showOptional ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              sx={{ mb: 1, color: 'text.secondary', fontSize: '0.8rem' }}
            >
              추가 정보 입력 (선택)
            </Button>

            <Collapse in={showOptional}>
              <Grid container spacing={2} sx={{ mb: 2, pt: 1 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    name="email"
                    label="이메일 (비공개 저장)"
                    value={form.email}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    type="email"
                    placeholder="example@email.com"
                    helperText="방명록에는 표시되지 않아요"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    name="sns_account"
                    label="SNS 계정 (인스타, 트위터 등)"
                    value={form.sns_account}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    placeholder="@username"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    name="affiliation"
                    label="소속 / 직업"
                    value={form.affiliation}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    placeholder="회사, 학교, 프리랜서 등"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>나이대</InputLabel>
                    <Select
                      name="age_group"
                      value={form.age_group}
                      label="나이대"
                      onChange={handleChange}
                    >
                      {AGE_GROUP_OPTIONS.map((opt) => (
                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>한마디 키워드</InputLabel>
                    <Select
                      name="keyword"
                      value={form.keyword}
                      label="한마디 키워드"
                      onChange={handleChange}
                    >
                      {KEYWORD_OPTIONS.map((opt) => (
                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Collapse>

            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                메시지가 전송되었습니다! 감사해요 🎉
              </Alert>
            )}
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              endIcon={submitting ? <CircularProgress size={16} color="inherit" /> : <SendIcon />}
              disabled={submitting || !form.message.trim()}
            >
              남기기
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* 방명록 목록 */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : entries.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
          <Typography variant="body2">아직 방명록이 없어요. 첫 번째로 남겨보세요! 🌟</Typography>
        </Box>
      ) : (
        <Box ref={entriesRef}>
        <Grid container spacing={2}>
          {entries.map((entry, ei) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={entry.id}>
              <Card
                elevation={1}
                sx={{
                  borderRadius: 2,
                  height: '100%',
                  borderLeft: '3px solid transparent',
                  willChange: 'transform',
                  opacity: entriesVisible ? undefined : 0,
                  animation: entriesVisible
                    ? `guestIn 0.5s cubic-bezier(0.22,1,0.36,1) ${(ei * 0.06).toFixed(2)}s both`
                    : 'none',
                  '@keyframes guestIn': {
                    from: { opacity: 0, transform: 'translate3d(0, 24px, 0)' },
                    to:   { opacity: 1, transform: 'translate3d(0, 0, 0)' },
                  },
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.1)',
                    borderLeftColor: 'primary.main',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                    <Avatar sx={{ bgcolor: 'primary.light', width: 36, height: 36, fontSize: '1rem' }}>
                      {entry.emoji}
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body2" fontWeight={600} noWrap>
                        {entry.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(entry.created_at)}
                      </Typography>
                    </Box>
                  </Box>

                  {/* 메타 정보 (소속, 나이대, 키워드, SNS) */}
                  {(entry.affiliation || entry.age_group || entry.keyword || entry.sns_account) && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1.5 }}>
                      {entry.affiliation && (
                        <Chip label={entry.affiliation} size="small" variant="outlined" />
                      )}
                      {entry.age_group && (
                        <Chip label={entry.age_group} size="small" variant="outlined" color="primary" />
                      )}
                      {entry.keyword && (
                        <Chip label={`#${entry.keyword}`} size="small" color="secondary" />
                      )}
                      {entry.sns_account && (
                        <Chip label={entry.sns_account} size="small" variant="outlined" />
                      )}
                    </Box>
                  )}

                  <Divider sx={{ mb: 1.5 }} />
                  <Typography variant="body2" color="text.primary">
                    {entry.message}
                  </Typography>
                </CardContent>
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

export default ContactSection;
