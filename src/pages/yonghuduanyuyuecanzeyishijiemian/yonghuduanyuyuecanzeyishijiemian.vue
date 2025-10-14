<script setup>
  import { useRouter, useRoute } from 'vue-router';
  import { ref } from 'vue';
  import PatientHeader from '../../components/PatientHeader.vue';
  import PatientSidebar from '../../components/PatientSidebar.vue';

  const props = defineProps({});

  const router = useRouter();
  const route = useRoute();

  // 获取医院信息
  const hospitalName = ref(route.query.hospitalName || '汕头大学医学院第一附属医院');

  // 医生列表数据
  const doctors = ref([
    { 
      id: 1, 
      name: '郑艺喧', 
      position: '主任医师', 
      hospital: '汕头大学医学院第一附属医院',
      specialty: '国家胃部超声影像研究中心主任，对慢性胃炎、胃息肉等疾病的超声诊断有深入研究，具有20年临床经验',
      avatar: '/dccd430e6cf4fe3e711d12bbb7b37eca.png'
    },
    { 
      id: 2, 
      name: '樊捷君', 
      position: '主任医师', 
      hospital: '汕头大学医学院第一附属医院',
      specialty: '全球前1%顶尖科学家，连续15年入选福布斯中国30岁以下精英榜，专注于胃部消化系统疾病的超声诊断与治疗',
      avatar: '/1757f022a77916296f7a6ff6f4553c90.png'
    },
    { 
      id: 3, 
      name: '彭子榕', 
      position: '主任医师', 
      hospital: '汕头大学医学院第一附属医院',
      specialty: '国家胃超声研发计划首席科学家，对胃部良恶性肿瘤的鉴别诊断、胃壁厚度测量、淋巴结评估等具有丰富经验',
      avatar: '/a8e0f299609948c136384d0f188a1354.png'
    },
    { 
      id: 4, 
      name: '陈雅欣', 
      position: '主任医师', 
      hospital: '汕头大学医学院第一附属医院',
      specialty: '在《Nature》《Cell》等顶刊发表学术论文320余篇，擅长胃部炎症性疾病、胃食管反流等的超声诊断与评估',
      avatar: '/d8e8c45f664e35d82accef4dec1dc4d0.png'
    }
  ]);

  // 预约相关状态
  const showAppointmentDialog = ref(false);
  const selectedDoctor = ref(null);
  const appointmentForm = ref({
    patientName: '沈用户',
    patientAge: '21',
    patientGender: '男',
    phone: '15889254549',
    idCard: '440513200301010001',
    appointmentDate: '',
    appointmentTime: '',
    symptoms: '',
    medicalHistory: ''
  });

  // 返回上一页
  const goBack = () => {
    router.back();
  };

  // 打开预约弹窗
  const openAppointment = (doctor) => {
    selectedDoctor.value = doctor;
    showAppointmentDialog.value = true;
  };

  // 提交预约
  const submitAppointment = () => {
    if (!appointmentForm.value.appointmentDate || !appointmentForm.value.appointmentTime) {
      alert('请选择预约日期和时间');
      return;
    }
    if (!appointmentForm.value.symptoms) {
      alert('请填写症状描述');
      return;
    }
    alert(`预约成功！\n医生：${selectedDoctor.value.name}\n时间：${appointmentForm.value.appointmentDate} ${appointmentForm.value.appointmentTime}`);
    showAppointmentDialog.value = false;
    // 重置表单
    appointmentForm.value.appointmentDate = '';
    appointmentForm.value.appointmentTime = '';
    appointmentForm.value.symptoms = '';
    appointmentForm.value.medicalHistory = '';
  };

  // 跳转到健康档案
  const goToHealthRecord = () => {
    router.push('/yonghuduanjiankangdangan');
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
      <span class="text pos_3">预约超声-选择医师</span>
    </div>
    <div class="header-bar pos_4">
      <div class="hospital-info">
        <span class="info-label">当前医院：</span>
        <span class="hospital-name">{{ hospitalName }}</span>
      </div>
      <div class="action-buttons">
        <button class="action-btn back-btn" @click="goBack">
          <span>← 返回</span>
        </button>
        <button class="action-btn health-btn" @click="goToHealthRecord">
          <span>📋 健康档案</span>
        </button>
      </div>
    </div>
    <div class="doctors-container">
      <div class="doctors-grid">
        <div 
          v-for="doctor in doctors" 
          :key="doctor.id"
          class="doctor-card"
        >
          <div class="doctor-card-inner">
            <div class="doctor-avatar-section">
              <div class="avatar-wrapper">
                <img :src="doctor.avatar" alt="医生头像" class="doctor-avatar" />
                <div class="avatar-badge">主任医师</div>
              </div>
            </div>
            
            <div class="doctor-info-section">
              <h3 class="doctor-name">{{ doctor.name }}</h3>
              <div class="doctor-meta">
                <span class="meta-item">
                  <span class="meta-icon">🏥</span>
                  <span class="meta-text">{{ doctor.hospital }}</span>
                </span>
              </div>
              
              <div class="specialty-section">
                <div class="specialty-title">
                  <span class="specialty-icon">✨</span>
                  <span>擅长领域</span>
                </div>
                <p class="specialty-content">{{ doctor.specialty }}</p>
              </div>
            </div>
            
            <button class="appointment-btn" @click="openAppointment(doctor)">
              <span class="btn-text">立即预约</span>
              <span class="btn-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 预约弹窗 -->
    <div v-if="showAppointmentDialog" class="dialog-overlay" @click="showAppointmentDialog = false">
      <div class="dialog-box appointment-dialog" @click.stop>
        <h3 class="dialog-title">预约挂号</h3>
        <div class="appointment-content">
          <div class="doctor-info-section">
            <h4>预约医生信息</h4>
            <p><strong>医生：</strong>{{ selectedDoctor?.name }} {{ selectedDoctor?.position }}</p>
            <p><strong>医院：</strong>{{ selectedDoctor?.hospital }}</p>
          </div>
          
          <div class="form-section">
            <h4>患者信息</h4>
            <div class="form-row">
              <label>姓名：</label>
              <input v-model="appointmentForm.patientName" class="form-input" />
            </div>
            <div class="form-row">
              <label>年龄：</label>
              <input v-model="appointmentForm.patientAge" class="form-input" type="number" />
            </div>
            <div class="form-row">
              <label>性别：</label>
              <select v-model="appointmentForm.patientGender" class="form-input">
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </div>
            <div class="form-row">
              <label>联系电话：</label>
              <input v-model="appointmentForm.phone" class="form-input" type="tel" />
            </div>
            <div class="form-row">
              <label>身份证号：</label>
              <input v-model="appointmentForm.idCard" class="form-input" />
            </div>
          </div>

          <div class="form-section">
            <h4>预约信息</h4>
            <div class="form-row">
              <label>预约日期：</label>
              <input v-model="appointmentForm.appointmentDate" class="form-input" type="date" />
            </div>
            <div class="form-row">
              <label>预约时间：</label>
              <select v-model="appointmentForm.appointmentTime" class="form-input">
                <option value="">请选择时间段</option>
                <option value="08:00-09:00">08:00-09:00</option>
                <option value="09:00-10:00">09:00-10:00</option>
                <option value="10:00-11:00">10:00-11:00</option>
                <option value="14:00-15:00">14:00-15:00</option>
                <option value="15:00-16:00">15:00-16:00</option>
                <option value="16:00-17:00">16:00-17:00</option>
              </select>
            </div>
            <div class="form-row">
              <label>症状描述：</label>
              <textarea v-model="appointmentForm.symptoms" class="form-textarea" rows="3" placeholder="请详细描述您的症状..."></textarea>
            </div>
            <div class="form-row">
              <label>既往病史：</label>
              <textarea v-model="appointmentForm.medicalHistory" class="form-textarea" rows="2" placeholder="请填写既往病史（选填）"></textarea>
            </div>
          </div>

          <div class="notice-section">
            <h4>注意事项</h4>
            <ul>
              <li>请提前15分钟到达医院</li>
              <li>检查前需空腹8小时以上</li>
              <li>携带相关检查资料和病历</li>
              <li>如需取消预约，请提前24小时联系医院</li>
            </ul>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="btn-cancel" @click="showAppointmentDialog = false">取消</button>
          <button class="btn-confirm" @click="submitAppointment">确认预约</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
  .ml-17 {
    margin-left: 1.06rem;
  }
  .mt-391 {
    margin-top: 24.44rem;
  }
  .ml-43 {
    margin-left: 2.69rem;
  }
  .ml-15 {
    margin-left: 0.94rem;
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
    filter: drop-shadow(0rem 0.13rem 0.13rem #00000040);
    background-color: #ffffff;
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
  .text_2 {
    color: #000000;
    font-size: 1.5rem;
    font-family: SourceHanSansCN;
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
    line-height: 1.78rem;
  }
  .pos_3 {
    position: absolute;
    left: 6.86rem;
    top: 1.96rem;
  }
  
  /* 顶部信息栏 */
  .header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem 2rem;
    background: white;
    border-radius: 1rem;
    box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.08);
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

    .doctor-card {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }
  
  .hospital-info {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
  
  .info-label {
    font-size: 1.1rem;
    color: #666;
    font-weight: 500;
  }
  
  .hospital-name {
    font-size: 1.2rem;
    color: #00baad;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
    background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%);
    border-radius: 2rem;
  }
  
  .action-buttons {
    display: flex;
    gap: 1rem;
  }
  
  .action-btn {
    padding: 0.7rem 1.8rem;
    border: none;
    border-radius: 2rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .back-btn {
    background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
    color: #333;
  }
  
  .back-btn:hover {
    background: linear-gradient(135deg, #e0e0e0 0%, #d0d0d0 100%);
    transform: translateX(-0.2rem);
  }
  
  .health-btn {
    background: linear-gradient(135deg, #00baad 0%, #00d4c5 100%);
    color: white;
  }
  
  .health-btn:hover {
    background: linear-gradient(135deg, #009a8e 0%, #00baad 100%);
    transform: translateY(-0.2rem);
    box-shadow: 0 0.5rem 1rem rgba(0, 186, 173, 0.3);
  }
  .group_2 {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .text_3 {
    color: #808080;
    font-size: 1.25rem;
    font-family: SourceHanSansCN;
    line-height: 1.16rem;
    margin-top: 0.6rem;
    margin-left: 2.6rem;
  }
  .group_3 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .text-wrapper {
    padding: 0.5rem 0.5rem;
    background-color: #ffffff;
    border-radius: 0.31rem;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
    width: 16rem;
    min-height: 2.5rem;
    height: auto;
    border: solid 0.063rem #808080;
    display: flex;
    align-items: center;
  }
  .font {
    font-size: 1.13rem;
    font-family: SourceHanSansCN;
    line-height: 1.04rem;
    color: #000000;
  }
  .text_5 {
    margin-left: 0.5rem;
    line-height: 1.05rem;
  }
  .text_4 {
    line-height: 1.04rem;
  }
  .group_4 {
    margin-right: 1.88rem;
  }
  .text-wrapper_2 {
    padding: 0.5rem 0;
    background-color: #00baad;
    border-radius: 1.36rem;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
    width: 5.94rem;
    height: 1.94rem;
  }
  .font_2 {
    font-size: 1.13rem;
    font-family: SourceHanSansCN;
    line-height: 1.04rem;
    font-weight: 700;
    color: #ffffff;
  }
  .text_6 {
    line-height: 1.05rem;
  }
  .text_7 {
    line-height: 1.05rem;
  }
  .equal-division {
    position: absolute;
    left: calc(5.31rem + 1.5rem); /* 侧边栏宽度 + 间距 */
    right: 1.5rem;
    top: 12.25rem;
  }
  .section_5 {
    padding: 1.75rem 1.5rem 5rem 1.5rem;
    background-color: #ffffff;
    border-radius: 0.31rem;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
  }
  .group_5 {
    flex: 1 1 19.7rem;
  }
  .equal-division-item {
    padding: 0.5rem 1rem;
  }
  .section_6 {
    padding: 1.13rem 0 1.63rem;
    background-color: #ffffff;
    width: 13.96rem;
    border-left: solid 0.13rem #000000;
    border-right: solid 0.13rem #000000;
    border-top: solid 0.13rem #000000;
    border-bottom: solid 0.13rem #000000;
  }
  .image_6 {
    width: 5.63rem;
    height: 5.5rem;
  }
  .font_3 {
    font-size: 1.13rem;
    font-family: SourceHanSansCN;
    line-height: 1.38rem;
    color: #000000;
  }
  .text_8 {
    margin-top: 0.75rem;
    text-align: center;
    width: 4.19rem;
  }
  .text_9 {
    margin-top: 1.25rem;
    line-height: 1.04rem;
  }
  .text_10 {
    margin-top: 1.38rem;
  }
  .text-wrapper_3 {
    padding: 1.13rem 0;
    background-color: #4bbdb5;
    width: 13.96rem;
    height: 3.44rem;
    border-left: solid 0.13rem #000000;
    border-right: solid 0.13rem #000000;
    border-top: solid 0.13rem #000000;
    border-bottom: solid 0.13rem #000000;
  }
  .text_11 {
    line-height: 1.04rem;
  }

  .ml-74 {
    margin-left: 4.63rem;
  }

  .mt-22 {
    margin-top: 1.38rem;
  }

  /* 医生专长区域样式 */
  .specialty-text {
    margin-top: 1rem;
    padding: 0 0.5rem;
    max-height: 4.5rem;
    overflow-y: auto;
    text-align: center;
  }

  .font-small {
    font-size: 0.9rem;
    font-family: SourceHanSansCN;
    line-height: 1.4rem;
    color: #666;
  }

  /* 按钮hover效果 */
  .text-wrapper_2:hover {
    background-color: #009a8e;
    transform: scale(1.05);
  }

  .text-wrapper_3:hover {
    background-color: #3a9d96;
    transform: scale(1.05);
  }

  /* 预约弹窗样式 */
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
    padding: 2rem 0;
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

  .appointment-dialog {
    max-width: 60rem;
  }

  .dialog-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #333;
    border-bottom: 2px solid #00baad;
    padding-bottom: 0.5rem;
  }

  .appointment-content {
    padding: 1rem 0;
  }

  .doctor-info-section,
  .form-section,
  .notice-section {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background-color: #f9f9f9;
    border-radius: 0.5rem;
  }

  .doctor-info-section h4,
  .form-section h4,
  .notice-section h4 {
    margin: 0 0 1rem 0;
    color: #00baad;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .doctor-info-section p {
    margin: 0.5rem 0;
    color: #333;
    font-size: 1rem;
  }

  .form-row {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1rem;
    gap: 0.5rem;
  }

  .form-row label {
    min-width: 6rem;
    font-size: 1rem;
    color: #666;
    padding-top: 0.5rem;
  }

  .form-input,
  .form-textarea {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.3rem;
    font-size: 1rem;
    font-family: SourceHanSansCN;
  }

  .form-input:focus,
  .form-textarea:focus {
    outline: none;
    border-color: #00baad;
  }

  .form-textarea {
    resize: vertical;
    min-height: 3rem;
  }

  .notice-section ul {
    margin: 0;
    padding-left: 1.5rem;
  }

  .notice-section li {
    margin: 0.5rem 0;
    color: #666;
    line-height: 1.6;
  }

  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #e0e0e0;
  }

  .btn-cancel,
  .btn-confirm {
    padding: 0.6rem 2rem;
    border: none;
    border-radius: 0.3rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
  }

  .btn-cancel {
    background: #f0f0f0;
    color: #666;
  }

  .btn-cancel:hover {
    background: #e0e0e0;
  }

  .btn-confirm {
    background: #00baad;
    color: white;
  }

  .btn-confirm:hover {
    background: #009a8e;
  }

  /* 医师卡片容器 */
  .doctors-container {
    position: absolute;
    left: calc(5.31rem + 1.5rem); /* 侧边栏宽度 + 间距 */
    right: 1.5rem;
    top: 11.5rem;
    padding: 1.5rem;
    background: white;
    border-radius: 1rem;
    box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.08);
  }

  .doctors-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.2rem;
  }

  /* 医师卡片 */
  .doctor-card {
    background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
    border-radius: 1.2rem;
    overflow: hidden;
    box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border: 2px solid transparent;
  }

  .doctor-card:hover {
    transform: translateY(-0.5rem);
    box-shadow: 0 0.8rem 2rem rgba(0, 186, 173, 0.15);
    border-color: #00baad;
  }

  .doctor-card-inner {
    padding: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  /* 医师头像区 */
  .doctor-avatar-section {
    display: flex;
    justify-content: center;
  }

  .avatar-wrapper {
    position: relative;
    display: inline-block;
  }

  .doctor-avatar {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #00baad;
    box-shadow: 0 0.2rem 0.6rem rgba(0, 186, 173, 0.2);
  }

  .avatar-badge {
    position: absolute;
    bottom: -0.25rem;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #00baad 0%, #00d4c5 100%);
    color: white;
    padding: 0.2rem 0.8rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
    box-shadow: 0 0.15rem 0.4rem rgba(0, 186, 173, 0.3);
  }

  /* 医师信息区 */
  .doctor-info-section {
    text-align: center;
  }

  .doctor-name {
    font-size: 1.15rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 0.5rem 0;
  }

  .doctor-meta {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 0.6rem;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.8rem;
    color: #666;
  }

  .meta-icon {
    font-size: 0.9rem;
  }

  .meta-text {
    font-size: 0.75rem;
    display: none;
  }

  /* 擅长领域区 */
  .specialty-section {
    background: linear-gradient(135deg, #e0f2f1 0%, #f0f9ff 100%);
    padding: 0.8rem;
    border-radius: 0.6rem;
    text-align: left;
    min-height: 8.5rem;
    max-height: 8.5rem;
    overflow: hidden;
  }

  .specialty-title {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: #00baad;
    margin-bottom: 0.4rem;
  }

  .specialty-icon {
    font-size: 0.9rem;
  }

  .specialty-content {
    margin: 0;
    font-size: 0.8rem;
    line-height: 1.5;
    color: #4b5563;
    text-align: justify;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* 预约按钮 */
  .appointment-btn {
    width: 100%;
    padding: 0.7rem;
    background: linear-gradient(135deg, #00baad 0%, #00d4c5 100%);
    color: white;
    border: none;
    border-radius: 0.6rem;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    transition: all 0.3s ease;
    box-shadow: 0 0.2rem 0.6rem rgba(0, 186, 173, 0.3);
    position: relative;
    overflow: hidden;
  }

  .appointment-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
  }

  .appointment-btn:hover::before {
    left: 100%;
  }

  .appointment-btn:hover {
    background: linear-gradient(135deg, #009a8e 0%, #00baad 100%);
    transform: translateY(-0.2rem);
    box-shadow: 0 0.5rem 1.2rem rgba(0, 186, 173, 0.4);
  }

  .btn-text {
    position: relative;
    z-index: 1;
  }

  .btn-arrow {
    position: relative;
    z-index: 1;
    font-size: 1.1rem;
    transition: transform 0.3s ease;
  }

  .appointment-btn:hover .btn-arrow {
    transform: translateX(0.3rem);
  }

  /* 隐藏医院名称文字，只显示图标 */
  @media (max-width: 1920px) {
    .meta-text {
      display: none;
    }
  }
</style>