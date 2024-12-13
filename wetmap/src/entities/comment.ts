export type CommentItem = {
  content:    string
  created_at: string
  id:         number
  photoid:    number
  replied_to: number | null
  userid:     string
  username:   string
};
