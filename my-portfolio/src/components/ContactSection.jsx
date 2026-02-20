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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Collapse,
  Container,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import SendIcon from '@mui/icons-material/Send';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { supabase } from '../utils/supabase';

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
    href: 'mailto:your@email.com',
    color: '#EA4335',
  },
  {
    icon: <GitHubIcon />,
    label: 'GitHub',
    keyword: '코드 구경',
    href: 'https://github.com/',
    color: '#4A1A8A',
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
    color: '#FF69B4',
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
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState(INITIAL_FORM);
  const [showOptional, setShowOptional] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
    <Box id="contact" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'secondary.main' }}>
      <Container maxWidth="lg">
        {/* 섹션 헤더 */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}
          >
            Contact
          </Typography>
          <Typography variant="body1" sx={{ color: 'common.white' }}>
            언제든지 연락주세요. 반갑게 답변드리겠습니다 😊
          </Typography>
        </Box>

        {/* 연락처 카드 */}
        <Card
          elevation={0}
          sx={{
            mb: 5,
            border: '2px solid',
            borderColor: 'rgba(74, 26, 138, 0.2)',
            bgcolor: 'background.paper',
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
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
                        textDecoration: 'none',
                        color: 'text.primary',
                        border: '1px solid',
                        borderColor: 'custom.borderLight',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          borderColor: color,
                          boxShadow: `0 0 0 2px ${color}33`,
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      <IconButton
                        size="small"
                        disableRipple
                        sx={{
                          bgcolor: `${color}18`,
                          color,
                          '&:hover': { bgcolor: `${color}18` },
                        }}
                      >
                        {icon}
                      </IconButton>
                      <Box>
                        <Typography variant="body2" fontWeight={700} color="primary.main">
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
        <Typography variant="h6" sx={{ mb: 0.5, color: 'primary.main' }}>
          📖 방명록
        </Typography>
        <Typography variant="body2" sx={{ color: 'common.white', mb: 3 }}>
          방문해주셔서 감사해요! 한마디 남겨주세요 ✍️
        </Typography>

        {/* 작성 폼 */}
        <Card elevation={0} sx={{ mb: 4, border: '2px solid', borderColor: 'rgba(74, 26, 138, 0.2)' }}>
          <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
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
                color="primary"
                endIcon={submitting ? <CircularProgress size={16} color="inherit" /> : <SendIcon />}
                disabled={submitting || !form.message.trim()}
                sx={{ fontWeight: 700 }}
              >
                남기기
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* 방명록 목록 */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress sx={{ color: 'primary.main' }} />
          </Box>
        ) : entries.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body2" sx={{ color: 'common.white' }}>
              아직 방명록이 없어요. 첫 번째로 남겨보세요! 🌟
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {entries.map((entry) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={entry.id}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    border: '2px solid',
                    borderColor: 'rgba(74, 26, 138, 0.15)',
                    bgcolor: 'background.paper',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-2px)' },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                      <Avatar
                        sx={{
                          bgcolor: 'secondary.light',
                          width: 38,
                          height: 38,
                          fontSize: '1.1rem',
                          border: '2px solid',
                          borderColor: 'secondary.main',
                        }}
                      >
                        {entry.emoji}
                      </Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" fontWeight={700} color="primary.main" noWrap>
                          {entry.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(entry.created_at)}
                        </Typography>
                      </Box>
                    </Box>

                    {(entry.affiliation || entry.age_group || entry.keyword || entry.sns_account) && (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1.5 }}>
                        {entry.affiliation && (
                          <Chip
                            label={entry.affiliation}
                            size="small"
                            variant="outlined"
                            sx={{ borderColor: 'custom.borderLight', color: 'text.secondary' }}
                          />
                        )}
                        {entry.age_group && (
                          <Chip
                            label={entry.age_group}
                            size="small"
                            sx={{ bgcolor: 'rgba(74, 26, 138, 0.08)', color: 'primary.main', fontWeight: 600 }}
                          />
                        )}
                        {entry.keyword && (
                          <Chip
                            label={`#${entry.keyword}`}
                            size="small"
                            sx={{ bgcolor: 'secondary.light', color: 'primary.main', fontWeight: 600 }}
                          />
                        )}
                        {entry.sns_account && (
                          <Chip
                            label={entry.sns_account}
                            size="small"
                            variant="outlined"
                            sx={{ borderColor: 'secondary.main', color: 'secondary.dark' }}
                          />
                        )}
                      </Box>
                    )}

                    <Divider sx={{ mb: 1.5, borderColor: 'custom.borderLight' }} />
                    <Typography variant="body2" color="text.primary">
                      {entry.message}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default ContactSection;
