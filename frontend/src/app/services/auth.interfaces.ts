/* Stores the current user information in the memory. */
export interface AuthDataLoginResponse {
  data: AuthLoginResponse;
}
export interface AuthLoginResponse {
  allowed_password_change: boolean;
  email: string;
  provider: string;
  role: string;
  uid: string;
  id: string;
}

export interface ModelPage {
  "id": string;
  "user_id": string;
  "title": string;
  "public": boolean;
  "created_at": string;
  "updated_at": string;
}

export interface BackendPagesIndexResponse {
  pages: ModelPage[];
}
