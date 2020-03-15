import { styled, FormGroup, Typography } from "@material-ui/core";

export const CardPage = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  maxHeight: '100vh',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  padding: '15px',
  pageBreakAfter: 'always',
})

export const SelectContainer = styled(FormGroup)({
  display: 'flex',
  flexDirection: 'row',
  marginTop: '10px',
})
