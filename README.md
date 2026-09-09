# 雾木小屋 · Misty Cabin

一款**锈湖风**（独立原创，无关任何商标）的点击解谜逃脱游戏。浓雾锁住木屋，你需要在客厅、书房、厨房与阁楼之间探索，收集道具、解读线索，打开通往雾外的路。

A short Rusty Lake–*inspired* (original IP) point-and-click escape room. Explore connected rooms, use inventory items on hotspots, solve fair puzzles, and escape the mist.

---

## 本地运行 / Run locally

需要 Node.js 18+。

```bash
npm install
npm run dev
```

浏览器打开终端提示的本地地址（通常是 `http://localhost:5173`）。

生产构建：

```bash
npm run build
npm run preview
```

静态产物在 `dist/`，可部署到任意静态托管。

---

## 操作说明 / Controls

| 操作 | 说明 |
|------|------|
| 点击场景热点 | 查看 / 互动 / 前往其他房间 |
| 点击背包物品 | 选中，再点热点以「使用」 |
| 双击背包物品 | 查看物品描述 |
| `Esc` | 打开 / 关闭菜单（保存、提示、重置） |
| 提示按钮 | 渐进式提示（无剧透强制） |

进度自动写入 `localStorage`，标题页可「继续游戏」。

---

## 技术栈

- Vite + TypeScript（原生 DOM，无框架）
- 场景为内联 SVG + CSS（暗色调、暗角与颗粒感）
- 纯前端 SPA，无后端、无外链图片 CDN

---

## 免责声明

本作仅作氛围与玩法致敬，角色、地名、谜题与美术均为原创，与 Rusty Lake / 锈湖系列无关。

---

© wander3r / Mark — playable MVP
