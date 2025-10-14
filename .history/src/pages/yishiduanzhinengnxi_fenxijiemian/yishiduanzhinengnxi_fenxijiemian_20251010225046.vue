<script setup>
  import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router';
  import { reactive, ref, onMounted, computed, onUnmounted } from 'vue';
  import DoctorHeader from '../../components/DoctorHeader.vue';
  import DoctorSidebar from '../../components/DoctorSidebar.vue';

  const props = defineProps({});

  const router = useRouter();
  const route = useRoute();

  // 当前视频信息
  const currentVideo = ref({
    name: '黄仁丰_250816015.mp4',
    id: '250619162'
  });
  
  const videoPath = ref('/video/ceshi.mp4');
  const isPlaying = ref(false);

  // 视频列表（只显示前2个）
  const videoList = ref([
    { name: '黄仁丰_250816015.mp4', id: '250619162' },
    { name: '郑廷洲_250705123.mp4', id: '250705047' }
  ]);

  // 基础信息数据（使用value和unit分离的结构）
  const patientInfo = reactive({
    heartRate: { value: '', unit: '次/分钟' },
    breathRate: { value: '', unit: '次/分钟' },
    heartRhythm: { value: '', unit: '次/分钟' },
    pulseIndex: { value: '', unit: '' },
    systolicPressure: { value: '', unit: 'mmHg' },
    stomachMotion: { value: '', unit: '' },
    radarDistance: { value: '', unit: 'cm' },
    distalPeristalsis: { value: '', unit: '' },
    breathSupport: { value: '', unit: '' },
    meanArterialPressure: { value: '', unit: 'mmHg' },
    ultrasoundInfo: { value: '', unit: '' },
    drugTreatment: { value: '', unit: '' }
  });

  // 原始数据备份（用于检测是否修改）
  const originalInfo = ref(null);

  // 数据是否被修改
  const isDataModified = ref(false);

  // 保存对话框
  const showSaveDialog = ref(false);
  const saveMessage = ref('');

  // 生成模拟数据（基于视频名称生成不同的数据）
  const generateMockData = (videoName) => {
    const seed = videoName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const random = (min, max, index = 0) => {
      const x = Math.sin(seed + index) * 10000;
      return Math.floor(min + (x - Math.floor(x)) * (max - min));
    };

    return {
      heartRate: { value: random(60, 100, 1).toString(), unit: '次/分钟' },
      breathRate: { value: random(12, 20, 2).toString(), unit: '次/分钟' },
      heartRhythm: { value: random(60, 100, 3).toString(), unit: '次/分钟' },
      pulseIndex: { value: (random(8, 16, 4) / 10).toFixed(1), unit: '' },
      systolicPressure: { value: random(90, 130, 5).toString(), unit: 'mmHg' },
      stomachMotion: { value: ['正常', '活跃', '减弱'][random(0, 3, 6)], unit: '' },
      radarDistance: { value: random(5, 15, 7).toString(), unit: 'cm' },
      distalPeristalsis: { value: ['正常', '增强', '减弱'][random(0, 3, 8)], unit: '' },
      breathSupport: { value: ['无', '鼻导管', '面罩'][random(0, 3, 9)], unit: '' },
      meanArterialPressure: { value: random(70, 100, 10).toString(), unit: 'mmHg' },
      ultrasoundInfo: { value: ['清晰', '模糊', '正常'][random(0, 3, 11)], unit: '' },
      drugTreatment: { value: ['无', '常规', '特殊'][random(0, 3, 12)], unit: '' }
    };
  };

  // 加载模拟数据
  const loadMockData = () => {
    const mockData = generateMockData(currentVideo.value.name);
    Object.assign(patientInfo, mockData);
    originalInfo.value = JSON.parse(JSON.stringify(patientInfo));
    isDataModified.value = false;
  };

  // 检查数据是否被修改
  const checkDataModified = () => {
    if (!originalInfo.value) return;
    isDataModified.value = JSON.stringify(patientInfo) !== JSON.stringify(originalInfo.value);
  };

  // 播放视频
  const playVideo = (video) => {
    currentVideo.value = video;
    isPlaying.value = true;
    const videoElement = document.querySelector('.video-player');
    if (videoElement) {
      videoElement.play().catch(err => console.log('播放失败:', err));
    }
    // 播放后加载模拟数据
    loadMockData();
  };

  // 播放/暂停
  const togglePlayPause = () => {
    const video = document.querySelector('.video-player');
    if (video) {
      if (video.paused) {
        video.play().catch(err => console.log('播放失败:', err));
        isPlaying.value = true;
      } else {
        video.pause();
        isPlaying.value = false;
      }
    }
  };

  // 保存数据
  const saveData = () => {
    originalInfo.value = JSON.parse(JSON.stringify(patientInfo));
    isDataModified.value = false;
    saveMessage.value = '基础信息已保存成功！';
    showSaveDialog.value = true;
    setTimeout(() => {
      showSaveDialog.value = false;
    }, 2000);
  };

  // 检查未保存的更改
  const checkUnsavedChanges = () => {
    if (isDataModified.value) {
      return window.confirm('当前有未保存的修改，离开将丢失修改内容。是否继续？');
    }
    return true;
  };

  // 显示AI诊断完成提示
  const showAIDiagnosisComplete = () => {
    if (checkUnsavedChanges()) {
      alert('AI诊断已完成！');
    }
  };

  // 跳转到影像管理（有数据）
  const goToImageManagement = () => {
    if (checkUnsavedChanges()) {
      router.push('/yishiduanyingxiagguanli_youshuju');
    }
  };

  // 生成报告（跳转到报告页面）
  const generateReport = () => {
    if (checkUnsavedChanges()) {
      router.push('/yishiduan_jianchabaogaodan');
    }
  };

  // 路由离开守卫
  onBeforeRouteLeave((to, from) => {
    if (isDataModified.value) {
      const answer = window.confirm('当前有未保存的修改，离开将丢失修改内容。是否继续？');
      if (!answer) return false;
    }
  });

  // 浏览器关闭/刷新提示
  const handleBeforeUnload = (e) => {
    if (isDataModified.value) {
      e.preventDefault();
      e.returnValue = '';
      return '';
    }
  };

  // 页面加载时
  onMounted(() => {
    const patientId = route.query.patientId;
    if (patientId) {
      console.log('患者ID:', patientId);
    }
    // 初始加载数据
    loadMockData();
    // 添加浏览器关闭提示
    window.addEventListener('beforeunload', handleBeforeUnload);
  });

  // 页面卸载时
  onUnmounted(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  });
</script>

<template>
  <div class="flex-col justify-start relative page">
    <div class="flex-col justify-start relative group">
      <DoctorHeader username="郑医生" dropdown-icon="/ca61eb381c206ab86b5b6d77d6df31e4.png" />
      <DoctorSidebar 
        :icons="{
          imageManagement: '/4cc0b44883df90d8799c16e182ae1348.png',
          aiAnalysis: '/20af53ec6a814e7dad50b4004715362a.png',
          dataLibrary: '/87af3249c4b9bb3b8b4791d30f1fbecc.png',
          settings: '/237e454c307d63e1596a7fe0e2eb4a59.png'
        }"
      />
      <img
        class="image pos_2"
        src="/404328c3067e67794ebad8ca57c1c196.png"
      />
      <span class="text pos_3">智能分析界面</span>
    </div>
    <span class="text_3 pos_4">胃部超声影像分析图像播放界面</span>
    <div class="flex-col section_4 pos_5">
      <div class="flex-row self-stretch">
        <div class="flex-col flex-1 group_4">
          <!-- 视频播放区域 -->
          <div class="group_5 video-container">
            <video 
              v-if="videoPath" 
              :src="videoPath" 
              controls 
              class="video-player"
              @play="isPlaying = true"
              @pause="isPlaying = false"
            >
              您的浏览器不支持视频播放
            </video>
          </div>
          <div class="flex-col justify-start relative group_9">
            <div class="flex-col justify-start items-start section_8"><div class="shrink-0 section_9"></div></div>
            <div class="section_7 pos_8"></div>
          </div>
        </div>
        <div class="ml-30 flex-col shrink-0 group_2">
          <div class="flex-row group_3">
            <div class="relative section_5 ai-diagnosis-btn" @click="showAIDiagnosisComplete" style="cursor: pointer;" title="AI诊断">
              <span class="ai-diagnosis-text">AI诊断</span>
            </div>
            <div class="flex-col justify-start items-center relative text-wrapper ml-29" @click="generateReport" style="cursor: pointer;">
              <span class="text_4">报告生成</span>
            </div>
            <div class="relative section_5 ml-29 ai-diagnosis-btn" @click="goToImageManagement" style="cursor: pointer;" title="影像管理">
              <span class="ai-diagnosis-text">影像管理</span>
            </div>
          </div>
          <div class="flex-col section_6">
            <span class="self-start font text_5">视频列表</span>
            <div class="mt-2 flex-col self-stretch group_6">
              <div 
                v-for="(video, index) in videoList" 
                :key="video.id"
                class="flex-col justify-start relative video-item"
                @click="playVideo(video)"
                :class="{ 'active-video': currentVideo.id === video.id }"
                style="cursor: pointer;"
              >
                <div class="group_7"></div>
                <span class="font_2 text_6" :class="index === 0 ? 'pos_6' : 'pos_7'">{{ video.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-row justify-between items-center self-start group_10">
        <span class="font_2 text_7">视频：{{ currentVideo.name }}</span>
        <div class="flex-row items-center">
          <img
            class="image_7"
            src="/01778863df35a8be10913e01f606f088.png"
            @click="togglePlayPause"
            style="cursor: pointer;"
            :title="isPlaying ? '暂停' : '播放'"
          />
          <img
            class="image_8 ml-23"
            src="/e3375a2afdf2d4d74200ee62c8eada0b.png"
            title="音量控制"
          />
        </div>
      </div>
      <!-- 基础信息部分 - 重新设计 -->
      <div class="basic-info-section">
        <div class="info-header">
          <span class="info-title">基础信息</span>
          <button 
            class="save-btn" 
            @click="saveData"
            :disabled="!isDataModified"
            :class="{ 'disabled': !isDataModified }"
          >
            保存
          </button>
        </div>
        
        <div class="info-grid">
          <!-- 心率 -->
          <div class="info-card">
            <div class="info-label">心率</div>
            <div class="input-with-unit">
              <input 
                v-model="patientInfo.heartRate.value" 
                @input="checkDataModified"
                class="info-input-field" 
                placeholder="75"
              />
              <span class="unit-text">{{ patientInfo.heartRate.unit }}</span>
            </div>
          </div>

          <!-- 呼吸频率 -->
          <div class="info-card">
            <div class="info-label">呼吸频率</div>
            <div class="input-with-unit">
              <input 
                v-model="patientInfo.breathRate.value" 
                @input="checkDataModified"
                class="info-input-field" 
                placeholder="16"
              />
              <span class="unit-text">{{ patientInfo.breathRate.unit }}</span>
            </div>
          </div>

          <!-- 心节律 -->
          <div class="info-card">
            <div class="info-label">心节律</div>
            <div class="input-with-unit">
              <input 
                v-model="patientInfo.heartRhythm.value" 
                @input="checkDataModified"
                class="info-input-field" 
                placeholder="75"
              />
              <span class="unit-text">{{ patientInfo.heartRhythm.unit }}</span>
            </div>
          </div>

          <!-- 搏动指数 -->
          <div class="info-card">
            <div class="info-label">搏动指数</div>
            <div class="input-with-unit">
              <input 
                v-model="patientInfo.pulseIndex.value" 
                @input="checkDataModified"
                class="info-input-field" 
                placeholder="1.2"
              />
              <span class="unit-text">{{ patientInfo.pulseIndex.unit }}</span>
            </div>
          </div>

          <!-- 收缩压 -->
          <div class="info-card">
            <div class="info-label">收缩压</div>
            <div class="input-with-unit">
              <input 
                v-model="patientInfo.systolicPressure.value" 
                @input="checkDataModified"
                class="info-input-field" 
                placeholder="120"
              />
              <span class="unit-text">{{ patientInfo.systolicPressure.unit }}</span>
            </div>
          </div>

          <!-- 胃蠕动观察 -->
          <div class="info-card">
            <div class="info-label">胃蠕动观察</div>
            <div class="input-with-unit">
              <input 
                v-model="patientInfo.stomachMotion.value" 
                @input="checkDataModified"
                class="info-input-field" 
                placeholder="正常"
              />
              <span class="unit-text">{{ patientInfo.stomachMotion.unit }}</span>
            </div>
          </div>

          <!-- 雷达测距 -->
          <div class="info-card">
            <div class="info-label">雷达测距</div>
            <div class="input-with-unit">
              <input 
                v-model="patientInfo.radarDistance.value" 
                @input="checkDataModified"
                class="info-input-field" 
                placeholder="10"
              />
              <span class="unit-text">{{ patientInfo.radarDistance.unit }}</span>
            </div>
          </div>

          <!-- 远端肠蠕动 -->
          <div class="info-card">
            <div class="info-label">远端肠蠕动</div>
            <div class="input-with-unit">
              <input 
                v-model="patientInfo.distalPeristalsis.value" 
                @input="checkDataModified"
                class="info-input-field" 
                placeholder="正常"
              />
              <span class="unit-text">{{ patientInfo.distalPeristalsis.unit }}</span>
            </div>
          </div>

          <!-- 呼吸支持 -->
          <div class="info-card">
            <div class="info-label">呼吸支持</div>
            <div class="input-with-unit">
              <input 
                v-model="patientInfo.breathSupport.value" 
                @input="checkDataModified"
                class="info-input-field" 
                placeholder="无"
              />
              <span class="unit-text">{{ patientInfo.breathSupport.unit }}</span>
            </div>
          </div>

          <!-- 平均动脉压 -->
          <div class="info-card">
            <div class="info-label">平均动脉压</div>
            <div class="input-with-unit">
              <input 
                v-model="patientInfo.meanArterialPressure.value" 
                @input="checkDataModified"
                class="info-input-field" 
                placeholder="90"
              />
              <span class="unit-text">{{ patientInfo.meanArterialPressure.unit }}</span>
            </div>
          </div>

          <!-- 超声波信息 -->
          <div class="info-card">
            <div class="info-label">超声波信息</div>
            <div class="input-with-unit">
              <input 
                v-model="patientInfo.ultrasoundInfo.value" 
                @input="checkDataModified"
                class="info-input-field" 
                placeholder="清晰"
              />
              <span class="unit-text">{{ patientInfo.ultrasoundInfo.unit }}</span>
            </div>
          </div>

          <!-- 药物治疗 -->
          <div class="info-card">
            <div class="info-label">药物治疗</div>
            <div class="input-with-unit">
              <input 
                v-model="patientInfo.drugTreatment.value" 
                @input="checkDataModified"
                class="info-input-field" 
                placeholder="无"
              />
              <span class="unit-text">{{ patientInfo.drugTreatment.unit }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 保存成功对话框 -->
      <div v-if="showSaveDialog" class="save-dialog-overlay">
        <div class="save-dialog-box">
          <div class="success-icon">✓</div>
          <div class="success-text">{{ saveMessage }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
  .ml-29 {
    margin-left: 1.81rem;
  }
  .ml-23 {
    margin-left: 1.44rem;
  }
  .ml-30 {
    margin-left: 1.88rem;
  }
  .mt-23 {
    margin-top: 1.44rem;
  }
  .mt-19 {
    margin-top: 1.19rem;
  }
  .mt-17 {
    margin-top: 1.06rem;
  }
  .page {
    background-color: #e5e5e559;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
  }
  .group {
    padding-bottom: 44.94rem;
  }
  .section {
    padding: 1.44rem 1.5rem 1.13rem;
    background-color: #ffffff;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
  }
  .image_2 {
    width: 1.88rem;
    height: 2.13rem;
  }
  .section_3 {
    padding: 0.5rem 0.75rem;
    filter: drop-shadow(0rem 0.13rem 0.13rem #00000040);
    background-color: #ffffff;
    border-radius: 0.31rem;
    height: 2.5rem;
    border-left: solid 0.063rem #000000;
    border-right: solid 0.063rem #000000;
    border-top: solid 0.063rem #000000;
    border-bottom: solid 0.063rem #000000;
  }
  .text_2 {
    color: #000000;
    font-size: 1.5rem;
    font-family: SourceHanSansCN;
    line-height: 1.38rem;
  }
  .image_3 {
    margin-right: 0.13rem;
    width: 1.13rem;
    height: 1.06rem;
  }
  .section_2 {
    padding: 6.25rem 0 2.19rem;
    background-color: #568d8b;
  }
  .pos {
    position: absolute;
    left: 0;
    top: 0;
  }
  .image_4 {
    opacity: 0.8;
    filter: drop-shadow(0rem 0.13rem 0.13rem #00000040);
    width: 5.31rem;
    height: 5.31rem;
  }
  .image_5 {
    margin-top: 1.75rem;
    width: 2.75rem;
    height: 1.81rem;
  }
  .image_6 {
    margin-top: 3.13rem;
    width: 2.5rem;
    height: 2.63rem;
  }
  .image_9 {
    margin-top: 24.44rem;
    width: 2.5rem;
    height: 2.5rem;
  }
  .image {
    filter: drop-shadow(0rem 0.25rem 0.19rem #00000040);
    width: 11rem;
    height: 11rem;
  }
  .pos_2 {
    position: absolute;
    left: -2.5rem;
    top: -2.5rem;
  }
  .text {
    color: #000000;
    font-size: 1.88rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
    line-height: 1.78rem;
  }
  .pos_3 {
    position: absolute;
    left: 6.87rem;
    top: 1.88rem;
  }
  .text_3 {
    color: #000000;
    font-size: 1.38rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
    line-height: 1.31rem;
  }
  .pos_4 {
    position: absolute;
    left: 6.97rem;
    top: 6.67rem;
  }
  .section_4 {
    padding: 1.69rem 1.75rem 2.88rem;
    background-color: #ffffff;
    border-radius: 0.63rem;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
    width: 81.69rem;
  }
  .pos_5 {
    position: absolute;
    right: 1.5rem;
    top: 8.94rem;
  }
  .group_4 {
    margin-top: 0.25rem;
  }
  .group_5 {
    border-radius: 0.44rem;
    height: 13.04rem;
    border-left: solid 0.19rem #383838;
    border-right: solid 0.19rem #383838;
    border-top: solid 0.19rem #383838;
    border-bottom: solid 0.19rem #383838;
  }

  /* 视频播放器样式 */
  .video-container {
    position: relative;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .video-player {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .group_9 {
    padding: 1.38rem 0 0.25rem;
  }
  .section_8 {
    margin-left: 0.13rem;
    background-color: #ffffff;
    border-radius: 0.31rem;
    width: 43.88rem;
    border-left: solid 0.13rem #000000;
    border-right: solid 0.13rem #000000;
    border-top: solid 0.13rem #000000;
    border-bottom: solid 0.13rem #000000;
  }
  .section_9 {
    background-color: #35bdb4;
    border-radius: 0.31rem;
    width: 1.07rem;
    height: 0.28rem;
  }
  .section_7 {
    background-color: #00baad;
    border-radius: 50%;
    height: 0.99rem;
    border-left: solid 0.13rem #000000;
    border-right: solid 0.13rem #000000;
    border-top: solid 0.13rem #000000;
    border-bottom: solid 0.13rem #000000;
  }
  .pos_8 {
    position: absolute;
    left: 0.38rem;
    right: 42.69rem;
    top: 1.07rem;
  }
  .group_2 {
    margin-right: 0.5rem;
    width: 31.63rem;
  }
  .group_3 {
    padding-bottom: 1.56rem;
  }
  .section_5 {
    background-color: #4bbdb5;
    border-radius: 1.88rem;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
    width: 9.28rem;
    height: 3.63rem;
  }
  .text-wrapper {
    padding: 1.13rem 0 1rem;
    background-color: #4bbdb5;
    border-radius: 1.88rem;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
    width: 9.28rem;
    height: 3.63rem;
  }
  .text_4 {
    color: #ffffff;
    font-size: 1.5rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
    line-height: 1.44rem;
  }
  .section_6 {
    padding-top: 0.25rem;
    background-color: #ffffff;
    border-radius: 0.31rem;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
    border-left: solid 0.13rem #000000;
    border-right: solid 0.13rem #000000;
    border-top: solid 0.13rem #000000;
    border-bottom: solid 0.13rem #000000;
  }
  .font {
    font-size: 1.25rem;
    font-family: SourceHanSansCN;
    line-height: 1.16rem;
    color: #000000;
  }
  .text_5 {
    margin-left: 0.63rem;
    line-height: 1.16rem;
  }
  .group_6 {
    border-radius: 0rem 0rem 0.31rem 0.31rem;
    border-left: solid 0.13rem #000000;
    border-right: solid 0.13rem #000000;
    border-top: solid 0.13rem #000000;
    border-bottom: solid 0.13rem #000000;
  }
  .group_7 {
    opacity: 0.5;
    height: 4.01rem;
    border-left: solid 0.063rem #000000;
    border-right: solid 0.063rem #000000;
    border-top: solid 0.063rem #000000;
    border-bottom: solid 0.063rem #000000;
  }
  .font_2 {
    font-size: 1.13rem;
    font-family: SourceHanSansCN;
    line-height: 1.38rem;
    color: #000000;
  }
  .text_6 {
    width: 20rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .pos_6 {
    position: absolute;
    left: 2.37rem;
    top: 1.45rem;
  }
  .group_8 {
    height: 4.01rem;
  }
  .pos_7 {
    position: absolute;
    left: 2.35rem;
    bottom: 1.3rem;
  }

  /* 视频列表项样式 */
  .video-item {
    transition: background-color 0.2s;
    cursor: pointer;
  }

  .video-item:hover {
    background-color: rgba(0, 186, 173, 0.1);
  }

  .video-item.active-video {
    background-color: rgba(0, 186, 173, 0.2);
  }

  .video-item.active-video .font_2 {
    color: #00baad !important;
    font-weight: 700;
  }

  .group_10 {
    margin-left: 0.25rem;
    margin-top: 0.38rem;
    width: 27.8rem;
  }
  .text_7 {
    width: 14.88rem;
  }
  .image_7 {
    border-radius: 50%;
    width: 2.3rem;
    height: 2.43rem;
  }
  .image_8 {
    width: 0.81rem;
    height: 1.55rem;
  }
  /* AI诊断按钮文字样式 */
  .ai-diagnosis-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ai-diagnosis-text {
    color: #ffffff;
    font-size: 1.5rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
    line-height: 1.44rem;
  }

  /* 基础信息部分 - 新设计 */
  .basic-info-section {
    margin-top: 1.25rem;
    margin-right: 0.5rem;
    background-color: #ffffff;
    border-radius: 0.5rem;
    border: solid 0.13rem #00baad;
    box-shadow: 0rem 0.13rem 0.25rem rgba(0, 186, 173, 0.2);
    overflow: hidden;
  }

  .info-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1.25rem;
    background: linear-gradient(135deg, #4bbdb5 0%, #00baad 100%);
    border-bottom: solid 0.13rem #00baad;
  }

  .info-title {
    color: #ffffff;
    font-size: 1.38rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
    line-height: 1.3rem;
  }

  .save-btn {
    padding: 0.5rem 1.5rem;
    background-color: #ffffff;
    color: #00baad;
    border: none;
    border-radius: 1.25rem;
    font-size: 1.13rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 0.13rem 0.25rem rgba(0, 0, 0, 0.1);
  }

  .save-btn:hover:not(.disabled) {
    background-color: #f0f9f8;
    transform: scale(1.05);
    box-shadow: 0 0.25rem 0.5rem rgba(0, 186, 173, 0.3);
  }

  .save-btn.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: #f5f5f5;
    color: #999;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    padding: 1.25rem;
    background-color: #fafafa;
  }

  @media (max-width: 1200px) {
    .info-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 800px) {
    .info-grid {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .info-card {
    background-color: #ffffff;
    border-radius: 0.5rem;
    padding: 0.75rem;
    border: solid 0.063rem #e0e0e0;
    transition: all 0.3s;
    box-shadow: 0 0.063rem 0.19rem rgba(0, 0, 0, 0.05);
  }

  .info-card:hover {
    border-color: #4bbdb5;
    box-shadow: 0 0.19rem 0.5rem rgba(75, 189, 181, 0.15);
    transform: translateY(-0.125rem);
  }

  .info-label {
    font-size: 1rem;
    font-family: SourceHanSansCN;
    font-weight: 600;
    color: #666;
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }

  .input-with-unit {
    display: flex;
    align-items: center;
    background-color: #f8f8f8;
    border-radius: 0.31rem;
    border: solid 0.063rem #d0d0d0;
    padding: 0.5rem 0.75rem;
    transition: all 0.3s;
  }

  .input-with-unit:focus-within {
    background-color: #ffffff;
    border-color: #4bbdb5;
    box-shadow: 0 0 0 0.125rem rgba(75, 189, 181, 0.1);
  }

  .info-input-field {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 1.13rem;
    font-family: SourceHanSansCN;
    color: #333;
    min-width: 0;
  }

  .info-input-field::placeholder {
    color: #bbb;
  }

  .unit-text {
    margin-left: 0.5rem;
    font-size: 0.94rem;
    font-family: SourceHanSansCN;
    color: #888;
    white-space: nowrap;
    flex-shrink: 0;
  }

  /* 保存成功对话框 */
  .save-dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    animation: fadeIn 0.3s;
  }

  .save-dialog-box {
    background-color: #ffffff;
    border-radius: 0.75rem;
    padding: 2rem 3rem;
    box-shadow: 0 0.5rem 1.5rem rgba(0, 186, 173, 0.3);
    text-align: center;
    animation: slideDown 0.3s;
  }

  .success-icon {
    width: 3.5rem;
    height: 3.5rem;
    background-color: #00baad;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    font-size: 2.5rem;
    color: #ffffff;
    font-weight: 700;
  }

  .success-text {
    font-size: 1.25rem;
    font-family: SourceHanSansCN;
    color: #333;
    font-weight: 600;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideDown {
    from {
      transform: translateY(-2rem);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>