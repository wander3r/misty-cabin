import './style.css';
import {
  SCENE_NAMES,
  ITEMS,
  getHotspots,
  interact,
  examineItem,
} from './game/content';
import { renderSceneSvg } from './game/scenes';
import {
  createInitialState,
  saveGame,
  loadGame,
  clearSave,
  hasSave,
  pushMsg,
} from './game/state';
import type { GameState, ItemId } from './game/types';
import {
  type OverlayKind,
  type OverlayCtx,
  buildMenu,
  buildHint,
  buildCodePad,
  buildHatchPad,
  escapeHtml,
  el,
} from './uiOverlays';

const app = document.querySelector<HTMLDivElement>('#app')!;

let state: GameState = createInitialState();
let overlay: OverlayKind = 'none';
let codeBuffer = '';

function ctx(): OverlayCtx {
  return {
    state,
    codeBuffer,
    setOverlay: (o) => { overlay = o; },
    setCodeBuffer: (s) => { codeBuffer = s; },
    setState: (s) => { state = s; },
    render,
  };
}

function render(): void {
  if (state.screen === 'title') {
    renderTitle();
    return;
  }
  if (state.screen === 'ending') {
    renderEnding();
    return;
  }
  renderGame();
}

function renderTitle(): void {
  const canContinue = hasSave();
  app.innerHTML = '';
  const screen = el(`
    <div class="screen">
      <h1>雾木小屋</h1>
      <p class="subtitle">MISTY CABIN</p>
      <p class="blurb">
        浓雾锁住了整座木屋。挂钟停摆，鸦群凝在画布上。<br/>
        你必须拼凑线索，打开通往阁楼的舱门——<br/>
        或许，雾外还有一条路。
      </p>
      <div class="btn-row">
        <button class="btn" data-act="new">开始游戏</button>
        <button class="btn" data-act="continue" ${canContinue ? '' : 'disabled'}>继续游戏</button>
        <button class="btn ghost" data-act="about">关于</button>
      </div>
    </div>
  `);
  app.appendChild(screen);
  screen.querySelector('[data-act="new"]')!.addEventListener('click', () => {
    clearSave();
    state = createInitialState();
    state.started = true;
    state.screen = 'game';
    pushMsg(state, '你睁开眼。客厅很暗，窗玻璃外涌动着灰白的雾。');
    saveGame(state);
    render();
  });
  screen.querySelector('[data-act="continue"]')!.addEventListener('click', () => {
    const loaded = loadGame();
    if (loaded) {
      state = loaded;
      pushMsg(state, '进度已读取。');
      render();
    }
  });
  screen.querySelector('[data-act="about"]')!.addEventListener('click', () => {
    alert(
      '雾木小屋 · Misty Cabin\n一款锈湖风（独立原创）点击解谜逃脱游戏。\n操作：点击场景热点查看/使用；点击背包物品选中后再点热点组合；Esc 打开菜单；双击物品可查看描述。',
    );
  });
}

function renderEnding(): void {
  app.innerHTML = '';
  const screen = el(`
    <div class="screen">
      <h1 class="ending-title">雾开之路</h1>
      <p class="subtitle">THE PATH BEYOND</p>
      <p class="blurb">
        木门后是一条被雾让开的小径。<br/>
        身后的小屋渐渐淡成剪影——<br/>
        挂钟又开始走动，像是从未停过。<br/><br/>
        你向前走去。空气里有湿润的松香。<br/>
        <em style="color:var(--accent)">— 完 —</em>
      </p>
      <div class="btn-row">
        <button class="btn" data-act="reset">重新开始</button>
        <button class="btn ghost" data-act="title">返回标题</button>
      </div>
    </div>
  `);
  app.appendChild(screen);
  screen.querySelector('[data-act="reset"]')!.addEventListener('click', () => {
    clearSave();
    state = createInitialState();
    state.started = true;
    state.screen = 'game';
    pushMsg(state, '一切重新开始。浓雾再度合拢。');
    saveGame(state);
    render();
  });
  screen.querySelector('[data-act="title"]')!.addEventListener('click', () => {
    state.screen = 'title';
    render();
  });
}

function renderGame(): void {
  app.innerHTML = '';
  const game = el(`<div class="game" tabindex="0"></div>`);

  const top = el(`
    <div class="topbar">
      <span class="room-name">${SCENE_NAMES[state.scene]}</span>
      <div class="actions">
        <button class="icon-btn" data-act="hint">提示</button>
        <button class="icon-btn" data-act="menu">菜单</button>
      </div>
    </div>
  `);
  game.appendChild(top);

  const stage = el(`<div class="stage-wrap"></div>`);
  stage.innerHTML = renderSceneSvg(state);
  const hotspotsLayer = el(`<div class="hotspots"></div>`);
  for (const h of getHotspots(state)) {
    const btn = el(`
      <button class="hotspot" data-id="${h.id}" data-cursor="${h.cursor || 'look'}"
        style="left:${h.x}%;top:${h.y}%;width:${h.w}%;height:${h.h}%;"
        aria-label="${h.label}">
        <span class="hotspot-tip">${h.label}</span>
      </button>
    `);
    btn.addEventListener('click', () => onHotspot(h.id));
    hotspotsLayer.appendChild(btn);
  }
  stage.appendChild(hotspotsLayer);
  stage.appendChild(el(`<div class="grain"></div>`));
  game.appendChild(stage);

  if (state.selectedItem) {
    const item = ITEMS[state.selectedItem];
    game.appendChild(
      el(`<div class="selected-banner">使用：${item.name}（再次点击物品取消）</div>`),
    );
  }

  const msg = state.messages[0] || '点击场景中的物体进行查看或互动。';
  const bottom = el(`
    <div class="bottom">
      <div class="message-panel"><p>${escapeHtml(msg)}</p></div>
      <div class="inventory">
        <h3>背包</h3>
        <div class="inv-slots"></div>
      </div>
    </div>
  `);
  const slots = bottom.querySelector('.inv-slots')!;
  if (state.inventory.length === 0) {
    slots.appendChild(
      el(`<span class="prompt" style="color:var(--text-dim);font-size:0.75rem;">空空如也</span>`),
    );
  }
  for (const id of state.inventory) {
    const item = ITEMS[id];
    const slot = el(`
      <button class="inv-item ${state.selectedItem === id ? 'selected' : ''}" data-item="${id}" title="${item.name}">
        <span>${item.icon}</span>
        <span class="inv-name">${item.name}</span>
      </button>
    `);
    slot.addEventListener('click', () => onItemClick(id));
    slot.addEventListener('dblclick', () => {
      examineItem(state, id);
      render();
    });
    slots.appendChild(slot);
  }
  game.appendChild(bottom);

  const c = ctx();
  if (overlay === 'menu') game.appendChild(buildMenu(c));
  if (overlay === 'hint') game.appendChild(buildHint(c));
  if (overlay === 'code') game.appendChild(buildCodePad(c));
  if (overlay === 'hatch') game.appendChild(buildHatchPad(c));

  app.appendChild(game);
  game.focus();

  top.querySelector('[data-act="hint"]')!.addEventListener('click', () => {
    overlay = 'hint';
    render();
  });
  top.querySelector('[data-act="menu"]')!.addEventListener('click', () => {
    overlay = 'menu';
    render();
  });
}

function onHotspot(id: string): void {
  const result = interact(state, id);
  if (result.openCodePad) {
    codeBuffer = '';
    overlay = 'code';
  }
  if (result.openHatchPad) {
    overlay = 'hatch';
  }
  saveGame(state);
  render();
}

function onItemClick(id: ItemId): void {
  if (state.selectedItem === id) {
    state.selectedItem = null;
    pushMsg(state, `取消选择【${ITEMS[id].name}】。`);
  } else {
    state.selectedItem = id;
    pushMsg(
      state,
      `已选择【${ITEMS[id].name}】——点击场景物体尝试使用，双击物品查看详情。`,
    );
  }
  render();
}

document.addEventListener('keydown', (e) => {
  if (state.screen !== 'game') return;
  if (e.key === 'Escape') {
    if (overlay === 'none') overlay = 'menu';
    else overlay = 'none';
    codeBuffer = '';
    render();
  }
});

render();
