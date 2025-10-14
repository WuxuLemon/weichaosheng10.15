<template>
  <div class="flex-row justify-end items-center relative header-section">
    <img
      class="notification-icon"
      :src="notificationIcon"
      @click="toggleNotification"
      style="cursor: pointer;"
      title="通知中心"
    />
    <div class="user-dropdown" @click="toggleDropdown" style="cursor: pointer;">
      <span class="username">{{ username }}</span>
      <img
        class="dropdown-arrow"
        :src="dropdownIcon"
      />
    </div>
    
    <!-- 下拉菜单 - 5个选项 -->
    <div v-if="showDropdown" class="dropdown-menu">
      <div class="dropdown-item" @click="showPersonalInfo">个人信息</div>
      <div class="dropdown-item" @click="showAccountSettings">账户设置</div>
      <div class="dropdown-item" @click="showAboutUs">关于我们</div>
      <div class="dropdown-item" @click="showHelpCenter">帮助中心</div>
      <div class="dropdown-item" @click="logout">退出登录</div>
    </div>
    
    <!-- 个人信息弹窗 -->
    <div v-if="showPersonalInfoDialog" class="dialog-overlay" @click="showPersonalInfoDialog = false">
      <div class="dialog-box" @click.stop>
        <h3 class="dialog-title">个人信息</h3>
        <div class="info-row">
          <span class="info-label">姓名：</span>
          <input v-model="personalInfo.name" class="info-input" />
        </div>
        <div class="info-row">
          <span class="info-label">职称：</span>
          <input v-model="personalInfo.title" class="info-input" />
        </div>
        <div class="info-row">
          <span class="info-label">联系方式：</span>
          <input v-model="personalInfo.phone" class="info-input" />
        </div>
        <div class="dialog-footer">
          <button class="btn-cancel" @click="showPersonalInfoDialog = false">取消</button>
          <button class="btn-confirm" @click="savePersonalInfo">保存</button>
        </div>
      </div>
    </div>

    <!-- 账户设置弹窗 -->
    <div v-if="showAccountDialog" class="dialog-overlay" @click="showAccountDialog = false">
      <div class="dialog-box" @click.stop>
        <h3 class="dialog-title">账户设置 - 修改密码</h3>
        <div class="info-row">
          <span class="info-label">原密码：</span>
          <input v-model="passwordForm.oldPassword" type="password" class="info-input" placeholder="请输入原密码" />
        </div>
        <div class="info-row">
          <span class="info-label">新密码：</span>
          <input v-model="passwordForm.newPassword" type="password" class="info-input" placeholder="请输入新密码" />
        </div>
        <div class="info-row">
          <span class="info-label">确认密码：</span>
          <input v-model="passwordForm.confirmPassword" type="password" class="info-input" placeholder="请再次输入新密码" />
        </div>
        <div class="dialog-footer">
          <button class="btn-cancel" @click="showAccountDialog = false">取消</button>
          <button class="btn-confirm" @click="changePassword">确认修改</button>
        </div>
      </div>
    </div>

    <!-- 关于我们弹窗 -->
    <div v-if="showAboutDialog" class="dialog-overlay" @click="showAboutDialog = false">
      <div class="dialog-box" @click.stop>
        <h3 class="dialog-title">关于我们</h3>
        <div class="about-content">
          <p><strong>系统版本：</strong>1.0.1（2025.10.14正式版）</p>
          <p><strong>版权信息：</strong></p>
          <p>胃超声智能诊断系统研发团队</p>
          <p><strong>总负责人：</strong>沈子濠</p>
          <p><strong>研发团队：</strong>沈子濠、胡诗婷、梁曦彤、赖梦婷</p>
        </div>
        <div class="dialog-footer">
          <button class="btn-confirm" @click="showAboutDialog = false">确定</button>
        </div>
      </div>
    </div>

    <!-- 帮助中心弹窗 -->
    <div v-if="showHelpDialog" class="dialog-overlay" @click="showHelpDialog = false">
      <div class="dialog-box" @click.stop>
        <h3 class="dialog-title">帮助中心</h3>
        <div class="help-content">
          <p>联系方式：15889254549！</p>
        </div>
        <div class="dialog-footer">
          <button class="btn-confirm" @click="showHelpDialog = false">确定</button>
        </div>
      </div>
    </div>

    <!-- 通知中心 -->
    <div v-if="showNotification" class="notification-panel">
      <div class="notification-header">
        <span>通知中心</span>
        <span class="clear-btn" @click="clearAllNotifications">清空全部</span>
      </div>
      <div class="notification-list">
        <div 
          v-for="notif in notifications" 
          :key="notif.id"
          class="notification-item"
          :class="{ 'unread': !notif.read }"
          @click="markAsRead(notif.id)"
        >
          <div class="notification-message">{{ notif.message }}</div>
          <div class="notification-time">{{ notif.time }}</div>
        </div>
        <div v-if="notifications.length === 0" class="no-notification">暂无通知</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  username: {
    type: String,
    default: '郑医生'
  },
  notificationIcon: {
    type: String,
    default: '/b408bf95beafa65c3b1b16e544f10254.png'
  },
  dropdownIcon: {
    type: String,
    default: '/beb9979c3492f086ebf8f01a5b5db92d.png'
  }
});

const router = useRouter();

// 下拉菜单控制
const showDropdown = ref(false);

// 各个弹窗控制
const showPersonalInfoDialog = ref(false);
const showAccountDialog = ref(false);
const showAboutDialog = ref(false);
const showHelpDialog = ref(false);

// 个人信息
const personalInfo = ref({
  name: '郑医生',
  title: '主任医师',
  phone: '15889251899'
});

// 密码表单
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// 通知中心控制
const showNotification = ref(false);
const notifications = ref([
  { id: 1, message: '您有一条新的检查请求', time: '10分钟前', read: false },
  { id: 2, message: '患者张三的检查报告已完成', time: '1小时前', read: false },
  { id: 3, message: '系统将于今晚22:00进行维护', time: '3小时前', read: true }
]);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

// 显示个人信息
const showPersonalInfo = () => {
  showDropdown.value = false;
  showPersonalInfoDialog.value = true;
};

// 保存个人信息
const savePersonalInfo = () => {
  alert('个人信息已保存');
  showPersonalInfoDialog.value = false;
};

// 显示账户设置
const showAccountSettings = () => {
  showDropdown.value = false;
  showAccountDialog.value = true;
};

// 修改密码（只需要输入，不实际修改）
const changePassword = () => {
  if (!passwordForm.value.oldPassword || !passwordForm.value.newPassword || !passwordForm.value.confirmPassword) {
    alert('请填写完整的密码信息');
    return;
  }
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert('两次输入的新密码不一致');
    return;
  }
  alert('密码修改成功');
  passwordForm.value = { oldPassword: '', newPassword: '', confirmPassword: '' };
  showAccountDialog.value = false;
};

// 显示关于我们
const showAboutUs = () => {
  showDropdown.value = false;
  showAboutDialog.value = true;
};

// 显示帮助中心
const showHelpCenter = () => {
  showDropdown.value = false;
  showHelpDialog.value = true;
};

// 退出登录 - 跳转到开始页面
const logout = () => {
  showDropdown.value = false;
  router.push('/');  // 跳转到开始页面（路由配置中/对应kaishiyemian）
};

const toggleNotification = () => {
  showNotification.value = !showNotification.value;
};

const markAsRead = (id) => {
  const notification = notifications.value.find(n => n.id === id);
  if (notification) {
    notification.read = true;
  }
};

const clearAllNotifications = () => {
  notifications.value = [];
  showNotification.value = false;
};
</script>

<style scoped>
.header-section {
  padding: 1.44rem 1.5rem 1.13rem;
  background-color: #ffffff;
  box-shadow: 0rem 0.13rem 0.25rem #00000040;
}

.notification-icon {
  width: 1.88rem;
  height: 2.13rem;
}

.user-dropdown {
  margin-left: 2.75rem;
  padding: 0.5rem 0.75rem;
  filter: drop-shadow(0rem 0.13rem 0.13rem #00000040);
  background-color: #ffffff;
  border-radius: 0.31rem;
  height: 2.5rem;
  border: solid 0.063rem #000000;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.username {
  color: #000000;
  font-size: 1.5rem;
  font-family: SourceHanSansCN;
  line-height: 1.38rem;
}

.dropdown-arrow {
  width: 1.13rem;
  height: 1.06rem;
}

/* 下拉菜单样式 */
.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
  min-width: 10rem;
  z-index: 1000;
}

.dropdown-item {
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1rem;
  color: #333;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}

.dropdown-item:first-child {
  border-radius: 0.5rem 0.5rem 0 0;
}

.dropdown-item:last-child {
  border-radius: 0 0 0.5rem 0.5rem;
}

/* 通知中心样式 */
.notification-panel {
  position: absolute;
  top: 100%;
  right: 10rem;
  margin-top: 0.5rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
  width: 25rem;
  max-height: 30rem;
  overflow-y: auto;
  z-index: 1000;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e5e5e5;
  font-weight: 600;
  font-size: 1.1rem;
}

.clear-btn {
  color: #00baad;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: normal;
}

.clear-btn:hover {
  text-decoration: underline;
}

.notification-list {
  max-height: 25rem;
  overflow-y: auto;
}

.notification-item {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.notification-item:hover {
  background-color: #f9f9f9;
}

.notification-item.unread {
  background-color: #e6f7ff;
}

.notification-message {
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.25rem;
}

.notification-time {
  font-size: 0.85rem;
  color: #999;
}

.no-notification {
  padding: 2rem;
  text-align: center;
  color: #999;
}

/* 弹窗遮罩层 */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.dialog-box {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  min-width: 25rem;
  max-width: 35rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
}

.dialog-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #333;
  border-bottom: 2px solid #00baad;
  padding-bottom: 0.5rem;
}

.info-row {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.info-label {
  width: 6rem;
  font-size: 1rem;
  color: #666;
}

.info-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.3rem;
  font-size: 1rem;
}

.info-input:focus {
  outline: none;
  border-color: #00baad;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
  margin-top: 1.5rem;
}

.btn-cancel,
.btn-confirm {
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 0.3rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-cancel {
  background: #f0f0f0;
  color: #666;
}

.btn-cancel:hover {
  background: #e0e0e0;
}

.btn-confirm {
  background: #00baad;
  color: white;
}

.btn-confirm:hover {
  background: #009a8e;
}

.about-content,
.help-content {
  line-height: 1.8;
  color: #666;
  font-size: 1rem;
}

.about-content p {
  margin: 0.5rem 0;
}

.about-content strong {
  color: #333;
}
</style>

