<script setup>
  import { useRouter } from 'vue-router';
  import { reactive, ref } from 'vue';
  import DoctorHeader from '../../components/DoctorHeader.vue';
  import DoctorSidebar from '../../components/DoctorSidebar.vue';

  const props = defineProps({});

  const router = useRouter();

  // 搜索表单数据
  const searchForm = reactive({
    province: '广东省',
    city: '汕头市'
  });

  // 医院列表数据
  const hospitals = ref([
    { id: 1, name: '潮南民生医院', patients: 868 },
    { id: 2, name: '潮阳区西胪镇卫生院', patients: 687 },
    { id: 3, name: '潮阳区大峰医院', patients: 87 }
  ]);

  // 查询功能
  const handleSearch = () => {
    console.log('查询条件:', searchForm);
    // 这里可以根据省市筛选医院数据
    alert(`已显示 ${searchForm.province} - ${searchForm.city} 的医院数据`);
  };

  // 选择医院（跳转到选择后界面）
  const selectHospital = (hospital) => {
    console.log('选择医院:', hospital);
    // 跳转到共享数据库-选择后界面，并传递医院信息
    router.push({
      path: '/yishiduangongxiaxuanzehoujiemian',
      query: {
        hospitalId: hospital.id,
        hospitalName: hospital.name,
        patients: hospital.patients
      }
    });
  };

  // 导入数据
  const handleImport = () => {
    // 触发文件选择
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx,.xls,.csv,.dcm,.jpg,.png';
    input.multiple = true;
    input.onchange = (e) => {
      const files = Array.from(e.target.files);
      console.log('导入文件:', files);
      alert(`已选择 ${files.length} 个文件，准备导入到共享数据库...`);
      // 这里可以添加文件上传逻辑
    };
    input.click();
  };
</script>

<template>
  <div class="flex-col justify-start relative page">
    <div class="flex-col justify-start relative group">
      <DoctorHeader username="郑医生" dropdown-icon="/8c745d0b25ea54fffa66081a2189394a.png" />
      <DoctorSidebar 
        :icons="{
          imageManagement: '/4cc0b44883df90d8799c16e182ae1348.png',
          aiAnalysis: '/d84585acb06e336095d45de5e3a3bd77.png',
          dataLibrary: '/87af3249c4b9bb3b8b4791d30f1fbecc.png',
          settings: '/3c6fe7a1398f5e5e488e6087f33c86fd.png'
        }"
      />
      <img
        class="image pos_2"
        src="/404328c3067e67794ebad8ca57c1c196.png"
      />
      <span class="text pos_3">共享数据库界面</span>
    </div>
    <div class="flex-row justify-between items-center section_4 pos_4">
      <div class="flex-row">
        <span class="self-start text_3">数据筛选</span>
        <div class="ml-100 flex-row items-center shrink-0 self-center">
          <span class="font_2 text_4">省级：</span>
          <div class="flex-col justify-center items-start shrink-0 relative text-wrapper view">
            <select v-model="searchForm.province" class="select-input">
              <option value="广东省">广东省</option>
            </select>
          </div>
          <span class="font_2 text_7">市级：</span>
          <div class="flex-col justify-center items-start shrink-0 text-wrapper view_2">
            <select v-model="searchForm.city" class="select-input">
              <option value="汕头市">汕头市</option>
            </select>
          </div>
        </div>
      </div>
      <div class="flex-row items-center">
        <div 
          class="flex-col justify-start items-center import-data-btn" 
          @click="handleImport"
          style="cursor: pointer;"
        >
          <span class="font_2 import-text">导入数据</span>
        </div>
        <div 
          class="flex-col justify-start items-center text-wrapper_2 ml-import-query" 
          @click="handleSearch"
          style="cursor: pointer;"
        >
          <span class="font_2 text_9">查询</span>
        </div>
      </div>
    </div>
    <div class="flex-col section_5 pos_5">
      <!-- 动态渲染医院列表 -->
      <div 
        v-for="(hospital, index) in hospitals" 
        :key="hospital.id"
        class="flex-row justify-between hospital-item"
        :class="{
          'group_2': index === 0,
          'group_4': index === 1,
          'group_6': index === 2
        }"
      >
        <div class="flex-row self-start" :class="index === 0 ? 'group_3' : index === 1 ? 'group_5' : 'group_7'">
          <span class="font" :class="{
            'text_10': index === 0,
            'text_12': index === 1,
            'text_13': index === 2
          }">{{ hospital.name }}</span>
          <span class="font" :class="{
            'ml-154': index === 0,
            'ml-81': index === 1,
            'ml-131': index === 2
          }">共{{ hospital.patients }}个患者</span>
        </div>
        <div 
          class="flex-col justify-start items-center text-wrapper_3 select-btn"
          :class="{ 'section_6': index === 0, 'self-center': index > 0 }"
          @click="selectHospital(hospital)"
          style="cursor: pointer;"
        >
          <span class="font_3 text_11">选择</span>
        </div>
      </div>
      <div class="shrink-0 divider"></div>
    </div>
  </div>
</template>

<style scoped lang="css">
  .mt-391 {
    margin-top: 24.44rem;
  }
  .ml-154 {
    margin-left: 9.63rem;
  }
  .ml-81 {
    margin-left: 5.06rem;
  }
  .ml-131 {
    margin-left: 8.19rem;
  }
  .ml-import-query {
    margin-left: 2rem;
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
  .image_6 {
    width: 2.5rem;
    height: 2.63rem;
  }
  .image_7 {
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
    top: 6.06rem;
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
      top: 5rem;
    }
  }
  .text_3 {
    color: #808080;
    font-size: 1.25rem;
    font-family: SourceHanSansCN;
    line-height: 1.16rem;
    margin-top: 0.6rem;  /* 往下调整，增加这个数值会往下移动更多 */
    margin-left: 2.6rem;  /* 往上调整，增加这个数值会往上移动更多 */
  }
  .font_2 {
    font-size: 1.13rem;
    font-family: SourceHanSansCN;
    line-height: 1.05rem;
    color: #000000;
  }
  .text_4 {
    line-height: 1.04rem;
  }
  .text-wrapper {
    padding: 0.5rem 0.5rem;
    background-color: #ffffff;
    border-radius: 0.31rem;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
    width: 14.44rem;
    min-height: 2.5rem;
    height: 1rem;
    border: solid 0.063rem #808080;
    display: flex;
    align-items: center;
    transition: border-color 0.3s;
  }

  .text-wrapper:hover {
    border-color: #4bbdb5;
  }

  .text-wrapper:focus-within {
    border-color: #00baad;
    box-shadow: 0rem 0.13rem 0.25rem #00000040, 0 0 0 0.125rem rgba(75, 189, 181, 0.1);
  }

  /* 下拉框样式 */
  .select-input {
    width: 100%;
    height: auto;
    min-height: 1.5rem;
    border: none;
    outline: none;
    background: transparent;
    padding: 0.25rem 0.5rem;
    font-size: 1.13rem;
    font-family: SourceHanSansCN;
    line-height: 1.5;
    color: #000000;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .select-input option {
    padding: 0.5rem;
    font-size: 1.13rem;
    font-family: SourceHanSansCN;
  }

  .view {
    margin-left: 0.13rem;
  }
  .text_5 {
    margin-left: 0.5rem;
  }
  .text_6 {
    line-height: 1.05rem;
  }
  .text_7 {
    margin-left: 8.13rem;
  }
  .view_2 {
    margin-left: 0.25rem;
  }
  .text_8 {
    line-height: 1.04rem;
  }
  .text-wrapper_2 {
    margin-right: 1.88rem;
    padding: 0.38rem 0 0.5rem;
    background-color: #00baad;
    border-radius: 1.36rem;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
    width: 5.94rem;
    height: 1.94rem;
    transition: all 0.3s;
  }

  .text-wrapper_2:hover {
    background-color: #009a8e;
    transform: scale(1.05);
  }

  .text_9 {
    color: #ffffff;
    font-weight: 700;
    line-height: 1.05rem;
  }
  .section_5 {
    padding: 0 2.25rem 2rem 3.81rem; /* 优化底部留白 */
    background-color: #ffffff;
    border-radius: 0.31rem;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
    min-height: calc(100vh - 11.75rem); /* 确保功能区至少占满剩余高度 */
  }
  .pos_5 {
    position: absolute;
    left: calc(5.31rem + 1.5rem); /* 侧边栏宽度 + 间距 */
    right: 1.5rem;
    top: 11.75rem;
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
      top: 10rem;
    }
  }

  /* 医院列表项样式 */
  .hospital-item {
    transition: background-color 0.2s;
  }

  .hospital-item:hover {
    background-color: rgba(0, 186, 173, 0.05);
  }

  .group_2 {
    padding: 2rem 0;
    border-bottom: solid 0.13rem #a6a6a6;
  }
  .group_3 {
    margin-top: 1.13rem;
  }
  .text_10 {
    line-height: 1.4rem;
  }
  .section_6 {
    background-color: #4bbdb5;
    border-radius: 1.25rem;
    width: 6.31rem;
    height: 2.84rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .group_4 {
    padding: 1.88rem 0 2.25rem;
    border-bottom: solid 0.13rem #a6a6a6;
  }
  .group_5 {
    margin-top: 1rem;
  }
  .text_12 {
    line-height: 1.4rem;
  }
  .text-wrapper_3 {
    margin-right: 0.25rem;
    padding: 0.88rem 0 0.63rem;
    background-color: #4bbdb5;
    border-radius: 1.25rem;
    width: 6.31rem;
    height: 2.84rem;
    transition: all 0.3s;
  }

  /* 选择按钮样式 */
  .select-btn:hover {
    background-color: #3a9d96;
    transform: scale(1.05);
  }

  .font_3 {
    font-size: 1.5rem;
    font-family: SourceHanSansCN;
    line-height: 1.38rem;
    font-weight: 700;
    color: #ffffff;
  }
  .text_11 {
    line-height: 1.42rem;
  }
  .group_6 {
    padding-top: 1.88rem;
  }
  .group_7 {
    margin-top: 1.38rem;
  }
  .text_13 {
    line-height: 1.39rem;
  }
  .divider {
    margin-top: 2.75rem;
    background-color: #a6a6a6;
    height: 0.13rem;
  }

  /* 导入数据按钮样式 */
  .import-data-btn {
    padding: 0.38rem 0 0.5rem;
    background-color: #4bbdb5;
    border-radius: 1.36rem;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
    width: 5.94rem;
    height: 1.94rem;
    transition: all 0.3s ease;
  }

  .import-data-btn:hover {
    background-color: #3a9d96;
    transform: scale(1.05);
    box-shadow: 0rem 0.2rem 0.4rem #00000060;
  }

  .import-text {
    color: #ffffff;
    font-weight: 700;
    line-height: 1.05rem;
  }
</style>
