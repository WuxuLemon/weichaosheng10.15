<script setup>
  import { useRouter } from 'vue-router';
  import { reactive } from 'vue';
  import DoctorHeader from '../../components/DoctorHeader.vue';
  import DoctorSidebar from '../../components/DoctorSidebar.vue';

  const props = defineProps({});

  const router = useRouter();

  // 搜索表单数据
  const searchForm = reactive({
    hospital: '',
    time: '',
    patientId: ''
  });

  // 医院选项列表
  const hospitalOptions = [
    '潮南民生医院',
    '潮阳区西胪镇卫生院',
    '潮阳区大峰医院'
  ];

  // 搜索查询
  const handleSearch = () => {
    // 验证必填字段（患者ID改为非必填）
    if (!searchForm.hospital) {
      alert('请选择医院');
      return;
    }
    if (!searchForm.time) {
      alert('请选择时间');
      return;
    }
    // 患者ID为非必填项，可以为空
    // 跳转到有数据页面
    router.push('/yishiduanyingxiagguanli_youshuju');
  };
</script>

<template>
  <div class="flex-col justify-start relative page">
    <div class="flex-col justify-start relative group">
      <DoctorHeader username="郑医生" />
      <DoctorSidebar 
        :icons="{
          imageManagement: '/38613669de93514860085073aeb36bf7.png',
          aiAnalysis: '/6bf0725bccf09ab50326902f5a6b74e9.png',
          dataLibrary: '/16c621b9ca6c7b6992be19a88ebbb482.png',
          settings: '/c4e478531ee76689a7b3fae7643a7faa.png'
        }"
      />
      <img
        class="image pos_2"
        src="/404328c3067e67794ebad8ca57c1c196.png"
      />
      <span class="text pos_3">影像管理界面</span>
      <span class="text_3 pos_4">影像数据总库</span>
    </div>
    <div class="flex-col section_4 pos_5">
      <span class="self-start font text_4">数据筛选</span>
      <div class="flex-row self-stretch group_2 mt-29">
        <div class="flex-row items-center">
          <span class="font_2">医院：</span>
          <div class="shrink-0 section_5 ml-3">
            <select 
              v-model="searchForm.hospital" 
              class="search-input"
            >
              <option value="">请选择医院</option>
              <option v-for="hospital in hospitalOptions" :key="hospital" :value="hospital">
                {{ hospital }}
              </option>
            </select>
          </div>
        </div>
        <div class="flex-row items-center group_3">
          <span class="font_2 text_5">时间：</span>
          <div class="shrink-0 section_5 ml-3">
            <input 
              v-model="searchForm.time" 
              type="date" 
              class="search-input"
            />
          </div>
        </div>
        <div class="flex-row items-center group_4">
          <span class="font_2 text_6">患者ID：</span>
          <div class="shrink-0 section_5 ml-13">
            <input 
              v-model="searchForm.patientId" 
              type="text" 
              class="search-input"
              placeholder="请输入患者ID"
            />
          </div>
        </div>
        <div class="flex-col justify-start items-center text-wrapper" @click="handleSearch" style="cursor: pointer;">
          <span class="font_2 text_7">查询</span>
        </div>
      </div>
    </div>
    <div class="flex-col section_6 pos_6">
      <div class="flex-row items-center group_5">
        <span class="font text_8">新建标签页</span>
        <img
          class="ml-12 shrink-0 image_7"
          src="/5f77939f9d70648dcbdff2d524532d40.png"
        />
        <div class="ml-12 flex-1 section_7"></div>
      </div>
      <div class="flex-row justify-between section_8">
        <div class="flex-row">
          <span class="font_3 text_9">患者ID</span>
          <div class="flex-row shrink-0 ml-71">
            <span class="font_3 text_10">姓名</span>
            <span class="ml-30 font_3 text_11">性别</span>
            <span class="ml-30 font_3 text_12">年龄</span>
            <span class="ml-30 font_3">检查号</span>
          </div>
          <div class="flex-row shrink-0 ml-71">
            <span class="font_3">检查医生</span>
            <span class="ml-56 font_3">检查部位</span>
          </div>
        </div>
        <div class="flex-row">
          <span class="font_3 text_13">阳性标记</span>
          <span class="font_3 text_14 ml-99">操作</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
  .mt-29 {
    margin-top: 1.81rem;
  }
  .ml-3 {
    margin-left: 0.19rem;
  }
  .ml-13 {
    margin-left: 0.81rem;
  }
  .ml-71 {
    margin-left: 4.44rem;
  }
  .ml-99 {
    margin-left: 6.19rem;
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
  .image_8 {
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
    line-height: 1.79rem;
  }
  .pos_3 {
    position: absolute;
    left: 6.89rem;
    top: 1.88rem;
  }
  .text_3 {
    color: #000000;
    font-size: 1.38rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
    line-height: 1.3rem;
  }
  .pos_4 {
    position: absolute;
    left: 6.87rem;
    top: 6.45rem;
  }
  .section_4 {
    padding: 0.75rem 0.75rem 1.38rem;
    background-color: #ffffff;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
  }
  .pos_5 {
    position: absolute;
    right: 1.5rem;
    top: 8.94rem;
  }
  .font {
    font-size: 1.25rem;
    font-family: SourceHanSansCN;
    line-height: 1.16rem;
  }
  .text_4 {
    color: #808080;
  }
  .group_2 {
    padding-left: 4rem;
    padding-right: 2.38rem;
  }
  .font_2 {
    font-size: 1.13rem;
    font-family: SourceHanSansCN;
    line-height: 1.04rem;
    color: #000000;
  }
  .section_5 {
    background-color: #ffffff;
    border-radius: 0.94rem;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
    width: 14.44rem;
    height: 2rem;
    border-left: solid 0.063rem #808080;
    border-right: solid 0.063rem #808080;
    border-top: solid 0.063rem #808080;
    border-bottom: solid 0.063rem #808080;
  }
  .group_3 {
    margin-left: 4.75rem;
  }
  .text_5 {
    line-height: 1.03rem;
  }
  .group_4 {
    margin-left: 4.75rem;
  }
  .text_6 {
    line-height: 1.03rem;
  }
  .text-wrapper {
    margin-left: 2.75rem;
    padding: 0.38rem 0 0.5rem;
    background-color: #00baad;
    border-radius: 1.36rem;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
    width: 5.94rem;
    height: 1.94rem;
  }
  .text_7 {
    color: #ffffff;
    font-weight: 700;
    line-height: 1.05rem;
  }
  .section_6 {
    padding-left: 0.75rem;
    padding-bottom: 24.63rem;
    background-color: #ffffff;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
    width: 81.69rem;
  }
  .pos_6 {
    position: absolute;
    right: 1.5rem;
    top: 18.13rem;
  }
  .group_5 {
    padding-left: 0.5rem;
    padding-bottom: 0.63rem;
  }
  .text_8 {
    color: #000000;
  }
  .image_7 {
    width: 0.81rem;
    height: 0.81rem;
  }
  .section_7 {
    background-color: #f0f0f0;
    height: 2.88rem;
  }
  .section_8 {
    margin-right: 0.75rem;
    padding: 0.63rem 3.5rem 0.63rem 3.75rem;
    background-color: #e5e5e599;
    border-left: solid 0.063rem #efefef;
    border-right: solid 0.063rem #efefef;
    border-top: solid 0.063rem #efefef;
    border-bottom: solid 0.063rem #efefef;
  }
  .font_3 {
    font-size: 1rem;
    font-family: SourceHanSansCN;
    line-height: 0.93rem;
    color: #000000;
  }
  .text_9 {
    line-height: 0.92rem;
  }
  .text_10 {
    line-height: 0.92rem;
  }
  .text_11 {
    line-height: 0.92rem;
  }
  .text_12 {
    line-height: 0.93rem;
  }
  .text_13 {
    line-height: 0.92rem;
  }
  .text_14 {
    line-height: 0.92rem;
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

  /* 搜索输入框样式 */
  .search-input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    padding: 0 0.5rem;
    font-size: 1rem;
    color: #333;
  }

  .search-input::placeholder {
    color: #999;
  }

  select.search-input {
    appearance: auto;
    cursor: pointer;
    background-color: white;
    border: 0.063rem solid #d0d7de;
    border-radius: 0.25rem;
  }

  select.search-input:hover {
    border-color: #4bbdb5;
  }

  select.search-input:focus {
    border-color: #4bbdb5;
    box-shadow: 0 0 0 0.125rem rgba(75, 189, 181, 0.1);
  }
</style>