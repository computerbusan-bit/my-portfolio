import { useState, useEffect } from 'react';
import {
  Box,
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
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import SendIcon from '@mui/icons-material/Send';
import { supabase } from '../utils/supabase';

const EMOJI_OPTIONS = ['👋', '🔥', '✨', '💡', '🎉', '💬', '🙌', '❤️'];

const SNS_LINKS = [
  {
    icon: <EmailIcon />,
    label: '이메일',
    keyword: '빠른 회신',
    href: 'mailto:your@email.com',
    color: '#EA4335',
  },
  {
    icon: <GitHubIcon />,
    label: 'GitHub',
    keyword: '코드 구경',
    href: 'https://github.com/',
    color: '#181717',
  },
  {
    icon: <LinkedInIcon />,
    label: 'LinkedIn',
    keyword: '커리어 연결',
    href: 'https://linkedin.com/',
    color: '#0A66C2',
  },
  {
    icon: <InstagramIcon />,
    label: 'Instagram',
    keyword: '일상 공유',
    href: 'https://instagram.com/',
    color: '#E4405F',
  },
];

const ContactSection = () => {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ name: '', message: '', emoji: '👋' });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const fetchEntries = async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from('guestbook')
      .select('*')
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

    const { error: insertError } = await supabase.from('guestbook').insert([
      {
        name: form.name.trim() || '익명',
        message: form.message.trim(),
        emoji: form.emoji,
      },
    ]);

    if (insertError) {
      setError('메시지 전송에 실패했습니다. 다시 시도해주세요.');
    } else {
      setSuccess(true);
      setForm({ name: '', message: '', emoji: '👋' });
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
    <Box id="contact">
      <Typography variant="h2" align="center" gutterBottom>
        Contact
      </Typography>
      <Typography
        variant="body1"
        align="center"
        color="text.secondary"
        sx={{ mb: 5 }}
      >
        언제든지 연락주세요. 반갑게 답변드리겠습니다 😊
      </Typography>

      {/* 연락처 카드 */}
      <Card
        elevation={2}
        sx={{
          mb: 6,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #f5f7ff 0%, #ffffff 100%)',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h3" gutterBottom sx={{ mb: 3 }}>
            📬 연락 방법
          </Typography>

          <Grid container spacing={2}>
            {SNS_LINKS.map(({ icon, label, keyword, href, color }) => (
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
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: color,
                        boxShadow: `0 0 0 2px ${color}22`,
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: `${color}18`,
                        color,
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
        <Grid container spacing={2}>
          {entries.map((entry) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={entry.id}>
              <Card elevation={1} sx={{ borderRadius: 2, height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                    <Avatar sx={{ bgcolor: 'primary.light', width: 36, height: 36, fontSize: '1rem' }}>
                      {entry.emoji}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {entry.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(entry.created_at)}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ mb: 1.5 }} />
                  <Typography variant="body2" color="text.primary">
                    {entry.message}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ContactSection;
