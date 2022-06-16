export interface ServiceResponse {
  id: string;
  user_network_target_id: string;
  name: string;
  port: number;
  protocol: string;
  created_at: string;
  updated_at: string;
}

export interface ServicesResponse {
  services: ServiceResponse[];
}
