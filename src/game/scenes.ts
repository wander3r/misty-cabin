import type { GameState, SceneId } from './types';
import { parlorSvg } from './sceneParlor';
import { studySvg } from './sceneStudy';
import { kitchenSvg } from './sceneKitchen';
import { atticSvg } from './sceneAttic';

export function renderSceneSvg(state: GameState): string {
  const map: Record<SceneId, (s: GameState) => string> = {
    parlor: parlorSvg,
    study: studySvg,
    kitchen: kitchenSvg,
    attic: atticSvg,
  };
  return map[state.scene](state);
}
