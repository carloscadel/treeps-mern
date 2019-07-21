import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Link from 'react-router-dom/Link'
import { font, palette } from 'styled-theme'
import { ifProp } from 'styled-tools'

const fontSize = ({ height }) => `${height}rem`

const backgroundColor = ({ transparent, disabled }) =>
  transparent ? 'transparent' : palette(disabled ? 2 : 1)

const foregroundColor = ({ transparent, disabled }) =>
  transparent ? palette(disabled ? 2 : 1) : palette('grayscale', 0, true)

const hoverBackgroundColor = ({ disabled, transparent }) =>
  !disabled && !transparent && palette(0)
const hoverForegroundColor = ({ disabled, transparent }) =>
  !disabled && transparent && palette(0)

const styles = css`
  display: inline-flex;
  font-family: ${font('primary')};
  font-size: ${fontSize};
  text-decoration: none;
  align-items: center;
  white-space: nowrap;
  border: 0.0625em solid ${ifProp('transparent', 'currentcolor', 'transparent')};
  justify-content: center;
  cursor: ${ifProp('disabled', 'default', 'pointer')};
  appearance: none;
  padding: 0.5em 1em;
  border-radius: 0.125em;
  box-sizing: border-box;
  pointer-events: ${ifProp('disabled', 'none', 'auto')};
  transition: background-color 200ms ease-out, color 200ms ease-out,
    border-color 200ms ease-out;
  background-color: ${backgroundColor};
  color: ${foregroundColor};

  &:hover,
  &:focus,
  &:active {
    background-color: ${hoverBackgroundColor};
    color: ${hoverForegroundColor};
  }

  &:focus {
    outline: none;
  }
`

const StyledLink = styled(
  ({ disabled, transparent, reverse, palette, height, theme, ...props }) => (
    <Link {...props} />
  )
)`
  ${styles}
`

const Anchor = styled.a`
  ${styles}
`
const StyledButton = styled.button`
  ${styles}
`

const Button = ({ type, ...props }) => {
  const { to, href } = props
  if (to) {
    return <StyledLink {...props} />
  }
  if (href) {
    return <Anchor {...props} />
  }
  return <StyledButton {...props} type={type} />
}

Button.propTypes = {
  disabled: PropTypes.bool,
  palette: PropTypes.string,
  transparent: PropTypes.bool,
  reverse: PropTypes.bool,
  height: PropTypes.number,
  type: PropTypes.string,
  to: PropTypes.string,
  href: PropTypes.string
}

Button.defaultProps = {
  palette: 'primary',
  type: 'button',
  height: 1
}

export default Button
