import { AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider } from "angular5-social-login";

export function getAuthServiceConfigs()
{
  let config = new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider("2533007813393269")
    },
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("775433546931-977hbq1pa77ha3jr17pn7vr7ifmcjebc.apps.googleusercontent.com")
    }
  ]);
   return config;
}
