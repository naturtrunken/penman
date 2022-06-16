export interface BlockChecklistElement {
  id: string;
  value: string;
  checked: boolean;
}

export interface BlockFile {
  path: string;
  name: string;
}
export interface BlockImage {
  preview_path: string;
  original_path: string;
  name: string;
}
export interface BlockResponse {
  id: string;
  user_network_target_id: string;
  text: string;
  output: string;
  created_at: string;
  updated_at: string;
  flag: string;
  phase: string;
  block_files: BlockFile[];
  block_images: BlockImage[];
  block_checklist_elements: BlockChecklistElement[];
}

export interface BlocksResponse {
  blocks: BlockResponse[];
}

