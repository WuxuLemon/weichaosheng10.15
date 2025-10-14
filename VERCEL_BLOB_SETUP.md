# Vercel Blob 媒体文件配置指南

本项目使用 Vercel Blob 存储大型媒体文件（视频和图片），以解决 Vercel 部署大小限制问题。

## 📋 前置条件

1. 拥有 Vercel 账户
2. 项目已部署到 Vercel

## 🔧 设置步骤

### 1. 创建 Blob 存储

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择您的项目
3. 点击 **"Storage"** 标签
4. 点击 **"Create Database"** 或 **"Connect Store"**
5. 选择 **"Blob"**
6. 创建一个新的 Blob 存储（或连接现有的）

### 2. 获取访问令牌

1. 在 Blob 存储页面，点击 **".env.local"** 标签
2. 复制 `BLOB_READ_WRITE_TOKEN` 的值

### 3. 配置本地环境变量

在项目根目录创建 `.env` 文件：

```env
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxx
```

⚠️ **注意**: `.env` 文件已在 `.gitignore` 中，不会被提交到 Git

### 4. 上传媒体文件

运行上传脚本将本地媒体文件上传到 Vercel Blob：

```bash
node scripts/upload-to-blob.js
```

这个脚本会：
- 上传 `video/`、`analyse/`、`original/` 文件夹中的所有文件
- 生成 `blob-url-mapping.json` 映射文件
- 显示上传进度和统计信息

### 5. 更新代码中的URL引用

上传完成后，`blob-url-mapping.json` 文件会包含所有文件的 Blob URL。

示例映射文件：
```json
{
  "video": {
    "example.mp4": "https://xxx.public.blob.vercel-storage.com/video/example.mp4"
  },
  "analyse": {
    "image.png": "https://xxx.public.blob.vercel-storage.com/analyse/image.png"
  },
  "original": {
    "photo.jpg": "https://xxx.public.blob.vercel-storage.com/original/photo.jpg"
  }
}
```

### 6. 部署到 Vercel

1. 确保 `blob-url-mapping.json` 已提交到 Git
2. 推送代码到 GitHub
3. Vercel 会自动重新部署
4. 生产环境将自动使用 Blob URL

## 📦 文件结构

```
项目/
├── scripts/
│   └── upload-to-blob.js       # 批量上传脚本
├── src/
│   └── utils/
│       └── media.js             # 媒体URL辅助函数
├── blob-url-mapping.json        # URL映射文件（上传后生成）
├── .env                          # 本地环境变量（不提交）
└── VERCEL_BLOB_SETUP.md         # 本文档
```

## 🎯 使用方法

### 在 Vue 组件中使用

```javascript
import { getMediaUrl } from '@/utils/media';

// 单个URL
const videoUrl = getMediaUrl('/video/example.mp4');

// 在模板中
<video :src="getMediaUrl('/video/example.mp4')" />
```

### 开发环境 vs 生产环境

- **开发环境**: 自动使用本地文件路径（`/video/example.mp4`）
- **生产环境**: 自动使用 Blob URL（`https://xxx.blob.vercel-storage.com/...`）

## 💰 费用说明

### Vercel Blob 免费额度（Hobby 计划）

- **存储**: 1GB
- **带宽**: 100GB/月
- **超出费用**: $0.15/GB 存储 + $0.30/GB 带宽

### 当前项目预估

- 视频文件: ~50-200MB
- 图片文件: ~10-50MB
- **总计**: ~60-250MB

✅ **在免费额度内**

## ⚠️ 注意事项

1. 首次上传可能需要较长时间（取决于文件大小）
2. Blob URL 是永久的，除非手动删除文件
3. 如果需要更新文件，重新运行上传脚本即可（会覆盖）
4. `.env` 文件包含敏感信息，切勿提交到 Git

## 🔍 故障排除

### 问题: 上传失败 "未找到 BLOB_READ_WRITE_TOKEN"
**解决**: 确保已创建 `.env` 文件并正确配置令牌

### 问题: 生产环境图片/视频仍然404
**解决**: 
1. 确认 `blob-url-mapping.json` 已提交到 Git
2. 确认 Vercel 已重新部署
3. 检查浏览器控制台的URL是否正确

### 问题: 开发环境无法访问媒体文件
**解决**: 开发环境使用本地文件，确保 `video/`、`analyse/`、`original/` 文件夹存在

## 📚 相关资源

- [Vercel Blob 文档](https://vercel.com/docs/storage/vercel-blob)
- [@vercel/blob NPM 包](https://www.npmjs.com/package/@vercel/blob)
- [Vercel 定价](https://vercel.com/pricing)

