<script setup>
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import PatientHeader from '../../components/PatientHeader.vue';
  import PatientSidebar from '../../components/PatientSidebar.vue';

  const props = defineProps({});

  const router = useRouter();

  // 挂号记录数据
  const appointmentRecords = ref([
    { 
      id: 'APT001', 
      date: '2025-10-07', 
      hospital: '汕头大学医学院第一附属医院',
      doctor: '郑艺喧',
      department: '消化内科',
      time: '上午 09:30',
      status: '已完成'
    },
    { 
      id: 'APT002', 
      date: '2025-06-05', 
      hospital: '汕头大学医学院第一附属医院',
      doctor: '郑艺喧',
      department: '消化内科',
      time: '下午 14:00',
      status: '已完成'
    },
    { 
      id: 'APT003', 
      date: '2025-02-20', 
      hospital: '汕头大学医学院第一附属医院',
      doctor: '郑艺喧',
      department: '消化内科',
      time: '上午 10:00',
      status: '已完成'
    }
  ]);

  // 我的病例数据（健康档案）
  const myCases = ref([
    {
      id: 'CASE001',
      date: '2025-10-07',
      hospital: '汕头大学医学院第一附属医院',
      doctor: '郑艺喧',
      diagnosis: '胃大部分切除术后，残存胃壁未见异常肿块，吻合口未见狭窄',
      diagnosisDetail: '上腹部超声所见，警惕腹内疝可能',
      result: '患者空腹饮用胃肠超声造影剂充盈后检查：\n       胃大部分切除术后，超声造影剂进入贲门顺畅，食管下段近贲门入口处结构正常，胃充盈尚好，贲门未见明显返流，胃-空肠吻合口未见狭窄，残存胃壁层次清晰，粘膜面稍毛糙，皱襞略肿胀，胃腔内未见明显肿块及溃疡灶回声，动态观察，蠕动尚好，吻合口见造影剂往返流动。上腹部见肠系膜血管走形呈半螺旋状，似见条状低回声，部分小肠袢呈U型。',
      image: '/original/0044_weidi1_1165.jpg',
      ultraSoundImages: [
        '/original/0044_weidi1_1165.jpg',
        '/original/0044_weidi1_1166.jpg'
      ]
    },
    {
      id: 'CASE002',
      date: '2025-06-05',
      hospital: '汕头大学医学院第一附属医院',
      doctor: '郑艺喧',
      diagnosis: '胃Ca伴胃窦腔狭窄，周围多发转移性淋巴结',
      diagnosisDetail: '肝脏多发占位病灶，结合超声造影，考虑转移性肝Ca\n肝门静脉右支管腔内低回声团块，结合超声造影，考虑Ca栓',
      result: '患者空腹饮用胃肠超声造影剂充盈后检查：\n       超声造影剂进入贲门顺畅，食管下段近贲门入口处、胃形态结构正常，贲门未见明显返流，胃角至胃窦处胃壁不规则增厚，较厚约21mm，累及长度约87mm，胃壁层次不清，浆膜层与周围组织界限不清，蠕动明显减弱，胃窦腔狭窄，仅少量造影剂通过，十二指肠充盈欠佳。周围见多个低回声结节，较大约18*15mm，边界尚清，CDFI内见点状血流信号；其余胃壁层次清晰，粘膜面稍毛糙，皱襞略肿胀。\n\n经静脉超声造影观察：胃壁不规则肿块动脉期呈高增强，静脉期廓清呈低增强。肝内不均质回声团块呈动脉期高增强，门脉期逐渐廓清呈低增强，延迟期肝脏扫查见多个低增强病灶，较大约28*26mm。门静脉右支管腔内低回声团见持续增强。',
      image: '/original/0044_weidi1_379.jpg',
      ultraSoundImages: [
        '/original/0044_weidi1_379.jpg',
        '/original/0044_weidi1_380.jpg'
      ]
    },
    {
      id: 'CASE003',
      date: '2025-02-20',
      hospital: '汕头大学医学院第一附属医院',
      doctor: '郑艺喧',
      diagnosis: '慢性浅表性胃炎改变',
      diagnosisDetail: '',
      result: '患者空腹饮用胃肠超声造影剂充盈后检查：\n       超声造影剂进入贲门顺畅，食管下段近贲门入口处、胃形态结构正常，胃充盈后胃下缘位于脐下方62mm，贲门未见明显返流，胃壁层次清晰，粘膜面稍毛糙，皱襞略肿胀，胃腔内未见明显肿块及溃疡灶回声，动态观察，蠕动良好，幽门未见明显返流。十二指肠球部、降部、水平部形态结构正常，肠壁未见异常肿块及溃疡灶回声。',
      image: '/original/0044_weidi1_381.jpg',
      ultraSoundImages: [
        '/original/0044_weidi1_381.jpg',
        '/original/0044_weidi1_382.jpg'
      ]
    }
  ]);

  // 我的图像数据（超声图像）
  const myImages = ref([
    { id: 'IMG001', name: '2025-10-07 超声图像', date: '2025-10-07', image: '/original/0044_weidi1_1165.jpg' },
    { id: 'IMG002', name: '2025-10-07 超声图像', date: '2025-10-07', image: '/original/0044_weidi1_1166.jpg' },
    { id: 'IMG003', name: '2025-06-05 超声图像', date: '2025-06-05', image: '/original/0044_weidi1_379.jpg' },
    { id: 'IMG004', name: '2025-06-05 超声图像', date: '2025-06-05', image: '/original/0044_weidi1_380.jpg' },
    { id: 'IMG005', name: '2025-02-20 超声图像', date: '2025-02-20', image: '/original/0044_weidi1_381.jpg' },
    { id: 'IMG006', name: '2025-02-20 超声图像', date: '2025-02-20', image: '/original/0044_weidi1_382.jpg' }
  ]);

  // 显示/隐藏详细列表的标志
  const showAppointmentDialog = ref(false);
  const showCasesDialog = ref(false);
  const showImagesDialog = ref(false);

  // 病例详情
  const showCaseDetailDialog = ref(false);
  const selectedCase = ref(null);

  // 图像预览
  const showImagePreview = ref(false);
  const currentPreviewImage = ref('');

  // 点击挂号记录
  const viewAppointments = () => {
    showAppointmentDialog.value = true;
  };

  // 点击我的病例
  const viewCases = () => {
    showCasesDialog.value = true;
  };

  // 点击我的图像
  const viewImages = () => {
    showImagesDialog.value = true;
  };

  // 查看图像
  const viewImage = (imageSrc) => {
    currentPreviewImage.value = imageSrc;
    showImagePreview.value = true;
  };

  // 查看病例详情
  const viewCaseDetail = (caseItem) => {
    selectedCase.value = caseItem;
    showCaseDetailDialog.value = true;
  };

  // 下载报告
  const downloadReport = (caseItem) => {
    alert(`已成功下载\n报告日期：${caseItem.date}`);
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
          <div class="feature-item" @click="viewAppointments" style="cursor: pointer;">
            <img
              class="image_7"
              src="/0ee840bc6e75af399903178b63cc4c9a.png"
            />
          </div>
          <div class="feature-item ml-122" @click="viewCases" style="cursor: pointer;">
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
          <span class="font text_4" @click="viewAppointments" style="cursor: pointer;">挂号记录</span>
          <span class="font ml-148" @click="viewCases" style="cursor: pointer;">我的病例</span>
          <span class="font ml-148" @click="viewImages" style="cursor: pointer;">我的图像</span>
        </div>
      </div>
    </div>

    <!-- 挂号记录弹窗 -->
    <div v-if="showAppointmentDialog" class="dialog-overlay" @click="showAppointmentDialog = false">
      <div class="dialog-box large-dialog" @click.stop>
        <div class="dialog-header">
          <h3 class="dialog-title">挂号记录</h3>
          <button class="btn-close-header" @click="showAppointmentDialog = false">✕</button>
        </div>
        <div class="dialog-content">
          <div 
            v-for="record in appointmentRecords" 
            :key="record.id"
            class="appointment-card"
          >
            <div class="card-header">
              <div class="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10z"/>
                </svg>
              </div>
              <div class="card-title-section">
                <h4 class="card-title">{{ record.hospital }}</h4>
                <span class="card-date">{{ record.date }}</span>
              </div>
              <span class="status-badge">{{ record.status }}</span>
            </div>
            <div class="card-body">
              <div class="info-row">
                <span class="info-label">就诊医生：</span>
                <span class="info-value">{{ record.doctor }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">就诊科室：</span>
                <span class="info-value">{{ record.department }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">预约时间：</span>
                <span class="info-value">{{ record.time }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="btn-primary" @click="showAppointmentDialog = false">关闭</button>
        </div>
      </div>
    </div>

    <!-- 我的病例弹窗 -->
    <div v-if="showCasesDialog" class="dialog-overlay" @click="showCasesDialog = false">
      <div class="dialog-box large-dialog" @click.stop>
        <div class="dialog-header">
          <h3 class="dialog-title">我的病例</h3>
          <button class="btn-close-header" @click="showCasesDialog = false">✕</button>
        </div>
        <div class="dialog-content">
          <div 
            v-for="caseItem in myCases" 
            :key="caseItem.id"
            class="case-card"
          >
            <div class="case-image-wrapper">
              <img :src="caseItem.image" :alt="caseItem.date" class="case-image" @click="viewImage(caseItem.image)" />
              <div class="image-overlay-icon" @click="viewImage(caseItem.image)">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </div>
            </div>
            <div class="case-info">
              <div class="case-header">
                <div class="case-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.20.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
                  </svg>
                </div>
                <div class="case-title-section">
                  <h4 class="case-title">{{ caseItem.hospital }}</h4>
                  <span class="case-date">{{ caseItem.date }}</span>
                </div>
              </div>
              <div class="case-body">
                <div class="info-row">
                  <span class="info-label">主治医师：</span>
                  <span class="info-value">{{ caseItem.doctor }}</span>
                </div>
                <div class="info-row full-width">
                  <span class="info-label">检查提示：</span>
                  <p class="diagnosis-text">{{ caseItem.diagnosis }}</p>
                </div>
                <button class="btn-view-detail" @click.stop="viewCaseDetail(caseItem)">查看完整病例</button>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="btn-primary" @click="showCasesDialog = false">关闭</button>
        </div>
      </div>
    </div>

    <!-- 我的图像弹窗 -->
    <div v-if="showImagesDialog" class="dialog-overlay" @click="showImagesDialog = false">
      <div class="dialog-box large-dialog" @click.stop>
        <div class="dialog-header">
          <h3 class="dialog-title">我的图像</h3>
          <button class="btn-close-header" @click="showImagesDialog = false">✕</button>
        </div>
        <div class="dialog-content">
          <div class="images-grid">
            <div 
              v-for="imageItem in myImages" 
              :key="imageItem.id"
              class="image-card"
              @click="viewImage(imageItem.image)"
            >
              <div class="image-wrapper">
                <img :src="imageItem.image" :alt="imageItem.name" class="grid-image" />
                <div class="image-hover-overlay">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                </div>
              </div>
              <div class="image-info">
                <span class="image-name">{{ imageItem.name }}</span>
                <span class="image-date">{{ imageItem.date }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="btn-primary" @click="showImagesDialog = false">关闭</button>
        </div>
      </div>
    </div>

    <!-- 病例详情弹窗 -->
    <div v-if="showCaseDetailDialog && selectedCase" class="dialog-overlay" @click="showCaseDetailDialog = false">
      <div class="dialog-box detail-dialog" @click.stop>
        <div class="dialog-header">
          <h3 class="dialog-title">检查报告详情</h3>
          <button class="btn-close-header" @click="showCaseDetailDialog = false">✕</button>
        </div>
        <div class="dialog-content detail-content">
          <!-- 基本信息 -->
          <div class="detail-section">
            <h4 class="section-title">基本信息</h4>
            <div class="detail-info-grid">
              <div class="detail-info-item">
                <span class="detail-label">检查日期：</span>
                <span class="detail-value">{{ selectedCase.date }}</span>
              </div>
              <div class="detail-info-item">
                <span class="detail-label">主治医师：</span>
                <span class="detail-value">{{ selectedCase.doctor }}</span>
              </div>
              <div class="detail-info-item full-width">
                <span class="detail-label">检查医院：</span>
                <span class="detail-value">{{ selectedCase.hospital }}</span>
              </div>
            </div>
          </div>

          <!-- 检查所见 -->
          <div class="detail-section">
            <h4 class="section-title">检查所见</h4>
            <p class="result-text">{{ selectedCase.result }}</p>
          </div>

          <!-- 检查提示 -->
          <div class="detail-section">
            <h4 class="section-title">检查提示</h4>
            <div class="diagnosis-box">
              <p class="diagnosis-main">{{ selectedCase.diagnosis }}</p>
              <p v-if="selectedCase.diagnosisDetail" class="diagnosis-detail">{{ selectedCase.diagnosisDetail }}</p>
            </div>
          </div>

          <!-- 超声图像 -->
          <div class="detail-section">
            <h4 class="section-title">超声图像</h4>
            <div class="ultrasound-images">
              <div 
                v-for="(image, idx) in selectedCase.ultraSoundImages" 
                :key="idx"
                class="ultrasound-image-item"
                @click="viewImage(image)"
              >
                <img :src="image" :alt="`超声图像${idx + 1}`" class="ultrasound-thumbnail" />
                <div class="image-overlay">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="btn-secondary" @click="downloadReport(selectedCase)">下载报告</button>
          <button class="btn-primary" @click="showCaseDetailDialog = false">关闭</button>
        </div>
      </div>
    </div>

    <!-- 图像预览弹窗 -->
    <div v-if="showImagePreview" class="dialog-overlay preview-overlay" @click="showImagePreview = false">
      <div class="image-preview-dialog" @click.stop>
        <div class="preview-header">
          <h3 class="preview-title">超声图像</h3>
          <button class="btn-close-preview" @click="showImagePreview = false">✕</button>
        </div>
        <div class="preview-image-container">
          <img :src="currentPreviewImage" alt="超声图像" class="preview-full-image" />
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
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .dialog-box {
    background: white;
    border-radius: 0.75rem;
    box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.3);
    width: 50rem;
    max-height: 85vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .large-dialog {
    width: 65rem;
    max-width: 90vw;
  }

  .dialog-header {
    background: linear-gradient(135deg, #4bbdb5 0%, #3a9d96 100%);
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .dialog-title {
    font-size: 1.75rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
    color: white;
    margin: 0;
  }

  .btn-close-header {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: none;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: 700;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-close-header:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
  }

  .dialog-content {
    padding: 2rem;
    max-height: 60vh;
    overflow-y: auto;
  }

  .dialog-footer {
    padding: 1.5rem 2rem;
    border-top: 0.063rem solid #e0e0e0;
    display: flex;
    justify-content: flex-end;
    background: #f8f9fa;
  }

  .btn-primary {
    background: linear-gradient(135deg, #4bbdb5 0%, #3a9d96 100%);
    color: white;
    border: none;
    border-radius: 0.5rem;
    padding: 0.75rem 2.5rem;
    cursor: pointer;
    font-size: 1.13rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
    transition: all 0.3s;
    box-shadow: 0 0.25rem 0.75rem rgba(75, 189, 181, 0.3);
  }

  .btn-primary:hover {
    transform: translateY(-0.125rem);
    box-shadow: 0 0.5rem 1rem rgba(75, 189, 181, 0.4);
  }

  /* 挂号记录卡片样式 */
  .appointment-card {
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    border-radius: 0.75rem;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border: 0.063rem solid #e0e0e0;
    transition: all 0.3s;
    box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.08);
  }

  .appointment-card:hover {
    transform: translateY(-0.25rem);
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.15);
    border-color: #4bbdb5;
  }

  .card-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 0.063rem solid #e0e0e0;
  }

  .card-icon {
    width: 3rem;
    height: 3rem;
    background: linear-gradient(135deg, #4bbdb5 0%, #3a9d96 100%);
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
    margin-right: 1rem;
    box-shadow: 0 0.25rem 0.75rem rgba(75, 189, 181, 0.3);
  }

  .card-title-section {
    flex: 1;
  }

  .card-title {
    font-size: 1.25rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
    color: #333;
    margin: 0 0 0.25rem 0;
  }

  .card-date {
    font-size: 0.94rem;
    font-family: SourceHanSansCN;
    color: #808080;
  }

  .status-badge {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    padding: 0.375rem 1rem;
    border-radius: 1.25rem;
    font-size: 0.88rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
  }

  .card-body {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .info-row {
    display: flex;
    align-items: flex-start;
  }

  .info-row.full-width {
    flex-direction: column;
  }

  .info-label {
    font-size: 1rem;
    font-family: SourceHanSansCN;
    color: #666;
    font-weight: 600;
    min-width: 7rem;
  }

  .info-value {
    font-size: 1rem;
    font-family: SourceHanSansCN;
    color: #333;
  }

  /* 病例卡片样式 */
  .case-card {
    background: white;
    border-radius: 0.75rem;
    margin-bottom: 1.5rem;
    border: 0.063rem solid #e0e0e0;
    overflow: hidden;
    transition: all 0.3s;
    box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.08);
    display: flex;
  }

  .case-card:hover {
    transform: translateY(-0.25rem);
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.15);
    border-color: #4bbdb5;
  }

  .case-image-wrapper {
    position: relative;
    width: 18rem;
    flex-shrink: 0;
    cursor: pointer;
    overflow: hidden;
  }

  .case-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  .case-image-wrapper:hover .case-image {
    transform: scale(1.05);
  }

  .image-overlay-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .case-image-wrapper:hover .image-overlay-icon {
    opacity: 1;
  }

  .case-info {
    flex: 1;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
  }

  .case-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 0.063rem solid #e0e0e0;
  }

  .case-icon {
    width: 2.5rem;
    height: 2.5rem;
    background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
    margin-right: 1rem;
  }

  .case-title-section {
    flex: 1;
  }

  .case-title {
    font-size: 1.13rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
    color: #333;
    margin: 0 0 0.25rem 0;
  }

  .case-date {
    font-size: 0.88rem;
    font-family: SourceHanSansCN;
    color: #808080;
  }

  .case-body {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    flex: 1;
  }

  .diagnosis-text {
    font-size: 1rem;
    font-family: SourceHanSansCN;
    color: #555;
    line-height: 1.8;
    margin: 0.5rem 0 0 0;
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 0.5rem;
    border-left: 0.25rem solid #4bbdb5;
  }

  .btn-view-detail {
    background: linear-gradient(135deg, #4bbdb5 0%, #3a9d96 100%);
    color: white;
    border: none;
    border-radius: 0.5rem;
    padding: 0.625rem 1.5rem;
    cursor: pointer;
    font-size: 1rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
    transition: all 0.3s;
    margin-top: auto;
    align-self: flex-start;
    box-shadow: 0 0.25rem 0.75rem rgba(75, 189, 181, 0.3);
  }

  .btn-view-detail:hover {
    transform: translateY(-0.125rem);
    box-shadow: 0 0.375rem 1rem rgba(75, 189, 181, 0.4);
  }

  /* 图像网格样式 */
  .images-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    gap: 1.5rem;
  }

  .image-card {
    background: white;
    border-radius: 0.75rem;
    overflow: hidden;
    border: 0.063rem solid #e0e0e0;
    transition: all 0.3s;
    cursor: pointer;
    box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.08);
  }

  .image-card:hover {
    transform: translateY(-0.375rem);
    box-shadow: 0 0.75rem 2rem rgba(0, 0, 0, 0.15);
    border-color: #4bbdb5;
  }

  .image-wrapper {
    position: relative;
    width: 100%;
    height: 12rem;
    overflow: hidden;
    background: #f0f0f0;
  }

  .grid-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  .image-card:hover .grid-image {
    transform: scale(1.1);
  }

  .image-hover-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .image-card:hover .image-hover-overlay {
    opacity: 1;
  }

  .image-info {
    padding: 1rem;
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  }

  .image-name {
    display: block;
    font-size: 1rem;
    font-family: SourceHanSansCN;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.25rem;
  }

  .image-date {
    display: block;
    font-size: 0.88rem;
    font-family: SourceHanSansCN;
    color: #808080;
  }

  /* 图像预览弹窗 */
  .preview-overlay {
    z-index: 1100;
    background-color: rgba(0, 0, 0, 0.85);
  }

  .image-preview-dialog {
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
    background: linear-gradient(135deg, #4bbdb5 0%, #3a9d96 100%);
    padding: 1.25rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .preview-title {
    font-size: 1.5rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
    color: white;
    margin: 0;
  }

  .btn-close-preview {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: none;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: 700;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-close-preview:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
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

  /* 病例详情弹窗 */
  .detail-dialog {
    width: 70rem;
    max-width: 90vw;
  }

  .detail-content {
    padding: 2rem 2.5rem;
  }

  .detail-section {
    margin-bottom: 2rem;
  }

  .detail-section:last-child {
    margin-bottom: 0;
  }

  .section-title {
    font-size: 1.25rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
    color: #333;
    margin: 0 0 1rem 0;
    padding-bottom: 0.75rem;
    border-bottom: 0.125rem solid #4bbdb5;
    display: inline-block;
  }

  .detail-info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 0.5rem;
  }

  .detail-info-item {
    display: flex;
    align-items: center;
  }

  .detail-info-item.full-width {
    grid-column: 1 / -1;
  }

  .detail-label {
    font-size: 1rem;
    font-family: SourceHanSansCN;
    font-weight: 600;
    color: #666;
    min-width: 7rem;
  }

  .detail-value {
    font-size: 1rem;
    font-family: SourceHanSansCN;
    color: #333;
  }

  .result-text {
    font-size: 1rem;
    font-family: SourceHanSansCN;
    color: #555;
    line-height: 1.8;
    white-space: pre-line;
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin: 0;
    border-left: 0.25rem solid #4bbdb5;
  }

  .diagnosis-box {
    background: linear-gradient(135deg, #fff9e6 0%, #fff4d6 100%);
    padding: 1.5rem;
    border-radius: 0.5rem;
    border-left: 0.25rem solid #f59e0b;
  }

  .diagnosis-main {
    font-size: 1.13rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
    color: #333;
    margin: 0 0 0.5rem 0;
    line-height: 1.8;
  }

  .diagnosis-detail {
    font-size: 1rem;
    font-family: SourceHanSansCN;
    color: #555;
    margin: 0;
    line-height: 1.8;
    white-space: pre-line;
  }

  .ultrasound-images {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .ultrasound-image-item {
    position: relative;
    cursor: pointer;
    border-radius: 0.5rem;
    overflow: hidden;
    border: 0.125rem solid #e0e0e0;
    transition: all 0.3s;
    aspect-ratio: 4 / 3;
  }

  .ultrasound-image-item:hover {
    transform: translateY(-0.25rem);
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.15);
    border-color: #4bbdb5;
  }

  .ultrasound-thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  .ultrasound-image-item:hover .ultrasound-thumbnail {
    transform: scale(1.05);
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .ultrasound-image-item:hover .image-overlay {
    opacity: 1;
  }

  .btn-secondary {
    background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
    color: white;
    border: none;
    border-radius: 0.5rem;
    padding: 0.75rem 2.5rem;
    cursor: pointer;
    font-size: 1.13rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
    transition: all 0.3s;
    box-shadow: 0 0.25rem 0.75rem rgba(107, 114, 128, 0.3);
    margin-right: 1rem;
  }

  .btn-secondary:hover {
    transform: translateY(-0.125rem);
    box-shadow: 0 0.5rem 1rem rgba(107, 114, 128, 0.4);
  }

  .mt-28 {
    margin-top: 1.75rem;
  }
</style>