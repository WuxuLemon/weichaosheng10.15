<script setup>
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import PatientHeader from '../../components/PatientHeader.vue';
  import PatientSidebar from '../../components/PatientSidebar.vue';

  const props = defineProps({});

  const router = useRouter();

  // 健康档案数据
  const healthRecords = ref([
    {
      id: 1,
      date: '2025-10-07',
      hospital: '汕头大学医学院第一附属医院',
      doctor: '郑艺喧',
      diagnosis: '慢性浅表性胃炎',
      result: '胃壁厚度正常，未见明显异常',
      images: 3
    },
    {
      id: 2,
      date: '2025-06-05',
      hospital: '汕头大学医学院第一附属医院',
      doctor: '樊捷君',
      diagnosis: '功能性消化不良',
      result: '胃动力稍弱，建议规律饮食',
      images: 2
    },
    {
      id: 3,
      date: '2025-02-20',
      hospital: '汕头大学医学院第一附属医院',
      doctor: '彭子榕',
      diagnosis: '胃息肉',
      result: '发现小息肉，建议定期复查',
      images: 4
    }
  ]);

  // 选中的档案
  const selectedRecord = ref(null);
  const showDetailDialog = ref(false);

  // 查看详情
  const viewDetail = (record) => {
    selectedRecord.value = record;
    showDetailDialog.value = true;
  };

  // 下载报告
  const downloadReport = (record) => {
    alert(`下载报告：${record.date} - ${record.diagnosis}`);
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
      <span class="text pos_3">健康档案</span>
    </div>
    
    <div class="content-section pos_5">
      <h2 class="section-title">我的健康档案</h2>
      <div class="records-container">
        <div 
          v-for="record in healthRecords" 
          :key="record.id"
          class="record-card"
        >
          <div class="record-header">
            <div class="record-date">{{ record.date }}</div>
            <div class="record-badge">已完成</div>
          </div>
          <div class="record-body">
            <div class="record-row">
              <span class="record-label">就诊医院：</span>
              <span class="record-value">{{ record.hospital }}</span>
            </div>
            <div class="record-row">
              <span class="record-label">主治医生：</span>
              <span class="record-value">{{ record.doctor }}</span>
            </div>
            <div class="record-row">
              <span class="record-label">诊断结果：</span>
              <span class="record-value diagnosis">{{ record.diagnosis }}</span>
            </div>
            <div class="record-row">
              <span class="record-label">检查结果：</span>
              <span class="record-value">{{ record.result }}</span>
            </div>
          </div>
          <div class="record-footer">
            <button class="btn-view" @click="viewDetail(record)">查看详情</button>
            <button class="btn-download" @click="downloadReport(record)">下载报告</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 详情弹窗 -->
    <div v-if="showDetailDialog" class="dialog-overlay" @click="showDetailDialog = false">
      <div class="dialog-box detail-dialog" @click.stop>
        <h3 class="dialog-title">检查报告详情</h3>
        <div class="detail-content" v-if="selectedRecord">
          <div class="detail-section">
            <h4>基本信息</h4>
            <div class="detail-row">
              <span class="detail-label">检查日期：</span>
              <span class="detail-value">{{ selectedRecord.date }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">就诊医院：</span>
              <span class="detail-value">{{ selectedRecord.hospital }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">主治医生：</span>
              <span class="detail-value">{{ selectedRecord.doctor }}</span>
            </div>
          </div>

          <div class="detail-section">
            <h4>诊断信息</h4>
            <div class="detail-row">
              <span class="detail-label">诊断结果：</span>
              <span class="detail-value diagnosis">{{ selectedRecord.diagnosis }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">检查结果：</span>
              <span class="detail-value">{{ selectedRecord.result }}</span>
            </div>
          </div>

          <div class="detail-section">
            <h4>医嘱建议</h4>
            <p class="advice-text">
              1. 规律饮食，避免暴饮暴食<br>
              2. 少食辛辣刺激性食物<br>
              3. 保持良好作息，避免熬夜<br>
              4. 3个月后复查<br>
              5. 如有不适及时就医
            </p>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="btn-close" @click="showDetailDialog = false">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
  .ml-44 {
    margin-left: 2.75rem;
  }
  .ml-17 {
    margin-left: 1.06rem;
  }
  .ml-30 {
    margin-left: 1.88rem;
  }
  .mt-19 {
    margin-top: 1.19rem;
  }
  .page {
    background: linear-gradient(135deg, #e5f7f6 0%, #f0f9ff 100%);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
  }
  .group {
    padding-bottom: 44.94rem;
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
  .content-section {
    padding: 2rem;
    background-color: #ffffff;
    border-radius: 0.5rem;
    box-shadow: 0 0.13rem 0.25rem rgba(0, 0, 0, 0.15);
    width: 81.69rem;
  }
  .pos_5 {
    position: absolute;
    right: 1.5rem;
    top: 8.63rem;
  }

  .section-title {
    font-size: 1.8rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #00baad;
  }

  .records-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .record-card {
    background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
    border-radius: 1rem;
    padding: 1.5rem;
    border: 2px solid transparent;
    box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
  }

  .record-card:hover {
    transform: translateY(-0.3rem);
    box-shadow: 0 0.8rem 2rem rgba(0, 186, 173, 0.15);
    border-color: #00baad;
  }

  .record-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid #e0f2f1;
  }

  .record-date {
    font-size: 1.3rem;
    font-weight: 700;
    color: #00baad;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .record-date::before {
    content: "📅";
    font-size: 1.2rem;
  }

  .record-badge {
    background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
    color: white;
    padding: 0.35rem 1rem;
    border-radius: 1.5rem;
    font-size: 0.85rem;
    font-weight: 600;
    box-shadow: 0 0.2rem 0.5rem rgba(76, 175, 80, 0.3);
  }

  .record-body {
    margin: 1rem 0;
  }

  .record-row {
    display: flex;
    margin-bottom: 0.8rem;
    line-height: 1.5;
  }

  .record-label {
    min-width: 5rem;
    color: #666;
    font-size: 1rem;
  }

  .record-value {
    color: #333;
    font-size: 1rem;
    flex: 1;
  }

  .record-value.diagnosis {
    color: #00baad;
    font-weight: 600;
  }

  .record-footer {
    display: flex;
    gap: 1rem;
    margin-top: 1.2rem;
    padding-top: 1rem;
    border-top: 1px solid #e0e0e0;
  }

  .btn-view,
  .btn-download {
    flex: 1;
    padding: 0.7rem 1rem;
    border: none;
    border-radius: 0.6rem;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 600;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .btn-view {
    background: linear-gradient(135deg, #00baad 0%, #00d4c5 100%);
    color: white;
    box-shadow: 0 0.2rem 0.6rem rgba(0, 186, 173, 0.3);
  }

  .btn-view:hover {
    background: linear-gradient(135deg, #009a8e 0%, #00baad 100%);
    transform: translateY(-0.15rem);
    box-shadow: 0 0.4rem 0.8rem rgba(0, 186, 173, 0.4);
  }

  .btn-download {
    background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
    color: #666;
  }

  .btn-download:hover {
    background: linear-gradient(135deg, #e0e0e0 0%, #d0d0d0 100%);
    transform: translateY(-0.15rem);
  }

  /* 弹窗样式 */
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    overflow-y: auto;
    padding: 2rem;
  }

  .dialog-box {
    background: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    max-width: 50rem;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.3);
  }

  .detail-dialog {
    max-width: 55rem;
  }

  .dialog-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #333;
    border-bottom: 2px solid #00baad;
    padding-bottom: 0.5rem;
  }

  .detail-content {
    padding: 1rem 0;
  }

  .detail-section {
    margin-bottom: 2rem;
    padding: 1rem;
    background-color: #f9f9f9;
    border-radius: 0.5rem;
  }

  .detail-section h4 {
    margin: 0 0 1rem 0;
    color: #00baad;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .detail-row {
    display: flex;
    margin-bottom: 0.8rem;
  }

  .detail-label {
    min-width: 6rem;
    color: #666;
    font-size: 1rem;
  }

  .detail-value {
    color: #333;
    font-size: 1rem;
    flex: 1;
  }

  .detail-value.diagnosis {
    color: #00baad;
    font-weight: 600;
  }

  .advice-text {
    margin: 0;
    color: #666;
    line-height: 1.8;
    font-size: 1rem;
  }

  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #e0e0e0;
  }

  .btn-close {
    padding: 0.6rem 2rem;
    border: none;
    border-radius: 0.3rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    background: #00baad;
    color: white;
  }

  .btn-close:hover {
    background: #009a8e;
  }
</style>