export default interface TokenPayload {
  role: string;
  email: string;
  iat?: Date;
  exp?: Date;
  iss?: string;
  sub?: string;
}