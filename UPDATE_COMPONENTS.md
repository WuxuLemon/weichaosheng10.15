# Vue组件媒体路径更新清单

## ✅ 已完成

### 1. `src/pages/yishiduangerenzhuye/yishiduangerenzhuye.vue`
- [x] 添加 `getMediaUrl` 导入
- [x] 更新 `recentViews` 中的 `videoPath`
- [x] 更新 `myFavorites` 中的 `image`
- [x] 更新 `myImages` 中的 `image`

---

## ⏳ 待更新组件

### 2. `src/pages/yonghuduangerenzhuye/yonghuduangerenzhuye.vue`

**需要修改**:
```javascript
// 在文件顶部添加导入
import { getMediaUrl } from '../../utils/media.js';

// 更新 myCases 数组
const myCases = ref([
  {
    id: 'CASE001',
    hospital: '华西医院',
    date: '2025-10-07',
    doctor: '郑艺喧',
    diagnosis: '胃大部分切除术后，残存胃壁未见异常肿块，吻合口未见狭窄...',
    diagnosisDetail: '术后定期复查，注意饮食调理...',
    result: '患者空腹饮用胃肠超声造影剂充盈后检查：...',
    image: getMediaUrl('/original/0044_weidi1_1165.jpg'),  // 添加 getMediaUrl
    ultraSoundImages: [
      getMediaUrl('/original/0044_weidi1_1165.jpg'),      // 添加 getMediaUrl
      getMediaUrl('/original/0044_weidi1_1166.jpg')       // 添加 getMediaUrl
    ]
  },
  // ... 对其他项做同样的修改
]);

// 更新 myImages 数组
const myImages = ref([
  { id: 'IMG001', name: '2025-10-07 超声图像', date: '2025-10-07', image: getMediaUrl('/original/0044_weidi1_1165.jpg') },
  { id: 'IMG002', name: '2025-10-07 超声图像', date: '2025-10-07', image: getMediaUrl('/original/0044_weidi1_1166.jpg') },
  // ... 其他项
]);
```

### 3. `src/pages/yonghuduanjiankangdangan/yonghuduanjiankangdangan.vue`

**需要修改**:
```javascript
// 在文件顶部添加导入
import { getMediaUrl } from '../../utils/media.js';

// 更新 healthRecords 数组中的 ultraSoundImages
const healthRecords = ref([
  {
    id: 'REC001',
    date: '2025-10-07',
    hospital: '华西医院',
    doctor: '郑艺喧',
    diagnosis: '胃大部分切除术后...',
    // ... 其他字段
    ultraSoundImages: [
      getMediaUrl('/original/0044_weidi1_1165.jpg'),  // 添加 getMediaUrl
      getMediaUrl('/original/0044_weidi1_1166.jpg')   // 添加 getMediaUrl
    ]
  },
  // ... 其他记录
]);
```

### 4. `src/pages/yishiduanzhinengxi_chushijiemian/yishiduanzhinengxi_chushijiemian.vue`

**需要修改**:
```javascript
// 在文件顶部添加导入
import { getMediaUrl } from '../../utils/media.js';

// 更新初始视频路径
const videoPath = ref(getMediaUrl('/video/黄仁丰_250816015.mp4.mp4'));

// 在 selectVideo 函数中
const selectVideo = (video) => {
  currentVideo.value = video.name;
  videoPath.value = getMediaUrl(`/video/${video.name}`);  // 添加 getMediaUrl
  isPlaying.value = true;
  // ...
};

// 在 prevVideo 函数中
const prevVideo = () => {
  // ...
  videoPath.value = getMediaUrl(`/video/${prevVid.name}`);  // 添加 getMediaUrl
  // ...
};

// 在 nextVideo 函数中
const nextVideo = () => {
  // ...
  videoPath.value = getMediaUrl(`/video/${nextVid.name}`);  // 添加 getMediaUrl
  // ...
};
```

### 5. `src/pages/yishiduanzhinengnxi_fenxijiemian/yishiduanzhinengnxi_fenxijiemian.vue`

**需要修改**:
```javascript
// 在文件顶部添加导入
import { getMediaUrl } from '../../utils/media.js';

// 更新初始分析图片路径
const currentAnalysisImage = ref(getMediaUrl('/analyse/黄仁丰_250816015.mp4.png'));

// 在 selectVideo 函数中
const selectVideo = (video) => {
  currentVideo.value = video.name;
  const imageName = video.name.replace('.mp4.mp4', '.mp4.png');
  currentAnalysisImage.value = getMediaUrl(`/analyse/${imageName}`);  // 添加 getMediaUrl
  loadMockData();
};
```

### 6. `src/pages/yishiduangongxiaxuanzehoujiemian/yishiduangongxiaxuanzehoujiemian.vue`

**需要修改**:
```javascript
// 在文件顶部添加导入
import { getMediaUrl } from '../../utils/media.js';

// 更新 searchResults 数组
const searchResults = ref([
  { id: '0044_weidi1_1165', image: getMediaUrl('/original/0044_weidi1_1165.jpg') },
  { id: '0044_weidi1_1166', image: getMediaUrl('/original/0044_weidi1_1166.jpg') },
  { id: '0044_weidi1_379', image: getMediaUrl('/original/0044_weidi1_379.jpg') },
  // ... 所有 30 个项
]);
```

---

## 🔧 批量更新脚本

如果您想自动化更新所有组件，可以使用以下Node.js脚本：

```javascript
// scripts/update-media-paths.js
import fs from 'fs';
import path from 'path';

const filesToUpdate = [
  'src/pages/yonghuduangerenzhuye/yonghuduangerenzhuye.vue',
  'src/pages/yonghuduanjiankangdangan/yonghuduanjiankangdangan.vue',
  'src/pages/yishiduanzhinengxi_chushijiemian/yishiduanzhinengxi_chushijiemian.vue',
  'src/pages/yishiduanzhinengnxi_fenxijiemian/yishiduanzhinengnxi_fenxijiemian.vue',
  'src/pages/yishiduangongxiaxuanzehoujiemian/yishiduangongxiaxuanzehoujiemian.vue'
];

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // 1. 添加导入语句（如果不存在）
  if (!content.includes("import { getMediaUrl } from")) {
    const importLine = "  import { getMediaUrl } from '../../utils/media.js';\\n";
    content = content.replace(
      /import DoctorSidebar.*?;\\n|import PatientSidebar.*?;\\n|import PatientHeader.*?;\\n/,
      (match) => match + importLine
    );
  }
  
  // 2. 替换所有媒体路径
  content = content.replace(/['"](\\/video\\/[^'"]+)['"]/g, "getMediaUrl('$1')");
  content = content.replace(/['"](\\/analyse\\/[^'"]+)['"]/g, "getMediaUrl('$1')");
  content = content.replace(/['"](\\/original\\/[^'"]+)['"]/g, "getMediaUrl('$1')");
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ 已更新: ${filePath}`);
}

filesToUpdate.forEach(updateFile);
console.log('\\n🎉 所有组件已更新！');
```

运行:
```bash
node scripts/update-media-paths.js
```

---

## ✅ 验证清单

更新完成后，请验证：

- [ ] 所有组件文件都导入了 `getMediaUrl`
- [ ] 所有 `/video/` 路径都被 `getMediaUrl()` 包裹
- [ ] 所有 `/analyse/` 路径都被 `getMediaUrl()` 包裹  
- [ ] 所有 `/original/` 路径都被 `getMediaUrl()` 包裹
- [ ] 运行 `npm run dev` 测试本地功能正常
- [ ] 运行 `npm run build` 确保构建成功

---

## 🎯 下一步

组件更新完成后：

1. **本地测试**
   ```bash
   npm run dev
   ```
   验证所有媒体文件正常显示

2. **上传媒体文件到 Vercel Blob**
   ```bash
   npm run upload:blob
   ```

3. **提交并部署**
   ```bash
   git add .
   git commit -m "feat: integrate Vercel Blob for media files"
   git push origin main
   ```

4. **验证生产环境**
   访问 Vercel 部署的URL，确认所有媒体文件正常显示

