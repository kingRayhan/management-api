export interface JwtAccessTokenPayload {
  sub: string;
  session_id: string;
}

export interface JwtRefreshTokenPayload {
  sub: string;
  refresh_token_secret: string;
}
