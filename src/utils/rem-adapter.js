/**
 * rem 自适应配置
 * 根据屏幕宽度动态设置 html 的 font-size
 * 实现不同设备的等比例缩放
 */

import remConfig from './rem-config.js';

(function flexible(window, document) {
  const docEl = document.documentElement;
  const dpr = window.devicePixelRatio || 1;

  // 从配置文件读取参数
  const { baseWidth, baseFontSize, minFontSize, maxFontSize, resizeDelay } = remConfig;

  // 设置根元素字体大小
  function setRemUnit() {
    // 获取当前窗口宽度
    const viewWidth = docEl.clientWidth;
    
    // 计算缩放比例
    const scale = viewWidth / baseWidth;
    
    // 动态设置 font-size
    // 为了保持原有显示效果，基于基准宽度等比缩放
    const fontSize = baseFontSize * scale;
    
    // 设置最小和最大字体大小限制，避免过小或过大
    const finalFontSize = Math.max(minFontSize, Math.min(maxFontSize, fontSize));
    
    docEl.style.fontSize = finalFontSize + 'px';
  }

  // 设置 body 字体大小
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = baseFontSize + 'px';
    } else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize);
    }
  }

  setRemUnit();
  setBodyFontSize();

  // 当窗口大小改变时重新计算
  let resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      setRemUnit();
    }, resizeDelay);
  });

  // 页面显示时重新计算（处理从后台切回的情况）
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit();
    }
  });

  // 处理 dpr
  if (dpr >= 2) {
    const fakeBody = document.createElement('body');
    const testElement = document.createElement('div');
    testElement.style.border = '.5px solid transparent';
    fakeBody.appendChild(testElement);
    docEl.appendChild(fakeBody);
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines');
    }
    docEl.removeChild(fakeBody);
  }
})(window, document);

