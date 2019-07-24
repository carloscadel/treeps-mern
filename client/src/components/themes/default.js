// https://github.com/diegohaz/arc/wiki/Styling
import { reversePalette } from 'styled-theme/composer'

const theme = {}

theme.palette = {
  primary: ['#39898E', '#5D9EA2', '#81B3B7', '#A5C9CB'],
  secondary: ['#A23DC6', '#B260D0', '#C383DA', '#D4A6E5'],
  danger: ['#EF3939', '#F15D5D', '#F48181', '#F7A5A5'],
  alert: ['#FFAA00', '#FFB92E', '#FFC85C', '#FFD88B'],
  success: ['#38AA1E', '#5CB946', '#80C86F', '#A4D898'],
  white: ['#fff', '#eee'],
  grayscale: [
    '#212121', // 0
    '#353535', // 1
    '#494949', // 2
    '#5D5D5D', // 3
    '#717171', // 4
    '#858585', // 5
    '#9A9A9A', // 6
    '#AEAEAE', // 7
    '#C2C2C2', // 8
    '#D6D6D6', // 9
    '#E0E0E0', // 10
    '#EEEEEE', // 11
    '#FCFCFC' // 12
  ]
}

theme.reversePalette = reversePalette(theme.palette)

theme.fonts = {
  primary: 'Helvetica Neue, Helvetica, Roboto, sans-serif',
  pre: 'Consolas, Liberation Mono, Menlo, Courier, monospace',
  quote: 'Georgia, serif'
}

theme.sizes = {
  maxWidth: '1100px'
}

export default theme
