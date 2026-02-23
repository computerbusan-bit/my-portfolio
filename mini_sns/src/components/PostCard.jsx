import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Stack,
  Collapse,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import { supabase } from '../utils/supabaseClient'
import CommentSection from './CommentSection'

const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return '방금 전'
  if (mins < 60) return `${mins}분 전`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}시간 전`
  const days = Math.floor(hours / 24)
  return `${days}일 전`
}

const PostCard = ({ post, onLiked }) => {
  const [liked, setLiked] = useState(false)
  const [commentsOpen, setCommentsOpen] = useState(false)

  const handleLike = async () => {
    if (liked) return
    const { error } = await supabase
      .from('sns_posts')
      .update({ likes_count: post.likes_count + 1 })
      .eq('id', post.id)
    if (!error) {
      setLiked(true)
      onLiked(post.id, post.likes_count + 1)
    }
  }

  return (
    <Card elevation={2} sx={{ mb: 2 }}>
      <CardContent sx={{ pb: 0 }}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {post.user_name[0].toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" fontWeight={700}>
              {post.user_name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {timeAgo(post.created_at)}
            </Typography>
          </Box>
        </Stack>
        <Typography
          variant="body1"
          sx={{ mb: 1.5, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {post.content}
        </Typography>
      </CardContent>

      {post.image_url && (
        <CardMedia
          component="img"
          image={post.image_url}
          alt="post image"
          sx={{
            maxHeight: 400,
            objectFit: 'cover',
            mx: 2,
            borderRadius: 2,
            mb: 1,
          }}
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
      )}

      <CardActions sx={{ px: 2, pt: 0 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton
            size="small"
            onClick={handleLike}
            color={liked ? 'secondary' : 'default'}
            disabled={liked}
          >
            {liked ? (
              <FavoriteIcon fontSize="small" />
            ) : (
              <FavoriteBorderIcon fontSize="small" />
            )}
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {post.likes_count}
          </Typography>

          <IconButton
            size="small"
            onClick={() => setCommentsOpen((prev) => !prev)}
            color={commentsOpen ? 'primary' : 'default'}
            sx={{ ml: 1 }}
          >
            <ChatBubbleOutlineIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            댓글
          </Typography>
        </Stack>
      </CardActions>

      <Collapse in={commentsOpen}>
        <CardContent sx={{ pt: 0 }}>
          <CommentSection postId={post.id} />
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default PostCard
