import {ServiceResponse} from "./service";

export interface AttackVectorEntry {
  id: string;
  user_network_target_id: string;
  text: string;
  tried: boolean;
  created_at: string;
  updated_at: string;
}

export interface AttackVectorResponse {
  attack_vector: AttackVectorEntry;
  service: ServiceResponse;
}

export interface AttackVectorsResponse {
  attack_vectors: AttackVectorResponse[];
}

