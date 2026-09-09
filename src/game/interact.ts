import type { GameState, ItemId } from './types';
import { DESK_CODE, HATCH_CODE } from './types';
import { addItem, pushMsg, removeItem, saveGame } from './state';
import { ITEMS } from './items';

export type InteractResult = { redraw?: boolean; openCodePad?: boolean; openHatchPad?: boolean };

export function interact(state: GameState, hotspotId: string): InteractResult {
  const sel = state.selectedItem;
  const f = state.flags;

  if (hotspotId === 'door_study') {
    state.scene = 'study';
    pushMsg(state, '推开吱呀作响的门——书房里弥漫着旧纸与尘埃的气味。');
    return { redraw: true };
  }
  if (hotspotId === 'door_kitchen') {
    state.scene = 'kitchen';
    pushMsg(state, '厨房冷得像井底。桌上摆着一只残缺的八音盒。');
    return { redraw: true };
  }
  if (hotspotId === 'door_parlor' || hotspotId === 'door_parlor_k') {
    state.scene = 'parlor';
    pushMsg(state, '回到客厅。雾气仍贴着窗玻璃蠕动。');
    return { redraw: true };
  }
  if (hotspotId === 'trapdoor') {
    state.scene = 'parlor';
    pushMsg(state, '沿着梯子回到客厅。');
    return { redraw: true };
  }

  if (hotspotId === 'sofa') {
    if (!f.sofaSearched) {
      f.sofaSearched = true;
      addItem(state, 'brass_key');
      pushMsg(state, '你把手伸进沙发垫缝——摸到一把冰凉的黄铜钥匙。已放入背包。');
    } else {
      pushMsg(state, '沙发垫下只剩灰尘与几根鸟羽。');
    }
    return { redraw: true };
  }

  if (hotspotId === 'rug') {
    if (!f.rugLifted) {
      f.rugLifted = true;
      addItem(state, 'matchbox');
      pushMsg(state, '掀开地毯一角，发现一只旧火柴盒。');
    } else {
      pushMsg(state, '地板缝里什么也没有了。');
    }
    return { redraw: true };
  }

  if (hotspotId === 'painting') {
    f.paintingExamined = true;
    pushMsg(state, '油画：浓雾中停着三只乌鸦。画框内侧用铅笔写着「数羽」。');
    return {};
  }

  if (hotspotId === 'fireplace') {
    if (sel === 'matchbox' && !f.fireplaceLit) {
      f.fireplaceLit = true;
      removeItem(state, 'matchbox');
      state.selectedItem = null;
      pushMsg(state, '火柴擦亮，壁炉里的残木噼啪燃起。灰烬中露出半张焦边纸条。');
      return { redraw: true };
    }
    if (f.fireplaceLit && !f.ashNoteRead) {
      f.ashNoteRead = true;
      pushMsg(state, '纸条写着：「时针停处，鸦羽之数，合而为钥。——七·三五·三」');
      return {};
    }
    if (f.fireplaceLit) {
      pushMsg(state, '火光摇曳。纸条上的字你已记住：七·三五·三。');
      return {};
    }
    pushMsg(state, '壁炉冷冰冰的，堆着灰烬。若有火，或许能看清什么。');
    return {};
  }

  if (hotspotId === 'hatch') {
    if (f.hatchUnlocked) {
      state.scene = 'attic';
      f.atticVisited = true;
      pushMsg(state, '舱门敞开。你攀上梯子，进入阁楼——雾从木缝渗入。');
      return { redraw: true };
    }
    if (f.musicBoxPlayed || state.inventory.includes('diary_page') || state.inventory.includes('symbol_token')) {
      return { openHatchPad: true };
    }
    pushMsg(state, '天花板上的舱门嵌着四个符纹转盘，目前锁死。需要正确的顺序。');
    return {};
  }

  if (hotspotId === 'clock') {
    f.clockExamined = true;
    pushMsg(state, '挂钟停了。时针指向七，分针停在三十五分。玻璃后有薄雾。');
    return {};
  }

  if (hotspotId === 'bookshelf') {
    f.bookshelfExamined = true;
    pushMsg(state, '书架：《雾中居所》《鸦与钟》。夹页写着：「先看时间，再数羽。」');
    return {};
  }

  if (hotspotId === 'window') {
    f.windowExamined = true;
    pushMsg(state, '窗外只有浓雾。隐约有树影，却看不清路。这扇窗打不开。');
    return {};
  }

  if (hotspotId === 'desk') {
    if (f.drawerUnlocked) {
      pushMsg(state, '抽屉已空。你拿走了齿轮与日记残页。');
      return {};
    }
    return { openCodePad: true };
  }

  if (hotspotId === 'cupboard') {
    if (f.cupboardUnlocked) {
      pushMsg(state, '橱柜空了。发条把手已取走。');
      return {};
    }
    if (sel === 'brass_key') {
      f.cupboardUnlocked = true;
      removeItem(state, 'brass_key');
      state.selectedItem = null;
      addItem(state, 'crank');
      pushMsg(state, '钥匙啮合，橱柜咔哒打开。里面有一只木质发条把手。');
      return { redraw: true };
    }
    pushMsg(state, '橱柜上着锁。需要一把合适的钥匙。');
    return {};
  }

  if (hotspotId === 'sink') {
    f.sinkExamined = true;
    pushMsg(state, '水槽锈迹斑斑，龙头拧不动。下水口映着一点微光，却够不着。');
    return {};
  }

  if (hotspotId === 'stove') {
    f.stoveExamined = true;
    pushMsg(state, '炉灶许久未用。锅底结着一层白霜似的盐渍。');
    return {};
  }

  if (hotspotId === 'musicbox') {
    if (sel === 'gear' && !f.gearPlaced) {
      f.gearPlaced = true;
      removeItem(state, 'gear');
      state.selectedItem = null;
      pushMsg(state, '你把小齿轮嵌进八音盒侧面的凹槽，齿合得正合适。');
      return { redraw: true };
    }
    if (sel === 'crank' && !f.crankPlaced) {
      if (!f.gearPlaced) {
        pushMsg(state, '把手无处可卡——似乎还缺一枚齿轮。');
        return {};
      }
      f.crankPlaced = true;
      removeItem(state, 'crank');
      state.selectedItem = null;
      pushMsg(state, '发条把手卡入齿轮轴心。八音盒似乎完整了。');
      return { redraw: true };
    }
    if (f.gearPlaced && f.crankPlaced && !f.musicBoxPlayed) {
      f.musicBoxPlayed = true;
      addItem(state, 'symbol_token');
      pushMsg(state, '你转动把手。叮咚——旋律回荡。盒盖内侧亮起四个符纹：鸟 · 月 · 眼 · 雾。');
      return { redraw: true };
    }
    if (f.musicBoxPlayed) {
      pushMsg(state, '旋律已停。你记得那四个符纹：鸟、月、眼、雾。');
      return {};
    }
    if (f.gearPlaced && !f.crankPlaced) {
      pushMsg(state, '齿轮已装好，还缺一只可以转动的把手。');
      return {};
    }
    pushMsg(state, '残缺的八音盒。侧面缺齿轮，轴心缺把手。');
    return {};
  }

  if (hotspotId === 'chest') {
    pushMsg(state, '木箱里只有干枯的花瓣与一张空白明信片。收件人一栏写着「回家」。');
    return {};
  }

  if (hotspotId === 'mirror') {
    pushMsg(state, '镜子蒙尘。你擦了一下——映出的不是自己，而是门外的林间小径。');
    return {};
  }

  if (hotspotId === 'exit_door') {
    f.endingReached = true;
    state.screen = 'ending';
    pushMsg(state, '木门无声敞开。雾退开一条缝，小径延伸向远方……');
    saveGame(state);
    return { redraw: true };
  }

  pushMsg(state, '……');
  return {};
}

export function tryDeskCode(state: GameState, code: string): boolean {
  if (state.flags.drawerUnlocked) return true;
  if (code === DESK_CODE) {
    state.flags.drawerUnlocked = true;
    addItem(state, 'gear');
    addItem(state, 'diary_page');
    pushMsg(state, '抽屉弹开。里面有一枚小齿轮，以及一张日记残页。');
    return true;
  }
  pushMsg(state, '密码错误。抽屉纹丝不动。');
  return false;
}

export function tryHatchSymbol(state: GameState, symbol: string): 'progress' | 'done' | 'fail' {
  const next = [...state.flags.hatchSymbols, symbol];
  const idx = next.length - 1;
  if (HATCH_CODE[idx] !== symbol) {
    state.flags.hatchSymbols = [];
    pushMsg(state, '符纹转盘「咔」地复位。顺序不对。');
    return 'fail';
  }
  state.flags.hatchSymbols = next;
  if (next.length === HATCH_CODE.length) {
    state.flags.hatchUnlocked = true;
    pushMsg(state, '四个符纹依次亮起——舱门的闩扣松开了。');
    return 'done';
  }
  pushMsg(state, `符纹应和（${next.length}/4）……`);
  return 'progress';
}

export function examineItem(state: GameState, id: ItemId): void {
  const item = ITEMS[id];
  pushMsg(state, `【${item.name}】${item.desc}`);
}
