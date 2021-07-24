import React from 'react';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Card, Stack, Container, Typography, TextField } from '@material-ui/core';
// import ReactPhoneInput from 'react-phone-input-material-ui';
import { LoadingButton } from '@material-ui/lab';
// import MuiPhoneNumber from 'material-ui-phone-number';

import { auth } from '../config/Firebase';
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  const [buttonState, setButtonState] = React.useState(true);
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [otp, setOtp] = React.useState();
  const [otpConfirm, setOtpConfirm] = React.useState();

  const onHandleGetOtp = async () => {
    const recaptcha = new auth.RecaptchaVerifier('recaptcha');
    try {
      const confirmation = await auth().signInWithPhoneNumber(`+91${phoneNumber}`, recaptcha);
      if (confirmation) {
        setOtpConfirm(confirmation);
        setButtonState(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmOtp = async () => {
    const user = await otpConfirm.confirm(otp);
    if (user) {
      auth()
        .currentUser.getIdToken(true)
        .then((idToken) => {
          console.log(idToken);
        });
    }
  };

  return (
    <RootStyle title="Login | Minimal-UI">
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Sign in to AptiChe Admin
            </Typography>
          </Stack>

          {/* <ReactPhoneInput
            value={phoneNumber}
            defaultCountry="ind"
            onChange={(value) => setPhoneNumber(value)}
            component={TextField}
          /> */}

          <TextField
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
          />

          <div id="recaptcha" />

          {!buttonState && (
            <TextField value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="OTP" />
          )}

          <LoadingButton
            style={{ marginTop: '20px' }}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={false}
            onClick={buttonState ? onHandleGetOtp : handleConfirmOtp}
          >
            {buttonState ? 'Get OTP' : 'Confirm OTP'}
          </LoadingButton>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
