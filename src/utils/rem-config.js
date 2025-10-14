/**
 * rem 适配配置文件
 * 
 * 使用说明：
 * 1. baseWidth: 设计稿的基准宽度（通常是1920px桌面端或750px移动端）
 *    - 如果您的设计稿是1920px宽的，保持默认值1920
 *    - 如果您的设计稿是其他宽度，请修改为实际宽度
 * 
 * 2. baseFontSize: 基准字体大小（默认16px，与您原来的设置一致）
 * 
 * 3. minFontSize/maxFontSize: 字体大小的最小/最大限制
 *    - 防止在超大或超小屏幕上字体过大或过小
 *    - 可根据实际需求调整
 */

export const remConfig = {
  // 设计稿基准宽度（px）
  baseWidth: 1920,
  
  // 基准字体大小（px）
  baseFontSize: 16,
  
  // 最小字体限制（px）- 防止在小屏幕上字体过小
  minFontSize: 12,
  
  // 最大字体限制（px）- 防止在大屏幕上字体过大
  maxFontSize: 24,
  
  // 防抖延迟时间（ms）- resize事件的防抖时间
  resizeDelay: 300
};

export default remConfig;

