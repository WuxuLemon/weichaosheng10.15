<script setup>
  import { useRouter } from 'vue-router';
  import { reactive, ref } from 'vue';
  import DoctorHeader from '../../components/DoctorHeader.vue';
  import DoctorSidebar from '../../components/DoctorSidebar.vue';
  import { getMediaUrl } from '../../utils/media.js';

  const props = defineProps({});

  const router = useRouter();

  // 当前播放的视频
  const currentVideo = ref('黄仁丰_250816015.mp4.mp4');
  const videoPath = ref(getMediaUrl('/video/黄仁丰_250816015.mp4.mp4'));
  const isPlaying = ref(false);
  const isAnalyzing = ref(false);

  // 视频列表（对接video文件夹真实视频）
  const videoList = ref([
    { name: '黄仁丰_250816015.mp4.mp4', id: '250619162' },
    { name: '郑廷洲_250705123.mp4.mp4', id: '250705047' },
    { name: '马万华_250605108.mp4.mp4', id: '250605040' },
    { name: '范泽莉_250531242.mp4.mp4', id: '240916100' },
    { name: '黄益鹏_250527033.mp4.mp4', id: '240910084' }
  ]);

  // 播放视频
  const playVideo = (video) => {
    currentVideo.value = video.name;
    videoPath.value = getMediaUrl(`/video/${video.name}`);
    isPlaying.value = true;
    // 重新加载视频
    const videoElement = document.querySelector('.video-player');
    if (videoElement) {
      videoElement.load();
      videoElement.play().catch(err => console.log('播放失败:', err));
    }
  };

  // AI诊断
  const startAIAnalysis = () => {
    isAnalyzing.value = true;
    // 模拟AI分析，3秒后跳转到分析结果页面
    setTimeout(() => {
      isAnalyzing.value = false;
      aiDiagnosisCompleted.value = true;  // 标记AI诊断已完成
      router.push('/yishiduanzhinengnxi_fenxijiemian');
    }, 3000);
  };

  // AI诊断完成标志
  const aiDiagnosisCompleted = ref(false);
  
  // 当前视频索引
  const currentVideoIndex = ref(0);
  
  // 视频元素引用
  const videoRef = ref(null);

  // 生成报告
  const generateReport = () => {
    if (!aiDiagnosisCompleted.value) {
      alert('请先完成"AI诊断"');
      return;
    }
    router.push('/yishiduan_jianchabaogaodan');
  };

  // 播放/暂停视频
  const togglePlayPause = () => {
    const video = document.querySelector('.video-player');
    if (video) {
      if (video.paused) {
        video.play();
        isPlaying.value = true;
      } else {
        video.pause();
        isPlaying.value = false;
      }
    }
  };

  // 上一个视频
  const prevVideo = () => {
    currentVideoIndex.value = (currentVideoIndex.value - 1 + videoList.value.length) % videoList.value.length;
    const prevVid = videoList.value[currentVideoIndex.value];
    currentVideo.value = prevVid.name;
    videoPath.value = getMediaUrl(`/video/${prevVid.name}`);
    const video = document.querySelector('.video-player');
    if (video) {
      video.load();
      video.play().catch(err => console.log('播放失败:', err));
      isPlaying.value = true;
    }
  };

  // 下一个视频
  const nextVideo = () => {
    currentVideoIndex.value = (currentVideoIndex.value + 1) % videoList.value.length;
    const nextVid = videoList.value[currentVideoIndex.value];
    currentVideo.value = nextVid.name;
    videoPath.value = getMediaUrl(`/video/${nextVid.name}`);
    // 更新视频源并播放
    const video = document.querySelector('.video-player');
    if (video) {
      video.load();
      video.play().catch(err => console.log('播放失败:', err));
      isPlaying.value = true;
    }
  };

  // 跳转到影像管理界面（有数据）
  const goToImageManagement = () => {
    router.push('/yishiduanyingxiagguanli_youshuju');
  };
</script>

<template>
  <div class="flex-col justify-start relative page">
    <div class="flex-col justify-start relative group">
      <DoctorHeader 
        username="郑医生"
        dropdown-icon="/cd4720f5298445e1cdf13547ce10d398.png"
      />
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
    <span class="text_3 pos_4">胃部超声影像原始视频播放界面</span>
    <div class="flex-col section_4 pos_5">
      <div class="flex-row">
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
            <div v-if="isAnalyzing" class="analyzing-overlay">
              <div class="analyzing-text">AI智能分析中...</div>
              <div class="spinner"></div>
            </div>
          </div>
        </div>
        <div class="ml-26 flex-col shrink-0 self-start group_2">
          <div class="flex-row group_3">
            <div class="relative section_5 ai-diagnosis-btn" @click="startAIAnalysis" style="cursor: pointer;" title="AI诊断">
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
            <div class="video-list-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="list-icon">
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
              </svg>
              <span class="self-start font text_5">视频列表</span>
            </div>
            <div class="mt-4 flex-col self-stretch modern-video-list">
              <div 
                v-for="(video, index) in videoList" 
                :key="video.id"
                class="modern-video-item"
                @click="playVideo(video)"
                :class="{ 'active-video': currentVideo === video.name }"
              >
                <div class="video-item-content">
                  <div class="video-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <div class="video-item-info">
                    <span class="video-item-name">{{ video.name }}</span>
                    <span class="video-item-id">ID: {{ video.id }}</span>
                  </div>
                </div>
                <div class="video-item-indicator"></div>
              </div>
            </div>
          </div>
          
          <!-- 全新的视频控制按钮区域 -->
          <div class="modern-video-controls mt-17">
            <div class="video-info-bar">
              <span class="video-title">{{ currentVideo }}</span>
            </div>
            <div class="control-buttons-group">
              <button class="control-btn prev-btn" @click="prevVideo" title="上一个视频">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </button>
              
              <button class="control-btn play-pause-btn" @click="togglePlayPause" :title="isPlaying ? '暂停' : '播放'">
                <svg v-if="!isPlaying" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <svg v-else width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              </button>
              
              <button class="control-btn next-btn" @click="nextVideo" title="下一个视频">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </button>
              
              <button class="control-btn ai-btn" @click="startAIAnalysis" :disabled="isAnalyzing">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
                </svg>
                <span>{{ isAnalyzing ? 'AI分析中' : 'AI诊断' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
  .mt-17 {
    margin-top: 1.06rem;
  }
  .ml-29 {
    margin-left: 1.81rem;
  }
  .mt-21 {
    margin-top: 1.31rem;
  }
  .ml-77 {
    margin-left: 4.81rem;
  }
  .page {
    background-color: #e5e5e559;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
  }
  .group {
    min-height: 100vh; /* 最小高度为视口高度，确保铺满屏幕 */
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
    padding: 1.69rem 2.13rem 1.38rem;
    background-color: #ffffff;
    border-radius: 0.63rem;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
  }
  .pos_5 {
    position: absolute;
    left: calc(5.31rem + 1.5rem); /* 侧边栏宽度 + 间距 */
    right: 1.5rem;
    top: 8.94rem;
  }

  /* 响应式布局 - 平板 */
  @media (max-width: 1024px) {
    .pos_5 {
      left: calc(4.5rem + 1rem);
      right: 1rem;
    }
  }

  /* 响应式布局 - 手机 */
  @media (max-width: 768px) {
    .pos_5 {
      left: calc(4rem + 0.75rem);
      right: 0.75rem;
      top: 7.5rem;
    }

    .video-section {
      flex-direction: column;
    }

    .video-player {
      width: 100%;
    }

    .video-list {
      width: 100%;
      margin-top: 1rem;
    }
  }
  .group_4 {
    margin-top: 0.13rem;
  }
  .group_5 {
    border-radius: 0.44rem;
    height: 45rem;
    border-left: solid 0.19rem #383838;
    border-right: solid 0.19rem #383838;
    border-top: solid 0.19rem #383838;
    border-bottom: solid 0.19rem #383838;
  }
  .group_8 {
    padding: 0.25rem 0;
  }
  .section_8 {
    background-color: #ffffff;
    border-radius: 0.31rem;
    width: 44rem;
    border-left: solid 0.13rem #000000;
    border-right: solid 0.13rem #000000;
    border-top: solid 0.13rem #000000;
    border-bottom: solid 0.13rem #000000;
  }
  .section_9 {
    background-color: #35bdb4;
    border-radius: 0.31rem;
    width: 1.07rem;
    height: 0.23rem;
  }
  .section_7 {
    background-color: #00baad;
    border-radius: 50%;
    height: 0.83rem;
    border-left: solid 0.13rem #000000;
    border-right: solid 0.13rem #000000;
    border-top: solid 0.13rem #000000;
    border-bottom: solid 0.13rem #000000;
  }
  .pos_11 {
    position: absolute;
    left: 0.26rem;
    right: 42.84rem;
    top: 0;
  }
  .group_2 {
    width: 31.63rem;
  }
  .group_3 {
    padding-bottom: 1.5rem;
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
    padding: 1.25rem;
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    border-radius: 0.75rem;
    box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.08);
    border: 0.063rem solid rgba(75, 189, 181, 0.2);
  }

  /* 视频列表头部 */
  .video-list-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    padding-bottom: 0.75rem;
    border-bottom: 0.125rem solid rgba(75, 189, 181, 0.2);
  }

  .list-icon {
    color: #4bbdb5;
  }

  /* 现代化视频列表 */
  .modern-video-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .modern-video-item {
    position: relative;
    background: white;
    border-radius: 0.5rem;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 0.125rem solid #e0e0e0;
    overflow: hidden;
  }

  .modern-video-item:hover {
    transform: translateX(0.25rem);
    box-shadow: 0 0.25rem 0.75rem rgba(75, 189, 181, 0.2);
    border-color: #4bbdb5;
  }

  .modern-video-item.active-video {
    background: linear-gradient(135deg, #e0f7f5 0%, #f0fcfb 100%);
    border-color: #4bbdb5;
    box-shadow: 0 0.25rem 0.75rem rgba(75, 189, 181, 0.25);
  }

  .video-item-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .video-icon {
    width: 2.5rem;
    height: 2.5rem;
    background: linear-gradient(135deg, #4bbdb5 0%, #3a9d96 100%);
    border-radius: 0.375rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
    box-shadow: 0 0.125rem 0.375rem rgba(75, 189, 181, 0.3);
  }

  .modern-video-item.active-video .video-icon {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  .video-item-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;
    min-width: 0;
  }

  .video-item-name {
    font-size: 0.95rem;
    font-family: SourceHanSansCN;
    font-weight: 500;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .modern-video-item.active-video .video-item-name {
    color: #00baad;
    font-weight: 600;
  }

  .video-item-id {
    font-size: 0.75rem;
    font-family: SourceHanSansCN;
    color: #999;
  }

  .video-item-indicator {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 0.25rem;
    background: #4bbdb5;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .modern-video-item.active-video .video-item-indicator {
    opacity: 1;
  }
  .font {
    font-size: 1.25rem;
    font-family: SourceHanSansCN;
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
    height: 4.69rem;
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
    top: 1.79rem;
  }
  .pos_7 {
    position: absolute;
    left: 2.35rem;
    top: 1.93rem;
  }
  .pos_8 {
    position: absolute;
    left: 2.37rem;
    top: 1.79rem;
  }
  .pos_9 {
    position: absolute;
    left: 2.37rem;
    top: 1.73rem;
  }
  .pos_10 {
    position: absolute;
    left: 2.37rem;
    top: 1.8rem;
  }
  .group_9 {
    padding: 0 0.5rem;
  }
  .text_7 {
    margin-top: 0.5rem;
    line-height: 1.5rem;
  }
  .image_7 {
    border-radius: 50%;
    width: 2.99rem;
    height: 2.73rem;
  }
  .image_8 {
    width: 1.8rem;
    height: 2.73rem;
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

  /* 现代化视频控制区域 */
  .modern-video-controls {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
    border-radius: 1rem;
    box-shadow: 0 0.25rem 1.5rem rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 186, 173, 0.15);
  }

  .video-info-bar {
    display: flex;
    align-items: center;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid rgba(0, 186, 173, 0.1);
  }

  .video-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #333;
    flex: 1;
  }

  .control-buttons-group {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
  }

  .control-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0;
    border: none;
    background: linear-gradient(135deg, #00baad 0%, #00a89c 100%);
    color: white;
    border-radius: 50%;
    width: 3.5rem;
    height: 3.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 0.25rem 0.75rem rgba(0, 186, 173, 0.3);
    position: relative;
    overflow: hidden;
  }

  .control-btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s;
  }

  .control-btn:hover::before {
    width: 100%;
    height: 100%;
  }

  .control-btn:hover {
    transform: translateY(-0.25rem) scale(1.05);
    box-shadow: 0 0.5rem 1.5rem rgba(0, 186, 173, 0.4);
  }

  .control-btn:active {
    transform: translateY(-0.125rem) scale(1);
  }

  .control-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
    opacity: 0.6;
    box-shadow: none;
  }

  .control-btn:disabled:hover {
    transform: none;
  }

  .play-pause-btn {
    width: 4.5rem;
    height: 4.5rem;
    background: linear-gradient(135deg, #00baad 0%, #00a89c 100%);
    box-shadow: 0 0.5rem 1.5rem rgba(0, 186, 173, 0.4);
  }

  .play-pause-btn:hover {
    background: linear-gradient(135deg, #00a89c 0%, #009688 100%);
    transform: translateY(-0.375rem) scale(1.08);
    box-shadow: 0 0.75rem 2rem rgba(0, 186, 173, 0.5);
  }

  .prev-btn,
  .next-btn {
    width: 3rem;
    height: 3rem;
    background: linear-gradient(135deg, #4bbdb5 0%, #3a9d96 100%);
  }

  .prev-btn:hover,
  .next-btn:hover {
    background: linear-gradient(135deg, #3a9d96 0%, #2d7d78 100%);
  }

  .ai-btn {
    width: auto;
    padding: 0 1.5rem;
    border-radius: 2rem;
    background: linear-gradient(135deg, #6b5ce7 0%, #5a4bd4 100%);
    height: 3.5rem;
    gap: 0.75rem;
  }

  .ai-btn:hover {
    background: linear-gradient(135deg, #5a4bd4 0%, #4a3bc4 100%);
  }

  .ai-btn span {
    font-weight: 600;
    font-size: 1rem;
  }

  /* AI分析中遮罩层 */
  .analyzing-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }

  .analyzing-text {
    color: #00baad;
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  /* 加载动画 */
  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #00baad;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* AI按钮样式 */
  .ai-button {
    transition: all 0.3s;
  }

  .ai-button:hover {
    transform: scale(1.05);
    box-shadow: 0 0.25rem 0.5rem rgba(0, 186, 173, 0.3);
  }

  .button-text {
    color: #fff;
    font-size: 1.2rem;
    font-weight: 600;
  }

  /* AI诊断按钮样式 */
  .ai-diagnosis-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
  }

  .ai-diagnosis-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 0.25rem 0.5rem rgba(0, 186, 173, 0.3);
  }

  .ai-diagnosis-text {
    color: #ffffff;
    font-size: 1.5rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
    line-height: 1.44rem;
    text-align: center;
  }

  /* 视频列表项样式 */
  .video-item {
    transition: background-color 0.2s;
    padding: 0.5rem;
    border-radius: 0.3rem;
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
</style>