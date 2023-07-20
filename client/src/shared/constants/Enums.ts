enum UserStatus {
  LoggedIn = 'Logged In',
  LoggingIn = 'Logging In',
  LoggedOut = 'Logged Out',
  LogInError = 'Log In Error',
  VerifyingLogIn = 'Verifying Log In',
}

enum Default {
  PIN = '1234',
}

enum WeatherType {
  Cloudy = 'Cloudy', // import CloudIcon from '@mui/icons-material/Cloud';
  Rainy = 'Rainy', // GrainIcon
  Stormy = 'Stormy', // ThunderstormIcon
  Sunny = 'Sunny', // WbSunnyIcon
}

export { Default, UserStatus, WeatherType };
