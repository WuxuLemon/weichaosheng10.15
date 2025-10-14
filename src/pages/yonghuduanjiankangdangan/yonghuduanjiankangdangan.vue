<script setup>
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import PatientHeader from '../../components/PatientHeader.vue';
  import PatientSidebar from '../../components/PatientSidebar.vue';
  import { getMediaUrl } from '../../utils/media.js';

  const props = defineProps({});

  const router = useRouter();

  // 健康档案数据
  const healthRecords = ref([
    {
      id: 1,
      date: '2025-10-07',
      hospital: '汕头大学医学院第一附属医院',
      doctor: '郑艺喧',
      diagnosis: '胃大部分切除术后，残存胃壁未见异常肿块，吻合口未见狭窄',
      diagnosisDetail: '上腹部超声所见，警惕腹内疝可能',
      result: '患者空腹饮用胃肠超声造影剂充盈后检查：\n       胃大部分切除术后，超声造影剂进入贲门顺畅，食管下段近贲门入口处结构正常，胃充盈尚好，贲门未见明显返流，胃-空肠吻合口未见狭窄，残存胃壁层次清晰，粘膜面稍毛糙，皱襞略肿胀，胃腔内未见明显肿块及溃疡灶回声，动态观察，蠕动尚好，吻合口见造影剂往返流动。上腹部见肠系膜血管走形呈半螺旋状，似见条状低回声，部分小肠袢呈U型。',
      images: 3,
      ultraSoundImages: [
        getMediaUrl('/original/0044_weidi1_1165.jpg'),
        getMediaUrl('/original/0044_weidi1_1166.jpg')
      ]
    },
    {
      id: 2,
      date: '2025-06-05',
      hospital: '汕头大学医学院第一附属医院',
      doctor: '郑艺喧',
      diagnosis: '胃Ca伴胃窦腔狭窄，周围多发转移性淋巴结',
      diagnosisDetail: '肝脏多发占位病灶，结合超声造影，考虑转移性肝Ca\n肝门静脉右支管腔内低回声团块，结合超声造影，考虑Ca栓',
      result: '患者空腹饮用胃肠超声造影剂充盈后检查：\n       超声造影剂进入贲门顺畅，食管下段近贲门入口处、胃形态结构正常，贲门未见明显返流，胃角至胃窦处胃壁不规则增厚，较厚约21mm，累及长度约87mm，胃壁层次不清，浆膜层与周围组织界限不清，蠕动明显减弱，胃窦腔狭窄，仅少量造影剂通过，十二指肠充盈欠佳。周围见多个低回声结节，较大约18*15mm，边界尚清，CDFI内见点状血流信号；其余胃壁层次清晰，粘膜面稍毛糙，皱襞略肿胀。\n\n经静脉超声造影观察：胃壁不规则肿块动脉期呈高增强，静脉期廓清呈低增强。肝内不均质回声团块呈动脉期高增强，门脉期逐渐廓清呈低增强，延迟期肝脏扫查见多个低增强病灶，较大约28*26mm。门静脉右支管腔内低回声团见持续增强。',
      images: 2,
      ultraSoundImages: [
        getMediaUrl('/original/0044_weidi1_379.jpg'),
        getMediaUrl('/original/0044_weidi1_380.jpg')
      ]
    },
    {
      id: 3,
      date: '2025-02-20',
      hospital: '汕头大学医学院第一附属医院',
      doctor: '郑艺喧',
      diagnosis: '慢性浅表性胃炎改变',
      diagnosisDetail: '',
      result: '患者空腹饮用胃肠超声造影剂充盈后检查：\n       超声造影剂进入贲门顺畅，食管下段近贲门入口处、胃形态结构正常，胃充盈后胃下缘位于脐下方62mm，贲门未见明显返流，胃壁层次清晰，粘膜面稍毛糙，皱襞略肿胀，胃腔内未见明显肿块及溃疡灶回声，动态观察，蠕动良好，幽门未见明显返流。十二指肠球部、降部、水平部形态结构正常，肠壁未见异常肿块及溃疡灶回声。',
      images: 4,
      ultraSoundImages: [
        getMediaUrl('/original/0044_weidi1_381.jpg'),
        getMediaUrl('/original/0044_weidi1_382.jpg')
      ]
    }
  ]);

  // 选中的档案
  const selectedRecord = ref(null);
  const showDetailDialog = ref(false);

  // 图像预览
  const showImagePreview = ref(false);
  const currentPreviewImage = ref('');

  // 查看详情
  const viewDetail = (record) => {
    selectedRecord.value = record;
    showDetailDialog.value = true;
  };

  // 查看图像
  const viewImage = (imageSrc) => {
    currentPreviewImage.value = imageSrc;
    showImagePreview.value = true;
  };

  // 下载报告
  const downloadReport = (record) => {
    alert(`已成功下载\n报告日期：${record.date}`);
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
              <span class="record-label">检查提示：</span>
              <span class="record-value diagnosis">{{ record.diagnosis }}</span>
            </div>
            <div class="record-row full-width">
              <span class="record-label">检查所见：</span>
              <span class="record-value result-text">{{ record.result }}</span>
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
            <h4>检查所见</h4>
            <p class="result-text" style="white-space: pre-line;">{{ selectedRecord.result }}</p>
          </div>

          <div class="detail-section">
            <h4>检查提示</h4>
            <div class="diagnosis-box">
              <p class="diagnosis-main">{{ selectedRecord.diagnosis }}</p>
              <p v-if="selectedRecord.diagnosisDetail" class="diagnosis-detail" style="white-space: pre-line;">{{ selectedRecord.diagnosisDetail }}</p>
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

          <div class="detail-section">
            <h4>超声图像</h4>
            <div class="ultrasound-images">
              <div 
                v-for="(image, idx) in selectedRecord.ultraSoundImages" 
                :key="idx"
                class="ultrasound-image-item"
                @click="viewImage(image)"
              >
                <img :src="image" :alt="`超声图像${idx + 1}`" class="ultrasound-thumbnail" />
                <div class="image-overlay">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="btn-close" @click="showDetailDialog = false">关闭</button>
        </div>
      </div>
    </div>

    <!-- 图像预览弹窗 -->
    <div v-if="showImagePreview" class="dialog-overlay preview-overlay" @click="showImagePreview = false">
      <div class="image-preview-dialog" @click.stop>
        <div class="preview-header">
          <h3 class="preview-title">超声图像</h3>
          <button class="btn-close-preview" @click="showImagePreview = false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
        <div class="preview-image-container">
          <img :src="currentPreviewImage" alt="超声图像" class="preview-full-image" />
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
    min-height: 100vh; /* 最小高度为视口高度，确保铺满屏幕 */
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
  }
  .pos_5 {
    position: absolute;
    left: calc(5.31rem + 1.5rem); /* 侧边栏宽度 + 间距 */
    right: 1.5rem;
    top: 8.63rem;
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
      top: 7rem;
    }

    .content-section {
      padding: 1rem;
    }
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

  .record-row.full-width {
    flex-direction: column;
  }

  .record-label {
    min-width: 5rem;
    color: #666;
    font-size: 1rem;
    font-weight: 600;
  }

  .record-value {
    color: #333;
    font-size: 1rem;
    flex: 1;
  }

  .record-value.diagnosis {
    color: #00baad;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 1.6;
  }

  .record-value.result-text {
    margin-top: 0.5rem;
    white-space: pre-line;
    line-height: 1.8;
    color: #555;
    max-height: 7.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    word-break: break-word;
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

  .result-text {
    margin: 0;
    color: #555;
    line-height: 1.8;
    font-size: 1rem;
    text-align: justify;
  }

  .diagnosis-box {
    background: linear-gradient(135deg, #e0f7f5 0%, #f0fcfb 100%);
    border-left: 0.25rem solid #00baad;
    padding: 1rem;
    border-radius: 0.5rem;
  }

  .diagnosis-main {
    margin: 0 0 0.8rem 0;
    color: #00baad;
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1.6;
  }

  .diagnosis-detail {
    margin: 0;
    color: #d35400;
    font-size: 1rem;
    line-height: 1.8;
    font-weight: 500;
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

  /* 超声图像展示 */
  .ultrasound-images {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .ultrasound-image-item {
    position: relative;
    border-radius: 0.5rem;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid #e0e0e0;
    aspect-ratio: 4/3;
  }

  .ultrasound-image-item:hover {
    transform: scale(1.05);
    box-shadow: 0 0.5rem 1.5rem rgba(0, 186, 173, 0.3);
    border-color: #00baad;
  }

  .ultrasound-thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .ultrasound-image-item:hover .image-overlay {
    opacity: 1;
  }

  /* 图像预览弹窗 */
  .preview-overlay {
    z-index: 11000;
    background: rgba(0, 0, 0, 0.85);
  }

  .image-preview-dialog {
    background: white;
    border-radius: 0.75rem;
    overflow: hidden;
    max-width: 90vw;
    max-height: 90vh;
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
  }

  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    border-bottom: 2px solid #e0e0e0;
    background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  }

  .preview-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .btn-close-preview {
    background: transparent;
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
    background: #f0f0f0;
    color: #000;
  }

  .preview-image-container {
    padding: 2rem;
    background: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(90vh - 6rem);
    overflow: hidden;
  }

  .preview-full-image {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: 0.5rem;
    box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.2);
  }
</style>