export type PhotoWithLikesAndComments = {
  id:           number
  created_at:   string
  photoFile:    string
  label:        string
  dateTaken:    string
  latitude:     number
  longitude:    number
  month:        number
  UserID:       string
  UserName:     string
  likecount:    number
  likedbyuser:  boolean
  likeid:       number
  commentcount: number
};

export type PhotosGroupedByDate = {
  dateTaken: string
  photos:    PhotoWithLikesAndComments[]
};

export type Photo = {
  id:         number
  created_at: string
  photoFile:  string
  label:      string
  dateTaken:  string
  latitude:   number
  longitude:  number
  month:      number
  UserID:     string
  UserName:   string
};
