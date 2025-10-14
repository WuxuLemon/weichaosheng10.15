<script setup>
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import PatientHeader from '../../components/PatientHeader.vue';
  import PatientSidebar from '../../components/PatientSidebar.vue';

  const props = defineProps({});

  const router = useRouter();

  // 最近浏览的数据
  const recentViews = ref([
    { id: '1', name: '郑艺喧医生-预约记录', date: '2023-10-27', type: '预约' },
    { id: '2', name: '樊捷君医生-预约记录', date: '2023-10-26', type: '预约' },
    { id: '3', name: '胃部超声检查报告', date: '2023-10-25', type: '报告' }
  ]);

  // 我的收藏数据
  const myFavorites = ref([
    { id: 'FAV001', name: '胃部超声检查注意事项', date: '2023-10-20', type: '资料' },
    { id: 'FAV002', name: '预防胃病小贴士', date: '2023-10-18', type: '资料' }
  ]);

  // 我的图像数据
  const myImages = ref([
    { id: 'IMG001', name: '胃部超声影像1', date: '2023-10-27', type: '影像' },
    { id: 'IMG002', name: '胃部超声影像2', date: '2023-10-26', type: '影像' },
    { id: 'IMG003', name: '胃部超声影像3', date: '2023-10-25', type: '影像' }
  ]);

  // 显示/隐藏详细列表的标志
  const showRecentDialog = ref(false);
  const showFavoritesDialog = ref(false);
  const showImagesDialog = ref(false);

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

  // 查看详情
  const viewDetail = (item) => {
    alert(`查看详情：${item.name}`);
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
      <PatientHeader 
        username="沈用户" 
        dropdown-icon="/beb9979c3492f086ebf8f01a5b5db92d.png"
      />
      <PatientSidebar 
        :icons="{
          home: '/4cc0b44883df90d8799c16e182ae1348.png',
          hospital: '/d50111c947c3e4e22f61ba56e2a07d2d.png',
          profile: '/16c621b9ca6c7b6992be19a88ebbb482.png',
          settings: '/c4e478531ee76689a7b3fae7643a7faa.png'
        }"
      />
      <img
        class="image pos_2"
        src="/404328c3067e67794ebad8ca57c1c196.png"
      />
      <span class="text pos_3">个人主页</span>
    </div>
    <div class="flex-col section_4 pos_4">
      <span class="self-start font text_3">您好，沈用户！</span>
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

    <!-- 最近浏览弹窗 -->
    <div v-if="showRecentDialog" class="dialog-overlay" @click="showRecentDialog = false">
      <div class="dialog-box" @click.stop>
        <h3 class="dialog-title">最近浏览</h3>
        <div class="dialog-content">
          <div 
            v-for="(item, index) in recentViews" 
            :key="item.id"
            class="list-item"
            @click="viewDetail(item)"
            style="cursor: pointer;"
          >
            <span class="item-name">{{ item.name }}</span>
            <span class="item-date">{{ item.date }}</span>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="btn-close" @click="showRecentDialog = false">关闭</button>
        </div>
      </div>
    </div>

    <!-- 我的收藏弹窗 -->
    <div v-if="showFavoritesDialog" class="dialog-overlay" @click="showFavoritesDialog = false">
      <div class="dialog-box" @click.stop>
        <h3 class="dialog-title">我的收藏</h3>
        <div class="dialog-content">
          <div 
            v-for="(item, index) in myFavorites" 
            :key="item.id"
            class="list-item"
          >
            <span class="item-name" @click="viewDetail(item)" style="cursor: pointer;">{{ item.name }}</span>
            <span class="item-date">{{ item.date }}</span>
            <button class="btn-delete" @click="removeFavorite(index)">删除</button>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="btn-close" @click="showFavoritesDialog = false">关闭</button>
        </div>
      </div>
    </div>

    <!-- 我的图像弹窗 -->
    <div v-if="showImagesDialog" class="dialog-overlay" @click="showImagesDialog = false">
      <div class="dialog-box" @click.stop>
        <h3 class="dialog-title">我的图像</h3>
        <div class="dialog-content">
          <div 
            v-for="(item, index) in myImages" 
            :key="item.id"
            class="list-item"
          >
            <span class="item-name">{{ item.name }}</span>
            <span class="item-date">{{ item.date }}</span>
            <button class="btn-delete" @click="removeImage(index)">删除</button>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="btn-close" @click="showImagesDialog = false">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
  .ml-17 {
    margin-left: 1.06rem;
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
    padding: 0.5rem 0.88rem 0.5rem 1.5rem;
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
    line-height: 1.4rem;
  }
  .image_3 {
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
    padding: 2.25rem 0 19.38rem;
    background-color: #ffffff;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
    width: 81.69rem;
  }
  .pos_4 {
    position: absolute;
    right: 1.5rem;
    top: 8.63rem;
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
    flex: 1;
  }

  .item-date {
    font-size: 0.94rem;
    font-family: SourceHanSansCN;
    color: #808080;
    margin-left: 1rem;
  }

  .btn-delete {
    background-color: #ff4444;
    color: white;
    border: none;
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
    margin-left: 1rem;
    cursor: pointer;
    font-size: 0.94rem;
    font-family: SourceHanSansCN;
    transition: background-color 0.2s;
  }

  .btn-delete:hover {
    background-color: #cc0000;
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

  .mt-28 {
    margin-top: 1.75rem;
  }
</style>