import React from 'react'
import { storiesOf } from '@storybook/react'
import Button from '.'

storiesOf('Button', module)
  .add('default', () => <Button>Button</Button>)
  .add('reverse', () => <Button reverse>Button</Button>)
  .add('another palette', () => <Button palette='secondary'>Button</Button>)
  .add('disabled', () => <Button disabled>Button</Button>)
  .add('transparent', () => <Button transparent>Button</Button>)
  .add('height', () => <Button height={2}>Button</Button>)
  .add('link', () => (
    <Button href='https://github.com/diegohaz/arc'>ARc repository</Button>
  ))
