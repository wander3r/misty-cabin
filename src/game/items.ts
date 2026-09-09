import type { ItemDef, ItemId, SceneId } from './types';

export const ITEMS: Record<ItemId, ItemDef> = {
  brass_key: {
    id: 'brass_key',
    name: '黄铜钥匙',
    desc: '一把微微发亮的黄铜钥匙，齿纹很细。似乎能打开某处橱柜。',
    icon: '🔑',
  },
  gear: {
    id: 'gear',
    name: '小齿轮',
    desc: '黄铜小齿轮，边缘有细齿。适合嵌进某种机械装置。',
    icon: '⚙️',
  },
  crank: {
    id: 'crank',
    name: '发条把手',
    desc: '木质发条把手，末端有卡扣，可与齿轮配合。',
    icon: '🔧',
  },
  diary_page: {
    id: 'diary_page',
    name: '日记残页',
    desc: '「雾升起时，听盒中的歌。鸟、月、眼、雾——按此开门。」字迹洇开。',
    icon: '📜',
  },
  matchbox: {
    id: 'matchbox',
    name: '火柴盒',
    desc: '旧火柴盒，还剩几根。可用来点燃壁炉。',
    icon: '🪵',
  },
  symbol_token: {
    id: 'symbol_token',
    name: '符纹记忆',
    desc: '八音盒奏出的旋律在脑中留下四个符号：鸟 · 月 · 眼 · 雾。',
    icon: '✦',
  },
};

export const SCENE_NAMES: Record<SceneId, string> = {
  parlor: '客厅',
  study: '书房',
  kitchen: '厨房',
  attic: '阁楼',
};

export const HINTS: string[] = [
  '先把客厅仔细搜一遍——沙发、地毯、壁炉旁也许藏着线索。',
  '书房的挂钟与墙上的鸦群画或许有关联。抽屉需要四位数字。',
  '挂钟停在七点三十五分。画上有几只乌鸦？试试看……',
  '厨房的橱柜需要钥匙。抽屉里的齿轮，或许能装进桌上的八音盒。',
  '齿轮与发条把手都装好后，再试着转动八音盒。',
  '八音盒（或日记）会提示阁楼舱门上的四个符号顺序。',
  '舱门符号：鸟 → 月 → 眼 → 雾。输入正确即可通向阁楼。',
];
