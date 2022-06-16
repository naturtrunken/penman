
export enum TimeEntryState {
  "start",
  "stop"
}

export interface TimeEntryResponse {
  id: string;
  user_network_target_id: string;
  state: TimeEntryState;
  created_at: string;
}

export interface TimeEntryIndexResponse {
  total_time: string;
}
