import React from 'react'
import { storiesOf } from '@storybook/react'
import TreepCard from '.'

const treep = {
  name: 'Valencia',
  startDate: '2019-07-10 00:00:00.000',
  startDate: '2019-07-20 00:00:00.000'
}

storiesOf('TreepCard', module).add('default', () => <TreepCard treep={treep} />)
