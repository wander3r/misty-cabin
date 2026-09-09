import type { GameState } from './game/types';
import { HINTS, tryDeskCode, tryHatchSymbol } from './game/content';
import { saveGame, clearSave, createInitialState, pushMsg } from './game/state';

export type OverlayKind = 'none' | 'menu' | 'hint' | 'code' | 'hatch';

export interface OverlayCtx {
  state: GameState;
  codeBuffer: string;
  setOverlay: (o: OverlayKind) => void;
  setCodeBuffer: (s: string) => void;
  setState: (s: GameState) => void;
  render: () => void;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function el(html: string): HTMLElement {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild as HTMLElement;
}

export function buildMenu(ctx: OverlayCtx): HTMLElement {
  const o = el(`
    <div class="overlay">
      <div class="modal">
        <h2>菜单</h2>
        <div class="menu-list">
          <button class="btn" data-act="resume">继续游戏</button>
          <button class="btn" data-act="save">保存进度</button>
          <button class="btn" data-act="hint">获取提示</button>
          <button class="btn ghost" data-act="title">返回标题</button>
          <button class="btn ghost" data-act="reset">重置进度</button>
        </div>
        <p style="margin-top:1rem;font-size:0.75rem;">按 Esc 也可开关菜单</p>
      </div>
    </div>
  `);
  o.querySelector('[data-act="resume"]')!.addEventListener('click', () => {
    ctx.setOverlay('none');
    ctx.render();
  });
  o.querySelector('[data-act="save"]')!.addEventListener('click', () => {
    saveGame(ctx.state);
    pushMsg(ctx.state, '进度已保存到本地。');
    ctx.setOverlay('none');
    ctx.render();
  });
  o.querySelector('[data-act="hint"]')!.addEventListener('click', () => {
    ctx.setOverlay('hint');
    ctx.render();
  });
  o.querySelector('[data-act="title"]')!.addEventListener('click', () => {
    saveGame(ctx.state);
    ctx.setOverlay('none');
    ctx.state.screen = 'title';
    ctx.render();
  });
  o.querySelector('[data-act="reset"]')!.addEventListener('click', () => {
    if (confirm('确定要清空存档并重新开始吗？')) {
      clearSave();
      const s = createInitialState();
      s.started = true;
      s.screen = 'game';
      ctx.setState(s);
      ctx.setOverlay('none');
      pushMsg(s, '存档已重置。雾气重新涌来。');
      saveGame(s);
      ctx.render();
    }
  });
  return o;
}

export function buildHint(ctx: OverlayCtx): HTMLElement {
  const idx = Math.min(ctx.state.hintIndex, HINTS.length - 1);
  const text = HINTS[idx];
  const o = el(`
    <div class="overlay">
      <div class="modal">
        <h2>提示 ${idx + 1}/${HINTS.length}</h2>
        <p class="hint-text">${escapeHtml(text)}</p>
        <div class="modal-actions">
          <button class="btn ghost" data-act="prev" ${idx === 0 ? 'disabled' : ''}>上一条</button>
          <button class="btn" data-act="next">${idx < HINTS.length - 1 ? '下一条' : '关闭'}</button>
        </div>
      </div>
    </div>
  `);
  o.querySelector('[data-act="prev"]')!.addEventListener('click', () => {
    ctx.state.hintIndex = Math.max(0, ctx.state.hintIndex - 1);
    ctx.render();
  });
  o.querySelector('[data-act="next"]')!.addEventListener('click', () => {
    if (ctx.state.hintIndex < HINTS.length - 1) {
      ctx.state.hintIndex += 1;
      saveGame(ctx.state);
      ctx.render();
    } else {
      ctx.setOverlay('none');
      ctx.render();
    }
  });
  return o;
}

const SYMBOLS: { id: string; label: string }[] = [
  { id: 'bird', label: '🐦 鸟' },
  { id: 'moon', label: '🌙 月' },
  { id: 'eye', label: '👁 眼' },
  { id: 'mist', label: '🌫 雾' },
];

export function buildCodePad(ctx: OverlayCtx): HTMLElement {
  const o = el(`
    <div class="overlay">
      <div class="modal">
        <h2>书桌密码锁</h2>
        <p>输入四位数字</p>
        <div class="code-display">${ctx.codeBuffer.padEnd(4, '·')}</div>
        <div class="pad-grid">
          ${[1, 2, 3, 4, 5, 6, 7, 8, 9, '⌫', 0, '确定']
            .map((k) => `<button data-k="${k}">${k}</button>`)
            .join('')}
        </div>
        <div class="modal-actions">
          <button class="btn ghost" data-act="close">关闭</button>
        </div>
      </div>
    </div>
  `);
  o.querySelectorAll('[data-k]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const k = (btn as HTMLElement).dataset.k!;
      if (k === '⌫') {
        ctx.setCodeBuffer(ctx.codeBuffer.slice(0, -1));
        ctx.render();
        return;
      }
      if (k === '确定') {
        const ok = tryDeskCode(ctx.state, ctx.codeBuffer);
        ctx.setCodeBuffer('');
        if (ok) ctx.setOverlay('none');
        saveGame(ctx.state);
        ctx.render();
        return;
      }
      if (ctx.codeBuffer.length < 4) {
        ctx.setCodeBuffer(ctx.codeBuffer + k);
        ctx.render();
      }
    });
  });
  o.querySelector('[data-act="close"]')!.addEventListener('click', () => {
    ctx.setOverlay('none');
    ctx.setCodeBuffer('');
    ctx.render();
  });
  return o;
}

export function buildHatchPad(ctx: OverlayCtx): HTMLElement {
  const progress = ctx.state.flags.hatchSymbols.length;
  const o = el(`
    <div class="overlay">
      <div class="modal">
        <h2>舱门符纹</h2>
        <p>依次选择四个符纹（${progress}/4）</p>
        <div class="symbol-grid">
          ${SYMBOLS.map((s) => `<button data-sym="${s.id}">${s.label}</button>`).join('')}
        </div>
        <div class="modal-actions">
          <button class="btn ghost" data-act="close">关闭</button>
        </div>
      </div>
    </div>
  `);
  o.querySelectorAll('[data-sym]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sym = (btn as HTMLElement).dataset.sym!;
      const result = tryHatchSymbol(ctx.state, sym);
      saveGame(ctx.state);
      if (result === 'done') ctx.setOverlay('none');
      ctx.render();
    });
  });
  o.querySelector('[data-act="close"]')!.addEventListener('click', () => {
    ctx.setOverlay('none');
    ctx.render();
  });
  return o;
}

export { escapeHtml, el };
