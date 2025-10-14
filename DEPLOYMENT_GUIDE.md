# 🚀 Vercel Blob 部署完整指南

本指南将帮助您将项目部署到 Vercel，并使用 Vercel Blob 存储大型媒体文件。

## 📦 当前项目状态

✅ 已完成配置：
- [x] 安装 `@vercel/blob` 依赖包
- [x] 创建批量上传脚本 (`scripts/upload-to-blob.js`)
- [x] 创建媒体URL辅助函数 (`src/utils/media.js`)
- [x] 添加 npm 上传命令 (`npm run upload:blob`)

⚠️ 待完成步骤：
- [ ] 获取 Vercel Blob 访问令牌
- [ ] 上传媒体文件到 Vercel Blob
- [ ] 更新 Vue 组件中的媒体路径（可选，推荐自动化）

---

## 🎯 快速开始（3步部署）

### 第1步：设置 Vercel Blob

1. **登录 Vercel**  
   访问 https://vercel.com/dashboard

2. **创建/选择项目**
   - 如果还没部署，先连接 GitHub 仓库并部署
   - 如果已部署，选择您的项目

3. **创建 Blob 存储**
   - 进入项目 → **Storage** 标签
   - 点击 **Connect Store** → 选择 **Blob**
   - 点击 **Create**

4. **获取访问令牌**
   - 在 Blob 存储页面，点击 **.env.local** 标签
   - 复制 `BLOB_READ_WRITE_TOKEN` 的值

### 第2步：上传媒体文件

1. **配置环境变量**
   ```bash
   # 在项目根目录创建 .env 文件
   echo "BLOB_READ_WRITE_TOKEN=your_token_here" > .env
   ```

2. **运行上传脚本**
   ```bash
   npm run upload:blob
   ```

   这将：
   - 上传 `video/`、`analyse/`、`original/` 中的所有文件
   - 生成 `blob-url-mapping.json` 文件
   - 显示上传进度

### 第3步：部署到 Vercel

1. **提交更改**
   ```bash
   git add .
   git commit -m "feat: integrate Vercel Blob for media files"
   git push origin main
   ```

2. **Vercel 自动部署**
   - Vercel 检测到更改后会自动重新部署
   - 生产环境将自动使用 Blob URL

---

## 🔧 详细配置步骤

### 方案A：完全自动化（推荐）

使用 `getMediaUrl` 辅助函数，代码会自动在开发和生产环境切换：

**示例 1: 在 Vue 组件中使用**

```vue
<template>
  <video :src="videoUrl" controls />
  <img :src="imageUrl" />
</template>

<script setup>
import { ref } from 'vue';
import { getMediaUrl } from '@/utils/media';

// 直接使用 getMediaUrl 包装路径
const videoUrl = ref(getMediaUrl('/video/example.mp4'));
const imageUrl = ref(getMediaUrl('/original/image.jpg'));
</script>
```

**示例 2: 在数据数组中使用**

```vue
<script setup>
import { ref } from 'vue';
import { getMediaUrl } from '@/utils/media';

const videos = ref([
  {
    id: 1,
    name: '黄仁丰_250816015.mp4.mp4',
    path: getMediaUrl('/video/黄仁丰_250816015.mp4.mp4')
  },
  {
    id: 2,
    name: '郑廷洲_250705123.mp4.mp4',
    path: getMediaUrl('/video/郑廷洲_250705123.mp4.mp4')
  }
]);

const images = ref([
  {
    id: 1,
    url: getMediaUrl('/original/0044_weidi1_1165.jpg')
  }
]);
</script>
```

**示例 3: 动态路径**

```vue
<script setup>
import { getMediaUrl } from '@/utils/media';

const selectVideo = (videoName) => {
  const videoPath = getMediaUrl(`/video/${videoName}`);
  // 使用 videoPath...
};
</script>
```

### 方案B：批量更新组件（手动）

如果您想要手动更新所有组件，需要修改以下文件：

1. **`src/pages/yishiduangerenzhuye/yishiduangerenzhuye.vue`**
   ```javascript
   // 在文件顶部添加
   import { getMediaUrl } from '@/utils/media';
   
   // 修改数据
   const recentViews = ref([
     {
       id: '250619162',
       name: '黄仁丰_250816015.mp4.mp4',
       date: '2025-9-27',
       videoPath: getMediaUrl('/video/黄仁丰_250816015.mp4.mp4')  // 添加 getMediaUrl
     },
     // ... 其他项
   ]);
   ```

2. **`src/pages/yonghuduangerenzhuye/yonghuduangerenzhuye.vue`**  
   类似修改

3. **`src/pages/yonghuduanjiankangdangan/yonghuduanjiankangdangan.vue`**  
   类似修改

4. **`src/pages/yishiduanzhinengxi_chushijiemian/yishiduanzhinengxi_chushijiemian.vue`**  
   ```javascript
   const videoPath = ref(getMediaUrl('/video/黄仁丰_250816015.mp4.mp4'));
   ```

5. **`src/pages/yishiduanzhinengnxi_fenxijiemian/yishiduanzhinengnxi_fenxijiemian.vue`**  
   ```javascript
   const currentAnalysisImage = ref(getMediaUrl('/analyse/黄仁丰_250816015.mp4.png'));
   ```

6. **`src/pages/yishiduangongxiaxuanzehoujiemian/yishiduangongxiaxuanzehoujiemian.vue`**  
   ```javascript
   const searchResults = ref([
     { id: '0044_weidi1_1165', image: getMediaUrl('/original/0044_weidi1_1165.jpg') },
     // ...
   ]);
   ```

---

## 🧪 测试

### 本地测试（开发环境）

```bash
npm run dev
```

- 应该使用本地文件路径
- 视频和图片应该正常显示
- 打开浏览器控制台，检查URL是否为 `/video/xxx` 格式

### 生产环境测试

1. **构建测试**
   ```bash
   npm run build
   npm run preview
   ```

2. **检查构建产物**
   - `blob-url-mapping.json` 应该存在于 `dist/` 目录
   - 打开浏览器控制台，检查URL是否为 Blob URL

---

## 📊 文件大小和成本估算

### 当前项目文件统计

| 文件夹 | 文件数量 | 估计大小 |
|--------|---------|---------|
| `video/` | 5 | ~50-200MB |
| `analyse/` | 5 | ~5-10MB |
| `original/` | 30 | ~10-50MB |
| **总计** | **40** | **~65-260MB** |

### Vercel Blob 定价

**Hobby（免费）计划**:
- 存储：1GB
- 带宽：100GB/月

**当前项目**:
- ✅ 存储在免费额度内 (~260MB < 1GB)
- ✅ 正常访问量下带宽充足

**超出后**:
- 存储：$0.15/GB/月
- 带宽：$0.30/GB

---

## ⚠️ 重要注意事项

### 1. 安全性

- ✅ `.env` 文件已在 `.gitignore` 中
- ❌ 切勿将 `BLOB_READ_WRITE_TOKEN` 提交到 Git
- ✅ 在 Vercel Dashboard 中设置生产环境变量

### 2. 文件管理

- Blob 文件是永久的，除非手动删除
- 重新上传同名文件会覆盖
- 删除文件需要通过 Vercel Dashboard 或 API

### 3. 性能优化

- Blob URL 自带 CDN 加速
- 全球边缘节点分发
- 自动 HTTP/2 和 Brotli 压缩

---

## 🔍 故障排除

### 问题 1: 上传失败

**错误**: `未找到 BLOB_READ_WRITE_TOKEN`

**解决**:
```bash
# 检查 .env 文件是否存在
cat .env

# 应该看到:
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx
```

### 问题 2: 生产环境图片404

**可能原因**:
1. `blob-url-mapping.json` 未提交到 Git
2. Vercel 未重新部署
3. 路径不匹配

**解决**:
```bash
# 1. 检查映射文件是否存在
git status

# 2. 确保已提交
git add blob-url-mapping.json
git commit -m "add blob url mapping"
git push

# 3. 检查 Vercel 部署状态
# 访问 https://vercel.com/dashboard
```

### 问题 3: 开发环境无法显示媒体

**解决**: 开发环境使用本地文件，确保文件夹存在：
```bash
ls -la video/
ls -la analyse/
ls -la original/
```

---

## 📚 相关文档

- [Vercel Blob 官方文档](https://vercel.com/docs/storage/vercel-blob)
- [@vercel/blob NPM](https://www.npmjs.com/package/@vercel/blob)
- [Vercel 定价](https://vercel.com/pricing)

---

## ✅ 检查清单

部署前确认：

- [ ] 已创建 Vercel Blob 存储
- [ ] 已获取 `BLOB_READ_WRITE_TOKEN`
- [ ] 已创建 `.env` 文件并配置令牌
- [ ] 已运行 `npm run upload:blob` 上传文件
- [ ] 已生成 `blob-url-mapping.json`
- [ ] 已提交所有更改到 Git
- [ ] Vercel 已重新部署

部署后验证：

- [ ] 访问生产环境 URL
- [ ] 打开浏览器开发者工具 → Network 标签
- [ ] 检查媒体文件URL是否为 Blob URL
- [ ] 测试视频播放功能
- [ ] 测试图片显示功能

---

🎉 **完成！您的项目现在使用 Vercel Blob 存储大型媒体文件了！**

