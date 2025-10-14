<script setup>
  import { useRouter } from 'vue-router';
  import { reactive, ref } from 'vue';
  import Dialog from '../../components/Dialog.vue';

  const props = defineProps({});

  const router = useRouter();

  // 移动端菜单状态
  const mobileMenuOpen = ref(false);

  // 联系我们弹窗状态
  const showContactDialog = ref(false);

  // 表单数据
  const formData = reactive({
    account: '',
    password: '',
    agreeProtocol: false
  });

  // 弹窗控制
  const showDialog = ref(false);
  const dialogMessage = ref('');

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

  // 跳转到首页
  const goToHome = () => {
    closeMobileMenu();
    router.push('/');
  };

  // 跳转到了解我们页面
  const goToAboutUs = () => {
    closeMobileMenu();
    router.push('/lejiewomen');
  };

  // 切换到医师端登录
  const switchToDoctorLogin = () => {
    closeMobileMenu();
    router.push('/yishiduandengluyemian');
  };

  // 跳转到用户端注册
  const goToRegister = () => {
    closeMobileMenu();
    router.push('/yonghuduanzhuce');
  };

  // 切换协议勾选状态
  const toggleProtocol = () => {
    formData.agreeProtocol = !formData.agreeProtocol;
  };

  // 登录验证和跳转
  const handleLogin = () => {
    // 验证账号
    if (!formData.account.trim()) {
      dialogMessage.value = '请输入账号';
      showDialog.value = true;
      return;
    }

    // 验证密码
    if (!formData.password.trim()) {
      dialogMessage.value = '请输入密码';
      showDialog.value = true;
      return;
    }

    // 验证协议
    if (!formData.agreeProtocol) {
      dialogMessage.value = '请先同意协议';
      showDialog.value = true;
      return;
    }

    // 验证账号和密码是否正确
    if (formData.account !== 'shenzihao' || formData.password !== 'zihao666') {
      dialogMessage.value = '账号和密码输入错误';
      showDialog.value = true;
      return;
    }

    // 登录成功，跳转到用户端预约超声首页（默认主界面）
    closeMobileMenu();
    router.push('/yonghuduanyuyuechaosheng_shouye');
  };
</script>

<template>
  <div class="page">
    <!-- 背景图片 -->
    <div class="bg-image-wrapper">
      <img class="bg-image" src="/38613669de93514860085073aeb36bf7.png" alt="背景图" />
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
          <div class="nav-item" @click="goToHome" style="cursor: pointer;">
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
          <span class="register-btn" @click="goToRegister" style="cursor: pointer;">注册</span>
          <div class="login-btn active">
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
          <div class="mobile-nav-item" @click="goToHome">
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
          <button class="mobile-register-btn" @click="goToRegister">注册</button>
          <button class="mobile-login-btn" @click="closeMobileMenu">登录</button>
        </div>
      </div>
    </div>

    <!-- 主内容区 -->
    <main class="main-content">
      <div class="content-container">
        <!-- 左侧介绍 -->
        <div class="intro-section">
          <h2 class="intro-title">胃部疾病超声影像智能<br/>辅助诊断系统</h2>
          <p class="intro-description">
            胃部疾病超声影像智能辅助诊断系统的设计与应用评估，致力于提升胃癌早期发现率与优化基层医疗服务的智能超声解决方案为医生的临床决策供客观量化的数据参考。
          </p>
        </div>

        <!-- 右侧登录表单 -->
        <div class="login-section">
          <div class="login-card">
            <div class="login-header">
              <h1 class="login-title">We Gastric AI</h1>
              <p class="login-subtitle">登录入口</p>
            </div>

            <!-- 端选择 -->
            <div class="portal-tabs">
              <div class="portal-tab" @click="switchToDoctorLogin" style="cursor: pointer;">
                <span>医师端</span>
              </div>
              <div class="portal-tab active">
                <span>用户端</span>
              </div>
            </div>

            <!-- 登录表单 -->
            <form class="login-form" @submit.prevent="handleLogin">
              <div class="form-group">
                <label class="form-label">账号：</label>
                <input 
                  v-model="formData.account" 
                  type="text" 
                  class="form-input"
                  placeholder="请输入账号"
                />
              </div>

              <div class="form-group">
                <label class="form-label">密码：</label>
                <input 
                  v-model="formData.password" 
                  type="password" 
                  class="form-input"
                  placeholder="请输入密码"
                />
              </div>

              <div class="form-checkbox" @click="toggleProtocol" style="cursor: pointer;">
                <div class="checkbox" :class="{ 'checked': formData.agreeProtocol }">
                  <span v-if="formData.agreeProtocol" class="checkmark">✓</span>
                </div>
                <span class="checkbox-label">我同意协议</span>
              </div>

              <button type="submit" class="submit-btn">
                登录
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
    
    <!-- 提示弹窗 -->
    <Dialog
      v-model:visible="showDialog"
      :message="dialogMessage"
      :show-cancel-button="false"
      confirm-text="确定"
    />

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
    filter: blur(0.094rem);
  }

  /* 顶部导航栏 - 与医师端完全一致 */
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

  .login-btn:hover, .login-btn.active {
    background-color: #009a8e;
  }

  .login-btn span {
    color: #ffffff;
    font-size: 1.5rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
  }

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

  .content-container {
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  .intro-section {
    animation: fadeInLeft 1s ease-out;
  }

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .intro-title {
    font-size: clamp(2.5rem, 4vw, 4.5rem);
    font-family: AlimamaShuHeiTi;
    line-height: 1.3;
    color: #ffffff;
    margin: 0 0 2rem 0;
    text-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.3);
  }

  .intro-description {
    color: #ffffff;
    font-size: clamp(1rem, 1.5vw, 1.88rem);
    font-family: AlimamaShuHeiTi;
    line-height: 1.6;
    margin: 0;
    text-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.3);
    text-indent: 1.5em;
  }

  .login-section {
    animation: fadeInRight 1s ease-out;
  }

  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .login-card {
    background-color: rgba(255, 255, 255, 0.14);
    border-radius: 2rem;
    padding: 2.5rem;
    backdrop-filter: blur(10px);
    box-shadow: 0rem 0.5rem 1rem rgba(0, 0, 0, 0.25);
  }

  .login-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .login-title {
    font-size: 2.25rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 0.5rem 0;
  }

  .login-subtitle {
    font-size: 1.5rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
  }

  .portal-tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .portal-tab {
    flex: 1;
    padding: 1rem;
    background-color: #a6a6a6;
    border-radius: 2rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .portal-tab:hover {
    transform: translateY(-2px);
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.25);
  }

  .portal-tab.active {
    background-color: #00baad;
  }

  .portal-tab span {
    font-size: 1.88rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
    color: #ffffff;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .form-label {
    font-size: 1.5rem;
    font-family: SourceHanSansCN;
    color: #ffffff;
    white-space: nowrap;
  }

  .form-input {
    flex: 1;
    padding: 1rem 1.5rem;
    background-color: rgba(255, 255, 255, 0.35);
    border: none;
    border-radius: 0.94rem;
    color: #ffffff;
    font-size: 1.25rem;
    font-family: SourceHanSansCN;
    outline: none;
    transition: all 0.3s ease;
  }

  .form-input::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  .form-input:focus {
    background-color: rgba(255, 255, 255, 0.45);
    box-shadow: 0 0 0 2px rgba(0, 186, 173, 0.3);
  }

  .form-checkbox {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    cursor: pointer;
  }

  .checkbox {
    width: 1.25rem;
    height: 1.25rem;
    background-color: #cccccc;
    border-radius: 0.31rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .checkbox.checked {
    background-color: #00baad;
  }

  .checkbox .checkmark {
    color: #ffffff;
    font-size: 1rem;
    font-weight: bold;
  }

  .checkbox-label {
    color: #ffffff;
    font-size: 1.13rem;
    font-family: SourceHanSansCN;
  }

  .submit-btn {
    margin-top: 1rem;
    padding: 1rem 2rem;
    background-color: #00baad;
    border: none;
    border-radius: 2rem;
    color: #ffffff;
    font-size: 1.88rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .submit-btn:hover {
    background-color: #009a8e;
    transform: translateY(-2px);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
  }

  /* 平板设备适配 */
  @media (max-width: 1024px) {
    .header-container {
      padding: 1.2rem 1.5rem;
    }

    .content-container {
      grid-template-columns: 1fr;
      gap: 2rem;
      text-align: center;
    }

    .intro-section {
      order: 2;
    }

    .login-section {
      order: 1;
      max-width: 500px;
      margin: 0 auto;
    }
  }

  /* 移动设备适配 */
  @media (max-width: 768px) {
    .header-container {
      padding: 1rem;
    }

    .nav-menu {
      display: none;
    }

    .header-actions {
      display: none;
    }

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

    .login-card {
      padding: 1.5rem;
    }

    .login-title {
      font-size: 1.8rem;
    }

    .login-subtitle {
      font-size: 1.2rem;
    }

    .portal-tab span {
      font-size: 1.5rem;
    }

    .form-label {
      font-size: 1.2rem;
    }

    .form-input {
      font-size: 1rem;
      padding: 0.8rem 1rem;
    }

    .submit-btn {
      font-size: 1.5rem;
      padding: 0.8rem 1.5rem;
    }
  }

  /* 小屏手机适配 */
  @media (max-width: 480px) {
    .login-card {
      padding: 1rem;
    }

    .intro-title {
      font-size: 2rem;
    }

    .intro-description {
      font-size: 0.9rem;
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

</style>