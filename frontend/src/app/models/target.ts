import {BlockResponse} from "./block";
import {ServiceResponse} from "./service";

export interface TargetResponse {
  id: string;
  user_network_id: string;
  name: string;
  ip: string;
  state: string;
  created_at: string;
  updated_at: string;
}

export interface TargetsResponse {
  targets: TargetResponse[];
}

export interface TargetTimelineElement {
  block: BlockResponse;
  service: ServiceResponse;
}

export interface TargetTimelineResponse {
  timeline: TargetTimelineElement[];
}
