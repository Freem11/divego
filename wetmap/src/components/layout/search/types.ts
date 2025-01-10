export type optionData = {
  key:   string | number
  label: string
  data: {
    type: string
    id:   string | null | undefined
  }
};

export type eventType = {
  target: {
    namme: undefined
    value: optionData
  }

};
