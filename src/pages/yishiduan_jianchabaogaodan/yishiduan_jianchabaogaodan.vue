<script setup>
  import { useRouter } from 'vue-router';
  import { reactive } from 'vue';

  const props = defineProps({});

  const data = reactive({});

  const router = useRouter();

  // 关闭报告（返回上一页）
  const closeReport = () => {
    router.back();  // 返回上一页
  };

  // 导出报告
  const exportReport = () => {
    // 模拟导出PDF功能
    // 实际项目中可以使用 html2pdf 或 jsPDF 库
    const reportContent = {
      hospital: '胃来声科智能医院',
      title: '超声检查报告单',
      patientName: '',
      gender: '',
      age: '',
      patientId: '',
      checkId: '',
      checkPart: '',
      checkDate: '',
      aiModel: '',
      checkResult: '',
      treatment: ''
    };

    // 模拟下载
    alert('报告导出成功！\n\n实际项目中会生成PDF文件并下载。');
    console.log('导出报告内容:', reportContent);
    
    // 如果要真实导出，可以使用以下代码（需要安装 html2pdf.js）：
    /*
    import html2pdf from 'html2pdf.js';
    const element = document.querySelector('.page');
    const opt = {
      margin: 1,
      filename: '超声检查报告单.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
    */
  };
</script>

<template>
  <div class="flex-col page">
    <div class="flex-col self-stretch">
      <div class="flex-col items-center section">
        <span class="font">胃来声科智能医院</span>
        <span class="mt-4 font">超声检查报告单</span>
      </div>
      <div class="flex-row justify-between group">
        <span class="font_2 text">姓名：</span>
        <div class="flex-row group_2">
          <span class="font_2 text_2">性别：</span>
          <span class="font_2 text_3 ml-67">年龄：</span>
        </div>
      </div>
    </div>
    <div class="flex-row self-start group_3 mt-19">
      <span class="font_2 text_4">患者号：</span>
      <span class="font_2 ml-91">检查编号：</span>
    </div>
    <div class="flex-col self-stretch mt-19">
      <div class="flex-col group_4">
        <div class="flex-row self-stretch group_5">
          <span class="font_2">检查部位：</span>
          <span class="font_2 text_5 ml-78-5">检查日期：</span>
        </div>
        <span class="mt-6 self-center text_6">胃超声AI分析结果</span>
      </div>
      <div class="flex-col mt-15-5">
        <div class="flex-col justify-start items-start text-wrapper"><span class="font_2 text_7">AI模型：</span></div>
        <div class="flex-col justify-start items-start text-wrapper_2">
          <span class="font_2 text_8">检查结果：</span>
        </div>
        <div class="flex-col justify-start items-start relative text-wrapper_3">
          <span class="font_2 text_9">治疗建议：</span>
        </div>
        <div class="flex-row justify-end items-center group_6">
          <!-- 关闭按钮 -->
          <div 
            class="section_2 close-btn" 
            @click="closeReport"
            style="cursor: pointer;"
            title="关闭报告"
          >
            <span class="close-text">关闭</span>
          </div>
          <!-- 导出按钮 -->
          <div 
            class="flex-col justify-start items-center text-wrapper_4 ml-22-5" 
            @click="exportReport"
            style="cursor: pointer;"
          >
            <span class="text_10">导出分析报告</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
  .ml-67 {
    margin-left: 4.19rem;
  }
  .mt-19 {
    margin-top: 1.19rem;
  }
  .ml-91 {
    margin-left: 5.69rem;
  }
  .ml-78-5 {
    margin-left: 4.91rem;
  }
  .mt-15-5 {
    margin-top: 0.97rem;
  }
  .ml-22-5 {
    margin-left: 1.41rem;
  }
  .page {
    padding-bottom: 0.56rem;
    background-color: #ffffff;
    border-left: solid 0.063rem #383838;
    border-right: solid 0.063rem #383838;
    border-top: solid 0.063rem #383838;
    border-bottom: solid 0.063rem #383838;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
  }
  .section {
    padding: 0.31rem 0 0.25rem;
    background-color: #ffffff;
    border-left: solid 0.063rem #808080;
    border-right: solid 0.063rem #808080;
    border-top: solid 0.063rem #808080;
    border-bottom: solid 0.063rem #808080;
  }
  .font {
    font-size: 0.94rem;
    font-family: SourceHanSansCN;
    line-height: 1.13rem;
    color: #000000;
  }
  .group {
    padding: 0.5rem 1.19rem 0;
  }
  .font_2 {
    font-size: 0.75rem;
    font-family: SourceHanSansCN;
    line-height: 0.69rem;
    color: #000000;
  }
  .text {
    line-height: 0.69rem;
  }
  .group_2 {
    margin-right: 2rem;
  }
  .text_2 {
    line-height: 0.69rem;
  }
  .text_3 {
    line-height: 0.69rem;
  }
  .group_3 {
    padding: 0 1.13rem;
  }
  .text_4 {
    line-height: 0.69rem;
  }
  .group_4 {
    padding-left: 0.88rem;
    padding-right: 0.69rem;
  }
  .group_5 {
    padding: 0 0.38rem 0.63rem;
    border-bottom: solid 0.063rem #383838;
  }
  .text_5 {
    line-height: 0.7rem;
  }
  .text_6 {
    color: #000000;
    font-size: 1.13rem;
    font-family: SourceHanSansCN;
    line-height: 1.04rem;
  }
  .text-wrapper {
    padding: 0.25rem 0 1.31rem;
    background-color: #ffffff;
    box-shadow: 0rem 0.063rem 0.13rem #00000040;
    border-left: solid 0.063rem #383838;
    border-right: solid 0.063rem #383838;
    border-top: solid 0.063rem #383838;
    border-bottom: solid 0.063rem #383838;
  }
  .text_7 {
    margin-left: 0.63rem;
    line-height: 0.69rem;
  }
  .text-wrapper_2 {
    margin-top: 0.59rem;
    padding: 0.5rem 0 5.88rem;
    background-color: #ffffff;
    box-shadow: 0rem 0.063rem 0.13rem #00000040;
    height: 7.19rem;
    border-left: solid 0.063rem #383838;
    border-right: solid 0.063rem #383838;
    border-top: solid 0.063rem #383838;
    border-bottom: solid 0.063rem #383838;
  }
  .text_8 {
    margin-left: 0.63rem;
    line-height: 0.7rem;
  }
  .text-wrapper_3 {
    margin-top: 0.69rem;
    padding: 0.63rem 0 3.69rem;
    background-color: #ffffff;
    box-shadow: 0rem 0.063rem 0.13rem #00000040;
    border-left: solid 0.063rem #383838;
    border-right: solid 0.063rem #383838;
    border-top: solid 0.063rem #383838;
    border-bottom: solid 0.063rem #383838;
  }
  .text_9 {
    margin-left: 0.63rem;
    line-height: 0.7rem;
  }
  .group_6 {
    padding: 0.81rem 0.69rem 0;
  }
  .section_2 {
    background-color: #4bbdb5;
    width: 4.34rem;
    height: 1.28rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
  }

  /* 关闭按钮样式 */
  .close-btn:hover {
    background-color: #3a9d96;
    transform: scale(1.05);
  }

  .close-text {
    color: #000000;
    font-size: 0.75rem;
    font-family: AlimamaShuHeiTi;
    line-height: 0.69rem;
  }

  .text-wrapper_4 {
    padding: 0.38rem 0 0.25rem;
    background-color: #4bbdb5;
    width: 5.81rem;
    height: 1.28rem;
    transition: all 0.3s;
  }

  .text-wrapper_4:hover {
    background-color: #3a9d96;
    transform: scale(1.05);
  }

  .text_10 {
    color: #000000;
    font-size: 0.75rem;
    font-family: AlimamaShuHeiTi;
    line-height: 0.69rem;
  }
</style>
