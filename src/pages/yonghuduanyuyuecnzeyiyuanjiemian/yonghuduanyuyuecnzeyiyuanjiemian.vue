<script setup>
  import { useRouter } from 'vue-router';
  import { reactive, ref } from 'vue';
  import PatientHeader from '../../components/PatientHeader.vue';
  import PatientSidebar from '../../components/PatientSidebar.vue';

  const props = defineProps({});

  const router = useRouter();

  // 搜索表单数据
  const searchForm = reactive({
    province: '广东省',
    city: '汕头市'
  });

  // 医院列表数据
  const hospitals = ref([
    { id: 1, name: '汕头大学医学院第一附属医院', patients: 1245, address: '汕头市金平区长平路57号' },
    { id: 2, name: '潮南民生医院', patients: 868, address: '汕头市潮南区峡山街道洋内村' },
    { id: 3, name: '潮阳区西胪镇卫生院', patients: 687, address: '汕头市潮阳区西胪镇' },
    { id: 4, name: '潮阳区大峰医院', patients: 87, address: '汕头市潮阳区棉城镇' }
  ]);

  // 查询功能
  const handleSearch = () => {
    console.log('查询条件:', searchForm);
    alert(`已显示 ${searchForm.province} - ${searchForm.city} 的医院数据`);
  };

  // 选择医院（跳转到医师选择界面）
  const selectHospital = (hospital) => {
    console.log('选择医院:', hospital);
    router.push({
      path: '/yonghuduanyuyuecanzeyishijiemian',
      query: {
        hospitalId: hospital.id,
        hospitalName: hospital.name
      }
    });
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
      <span class="text pos_3">预约超声-选择医院</span>
    </div>
    <div class="flex-row justify-between items-center section_4 pos_4">
      <div class="flex-row">
        <span class="self-start text_3">数据筛选</span>
        <div class="ml-100 flex-row items-center shrink-0 self-center">
          <span class="font_2 text_4">省级：</span>
          <div class="flex-col justify-center items-start shrink-0 relative text-wrapper view">
            <select v-model="searchForm.province" class="select-input">
              <option value="广东省">广东省</option>
              <option value="福建省">福建省</option>
              <option value="浙江省">浙江省</option>
            </select>
          </div>
          <span class="font_2 text_7">市级：</span>
          <div class="flex-col justify-center items-start shrink-0 text-wrapper view_2">
            <select v-model="searchForm.city" class="select-input">
              <option value="汕头市">汕头市</option>
              <option value="广州市">广州市</option>
              <option value="深圳市">深圳市</option>
            </select>
          </div>
        </div>
      </div>
      <div 
        class="flex-col justify-start items-center text-wrapper_2" 
        @click="handleSearch"
        style="cursor: pointer;"
      >
        <span class="font_2 text_9">查询</span>
      </div>
    </div>
    <div class="flex-col section_5 pos_5">
      <!-- 动态渲染医院列表 -->
      <div 
        v-for="(hospital, index) in hospitals" 
        :key="hospital.id"
        class="flex-row justify-between hospital-item"
      >
        <div class="flex-col self-start hospital-info">
          <span class="font hospital-name">{{ hospital.name }}</span>
          <span class="font-small hospital-address">{{ hospital.address }}</span>
          <span class="font hospital-patients">共{{ hospital.patients }}位注册患者</span>
        </div>
        <div 
          class="flex-col justify-start items-center self-center text-wrapper_3"
          @click="selectHospital(hospital)"
          style="cursor: pointer;"
        >
          <span class="font_3 text_11">选择</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
  .ml-100 {
    margin-left: 6.25rem;
  }
  .ml-44 {
    margin-left: 2.75rem;
  }
  .ml-17 {
    margin-left: 1.06rem;
  }
  .mt-22 {
    margin-top: 1.38rem;
  }
  .page {
    background: linear-gradient(135deg, #e5f7f6 0%, #f0f9ff 100%);
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
    line-height: 1.38rem;
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
    z-index: 150;
  }
  .pos_2 {
    position: absolute;
    left: -2.5rem;
    top: -2.5rem;
    z-index: 150;
  }
  .text {
    color: #000000;
    font-size: 1.88rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
    line-height: 1.8rem;
  }
  .pos_3 {
    position: absolute;
    left: 6.86rem;
    top: 1.94rem;
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
    margin-top: 0.6rem;
    margin-left: 2.6rem;
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
  }
  .text_9 {
    color: #ffffff;
    font-weight: 700;
    line-height: 1.05rem;
  }
  .section_5 {
    padding: 2rem 2.25rem 2rem 3.81rem;
    background-color: #ffffff;
    border-radius: 1rem;
    box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.08);
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

    .hospital-item {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  
  /* 医院卡片统一样式 */
  .hospital-item {
    padding: 1.5rem 0;
  }
  
  .hospital-item:not(:last-child) {
    border-bottom: 1px solid #e0f2f1;
  }
  
  .group_2 {
    padding: 2rem 0;
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
  }
  .group_4 {
    padding: 1.88rem 0 2.25rem;
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

  /* 下拉选择框样式 */
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

  .select-input:focus {
    outline: none;
  }

  .select-input option {
    padding: 0.5rem;
  }

  /* 医院信息样式优化 */
  .hospital-info {
    gap: 0.6rem;
    flex: 1;
  }

  .hospital-name {
    font-size: 1.6rem;
    font-weight: 700;
    color: #1f2937;
    line-height: 1.8;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .hospital-name::before {
    content: "🏥";
    font-size: 1.5rem;
  }

  .hospital-address {
    font-size: 1rem;
    color: #666;
    line-height: 1.6;
    padding-left: 2rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  .hospital-address::before {
    content: "📍";
    font-size: 0.9rem;
  }

  .hospital-patients {
    font-size: 1.1rem;
    color: #00baad;
    line-height: 1.6;
    padding-left: 2rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  .hospital-patients::before {
    content: "👥";
    font-size: 1rem;
  }

  .font-small {
    font-size: 1rem;
    font-family: SourceHanSansCN;
    line-height: 1.2rem;
  }

  .text-wrapper_3 {
    transition: all 0.3s ease;
  }

  .text-wrapper_3:hover {
    background: linear-gradient(135deg, #00baad 0%, #00d4c5 100%);
    transform: translateY(-0.2rem);
    box-shadow: 0 0.5rem 1rem rgba(0, 186, 173, 0.3);
  }

  .group_8 {
    padding: 1.88rem 0 2.25rem;
  }
</style>