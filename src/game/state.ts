import {
  DEFAULT_FLAGS,
  SAVE_KEY,
  type GameFlags,
  type GameState,
  type ItemId,
  type SceneId,
} from './types';

export function createInitialState(): GameState {
  return {
    scene: 'parlor',
    inventory: [],
    selectedItem: null,
    flags: { ...DEFAULT_FLAGS, hatchSymbols: [] },
    messages: [],
    hintIndex: 0,
    started: false,
    screen: 'title',
  };
}

export function saveGame(state: GameState): void {
  try {
    const payload = {
      scene: state.scene,
      inventory: state.inventory,
      flags: state.flags,
      hintIndex: state.hintIndex,
      started: state.started,
      screen: state.screen === 'ending' ? 'ending' : 'game',
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
  } catch {
    /* ignore quota */
  }
}

export function loadGame(): GameState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<GameState>;
    const base = createInitialState();
    return {
      ...base,
      scene: (data.scene as SceneId) || 'parlor',
      inventory: Array.isArray(data.inventory) ? (data.inventory as ItemId[]) : [],
      flags: { ...DEFAULT_FLAGS, ...(data.flags as GameFlags), hatchSymbols: data.flags?.hatchSymbols ?? [] },
      hintIndex: typeof data.hintIndex === 'number' ? data.hintIndex : 0,
      started: true,
      screen: data.screen === 'ending' ? 'ending' : 'game',
      selectedItem: null,
      messages: [],
    };
  } catch {
    return null;
  }
}

export function clearSave(): void {
  localStorage.removeItem(SAVE_KEY);
}

export function hasSave(): boolean {
  return !!localStorage.getItem(SAVE_KEY);
}

export function addItem(state: GameState, id: ItemId): boolean {
  if (state.inventory.includes(id)) return false;
  state.inventory = [...state.inventory, id];
  return true;
}

export function removeItem(state: GameState, id: ItemId): void {
  state.inventory = state.inventory.filter((i) => i !== id);
  if (state.selectedItem === id) state.selectedItem = null;
}

export function pushMsg(state: GameState, text: string): void {
  state.messages = [text];
}
