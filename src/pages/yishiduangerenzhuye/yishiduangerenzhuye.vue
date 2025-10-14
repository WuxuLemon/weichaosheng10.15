<script setup>
  import { useRouter } from 'vue-router';
  import { reactive, ref, onMounted } from 'vue';
  import DoctorHeader from '../../components/DoctorHeader.vue';
  import DoctorSidebar from '../../components/DoctorSidebar.vue';

  const props = defineProps({});

  const router = useRouter();

  // 最近浏览的数据（对接video文件夹视频）
  const recentViews = ref([
    { id: '250619162', name: '黄仁丰_250816015.mp4.mp4', date: '2025-9-27', videoPath: '/video/黄仁丰_250816015.mp4.mp4' },
    { id: '250705047', name: '郑廷洲_250705123.mp4.mp4', date: '2025-9-26', videoPath: '/video/郑廷洲_250705123.mp4.mp4' },
    { id: '250605040', name: '马万华_250605108.mp4.mp4', date: '2025-9-25', videoPath: '/video/马万华_250605108.mp4.mp4' },
    { id: '240916100', name: '范泽莉_250531242.mp4.mp4', date: '2025-9-24', videoPath: '/video/范泽莉_250531242.mp4.mp4' },
    { id: '240910084', name: '黄益鹏_250527033.mp4.mp4', date: '2025-9-23', videoPath: '/video/黄益鹏_250527033.mp4.mp4' }
  ]);

  // 我的收藏数据（对接analyse文件夹图片）
  const myFavorites = ref([
    { id: 'FAV001', name: '黄仁丰_250816015.mp4', date: '2025-9-27', image: '/analyse/黄仁丰_250816015.mp4.png' },
    { id: 'FAV002', name: '郑廷洲_250705123.mp4', date: '2025-9-26', image: '/analyse/郑廷洲_250705123.mp4.png' },
    { id: 'FAV003', name: '马万华_250605108.mp4', date: '2025-9-25', image: '/analyse/马万华_250605108.mp4.png' },
    { id: 'FAV004', name: '范泽莉_250531242.mp4', date: '2025-9-24', image: '/analyse/范泽莉_250531242.mp4.png' }
  ]);

  // 我的图像数据（对接original文件夹图片）
  const myImages = ref([
    { id: 'IMG001', name: '0044_weidi1_1165', date: '2025-9-27', image: '/original/0044_weidi1_1165.jpg' },
    { id: 'IMG002', name: '0044_weidi1_1166', date: '2025-9-27', image: '/original/0044_weidi1_1166.jpg' },
    { id: 'IMG003', name: '0044_weidi1_379', date: '2025-9-26', image: '/original/0044_weidi1_379.jpg' },
    { id: 'IMG004', name: '0044_weidi1_380', date: '2025-9-26', image: '/original/0044_weidi1_380.jpg' },
    { id: 'IMG005', name: '0044_weidi2_379', date: '2025-9-25', image: '/original/0044_weidi2_379.jpg' },
    { id: 'IMG006', name: '0044_weidi2_380', date: '2025-9-25', image: '/original/0044_weidi2_380.jpg' },
    { id: 'IMG007', name: '0044_weidou_2049', date: '2025-9-24', image: '/original/0044_weidou_2049.jpg' },
    { id: 'IMG008', name: '0044_weidou_248', date: '2025-9-23', image: '/original/0044_weidou_248.jpg' }
  ]);

  // 显示/隐藏详细列表的标志
  const showRecentDialog = ref(false);
  const showFavoritesDialog = ref(false);
  const showImagesDialog = ref(false);

  // 显示/隐藏详情预览弹窗的标志
  const showVideoPreview = ref(false);
  const showFavoritePreview = ref(false);
  const showImagePreview = ref(false);

  // 当前预览的项目
  const currentPreviewItem = ref(null);

  // 点击最近浏览
  const viewRecentItems = () => {
    showRecentDialog.value = true;
  };

  // 点击我的收藏
  const viewFavorites = () => {
    showFavoritesDialog.value = true;
  };

  // 点击我的图像
  const viewImages = () => {
    showImagesDialog.value = true;
  };

  // 查看视频详情
  const viewVideoDetail = (item) => {
    currentPreviewItem.value = item;
    showVideoPreview.value = true;
  };

  // 查看收藏图片详情
  const viewFavoriteDetail = (item) => {
    currentPreviewItem.value = item;
    showFavoritePreview.value = true;
  };

  // 查看图像详情
  const viewImageDetail = (item) => {
    currentPreviewItem.value = item;
    showImagePreview.value = true;
  };

  // 删除收藏
  const removeFavorite = (index) => {
    if (confirm('确定要删除此收藏吗？')) {
      myFavorites.value.splice(index, 1);
    }
  };

  // 删除图像
  const removeImage = (index) => {
    if (confirm('确定要删除此图像吗？')) {
      myImages.value.splice(index, 1);
    }
  };
</script>

<template>
  <div class="flex-col justify-start relative page">
    <div class="flex-col justify-start relative group">
      <DoctorHeader 
        username="郑医生" 
        dropdown-icon="/aa36b8b55ade89f8a9c4c55e9f7fb4e0.png"
      />
      <DoctorSidebar 
        :icons="{
          imageManagement: '/4cc0b44883df90d8799c16e182ae1348.png',
          aiAnalysis: '/6bf0725bccf09ab50326902f5a6b74e9.png',
          dataLibrary: '/6ba38e3a3ffa89f44d54dacb27d3312b.png',
          settings: '/69472748a28dfdc828894f3933135a12.png'
        }"
      />
      <img
        class="image pos_2"
        src="/404328c3067e67794ebad8ca57c1c196.png"
      />
      <span class="text pos_3">个人主页</span>
    </div>
    <div class="flex-col section_4 pos_4">
      <span class="self-start font text_3">您好，郑医生！</span>
      <div class="self-stretch divider"></div>
      <div class="flex-col self-stretch group_3">
        <div class="flex-row items-center">
          <div class="feature-item" @click="viewRecentItems" style="cursor: pointer;">
            <img
              class="image_7"
              src="/0ee840bc6e75af399903178b63cc4c9a.png"
            />
          </div>
          <div class="feature-item ml-122" @click="viewFavorites" style="cursor: pointer;">
            <img
              class="image_8"
              src="/22c91e6db39388a7e0843aa7e1ea046d.png"
            />
          </div>
          <div class="feature-item ml-122" @click="viewImages" style="cursor: pointer;">
            <img
              class="image_9"
              src="/69bb24bf22699df1e3fdffd7f421f4d9.png"
            />
          </div>
        </div>
        <div class="flex-row group_4 mt-19">
          <span class="font text_4" @click="viewRecentItems" style="cursor: pointer;">最近浏览</span>
          <span class="font ml-148" @click="viewFavorites" style="cursor: pointer;">我的收藏</span>
          <span class="font ml-148" @click="viewImages" style="cursor: pointer;">我的图像</span>
        </div>
      </div>
    </div>

    <!-- 最近浏览弹窗（显示视频） -->
    <div v-if="showRecentDialog" class="dialog-overlay" @click="showRecentDialog = false">
      <div class="dialog-box large-dialog" @click.stop>
        <h3 class="dialog-title">最近浏览 - 视频列表</h3>
        <div class="dialog-content">
          <div 
            v-for="(item, index) in recentViews" 
            :key="item.id"
            class="video-item"
            @click="viewVideoDetail(item)"
            style="cursor: pointer;"
          >
            <div class="video-thumbnail">
              <video :src="item.videoPath" class="video-preview" />
              <div class="video-overlay">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            <div class="video-info">
              <span class="item-name">{{ item.name }}</span>
              <span class="item-date">{{ item.date }}</span>
            </div>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="btn-close" @click="showRecentDialog = false">关闭</button>
        </div>
      </div>
    </div>

    <!-- 我的收藏弹窗（显示analyse图片） -->
    <div v-if="showFavoritesDialog" class="dialog-overlay" @click="showFavoritesDialog = false">
      <div class="dialog-box large-dialog" @click.stop>
        <h3 class="dialog-title">我的收藏 - 分析图片</h3>
        <div class="dialog-content">
          <div 
            v-for="(item, index) in myFavorites" 
            :key="item.id"
            class="image-item"
          >
            <img :src="item.image" :alt="item.name" class="image-preview" @click="viewFavoriteDetail(item)" style="cursor: pointer;" />
            <div class="image-info">
              <span class="item-name" @click="viewFavoriteDetail(item)" style="cursor: pointer;">{{ item.name }}</span>
              <span class="item-date">{{ item.date }}</span>
            </div>
            <button class="btn-unfavorite" @click.stop="removeFavorite(index)">取消收藏</button>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="btn-close" @click="showFavoritesDialog = false">关闭</button>
        </div>
      </div>
    </div>

    <!-- 我的图像弹窗（显示original图片） -->
    <div v-if="showImagesDialog" class="dialog-overlay" @click="showImagesDialog = false">
      <div class="dialog-box large-dialog" @click.stop>
        <h3 class="dialog-title">我的图像 - 原始图片</h3>
        <div class="dialog-content">
          <div 
            v-for="(item, index) in myImages" 
            :key="item.id"
            class="image-item"
          >
            <img :src="item.image" :alt="item.name" class="image-preview" @click="viewImageDetail(item)" style="cursor: pointer;" />
            <div class="image-info">
              <span class="item-name" @click="viewImageDetail(item)" style="cursor: pointer;">{{ item.name }}</span>
              <span class="item-date">{{ item.date }}</span>
            </div>
            <button class="btn-unfavorite" @click.stop="removeImage(index)">取消收藏</button>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="btn-close" @click="showImagesDialog = false">关闭</button>
        </div>
      </div>
    </div>

    <!-- 视频播放预览弹窗 -->
    <div v-if="showVideoPreview && currentPreviewItem" class="dialog-overlay preview-overlay" @click="showVideoPreview = false">
      <div class="preview-dialog" @click.stop>
        <div class="preview-header">
          <h3 class="preview-title">{{ currentPreviewItem.name }}</h3>
          <button class="btn-close-preview" @click="showVideoPreview = false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
        <div class="preview-content">
          <video :src="currentPreviewItem.videoPath" controls autoplay class="preview-video">
            您的浏览器不支持视频播放
          </video>
        </div>
        <div class="preview-footer">
          <span class="preview-info">上传日期：{{ currentPreviewItem.date }}</span>
        </div>
      </div>
    </div>

    <!-- 收藏图片预览弹窗 -->
    <div v-if="showFavoritePreview && currentPreviewItem" class="dialog-overlay preview-overlay" @click="showFavoritePreview = false">
      <div class="preview-dialog" @click.stop>
        <div class="preview-header">
          <h3 class="preview-title">{{ currentPreviewItem.name }}</h3>
          <button class="btn-close-preview" @click="showFavoritePreview = false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
        <div class="preview-content">
          <img :src="currentPreviewItem.image" :alt="currentPreviewItem.name" class="preview-image" />
        </div>
        <div class="preview-footer">
          <span class="preview-info">分析日期：{{ currentPreviewItem.date }}</span>
        </div>
      </div>
    </div>

    <!-- 原始图片预览弹窗 -->
    <div v-if="showImagePreview && currentPreviewItem" class="dialog-overlay preview-overlay" @click="showImagePreview = false">
      <div class="preview-dialog" @click.stop>
        <div class="preview-header">
          <h3 class="preview-title">{{ currentPreviewItem.name }}</h3>
          <button class="btn-close-preview" @click="showImagePreview = false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
        <div class="preview-content">
          <img :src="currentPreviewItem.image" :alt="currentPreviewItem.name" class="preview-image" />
        </div>
        <div class="preview-footer">
          <span class="preview-info">拍摄日期：{{ currentPreviewItem.date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
  /* 功能项hover效果 */
  .feature-item {
    transition: transform 0.2s;
  }
  
  .feature-item:hover {
    transform: scale(1.1);
  }

  /* 弹窗样式 */
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .dialog-box {
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.3);
    width: 40rem;
    max-height: 80vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .large-dialog {
    width: 50rem;
    max-width: 90vw;
  }

  .dialog-title {
    font-size: 1.5rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
    color: #000000;
    padding: 1.5rem;
    border-bottom: 0.063rem solid #e0e0e0;
    margin: 0;
  }

  .dialog-content {
    padding: 1rem 1.5rem;
    max-height: 50vh;
    overflow-y: auto;
  }

  .list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 0.063rem solid #f0f0f0;
    transition: background-color 0.2s;
  }

  .list-item:hover {
    background-color: #f5f5f5;
  }

  .item-name {
    font-size: 1.13rem;
    font-family: SourceHanSansCN;
    color: #000000;
    transition: color 0.2s;
  }

  .item-name:hover {
    color: #4bbdb5;
  }

  .item-date {
    font-size: 0.94rem;
    font-family: SourceHanSansCN;
    color: #808080;
  }

  .btn-unfavorite {
    background-color: #ff9800;
    color: white;
    border: none;
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 0.94rem;
    font-family: SourceHanSansCN;
    font-weight: 500;
    transition: all 0.2s;
    white-space: nowrap;
    align-self: center;
  }

  .btn-unfavorite:hover {
    background-color: #f57c00;
    transform: translateY(-0.125rem);
    box-shadow: 0 0.25rem 0.5rem rgba(255, 152, 0, 0.3);
  }

  .dialog-footer {
    padding: 1rem 1.5rem;
    border-top: 0.063rem solid #e0e0e0;
    display: flex;
    justify-content: flex-end;
  }

  .btn-close {
    background-color: #4bbdb5;
    color: white;
    border: none;
    border-radius: 0.25rem;
    padding: 0.75rem 2rem;
    cursor: pointer;
    font-size: 1.13rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
    transition: background-color 0.2s;
  }

  .btn-close:hover {
    background-color: #3a9d96;
  }

  /* 视频列表样式 */
  .video-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-bottom: 0.063rem solid #f0f0f0;
    transition: background-color 0.2s;
    gap: 1.5rem;
    justify-content: space-between;
  }

  .video-item:hover {
    background-color: #f5f5f5;
  }

  .video-thumbnail {
    position: relative;
    width: 10rem;
    height: 7rem;
    border-radius: 0.5rem;
    overflow: hidden;
    background-color: #000;
    flex-shrink: 0;
  }

  .video-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .video-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    transition: background-color 0.2s;
  }

  .video-item:hover .video-overlay {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .video-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
    min-width: 0;
  }

  .video-info .item-name {
    font-size: 1.13rem;
    font-family: SourceHanSansCN;
    color: #000000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .video-info .item-date {
    font-size: 0.94rem;
    font-family: SourceHanSansCN;
    color: #808080;
  }

  /* 图片列表样式 */
  .image-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-bottom: 0.063rem solid #f0f0f0;
    transition: background-color 0.2s;
    gap: 1.5rem;
    justify-content: space-between;
  }

  .image-item:hover {
    background-color: #f5f5f5;
  }

  .image-preview {
    width: 10rem;
    height: 7rem;
    object-fit: cover;
    border-radius: 0.5rem;
    border: 0.063rem solid #e0e0e0;
    flex-shrink: 0;
    transition: transform 0.2s;
  }

  .image-preview:hover {
    transform: scale(1.05);
  }

  .image-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
    min-width: 0;
  }

  .image-info .item-name {
    font-size: 1.13rem;
    font-family: SourceHanSansCN;
    color: #000000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .image-info .item-date {
    font-size: 0.94rem;
    font-family: SourceHanSansCN;
    color: #808080;
  }

  /* 预览弹窗样式 */
  .preview-overlay {
    z-index: 1100;
    background-color: rgba(0, 0, 0, 0.85);
  }

  .preview-dialog {
    background: white;
    border-radius: 0.75rem;
    box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.5);
    width: 70rem;
    max-width: 95vw;
    max-height: 90vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    border-bottom: 0.063rem solid #e0e0e0;
    background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  }

  .preview-title {
    font-size: 1.5rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
    color: #000000;
    margin: 0;
  }

  .btn-close-preview {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #666;
    padding: 0.5rem;
    border-radius: 0.25rem;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-close-preview:hover {
    background-color: #f0f0f0;
    color: #000;
  }

  .preview-content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background-color: #f8f9fa;
    overflow: auto;
  }

  .preview-video {
    max-width: 100%;
    max-height: 100%;
    border-radius: 0.5rem;
    box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.2);
  }

  .preview-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 0.5rem;
    box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.2);
  }

  .preview-footer {
    padding: 1.25rem 2rem;
    border-top: 0.063rem solid #e0e0e0;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
  }

  .preview-info {
    font-size: 1rem;
    font-family: SourceHanSansCN;
    color: #666;
  }

  .ml-122 {
    margin-left: 7.63rem;
  }
  .mt-19 {
    margin-top: 1.19rem;
  }
  .ml-148 {
    margin-left: 9.25rem;
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
  .font {
    font-size: 1.5rem;
    font-family: SourceHanSansCN;
    line-height: 1.39rem;
    color: #000000;
  }
  .text_2 {
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
    width: 5.31rem;
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
  .group_2 {
    margin-top: 1.75rem;
  }
  .image_5 {
    width: 2.75rem;
    height: 1.81rem;
  }
  .image-wrapper {
    padding: 1.38rem 0;
    background-color: #ffffff40;
  }
  .image_6 {
    width: 2.5rem;
    height: 2.63rem;
  }
  .image_10 {
    margin-top: 23.13rem;
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
    line-height: 1.77rem;
  }
  .pos_3 {
    position: absolute;
    left: 6.86rem;
    top: 2.02rem;
  }
  .section_4 {
    padding: 2.25rem 0 2rem; /* 优化底部留白 */
    background-color: #ffffff;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
    min-height: calc(100vh - 8.63rem); /* 确保功能区至少占满剩余高度 */
  }
  .pos_4 {
    position: absolute;
    left: calc(5.31rem + 1.5rem); /* 侧边栏宽度 + 间距 */
    right: 1.5rem;
    top: 8.63rem;
  }

  /* 响应式布局 - 平板 */
  @media (max-width: 1024px) {
    .pos_4 {
      left: calc(4.5rem + 1rem);
      right: 1rem;
    }
  }

  /* 响应式布局 - 手机 */
  @media (max-width: 768px) {
    .pos_4 {
      left: calc(4rem + 0.75rem);
      right: 0.75rem;
      top: 7rem;
    }

    .group_3 {
      padding: 0 1rem;
    }

    .image_7, .image_8, .image_9 {
      width: 5rem;
      height: 5rem;
    }

    .ml-122 {
      margin-left: 3rem;
    }

    .ml-148 {
      margin-left: 4rem;
    }
  }
  .text_3 {
    margin-left: 2.25rem;
    line-height: 1.43rem;
  }
  .divider {
    margin-top: 2.25rem;
    background-color: #0000001a;
    height: 0.13rem;
  }
  .group_3 {
    margin-top: 3.75rem;
    padding: 0 3.75rem;
  }
  .image_7 {
    width: 7.69rem;
    height: 7.75rem;
  }
  .image_8 {
    width: 7.81rem;
    height: 7.38rem;
  }
  .image_9 {
    width: 7.69rem;
    height: 8rem;
  }
  .group_4 {
    padding: 0 0.88rem;
  }
  .text_4 {
    line-height: 1.38rem;
  }
</style>