export type SceneId = 'parlor' | 'study' | 'kitchen' | 'attic';

export type ItemId =
  | 'brass_key'
  | 'gear'
  | 'crank'
  | 'diary_page'
  | 'matchbox'
  | 'symbol_token';

export interface ItemDef {
  id: ItemId;
  name: string;
  desc: string;
  icon: string; // short emoji or glyph
}

export interface Hotspot {
  id: string;
  label: string;
  x: number; // percent
  y: number;
  w: number;
  h: number;
  cursor?: 'look' | 'use' | 'go';
}

export interface GameFlags {
  sofaSearched: boolean;
  rugLifted: boolean;
  paintingExamined: boolean;
  fireplaceLit: boolean;
  ashNoteRead: boolean;
  clockExamined: boolean;
  bookshelfExamined: boolean;
  drawerUnlocked: boolean;
  cupboardUnlocked: boolean;
  gearPlaced: boolean;
  crankPlaced: boolean;
  musicBoxPlayed: boolean;
  hatchSymbols: string[]; // player input
  hatchUnlocked: boolean;
  atticVisited: boolean;
  endingReached: boolean;
  windowExamined: boolean;
  sinkExamined: boolean;
  stoveExamined: boolean;
}

export interface GameState {
  scene: SceneId;
  inventory: ItemId[];
  selectedItem: ItemId | null;
  flags: GameFlags;
  messages: string[];
  hintIndex: number;
  started: boolean;
  screen: 'title' | 'game' | 'ending';
}

export const SAVE_KEY = 'misty-cabin-save-v1';

export const DEFAULT_FLAGS: GameFlags = {
  sofaSearched: false,
  rugLifted: false,
  paintingExamined: false,
  fireplaceLit: false,
  ashNoteRead: false,
  clockExamined: false,
  bookshelfExamined: false,
  drawerUnlocked: false,
  cupboardUnlocked: false,
  gearPlaced: false,
  crankPlaced: false,
  musicBoxPlayed: false,
  hatchSymbols: [],
  hatchUnlocked: false,
  atticVisited: false,
  endingReached: false,
  windowExamined: false,
  sinkExamined: false,
  stoveExamined: false,
};

/** Correct desk code: clock 7:35 + three crows → 7353 */
export const DESK_CODE = '7353';

/** Correct hatch sequence: bird, moon, eye, mist */
export const HATCH_CODE = ['bird', 'moon', 'eye', 'mist'] as const;
