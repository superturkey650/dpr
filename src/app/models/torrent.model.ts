export interface Torrent {
  dlspeed: number;
  eta: number;
  f_l_piece_prio: boolean;
  force_start: boolean;
  hash: string;
  category: string;
  name: string;
  num_complete: number;
  num_incomplete: number;
  num_leechs: number;
  num_seeds: number;
  priority: number;
  progress: number;
  ratio: number;
  seq_dl: boolean;
  size: number;
  state: string;
  super_seeding: boolean;
  upspeed: number;
}

export const states: string[] = ['error', 'pausedUP', 'pausedDL', 'queuedUP', 'queuedDL', 'uploading', 'stalledUP', 'checkingUP', 'checkingDL', 'downloading', 'stalledDL', 'metaDL'];
export const activeStates: string[] = ['error', 'pausedDL', 'queuedUP', 'queuedDL', 'stalledUP', 'checkingDL', 'downloading', 'stalledDL', 'metaDL'];