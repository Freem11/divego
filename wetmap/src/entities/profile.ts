export type ActiveProfile = {
  id:                number
  created_at:        string
  UserName:          string
  Email:             string
  UserID:            string
  expo_push_token:   string[]
  feedbackRequested: boolean
  is_admin:          boolean
  partnerAccount:    boolean
  profileBio:        string | null
  profilePhoto:      string
};


export type DeletedAccountInfo = {
  firstName: string
  lastName:  string
  email:     string
  UserID:    string
};
