import { styled, FormGroup, Typography } from "@material-ui/core";

export const CardContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  padding: '15px'
})

export const SelectContainer = styled(FormGroup)({
  display: 'flex',
  flexDirection: 'row',
  marginTop: '10px',
})

export const Title = styled(Typography)({
  padding: '10px 0',
  textAlign: 'center'
})
