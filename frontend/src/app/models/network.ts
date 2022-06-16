import {TargetResponse} from "./target";

export interface NetworkResponse {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
  updated_at: string;

  targets: TargetResponse[];
}

export interface NetworksResponse {
  networks: NetworkResponse[];
}

