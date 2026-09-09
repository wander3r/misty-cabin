import type { GameState, Hotspot } from './types';

export function getHotspots(state: GameState): Hotspot[] {
  switch (state.scene) {
    case 'parlor':
      return [
        { id: 'sofa', label: '沙发', x: 8, y: 52, w: 28, h: 28, cursor: 'look' },
        { id: 'painting', label: '油画', x: 42, y: 18, w: 18, h: 22, cursor: 'look' },
        { id: 'fireplace', label: '壁炉', x: 68, y: 38, w: 22, h: 36, cursor: 'use' },
        { id: 'rug', label: '地毯', x: 36, y: 72, w: 28, h: 14, cursor: 'look' },
        { id: 'hatch', label: '天花板舱门', x: 48, y: 4, w: 16, h: 12, cursor: 'use' },
        { id: 'door_study', label: '通往书房', x: 2, y: 28, w: 10, h: 40, cursor: 'go' },
        { id: 'door_kitchen', label: '通往厨房', x: 88, y: 28, w: 10, h: 40, cursor: 'go' },
      ];
    case 'study':
      return [
        { id: 'desk', label: '书桌', x: 28, y: 48, w: 36, h: 28, cursor: 'use' },
        { id: 'clock', label: '挂钟', x: 72, y: 14, w: 16, h: 22, cursor: 'look' },
        { id: 'bookshelf', label: '书架', x: 4, y: 20, w: 18, h: 50, cursor: 'look' },
        { id: 'window', label: '窗户', x: 48, y: 12, w: 20, h: 28, cursor: 'look' },
        { id: 'door_parlor', label: '回客厅', x: 88, y: 30, w: 10, h: 40, cursor: 'go' },
      ];
    case 'kitchen':
      return [
        { id: 'cupboard', label: '橱柜', x: 6, y: 28, w: 18, h: 40, cursor: 'use' },
        { id: 'musicbox', label: '八音盒', x: 40, y: 52, w: 22, h: 22, cursor: 'use' },
        { id: 'sink', label: '水槽', x: 68, y: 42, w: 20, h: 24, cursor: 'look' },
        { id: 'stove', label: '炉灶', x: 68, y: 18, w: 22, h: 20, cursor: 'look' },
        { id: 'door_parlor_k', label: '回客厅', x: 2, y: 30, w: 10, h: 40, cursor: 'go' },
      ];
    case 'attic':
      return [
        { id: 'chest', label: '旧木箱', x: 18, y: 55, w: 22, h: 22, cursor: 'look' },
        { id: 'mirror', label: '蒙尘镜', x: 55, y: 22, w: 18, h: 28, cursor: 'look' },
        { id: 'exit_door', label: '雾中木门', x: 38, y: 35, w: 24, h: 42, cursor: 'use' },
        { id: 'trapdoor', label: '下到客厅', x: 78, y: 70, w: 16, h: 14, cursor: 'go' },
      ];
  }
}
