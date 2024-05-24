interface User {
  email: string;
  pass: string;
}

export interface user {
  user: User;
  isLogin: boolean;
  isProtected: boolean;
}
