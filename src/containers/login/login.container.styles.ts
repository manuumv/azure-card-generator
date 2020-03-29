import { styled, Button, TextField, FormControlLabel } from '@material-ui/core';
import { loginColors } from 'styles';

export const ContainerStyled = styled('div')({
  height: '100vh',
  width: '100vw',
  display: 'flex'
})

export const LoginForm = styled('form')({
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '30px',
  boxShadow: `0 10px 20px ${loginColors.boxShadow1}, 0 6px 6px ${loginColors.boxShadow2}`,
  transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
  width: '100%',
  maxWidth: '600px',
})

export const Input = styled(TextField)({
  marginBottom: '10px',
  width: '100%'
})

export const LoginButton = styled(Button)({
  width: '100%',
})

export const FormControlCheckbox = styled(FormControlLabel)({
  width: '100%',
})
