import {ServiceResponse} from "./service";

export interface IdeaEntry {
  id: string;
  user_network_target_id: string;
  text: string;
  tried: boolean;
  created_at: string;
  updated_at: string;
}

export interface IdeaResponse {
  idea: IdeaEntry;
  service: ServiceResponse;
}

export interface IdeasResponse {
  ideas: IdeaResponse[];
}

