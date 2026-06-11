# vibe-coding-video 项目规则

## 素材路径

当 Skill 需要截图、视频、图片等素材进行 demo 演示或渲染时，从以下路径取用：

```
d:\Trae\remotion\视频截图素材\
```

当前可用素材：
| 文件名 | 类型 | 用途 |
|--------|------|------|
| `截图.png` | 截图 | UI/网页截图展示、SpatialGlassContainer 内容、MacOsGlassWindow 蒙版 |
| `截图2.png` | 截图 | 同上，第二张素材 |

> 📌 永远使用绝对路径 `d:\Trae\remotion\视频截图素材\` 引用素材。  
> 📌 若 Skill demo 需要真实截图效果，优先用此文件夹的素材，不要用 Fake 组件。  
> 📌 用 `staticFile()` 导入 Remotion 时路径相对于 `public/`，需先将素材复制到 `public/` 或使用绝对路径 import。

## 项目结构

```
d:\Trae\remotion\
├── skills/             ← 正在开发的 Skill 源文件
├── skills-completed/   ← 已验证完成的 Skill（只读快照）
├── src/                ← Remotion 入口 (index.ts + Root.tsx)
├── SKILLS-MANIFEST.md  ← 总进度清单
├── 视频截图素材/       ← 用户提供的截图和视频素材
├── hyperframes/        ← (gitignored) 开源参考项目
└── remotion/           ← (gitignored) 开源参考项目
```

## 工作流

1. 从 `skills/` 创建新 Skill
2. 编写 SKILL.md + 组件 + demo
3. 注册到 `src/Root.tsx`
4. 用 `npx remotion render` 验证渲染
5. 复制到 `skills-completed/`
6. 更新 `SKILLS-MANIFEST.md` 状态
7. Git 提交 + 推送到 `nico` 分支

## 技术约束

- 竖屏 (1080×1920) 为默认画布
- 帧率 30fps
- 所有动画必须用 `spring()` 或 `interpolate()`（禁止 CSS animation / linear）
- 禁止 `Date.now()`、`Math.random()` 等非确定性 API
- Skill 组件必须是纯 Remotion/React 组件

## GitHub

- 仓库: https://github.com/liubei25360/vre
- 分支: `nico`（主开发分支）
- Token 方式: GITHUB_TOKEN 环境变量
