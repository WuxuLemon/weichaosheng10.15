<script setup>
  import { useRouter } from 'vue-router';
  import { reactive, ref, onMounted } from 'vue';
  import DoctorHeader from '../../components/DoctorHeader.vue';
  import DoctorSidebar from '../../components/DoctorSidebar.vue';

  const props = defineProps({});

  const router = useRouter();
  
  // 筛选表单数据
  const filterForm = reactive({
    hospital: '',
    doctor: '',
    date: ''
  });

  // 医院选项列表
  const hospitalOptions = [
    '潮南民生医院',
    '潮阳区西胪镇卫生院',
    '潮阳区大峰医院'
  ];

  // 医师选项列表
  const doctorOptions = [
    '王金宏',
    '郑玉'
  ];

  // 查询结果数据（对接original文件夹真实图片）
  const searchResults = ref([
    { id: '0044_weidi1_1165', image: '/original/0044_weidi1_1165.jpg' },
    { id: '0044_weidi1_1166', image: '/original/0044_weidi1_1166.jpg' },
    { id: '0044_weidi1_379', image: '/original/0044_weidi1_379.jpg' },
    { id: '0044_weidi1_380', image: '/original/0044_weidi1_380.jpg' },
    { id: '0044_weidi1_381', image: '/original/0044_weidi1_381.jpg' },
    { id: '0044_weidi1_382', image: '/original/0044_weidi1_382.jpg' },
    { id: '0044_weidi2_379', image: '/original/0044_weidi2_379.jpg' },
    { id: '0044_weidi2_380', image: '/original/0044_weidi2_380.jpg' },
    { id: '0044_weidi2_381', image: '/original/0044_weidi2_381.jpg' },
    { id: '0044_weidi2_382', image: '/original/0044_weidi2_382.jpg' },
    { id: '0044_weidi2_383', image: '/original/0044_weidi2_383.jpg' },
    { id: '0044_weidi2_384', image: '/original/0044_weidi2_384.jpg' },
    { id: '0044_weidi2_385', image: '/original/0044_weidi2_385.jpg' },
    { id: '0044_weidi2_386', image: '/original/0044_weidi2_386.jpg' },
    { id: '0044_weidi2_387', image: '/original/0044_weidi2_387.jpg' },
    { id: '0044_weidi2_388', image: '/original/0044_weidi2_388.jpg' },
    { id: '0044_weidou_2049', image: '/original/0044_weidou_2049.jpg' },
    { id: '0044_weidou_2052', image: '/original/0044_weidou_2052.jpg' },
    { id: '0044_weidou_2077', image: '/original/0044_weidou_2077.jpg' },
    { id: '0044_weidou_2105', image: '/original/0044_weidou_2105.jpg' },
    { id: '0044_weidou_2141', image: '/original/0044_weidou_2141.jpg' },
    { id: '0044_weidou_248', image: '/original/0044_weidou_248.jpg' },
    { id: '0044_weidou_283', image: '/original/0044_weidou_283.jpg' },
    { id: '0044_weidou_304', image: '/original/0044_weidou_304.jpg' },
    { id: '0044_weidou_305', image: '/original/0044_weidou_305.jpg' },
    { id: '0044_weidou_352', image: '/original/0044_weidou_352.jpg' },
    { id: '0044_weidou_667', image: '/original/0044_weidou_667.jpg' },
    { id: '0044_weiti1_480', image: '/original/0044_weiti1_480.jpg' },
    { id: '0044_weiti1_481', image: '/original/0044_weiti1_481.jpg' },
    { id: '0044_weiti1_482', image: '/original/0044_weiti1_482.jpg' }
  ]);

  // 查询功能
  const handleSearch = () => {
    console.log('查询条件:', filterForm);
    alert('查询成功！已显示符合条件的数据');
  };

  // 返回功能
  const handleBack = () => {
    router.go(-1); // 返回上一页
  };

  // 点击病例查看详情
  const viewCaseDetail = (caseItem) => {
    console.log('查看病例详情:', caseItem);
    // 跳转到分析界面，并传递病例ID
    router.push({
      path: '/yishiduanzhinengnxi_fenxijiemian',
      query: { caseId: caseItem.id }
    });
  };
</script>

<template>
  <div class="flex-col justify-start relative page">
    <div class="flex-col justify-start relative group">
      <DoctorHeader 
        username="郑医生" 
        dropdown-icon="/ca61eb381c206ab86b5b6d77d6df31e4.png"
      />
      <DoctorSidebar 
        :icons="{
          imageManagement: '/4cc0b44883df90d8799c16e182ae1348.png',
          aiAnalysis: '/6bf0725bccf09ab50326902f5a6b74e9.png',
          dataLibrary: '/16c621b9ca6c7b6992be19a88ebbb482.png',
          settings: '/237e454c307d63e1596a7fe0e2eb4a59.png'
        }"
      />
      <img
        class="image pos_2"
        src="/404328c3067e67794ebad8ca57c1c196.png"
      />
      <span class="text pos_3">共享数据库界面</span>
    </div>
    <div class="flex-row justify-between items-center section_4 pos_4">
      <div class="flex-row items-center">
        <span class="text_3">数据筛选</span>
        <div class="ml-100 flex-row items-center">
          <span class="font_2 text_5">当前医院：</span>
          <div class="flex-col justify-start items-start relative text-wrapper">
            <select v-model="filterForm.hospital" class="font_2 text_6 filter-input">
              <option value="">请选择医院</option>
              <option v-for="hospital in hospitalOptions" :key="hospital" :value="hospital">
                {{ hospital }}
              </option>
            </select>
          </div>
          <span class="font_2 text_7 ml-hospital-doctor">主治医师：</span>
          <div class="flex-col justify-start items-start relative text-wrapper_2">
            <select v-model="filterForm.doctor" class="font_2 text_8 filter-input">
              <option value="">请选择医师</option>
              <option v-for="doctor in doctorOptions" :key="doctor" :value="doctor">
                {{ doctor }}
              </option>
            </select>
          </div>
          <span class="font_2 text_9 ml-doctor-date">日期：</span>
          <input v-model="filterForm.date" type="date" class="relative section_5 filter-input" />
        </div>
      </div>
      <div class="flex-row group_5">
        <div class="flex-col justify-start items-center relative text-wrapper_3" @click="handleSearch" style="cursor: pointer;">
          <span class="font_3 text_4">查询</span>
        </div>
        <div class="ml-28 flex-col justify-start items-center text-wrapper_3" @click="handleBack" style="cursor: pointer;">
          <span class="font_3 text_10">返回</span>
        </div>
      </div>
    </div>
    <div class="flex-col section_6 pos_5">
      <div class="flex-row items-center group_6">
        <span class="font">查询结果</span>
        <div class="ml-44 flex-1 section_7"></div>
      </div>
      <div class="mt-40 flex-col">
        <div class="image-grid">
          <div 
            v-for="(result, index) in searchResults" 
            :key="result.id"
            class="case-item"
            @click="viewCaseDetail(result)"
            style="cursor: pointer;"
          >
            <img
              class="image_6"
              :src="result.image"
              :alt="result.id"
            />
            <span class="font_4 case-id">{{ result.id }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
  .filter-input {
    border: none;
    outline: none;
    background: transparent;
    width: 100%;
    padding: 0.5rem;
    color: #000000;
    cursor: pointer;
  }

  select.filter-input {
    appearance: auto;
    background-color: white;
    border: 0.063rem solid #d0d7de;
    border-radius: 0.25rem;
    padding: 0.4rem 0.5rem;
    height: 2.5rem;      /* ← 设置高度 */
    position: relative;  /* ← 新增 */
    top: -0.6rem;        /* ← 新增：往上移动 */
    left: -0.7rem;       /* ← 新增：往左移动 */
  }
    /* 第一个下拉框（当前医院）*/
  .text-wrapper select.filter-input {
  width: 12rem;  /* 医院下拉框宽度 */
  }

  /* 第二个下拉框（主治医师）*/
  .text-wrapper_2 select.filter-input {
  width: 10rem;   /* 医师下拉框宽度，增加宽度确保"请选择医师"完整显示 */
  }
  select.filter-input:hover {
    border-color: #4bbdb5;
  }

  select.filter-input:focus {
    border-color: #4bbdb5;
    box-shadow: 0 0 0 0.125rem rgba(75, 189, 181, 0.1);
  }
  
  /* 图片网格布局 */
  .image-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 每行4列 */
    gap: 2rem; /* 图片之间的间距 */
    padding-right: 2.38rem; /* 右侧留白，与左侧对称 */
  }

  @media (max-width: 1200px) {
    .image-grid {
      grid-template-columns: repeat(3, 1fr); /* 中等屏幕每行3列 */
    }
  }

  @media (max-width: 768px) {
    .image-grid {
      grid-template-columns: repeat(2, 1fr); /* 小屏幕每行2列 */
      gap: 1rem;
    }
  }

  .case-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.2s, box-shadow 0.2s;
    border-radius: 0.5rem;
    overflow: hidden;
    background-color: #f8f9fa;
    padding: 0.5rem;
  }
  
  .case-item:hover {
    transform: translateY(-0.25rem);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  }
  
  .case-id {
    margin-top: 0.56rem;
    font-size: 0.95rem;
    color: #555;
  }
  
  .mt-391 {
    margin-top: 24.44rem;
  }
  .ml-71 {
    margin-left: 4.44rem;
  }
  .mt-9 {
    margin-top: 0.56rem;
  }
  .ml-155 {
    margin-left: 9.69rem;
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
    line-height: 1.38rem;
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
  .image-wrapper {
    padding: 1.75rem 0;
    background-color: #ffffff40;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
  }
  .image_5 {
    width: 2.75rem;
    height: 1.81rem;
  }
  .image_7 {
    width: 2.5rem;
    height: 2.63rem;
  }
  .image_8 {
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
  .section_4 {
    padding: 0.38rem 0.75rem 0.88rem;
    background-color: #ffffff;
    border-radius: 0.31rem;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
  }
  .pos_4 {
    position: absolute;
    left: calc(5.31rem + 1.5rem); /* 侧边栏宽度 + 间距 */
    right: 1.5rem;
    top: 6.56rem;
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
      top: 5.5rem;
    }
  }
  .text_3 {
    color: #808080;
    font-size: 1.25rem;
    font-family: SourceHanSansCN;
    line-height: 1.16rem;
    margin-left: 2.6rem;  /* 与无数据页保持一致 */
  }
  .ml-100 {
    margin-left: 10rem;  /* 增加"数据筛选"和筛选条件之间的间距 */
  }
  .text-wrapper {
    margin-left: 0.13rem;
    padding: 0.38rem 0;
    background-color: #ffffff;
    border-radius: 0.31rem;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
    width: 10.81rem;
    height: 2rem;
    border-left: solid 0.063rem #808080;
    border-right: solid 0.063rem #808080;
    border-top: solid 0.063rem #808080;
    border-bottom: solid 0.063rem #808080;
    transition: border-color 0.3s;
  }

  .text-wrapper:hover {
    border-color: #4bbdb5;
  }

  .text-wrapper:focus-within {
    border-color: #00baad;
    box-shadow: 0rem 0.13rem 0.25rem #00000040, 0 0 0 0.125rem rgba(75, 189, 181, 0.1);
  }
  .font_2 {
    font-size: 1.13rem;
    font-family: SourceHanSansCN;
    line-height: 1.04rem;
    color: #000000;
  }
  .text_6 {
    margin-left: 0.5rem;
    line-height: 1.05rem;
  }
  .text_5 {
    line-height: 1.04rem;
  }
  .ml-hospital-doctor {
    margin-left: 5rem;  /* 增加医院和医师之间的间距 */
  }
  .text-wrapper_2 {
    margin-left: 0.25rem;
    padding: 0.38rem 0;
    background-color: #ffffff;
    border-radius: 0.31rem;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
    width: 9rem;  /* 增加宽度，确保"请选择医师"完整显示 */
    height: 2rem;
    border-left: solid 0.063rem #808080;
    border-right: solid 0.063rem #808080;
    border-top: solid 0.063rem #808080;
    border-bottom: solid 0.063rem #808080;
    transition: border-color 0.3s;
  }

  .text-wrapper_2:hover {
    border-color: #4bbdb5;
  }

  .text-wrapper_2:focus-within {
    border-color: #00baad;
    box-shadow: 0rem 0.13rem 0.25rem #00000040, 0 0 0 0.125rem rgba(75, 189, 181, 0.1);
  }
  .text_8 {
    margin-left: 0.5rem;
  }
  .text_7 {
    line-height: 1.04rem;
  }
  .ml-doctor-date {
    margin-left: 5rem;  /* 增加医师和日期之间的间距 */
  }
  .section_5 {
    margin-left: 0.25rem;
    background-color: #ffffff;
    border-radius: 0.31rem;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
    width: 9.38rem;
    height: 2rem;
    border-left: solid 0.063rem #808080;
    border-right: solid 0.063rem #808080;
    border-top: solid 0.063rem #808080;
    border-bottom: solid 0.063rem #808080;
    transition: border-color 0.3s;
  }

  .section_5:hover {
    border-color: #4bbdb5;
  }

  .section_5:focus {
    border-color: #00baad;
    outline: none;
    box-shadow: 0rem 0.13rem 0.25rem #00000040, 0 0 0 0.125rem rgba(75, 189, 181, 0.1);
  }

  .text_9 {
    line-height: 1.03rem;
  }
  .group_5 {
    margin-right: 1.88rem;
  }
  .text-wrapper_3 {
    padding: 0.5rem 0;
    background-color: #00baad;
    border-radius: 1.36rem;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
    width: 5.94rem;
    height: 1.94rem;
    transition: all 0.3s;
  }

  .text-wrapper_3:hover {
    background-color: #009a8e;
    transform: scale(1.05);
  }
  .font_3 {
    font-size: 1.13rem;
    font-family: SourceHanSansCN;
    line-height: 1.04rem;
    font-weight: 700;
    color: #ffffff;
  }
  .text_4 {
    line-height: 1.05rem;
  }
  .text_10 {
    line-height: 1.05rem;
  }
  .section_6 {
    padding-left: 2.38rem;
    padding-bottom: 2rem; /* 优化底部留白 */
    background-color: #ffffff;
    border-radius: 0.31rem;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
    min-height: calc(100vh - 12.25rem); /* 确保功能区至少占满剩余高度 */
  }
  .pos_5 {
    position: absolute;
    left: calc(5.31rem + 1.5rem); /* 侧边栏宽度 + 间距 */
    right: 1.5rem;
    top: 12.25rem;
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
      top: 10.5rem;
    }
  }
  .group_6 {
    padding-left: 0.38rem;
  }
  .section_7 {
    background-color: #f0f0f0;
    height: 2.88rem;
  }
  .image_6 {
    width: 13.81rem;
    height: 9.63rem;
  }
  .group_7 {
    padding: 0 2.75rem;
  }
  .font_4 {
    font-size: 1.13rem;
    font-family: SourceHanSansCN;
    line-height: 0.85rem;
    color: #000000;
  }
</style>