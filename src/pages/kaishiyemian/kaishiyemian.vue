<script setup>
  import { useRouter } from 'vue-router';
  import { reactive, ref } from 'vue';
  import Dialog from '../../components/Dialog.vue';

  const props = defineProps({});

  const data = reactive({});

  const router = useRouter();

  // 移动端菜单状态
  const mobileMenuOpen = ref(false);

  // 联系我们弹窗状态
  const showContactDialog = ref(false);

  // 注册选择弹窗状态
  const showRegisterDialog = ref(false);

  // 切换移动端菜单
  const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
  };

  // 关闭移动端菜单
  const closeMobileMenu = () => {
    mobileMenuOpen.value = false;
  };

  // 显示联系我们弹窗
  const showContact = () => {
    closeMobileMenu();
    showContactDialog.value = true;
  };

  // 跳转到了解我们页面
  const goToAboutUs = () => {
    closeMobileMenu();
    router.push('/lejiewomen');
  };

  // 跳转到医师端登录页面
  const goToLogin = () => {
    closeMobileMenu();
    router.push('/yishiduandengluyemian');
  };

  // 显示注册选择弹窗
  const showRegisterChoice = () => {
    closeMobileMenu();
    showRegisterDialog.value = true;
  };

  // 跳转到医师端注册页面
  const goToDoctorRegister = () => {
    showRegisterDialog.value = false;
    router.push('/yishiduanzhuce');
  };

  // 跳转到用户端注册页面
  const goToUserRegister = () => {
    showRegisterDialog.value = false;
    router.push('/yonghuduanzhuce');
  };
</script>

<template>
  <div class="page">
    <!-- 背景图片 -->
    <div class="bg-image-wrapper">
      <img class="bg-image" src="/58d03e64227abf479de5ecc982e8f8e3.png" alt="背景图" />
    </div>

    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="header-container">
        <!-- Logo -->
        <div class="logo-section">
          <img class="logo-image" src="/e7fe18fe2874fcd6042e644381ad7b3f.png" alt="Logo" />
          <span class="logo-text">We Gastric AI</span>
        </div>

        <!-- 导航菜单 -->
        <nav class="nav-menu">
          <div class="nav-item active">
            <span>首页</span>
          </div>
          <div class="nav-item" @click="goToAboutUs" style="cursor: pointer;">
            <span>了解我们</span>
          </div>
          <div class="nav-item" @click="showContact" style="cursor: pointer;">
            <span>联系我们</span>
          </div>
        </nav>

        <!-- 右侧操作按钮 -->
        <div class="header-actions">
          <span class="register-btn" @click="showRegisterChoice" style="cursor: pointer;">注册</span>
          <div class="login-btn" @click="goToLogin" style="cursor: pointer;">
            <span>登录</span>
          </div>
        </div>

        <!-- 移动端菜单按钮 -->
        <button class="mobile-menu-btn" @click="toggleMobileMenu" :class="{ 'active': mobileMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div class="header-divider"></div>
    </header>

    <!-- 移动端菜单 -->
    <div class="mobile-menu" :class="{ 'open': mobileMenuOpen }">
      <div class="mobile-menu-overlay" @click="closeMobileMenu"></div>
      <div class="mobile-menu-content">
        <div class="mobile-menu-header">
          <span class="mobile-menu-title">菜单</span>
          <button class="mobile-menu-close" @click="closeMobileMenu">✕</button>
        </div>
        <nav class="mobile-nav">
          <div class="mobile-nav-item active" @click="closeMobileMenu">
            <span>首页</span>
          </div>
          <div class="mobile-nav-item" @click="goToAboutUs">
            <span>了解我们</span>
          </div>
          <div class="mobile-nav-item" @click="showContact">
            <span>联系我们</span>
          </div>
        </nav>
        <div class="mobile-actions">
          <button class="mobile-register-btn" @click="showRegisterChoice">注册</button>
          <button class="mobile-login-btn" @click="goToLogin">登录</button>
        </div>
      </div>
    </div>

    <!-- 主内容区 -->
    <main class="main-content">
      <div class="content-wrapper">
        <!-- 左侧文字内容 -->
        <div class="text-content">
          <h1 class="main-title">
            胃部疾病超声影像智能<br/>辅助诊断系统
          </h1>
          <p class="subtitle">——AI赋能影像，精准洞见胃来</p>
          <div class="cta-button" @click="goToAboutUs" style="cursor: pointer;">
            <span>了解更多 →</span>
          </div>
        </div>
      </div>
    </main>

    <!-- 联系我们弹窗 -->
    <Dialog
      v-model:visible="showContactDialog"
      title="联系我们"
      :show-cancel-button="false"
      confirm-text="确定"
    >
      <div class="contact-info">
        <div class="contact-item">
          <span class="contact-label">📞 电话：</span>
          <a href="tel:15889254549" class="contact-value">15889254549</a>
        </div>
        <div class="contact-item">
          <span class="contact-label">📧 邮箱：</span>
          <a href="mailto:23zhshen@stu.edu.cn" class="contact-value">23zhshen@stu.edu.cn</a>
        </div>
      </div>
    </Dialog>

    <!-- 注册选择弹窗 -->
    <Dialog
      v-model:visible="showRegisterDialog"
      title="选择注册类型"
      :show-cancel-button="false"
      :show-confirm-button="false"
    >
      <div class="register-choice-container">
        <p class="register-choice-hint">请选择您要注册的账户类型</p>
        <div class="register-choice-buttons">
          <button class="register-choice-btn doctor-btn" @click="goToDoctorRegister">
            <div class="btn-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6H16V4C16 2.9 15.1 2 14 2H10C8.9 2 8 2.9 8 4V6H4C2.9 6 2 6.9 2 8V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V8C22 6.9 21.1 6 20 6ZM10 4H14V6H10V4ZM16 15H13V18H11V15H8V13H11V10H13V13H16V15Z" fill="currentColor"/>
              </svg>
            </div>
            <div class="btn-content">
              <div class="btn-title">医师端注册</div>
              <div class="btn-desc">适用于医疗机构的执业医师</div>
            </div>
          </button>
          <button class="register-choice-btn user-btn" @click="goToUserRegister">
            <div class="btn-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
              </svg>
            </div>
            <div class="btn-content">
              <div class="btn-title">用户端注册</div>
              <div class="btn-desc">适用于普通患者用户</div>
            </div>
          </button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<style scoped lang="css">
  /* 页面基础样式 */
  .page {
    min-height: 100vh;
    width: 100%;
    position: relative;
    overflow-x: hidden;
    background-color: #498c8ae6;
  }

  /* 背景图片 */
  .bg-image-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    overflow: hidden;
  }

  .bg-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.8;
    filter: blur(0.031rem);
  }

  /* 顶部导航栏 */
  .header {
    position: relative;
    z-index: 100;
    width: 100%;
    background: transparent;
  }

  .header-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1.5rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  /* Logo 区域 */
  .logo-section {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-shrink: 0;
  }

  .logo-image {
    width: 4rem;
    height: 4rem;
    filter: drop-shadow(0rem 0.13rem 0.13rem #ffffff40);
    transform: scale(2.5);
    transform-origin: center;
  }

  .logo-text {
    color: #ffffff;
    font-size: 1.75rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
    white-space: nowrap;
  }

  /* 导航菜单 */
  .nav-menu {
    display: flex;
    align-items: center;
    gap: 2rem;
    flex: 1;
    justify-content: center;
  }

  .nav-item {
    padding: 0.5rem 1.2rem;
    background-color: #0000001a;
    border-radius: 0.31rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .nav-item:hover {
    background-color: #00000033;
    transform: translateY(-2px);
  }

  .nav-item.active {
    background-color: #00000033;
    font-weight: 700;
  }

  .nav-item span {
    color: #ffffff;
    font-size: 1.25rem;
    font-family: SourceHanSansCN;
    white-space: nowrap;
  }

  /* 右侧操作区 */
  .header-actions {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-shrink: 0;
  }

  .register-btn {
    color: #ffffff;
    font-size: 1.38rem;
    font-family: SourceHanSansCN;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .register-btn:hover {
    transform: scale(1.1);
  }

  .login-btn {
    padding: 0.88rem 2rem;
    background-color: #00baad;
    border-radius: 1.56rem;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .login-btn:hover {
    background-color: #009a8e;
    transform: translateY(-2px);
    box-shadow: 0rem 0.25rem 0.5rem #00000060;
  }

  .login-btn span {
    color: #ffffff;
    font-size: 1.5rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
  }

  /* 移动端菜单按钮 */
  .mobile-menu-btn {
    display: none;
    flex-direction: column;
    gap: 0.35rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  }

  .mobile-menu-btn span {
    display: block;
    width: 1.5rem;
    height: 0.15rem;
    background-color: #ffffff;
    border-radius: 0.1rem;
    transition: all 0.3s ease;
  }

  /* 汉堡按钮激活状态（变成X） */
  .mobile-menu-btn.active span:nth-child(1) {
    transform: translateY(0.5rem) rotate(45deg);
  }

  .mobile-menu-btn.active span:nth-child(2) {
    opacity: 0;
  }

  .mobile-menu-btn.active span:nth-child(3) {
    transform: translateY(-0.5rem) rotate(-45deg);
  }

  /* 移动端菜单 */
  .mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    pointer-events: none;
  }

  .mobile-menu.open {
    pointer-events: auto;
  }

  /* 遮罩层 */
  .mobile-menu-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 0.3s ease;
  }

  .mobile-menu.open .mobile-menu-overlay {
    background-color: rgba(0, 0, 0, 0.5);
  }

  /* 菜单内容 */
  .mobile-menu-content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 80%;
    max-width: 300px;
    background-color: #568d8b;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.3);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
  }

  .mobile-menu.open .mobile-menu-content {
    transform: translateX(0);
  }

  /* 菜单头部 */
  .mobile-menu-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 1.2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  .mobile-menu-title {
    color: #ffffff;
    font-size: 1.5rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
  }

  .mobile-menu-close {
    background: none;
    border: none;
    color: #ffffff;
    font-size: 2rem;
    cursor: pointer;
    padding: 0.5rem;
    line-height: 1;
    transition: transform 0.2s ease;
  }

  .mobile-menu-close:hover {
    transform: scale(1.2);
  }

  /* 移动端导航 */
  .mobile-nav {
    flex: 1;
    padding: 1rem 0;
    overflow-y: auto;
  }

  .mobile-nav-item {
    padding: 1rem 1.5rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .mobile-nav-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .mobile-nav-item.active {
    background-color: rgba(255, 255, 255, 0.15);
  }

  .mobile-nav-item span {
    color: #ffffff;
    font-size: 1.2rem;
    font-family: SourceHanSansCN;
  }

  /* 移动端操作按钮 */
  .mobile-actions {
    padding: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .mobile-register-btn,
  .mobile-login-btn {
    width: 100%;
    padding: 0.8rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 1.1rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .mobile-register-btn {
    background-color: rgba(255, 255, 255, 0.2);
    color: #ffffff;
  }

  .mobile-register-btn:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  .mobile-login-btn {
    background-color: #00baad;
    color: #ffffff;
  }

  .mobile-login-btn:hover {
    background-color: #009a8e;
  }

  /* 顶部分割线 */
  .header-divider {
    background-color: #ffffff33;
    filter: blur(0.031rem);
    height: 0.063rem;
    width: 100%;
  }

  /* 主内容区 */
  .main-content {
    position: relative;
    z-index: 10;
    min-height: calc(100vh - 8rem);
    display: flex;
    align-items: center;
    padding: 2rem;
  }

  .content-wrapper {
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  /* 文字内容 */
  .text-content {
    max-width: 800px;
    animation: fadeInUp 1s ease-out;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .main-title {
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    font-family: AlimamaShuHeiTi;
    line-height: 1.3;
    color: #ffffff;
    margin: 0 0 2rem 0;
    text-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.3);
  }

  .subtitle {
    color: #ffffff;
    font-size: clamp(1.2rem, 2.5vw, 1.88rem);
    font-family: SourceHanSansCN;
    margin: 0 0 3rem 0;
    text-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.3);
  }

  .cta-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1.25rem 3rem;
    background-color: #00baad;
    border-radius: 3.13rem;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .cta-button:hover {
    background-color: #009a8e;
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0rem 0.5rem 1rem #00000060;
  }

  .cta-button span {
    color: #ffffff;
    font-size: 2rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
  }

  /* 平板设备适配 */
  @media (max-width: 1024px) {
    .header-container {
      padding: 1.2rem 1.5rem;
    }

    .nav-menu {
      gap: 1.5rem;
    }

    .logo-text {
      font-size: 1.5rem;
    }

    .logo-image {
      width: 3.5rem;
      height: 3.5rem;
      transform: scale(2.5);
    }

    .content-wrapper {
      justify-content: center;
      text-align: center;
    }
  }

  /* 移动设备适配 */
  @media (max-width: 768px) {
    .header-container {
      padding: 1rem;
    }

    /* 隐藏桌面导航 */
    .nav-menu {
      display: none;
    }

    .header-actions {
      display: none;
    }

    /* 显示移动端菜单按钮 */
    .mobile-menu-btn {
      display: flex;
    }

    .logo-image {
      width: 3rem;
      height: 3rem;
      transform: scale(2.5);
    }

    .logo-text {
      font-size: 1.2rem;
    }

    .main-content {
      padding: 1.5rem 1rem;
    }

    .text-content {
      text-align: center;
    }

    .main-title {
      margin-bottom: 1.5rem;
    }

    .subtitle {
      margin-bottom: 2rem;
    }

    .cta-button {
      padding: 1rem 2.5rem;
    }

    .cta-button span {
      font-size: 1.5rem;
    }
  }

  /* 小屏手机适配 */
  @media (max-width: 480px) {
    .header-container {
      padding: 0.8rem;
    }

    .logo-image {
      width: 2.5rem;
      height: 2.5rem;
      transform: scale(2.5);
    }

    .logo-text {
      font-size: 1rem;
    }

    .main-content {
      padding: 1rem 0.5rem;
    }

    .cta-button {
      padding: 0.8rem 2rem;
    }

    .cta-button span {
      font-size: 1.2rem;
    }
  }

  /* 联系我们弹窗样式 */
  .contact-info {
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .contact-label {
    font-size: 1.1rem;
    font-family: SourceHanSansCN;
    color: #333333;
    font-weight: 600;
    min-width: 6rem;
  }

  .contact-value {
    font-size: 1.1rem;
    font-family: SourceHanSansCN;
    color: #00baad;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .contact-value:hover {
    color: #009a8e;
    text-decoration: underline;
  }

  /* 注册选择弹窗样式 */
  .register-choice-container {
    padding: 1rem 0;
  }

  .register-choice-hint {
    text-align: center;
    font-size: 1rem;
    font-family: SourceHanSansCN;
    color: #666666;
    margin: 0 0 2rem 0;
  }

  .register-choice-buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .register-choice-btn {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1.5rem 2rem;
    border: 2px solid #e0e0e0;
    border-radius: 1rem;
    background: #ffffff;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
  }

  .register-choice-btn:hover {
    transform: translateY(-4px);
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.15);
  }

  .register-choice-btn.doctor-btn {
    border-color: #00baad;
  }

  .register-choice-btn.doctor-btn:hover {
    background: linear-gradient(135deg, #f0fdf4 0%, #e6f7f7 100%);
    border-color: #00baad;
    box-shadow: 0 0.5rem 1.5rem rgba(0, 186, 173, 0.3);
  }

  .register-choice-btn.user-btn {
    border-color: #667eea;
  }

  .register-choice-btn.user-btn:hover {
    background: linear-gradient(135deg, #ede9fe 0%, #e0e7ff 100%);
    border-color: #667eea;
    box-shadow: 0 0.5rem 1.5rem rgba(102, 126, 234, 0.3);
  }

  .btn-icon {
    flex-shrink: 0;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.75rem;
    transition: all 0.3s ease;
  }

  .doctor-btn .btn-icon {
    color: #00baad;
    background: rgba(0, 186, 173, 0.1);
  }

  .doctor-btn:hover .btn-icon {
    background: #00baad;
    color: #ffffff;
    transform: scale(1.1);
  }

  .user-btn .btn-icon {
    color: #667eea;
    background: rgba(102, 126, 234, 0.1);
  }

  .user-btn:hover .btn-icon {
    background: #667eea;
    color: #ffffff;
    transform: scale(1.1);
  }

  .btn-content {
    flex: 1;
    text-align: left;
  }

  .btn-title {
    font-size: 1.25rem;
    font-family: SourceHanSansCN;
    font-weight: 600;
    color: #333333;
    margin-bottom: 0.3rem;
  }

  .btn-desc {
    font-size: 0.9rem;
    font-family: SourceHanSansCN;
    color: #666666;
  }

  @media (max-width: 768px) {
    .register-choice-btn {
      padding: 1.2rem 1.5rem;
      gap: 1rem;
    }

    .btn-icon {
      width: 2.5rem;
      height: 2.5rem;
    }

    .btn-icon svg {
      width: 36px;
      height: 36px;
    }

    .btn-title {
      font-size: 1.1rem;
    }

    .btn-desc {
      font-size: 0.85rem;
    }
  }
</style>