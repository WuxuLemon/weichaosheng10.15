<template>
  <div class="flex-col items-center sidebar-section">
    <img
      class="sidebar-icon"
      :class="{ 'active': isHomeActive }"
      :src="icons.home"
      @click="navigateToHome"
      style="cursor: pointer;"
      title="预约超声-首页"
    />
    <img
      class="sidebar-icon mt-lg"
      :class="{ 'active': isHospitalActive }"
      :src="icons.hospital"
      @click="navigateToHospital"
      style="cursor: pointer;"
      title="选择医院"
    />
    <img
      class="sidebar-icon mt-md"
      :class="{ 'active': isProfileActive }"
      :src="icons.profile"
      @click="navigateToProfile"
      style="cursor: pointer;"
      title="个人主页"
    />
    <img
      class="sidebar-icon mt-xl"
      :src="icons.settings"
      @click="showSettingsSaved"
      style="cursor: pointer;"
      title="设置"
    />
    
    <!-- 设置保存提示弹窗 -->
    <div v-if="showSettingsDialog" class="settings-dialog">
      <div class="settings-dialog-content">
        <div class="success-icon">✓</div>
        <div class="success-text">设置已保存</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const props = defineProps({
  icons: {
    type: Object,
    default: () => ({
      home: '/4cc0b44883df90d8799c16e182ae1348.png',
      hospital: '/d50111c947c3e4e22f61ba56e2a07d2d.png',
      profile: '/16c621b9ca6c7b6992be19a88ebbb482.png',
      settings: '/c4e478531ee76689a7b3fae7643a7faa.png'
    })
  }
});

const router = useRouter();
const route = useRoute();
const showSettingsDialog = ref(false);

// 判断当前路由是否激活对应按钮
const isHomeActive = computed(() => {
  return route.path.includes('yonghuduanyuyuechaosheng_shouye');
});

const isHospitalActive = computed(() => {
  return route.path.includes('yonghuduanyuyuecnzeyiyuanjiemian') || route.path.includes('yonghuduanyuyuecanzeyishijiemian');
});

const isProfileActive = computed(() => {
  return route.path.includes('yonghuduangerenzhuye') || route.path.includes('yonghuduanjiankangdangan');
});

const navigateToHome = () => {
  router.push('/yonghuduanyuyuechaosheng_shouye');
};

const navigateToHospital = () => {
  router.push('/yonghuduanyuyuecnzeyiyuanjiemian');
};

const navigateToProfile = () => {
  router.push('/yonghuduangerenzhuye');
};

const showSettingsSaved = () => {
  showSettingsDialog.value = true;
  // 2秒后自动关闭
  setTimeout(() => {
    showSettingsDialog.value = false;
  }, 2000);
};
</script>

<style scoped>
.sidebar-section {
  padding: 6.25rem 0 2.19rem;
  background-color: #568d8b;
  position: absolute;
  left: 0;
  top: 0;
  min-height: 100%;
  width: 5.31rem;
}

.sidebar-icon {
  opacity: 0.8;
  filter: drop-shadow(0rem 0.13rem 0.13rem #00000040);
  transition: all 0.3s ease;
}

.sidebar-icon.active {
  opacity: 1;
  filter: drop-shadow(0rem 0.2rem 0.4rem #00baad) brightness(1.3);
  transform: scale(1.1);
}

.sidebar-icon:first-child {
  width: 5.31rem;
  height: 5.31rem;
}

.mt-lg {
  margin-top: 1.75rem;
  width: 2.75rem;
  height: 1.81rem;
}

.mt-md {
  margin-top: 3.13rem;
  width: 2.5rem;
  height: 2.63rem;
}

.mt-xl {
  margin-top: 24.44rem;
  width: 2.5rem;
  height: 2.5rem;
}

/* 设置保存提示弹窗 */
.settings-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
}

.settings-dialog-content {
  background: white;
  padding: 2rem 3rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.success-icon {
  width: 3rem;
  height: 3rem;
  background: #00baad;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
}

.success-text {
  font-size: 1.2rem;
  color: #333;
  font-weight: 600;
}
</style>

