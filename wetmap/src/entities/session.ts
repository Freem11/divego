export type ActiveSession = {
  access_token:  string
  user:          User
  expires_at?:   number
  expires_in:    number
  refresh_token: string
  token_type:    string

};

type User = {
  app_metadata?:       app_metadata
  aud?:                string
  confirmed_at?:       string
  created_at:          string
  email?:              string
  email_confirmed_at?: string
  id:                  string
  identities?:         any[]
  is_anonymous?:       boolean
  last_sign_in_at?:    string
  phone?:              string
  role?:               string
  updated_at?:         string
  user_metadata:       any
};

type app_metadata = {
  provider?:  string
  providers?: string[]
};
