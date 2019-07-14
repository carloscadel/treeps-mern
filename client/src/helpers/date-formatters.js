import moment from 'moment'

export const humanizeDate = (date, format) => {
  return moment(date).format(format)
}

export const calculateAge = dob => {
  return moment().diff(dob, 'years')
}
