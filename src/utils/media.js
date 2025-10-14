// 媒体文件URL管理工具

// 静态导入 Blob URL 映射文件
// Vite 会在构建时将 JSON 文件内容内联，避免异步加载
import blobUrlMappingData from '../../blob-url-mapping.json';

// 从环境变量获取Blob基础URL
// 生产环境使用Vercel Blob URL，开发环境使用本地路径
const isProduction = import.meta.env.PROD;

// Blob URL映射 - 上传后会自动生成
const blobUrlMapping = blobUrlMappingData || null;

/**
 * 获取媒体文件的完整URL
 * @param {string} path - 媒体文件路径，如 '/video/example.mp4'
 * @returns {string} - 完整的URL
 */
export const getMediaUrl = (path) => {
  // 开发环境：直接返回本地路径
  if (!isProduction || !blobUrlMapping) {
    return path;
  }

  // 生产环境：查找Blob URL
  // 解析路径: /video/example.mp4 => folder=video, filename=example.mp4
  const match = path.match(/^\/([^\/]+)\/(.+)$/);
  if (!match) {
    console.warn(`无效的媒体路径格式: ${path}`);
    return path;
  }

  const [, folder, filename] = match;
  
  // 查找映射的URL
  if (blobUrlMapping[folder] && blobUrlMapping[folder][filename]) {
    return blobUrlMapping[folder][filename];
  }

  console.warn(`未找到 ${path} 的Blob URL，使用原路径`);
  return path;
};

/**
 * 批量转换路径数组
 * @param {string[]} paths - 路径数组
 * @returns {string[]} - URL数组
 */
export const getMediaUrls = (paths) => {
  return paths.map(path => getMediaUrl(path));
};

/**
 * 转换对象中的所有媒体路径
 * @param {object} obj - 包含媒体路径的对象
 * @param {string[]} fields - 需要转换的字段名数组
 * @returns {object} - 转换后的对象
 */
export const transformMediaPaths = (obj, fields) => {
  const result = { ...obj };
  fields.forEach(field => {
    if (result[field]) {
      if (Array.isArray(result[field])) {
        result[field] = getMediaUrls(result[field]);
      } else {
        result[field] = getMediaUrl(result[field]);
      }
    }
  });
  return result;
};

