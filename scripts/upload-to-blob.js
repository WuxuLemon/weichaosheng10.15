import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// 手动加载 .env 文件
const envPath = path.join(rootDir, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const envLines = envContent.split('\n');
  envLines.forEach(line => {
    const trimmed = line.trim();
    // 移除 UTF-8 BOM 如果存在
    const cleanedLine = trimmed.replace(/^\uFEFF/, '');
    if (cleanedLine && !cleanedLine.startsWith('#')) {
      const [key, ...valueParts] = cleanedLine.split('=');
      if (key && valueParts.length > 0) {
        process.env[key.trim()] = valueParts.join('=').trim();
      }
    }
  });
}

// 需要上传的文件夹
const folders = ['video', 'analyse', 'original'];

// 用于存储上传后的URL映射
const urlMapping = {};

async function uploadFiles() {
  console.log('开始上传文件到 Vercel Blob...\n');
  
  // 检查环境变量
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('❌ 错误: 未找到 BLOB_READ_WRITE_TOKEN 环境变量');
    console.log('\n请按照以下步骤设置：');
    console.log('1. 登录 Vercel Dashboard: https://vercel.com/dashboard');
    console.log('2. 进入你的项目 > Storage > Blob');
    console.log('3. 复制 BLOB_READ_WRITE_TOKEN');
    console.log('4. 在项目根目录创建 .env 文件：');
    console.log('   BLOB_READ_WRITE_TOKEN=your_token_here\n');
    process.exit(1);
  }

  for (const folder of folders) {
    const folderPath = path.join(rootDir, folder);
    
    // 检查文件夹是否存在
    if (!fs.existsSync(folderPath)) {
      console.log(`⚠️  跳过不存在的文件夹: ${folder}`);
      continue;
    }

    const files = fs.readdirSync(folderPath);
    console.log(`📁 处理文件夹: ${folder} (${files.length} 个文件)`);
    
    urlMapping[folder] = {};

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const stats = fs.statSync(filePath);
      
      // 跳过目录
      if (stats.isDirectory()) continue;
      
      try {
        // 读取文件
        const fileBuffer = fs.readFileSync(filePath);
        const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
        
        console.log(`  上传: ${file} (${fileSizeMB}MB)`);
        
        // 上传到 Vercel Blob
        const blob = await put(`${folder}/${file}`, fileBuffer, {
          access: 'public',
        });
        
        // 保存URL映射
        urlMapping[folder][file] = blob.url;
        
        console.log(`  ✅ 成功: ${blob.url}\n`);
        
      } catch (error) {
        console.error(`  ❌ 失败: ${file}`);
        console.error(`     错误: ${error.message}\n`);
      }
    }
  }
  
  // 保存URL映射到文件
  const mappingPath = path.join(rootDir, 'blob-url-mapping.json');
  fs.writeFileSync(mappingPath, JSON.stringify(urlMapping, null, 2));
  console.log(`\n✅ URL映射已保存到: blob-url-mapping.json`);
  
  // 生成统计信息
  let totalFiles = 0;
  let totalFolders = 0;
  for (const folder in urlMapping) {
    const fileCount = Object.keys(urlMapping[folder]).length;
    totalFiles += fileCount;
    totalFolders++;
    console.log(`   ${folder}: ${fileCount} 个文件`);
  }
  
  console.log(`\n📊 总计: ${totalFolders} 个文件夹, ${totalFiles} 个文件上传成功`);
  console.log('\n🎉 所有文件上传完成！');
  console.log('\n接下来请运行: npm run update-media-urls');
}

uploadFiles().catch(error => {
  console.error('❌ 上传过程出错:', error);
  process.exit(1);
});

