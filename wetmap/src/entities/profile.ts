export type ActiveProfile = {
  id:                   number
  created_at:           string
  UserName:             string
  Email:                string
  UserID:               string
  expo_push_token:      string[]
  feedbackRequested:    boolean
  getAdminNotification: boolean
  partnerAccount:       boolean
  profileBio:           string | null
  profilePhoto:         string
  unit_system?:         string
  language?:            string
};


export type DeletedAccountInfo = {
  firstName: string
  lastName:  string
  email:     string
  UserID:    string
};
