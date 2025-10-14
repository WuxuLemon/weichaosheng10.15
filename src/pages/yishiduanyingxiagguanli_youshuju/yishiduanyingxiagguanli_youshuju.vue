<script setup>
  import { useRouter } from 'vue-router';
  import { reactive, ref } from 'vue';
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

  // 病人数据
  const patients = ref([
    { id: '250619162', name: '黄仁丰', gender: '男', age: 71, checkNo: '250816015', doctor: '王金宏', part: '{BC-胃充盈超声造影检查;BC-胃充盈超声造影;}', positive: '阳性' },
    { id: '250705047', name: '郑廷洲', gender: '男', age: 45, checkNo: '250705123', doctor: '王金宏', part: '{BC-胃充盈超声造影检查;}', positive: '阳性' },
    { id: '250605040', name: '马万华', gender: '男', age: 70, checkNo: '250605108', doctor: '王金宏', part: '{BC-胃充盈超声造影检查;胃肠充盈超声造影剂;}', positive: '阳性' },
    { id: '240916100', name: '王金宏', gender: '女', age: 29, checkNo: '250531242', doctor: '王金宏', part: '{BC-胃充盈超声造影检查;胃肠充盈超声造影剂;}', positive: '阳性' },
    { id: '240910084', name: '孙秀兰', gender: '女', age: 71, checkNo: '250521021', doctor: '郑玉', part: '{BC-胃充盈超声造影检查;胃肠充盈超声造影剂;}', positive: '阳性' }
  ]);

  // 跳转到智能分析页面
  const goToAnalysis = (patient) => {
    router.push({
      path: '/yishiduanzhinengxi_chushijiemian',
      query: { patientId: patient.id }
    });
  };

  // 搜索查询
  const handleSearch = () => {
    // 执行搜索逻辑
    console.log('搜索:', searchForm);
  };

  // 导入数据
  const handleImport = () => {
    // 触发文件选择
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx,.xls,.csv';
    input.onchange = (e) => {
      const file = e.target.files[0];
      console.log('导入文件:', file);
      // 这里可以添加文件上传逻辑
    };
    input.click();
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
          aiAnalysis: '/6bf0725bccf09ab50326902f5a6b74e9.png',
          dataLibrary: '/16c621b9ca6c7b6992be19a88ebbb482.png',
          settings: '/1fbbd49e64afc661e8e3b912088282ce.png'
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
      <div class="flex-row justify-around self-stretch mt-29">
        <div class="flex-row items-center">
          <div class="flex-col justify-start items-center shrink-0 relative text-wrapper" @click="handleImport" style="cursor: pointer;">
            <span class="font_3 text_9">导入数据</span>
          </div>
          <span class="font_2 text_6">医院：</span>
          <div class="shrink-0 section_5">
            <input 
              v-model="searchForm.hospital" 
              type="text" 
              class="search-input"
              placeholder="请输入医院名称"
            />
          </div>
        </div>
        <div class="flex-row items-center">
          <span class="font_2 text_7">时间：</span>
          <div class="shrink-0 section_5">
            <input 
              v-model="searchForm.time" 
              type="date" 
              class="search-input"
            />
          </div>
        </div>
        <div class="flex-row items-center">
          <span class="font_2 text_8">患者ID：</span>
          <div class="shrink-0 relative section_5 view">
            <input 
              v-model="searchForm.patientId" 
              type="text" 
              class="search-input"
              placeholder="请输入患者ID"
            />
          </div>
          <div class="flex-col justify-start items-center shrink-0 text-wrapper_2" @click="handleSearch" style="cursor: pointer;">
            <span class="font_2 text_5">查询</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-col section_6 pos_6">
      <div class="flex-row items-center group_2">
        <span class="font text_10">数据查询结果</span>
        <img
          class="shrink-0 image_7"
          src="/5f77939f9d70648dcbdff2d524532d40.png"
        />
        <div class="flex-1 section_7"></div>
      </div>
      <div class="flex-col mt-11">
        <div class="flex-row justify-between section_8">
          <div class="flex-row">
            <span class="font_3 text_11">患者ID</span>
            <div class="flex-row shrink-0 ml-71">
              <span class="font_3 text_12">姓名</span>
              <span class="ml-30 font_3 text_13">性别</span>
              <span class="ml-30 font_3 text_14">年龄</span>
              <span class="ml-30 font_3">检查号</span>
            </div>
            <div class="flex-row shrink-0 ml-71">
              <span class="font_3">检查医生</span>
              <span class="ml-56 font_3">检查部位</span>
            </div>
          </div>
          <div class="flex-row">
            <span class="font_3 text_15">阳性标记</span>
            <span class="font_3 text_16 ml-99">操作</span>
          </div>
        </div>
        <div class="flex-col justify-start relative patient-row">
          <div class="section_9"></div>
          <span class="font_6 pos_15 analysis-btn" @click="goToAnalysis(patients[0])" style="cursor: pointer;">智能分析</span>
          <span class="font_3 text_20 pos_14">{{patients[0].positive}}</span>
          <span class="font_5 pos_13">{{patients[0].part}}</span>
          <span class="font_3 text_19 pos_12">{{patients[0].doctor}}</span>
          <span class="font_4 pos_11">{{patients[0].checkNo}}</span>
          <span class="font_3 pos_10">{{patients[0].age}}岁</span>
          <span class="font_3 text_18 pos_9">{{patients[0].gender}}</span>
          <span class="font_3 text_17 pos_8">{{patients[0].name}}</span>
          <span class="font_4 pos_7">{{patients[0].id}}</span>
        </div>
        <div class="flex-col justify-start relative patient-row">
          <div class="section_9"></div>
          <span class="font_3 text_23 pos_21">{{patients[1].doctor}}</span>
          <span class="font_5 pos_22">{{patients[1].part}}</span>
          <span class="font_3 text_22 pos_18">{{patients[1].gender}}</span>
          <span class="font_3 pos_19">{{patients[1].age}}岁</span>
          <span class="font_3 text_24 pos_23">{{patients[1].positive}}</span>
          <span class="font_6 pos_24 analysis-btn" @click="goToAnalysis(patients[1])" style="cursor: pointer;">智能分析</span>
          <span class="font_3 text_21 pos_17">{{patients[1].name}}</span>
          <span class="font_4 pos_16">{{patients[1].id}}</span>
          <span class="font_4 pos_20">{{patients[1].checkNo}}</span>
        </div>
        <div class="flex-col justify-start relative patient-row">
          <div class="section_9"></div>
          <span class="font_5 pos_31">{{patients[2].part}}</span>
          <span class="font_4 pos_29">{{patients[2].checkNo}}</span>
          <span class="font_3 text_25 pos_26">{{patients[2].name}}</span>
          <span class="font_4 pos_25">{{patients[2].id}}</span>
          <span class="font_3 text_27 pos_30">{{patients[2].doctor}}</span>
          <span class="font_3 text_26 pos_27">{{patients[2].gender}}</span>
          <span class="font_3 pos_28">{{patients[2].age}}岁</span>
          <span class="font_3 text_28 pos_32">{{patients[2].positive}}</span>
          <span class="font_6 pos_33 analysis-btn" @click="goToAnalysis(patients[2])" style="cursor: pointer;">智能分析</span>
        </div>
        <div class="flex-col justify-start relative patient-row">
          <div class="section_9"></div>
          <span class="font_4 pos_38">{{patients[3].checkNo}}</span>
          <span class="font_4 pos_34">{{patients[3].id}}</span>
          <span class="font_3 text_31 pos_39">{{patients[3].doctor}}</span>
          <span class="font_3 text_30 pos_36">{{patients[3].gender}}</span>
          <span class="font_5 pos_40">{{patients[3].part}}</span>
          <span class="font_3 pos_37">{{patients[3].age}}岁</span>
          <span class="font_3 text_32 pos_41">{{patients[3].positive}}</span>
          <span class="font_6 pos_42 analysis-btn" @click="goToAnalysis(patients[3])" style="cursor: pointer;">智能分析</span>
          <span class="font_3 text_29 pos_35">{{patients[3].name}}</span>
        </div>
        <div class="flex-col justify-start relative patient-row">
          <div class="section_9"></div>
          <span class="font_3 text_33 pos_44">{{patients[4].name}}</span>
          <span class="font_4 pos_43">{{patients[4].id}}</span>
          <span class="font_4 pos_47">{{patients[4].checkNo}}</span>
          <span class="font_3 text_35 pos_48">{{patients[4].doctor}}</span>
          <span class="font_6 pos_51 analysis-btn" @click="goToAnalysis(patients[4])" style="cursor: pointer;">智能分析</span>
          <span class="font_3 text_36 pos_50">{{patients[4].positive}}</span>
          <span class="font_5 pos_49">{{patients[4].part}}</span>
          <span class="font_3 pos_46">{{patients[4].age}}岁</span>
          <span class="font_3 text_34 pos_45">{{patients[4].gender}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
  .mt-29 {
    margin-top: 1.81rem;
  }
  .mt-11 {
    margin-top: 0.69rem;
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
    padding: 0.75rem 0.75rem 1.25rem;
    background-color: #ffffff;
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
  }
  .font {
    font-size: 1.25rem;
    font-family: SourceHanSansCN;
    line-height: 1.16rem;
  }
  .text_4 {
    color: #808080;
  }
  .text-wrapper {
    padding: 0.5rem 0 0.38rem;
    background-color: #00baad;
    border-radius: 1.36rem;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
    width: 5.94rem;
    height: 1.94rem;
  }
  .font_3 {
    font-size: 1rem;
    font-family: SourceHanSansCN;
    line-height: 0.93rem;
    color: #000000;
  }
  .text_9 {
    color: #ffffff;
    font-weight: 700;
    line-height: 0.94rem;
  }
  .font_2 {
    font-size: 1.13rem;
    font-family: SourceHanSansCN;
    line-height: 1.04rem;
    color: #000000;
  }
  .text_6 {
    margin-left: 2.13rem;
    line-height: 1.04rem;
  }
  .section_5 {
    background-color: #ffffff;
    border-radius: 0.94rem;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
    width: 13.79rem;
    height: 2rem;
    border-left: solid 0.063rem #808080;
    border-right: solid 0.063rem #808080;
    border-top: solid 0.063rem #808080;
    border-bottom: solid 0.063rem #808080;
  }
  .text_7 {
    line-height: 1.03rem;
  }
  .text_8 {
    line-height: 1.03rem;
  }
  .view {
    margin-left: 0.56rem;
  }
  .text-wrapper_2 {
    margin-left: 2.25rem;
    padding: 0.38rem 0 0.5rem;
    background-color: #00baad;
    border-radius: 1.36rem;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
    width: 5.94rem;
    height: 1.94rem;
  }
  .text_5 {
    color: #ffffff;
    font-weight: 700;
    line-height: 1.05rem;
  }
  .section_6 {
    padding-left: 0.75rem;
    padding-bottom: 0.63rem;
    background-color: #ffffff;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
  }
  .pos_6 {
    position: absolute;
    left: calc(5.31rem + 1.5rem); /* 侧边栏宽度 + 间距 */
    right: 1.5rem;
    top: 18.13rem;
  }

  /* 响应式布局 - 平板 */
  @media (max-width: 1024px) {
    .pos_6 {
      left: calc(4.5rem + 1rem);
      right: 1rem;
    }
  }

  /* 响应式布局 - 手机 */
  @media (max-width: 768px) {
    .pos_6 {
      left: calc(4rem + 0.75rem);
      right: 0.75rem;
      top: 16rem;
    }
  }
  .group_2 {
    padding-left: 0.5rem;
  }
  .text_10 {
    color: #000000;
    line-height: 1.16rem;
  }
  .image_7 {
    margin-left: 0.75rem;
    width: 0.81rem;
    height: 0.81rem;
  }
  .section_7 {
    margin-left: 1.19rem;
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
  .text_11 {
    line-height: 0.92rem;
  }
  .text_12 {
    line-height: 0.92rem;
  }
  .text_13 {
    line-height: 0.92rem;
  }
  .text_14 {
    line-height: 0.93rem;
  }
  .text_15 {
    line-height: 0.92rem;
  }
  .text_16 {
    line-height: 0.92rem;
  }
  .section_9 {
    margin-right: 0.75rem;
    opacity: 0.1;
    background-color: #ffffff;
    height: 4.94rem;
    border-left: solid 0.063rem #000000;
    border-right: solid 0.063rem #000000;
    border-top: solid 0.063rem #000000;
    border-bottom: solid 0.063rem #000000;
  }
  .font_6 {
    font-size: 1rem;
    font-family: SourceHanSansCN;
    line-height: 0.93rem;
    color: #2a82e4;
  }
  .pos_15 {
    position: absolute;
    right: 3.21rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .text_20 {
    line-height: 0.92rem;
  }
  .pos_14 {
    position: absolute;
    right: 14.54rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .font_5 {
    font-size: 1rem;
    font-family: SourceHanSansCN;
    line-height: 1.04rem;
    color: #000000;
  }
  .pos_13 {
    position: absolute;
    right: 21.96rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .text_19 {
    line-height: 0.93rem;
  }
  .pos_12 {
    position: absolute;
    left: 30.4rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .font_4 {
    font-size: 1rem;
    font-family: SourceHanSansCN;
    line-height: 0.76rem;
    color: #000000;
  }
  .pos_11 {
    position: absolute;
    left: 22.76rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .pos_10 {
    position: absolute;
    left: 18.89rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .text_18 {
    line-height: 0.87rem;
  }
  .pos_9 {
    position: absolute;
    left: 15.26rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .text_17 {
    line-height: 0.92rem;
  }
  .pos_8 {
    position: absolute;
    left: 11.46rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .pos_7 {
    position: absolute;
    left: 4.01rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .text_23 {
    line-height: 0.93rem;
  }
  .pos_21 {
    position: absolute;
    left: 30.4rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .pos_22 {
    position: absolute;
    right: 30.96rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .text_22 {
    line-height: 0.87rem;
  }
  .pos_18 {
    position: absolute;
    left: 15.26rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .pos_19 {
    position: absolute;
    left: 18.93rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .text_24 {
    line-height: 0.92rem;
  }
  .pos_23 {
    position: absolute;
    right: 14.54rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .pos_24 {
    position: absolute;
    right: 3.21rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .text_21 {
    line-height: 0.92rem;
  }
  .pos_17 {
    position: absolute;
    left: 11.51rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .pos_16 {
    position: absolute;
    left: 3.82rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .pos_20 {
    position: absolute;
    left: 22.76rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .pos_31 {
    position: absolute;
    right: 21.65rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .pos_29 {
    position: absolute;
    left: 22.76rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .text_25 {
    line-height: 0.92rem;
  }
  .pos_26 {
    position: absolute;
    left: 11.4rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .pos_25 {
    position: absolute;
    left: 3.88rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .text_27 {
    line-height: 0.93rem;
  }
  .pos_30 {
    position: absolute;
    left: 30.33rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .text_26 {
    line-height: 0.87rem;
  }
  .pos_27 {
    position: absolute;
    left: 15.26rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .pos_28 {
    position: absolute;
    left: 18.89rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .text_28 {
    line-height: 0.92rem;
  }
  .pos_32 {
    position: absolute;
    right: 14.54rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .pos_33 {
    position: absolute;
    right: 3.21rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .pos_38 {
    position: absolute;
    left: 22.7rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .pos_34 {
    position: absolute;
    left: 3.76rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .text_31 {
    line-height: 0.93rem;
  }
  .pos_39 {
    position: absolute;
    left: 30.33rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .text_30 {
    line-height: 0.93rem;
  }
  .pos_36 {
    position: absolute;
    left: 15.27rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .pos_40 {
    position: absolute;
    right: 21.65rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .pos_37 {
    position: absolute;
    left: 18.88rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .text_32 {
    line-height: 0.92rem;
  }
  .pos_41 {
    position: absolute;
    right: 14.54rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .pos_42 {
    position: absolute;
    right: 3.21rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .text_29 {
    line-height: 0.92rem;
  }
  .pos_35 {
    position: absolute;
    left: 11.4rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .text_33 {
    line-height: 0.92rem;
  }
  .pos_44 {
    position: absolute;
    left: 11.4rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .pos_43 {
    position: absolute;
    left: 3.76rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .pos_47 {
    position: absolute;
    left: 22.7rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .text_35 {
    line-height: 0.93rem;
  }
  .pos_48 {
    position: absolute;
    left: 30.33rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .pos_51 {
    position: absolute;
    right: 3.21rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .text_36 {
    line-height: 0.92rem;
  }
  .pos_50 {
    position: absolute;
    right: 14.54rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .pos_49 {
    position: absolute;
    right: 21.65rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .pos_46 {
    position: absolute;
    left: 18.96rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .text_34 {
    line-height: 0.87rem;
  }
  .pos_45 {
    position: absolute;
    left: 15.2rem;
    top: 50%;
    transform: translateY(-50%);
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

  /* 智能分析按钮样式 */
  .analysis-btn {
    transition: color 0.3s;
  }

  .analysis-btn:hover {
    color: #00baad !important;
  }

  .patient-row {
    transition: background-color 0.2s;
  }

  .patient-row:hover {
    background-color: #f9f9f9;
  }
</style>