<script setup>
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import PatientHeader from '../../components/PatientHeader.vue';
  import PatientSidebar from '../../components/PatientSidebar.vue';

  const props = defineProps({});

  const router = useRouter();
  
  // 平台服务流程弹窗
  const showServiceFlowDialog = ref(false);
  
  // 在线客服弹窗
  const showCustomerServiceDialog = ref(false);
  
  // 认识胃部弹窗
  const showStomachInfoDialog = ref(false);

  // 点击了解更多
  const goToAboutUs = () => {
    router.push('/lejiewomen');
  };

  // 点击平台服务流程
  const showServiceFlow = () => {
    showServiceFlowDialog.value = true;
  };

  // 点击医生预约挂号
  const goToHospitalSelection = () => {
    router.push('/yonghuduanyuyuecnzeyiyuanjiemian');
  };

  // 点击在线客服
  const showCustomerService = () => {
    showCustomerServiceDialog.value = true;
  };
  
  // 点击认识胃部
  const showStomachInfo = () => {
    showStomachInfoDialog.value = true;
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
        class="image pos"
        src="/404328c3067e67794ebad8ca57c1c196.png"
      />
      <span class="font text pos_5">预约超声-首页</span>
    </div>
    <div class="main-content pos_8">
      <!-- 左侧功能区 -->
      <div class="sidebar-functions">
        <div class="function-card" @click="showStomachInfo" style="cursor: pointer;">
          <div class="function-icon stomach-icon">🔬</div>
          <h3 class="function-title">认识胃部</h3>
          <p class="function-desc">了解胃部结构与常见疾病</p>
        </div>
        
        <div class="function-section">
          <h3 class="section-header">快速服务</h3>
          <button class="service-btn primary" @click="showServiceFlow">
            <span class="btn-icon">📋</span>
            <span class="btn-text">平台服务流程</span>
          </button>
          <button class="service-btn secondary" @click="goToHospitalSelection">
            <span class="btn-icon">🏥</span>
            <span class="btn-text">医生预约挂号</span>
          </button>
          <button class="service-btn tertiary" @click="showCustomerService">
            <span class="btn-icon">💬</span>
            <span class="btn-text">在线客服</span>
          </button>
        </div>
      </div>

      <!-- 右侧介绍区 -->
      <div class="intro-section">
        <div class="intro-card">
          <div class="intro-header">
            <div class="header-icon">🩺</div>
            <h1 class="intro-title">胃部疾病超声影像<br/>智能辅助诊断系统</h1>
          </div>
          <div class="intro-content">
            <p class="intro-text">
              胃部疾病超声影像智能辅助诊断系统致力于提升胃癌早期发现率与优化基层医疗服务，
              采用先进的AI技术为医生的临床决策提供客观量化的数据参考。
            </p>
            <div class="feature-tags">
              <span class="tag">AI智能分析</span>
              <span class="tag">精准诊断</span>
              <span class="tag">快速响应</span>
            </div>
          </div>
          <button class="learn-more-btn" @click="goToAboutUs">
            <span>了解更多</span>
            <span class="arrow">→</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 平台服务流程弹窗 -->
    <div v-if="showServiceFlowDialog" class="dialog-overlay" @click="showServiceFlowDialog = false">
      <div class="dialog-box" @click.stop>
        <h3 class="dialog-title">平台服务流程</h3>
        <div class="flow-content">
          <div class="flow-step">
            <div class="step-number">1</div>
            <div class="step-info">
              <h4>预约挂号</h4>
              <p>选择医院和医师，填写预约信息，提交预约申请</p>
            </div>
          </div>
          <div class="flow-arrow">↓</div>
          <div class="flow-step">
            <div class="step-number">2</div>
            <div class="step-info">
              <h4>超声检查</h4>
              <p>按预约时间到院，由专业医师进行胃部超声检查</p>
            </div>
          </div>
          <div class="flow-arrow">↓</div>
          <div class="flow-step">
            <div class="step-number">3</div>
            <div class="step-info">
              <h4>AI智能诊断</h4>
              <p>系统自动对超声影像进行智能分析，辅助医生诊断</p>
            </div>
          </div>
          <div class="flow-arrow">↓</div>
          <div class="flow-step">
            <div class="step-number">4</div>
            <div class="step-info">
              <h4>查看报告</h4>
              <p>医生审核并出具诊断报告，患者可在线查看健康档案</p>
            </div>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="btn-confirm" @click="showServiceFlowDialog = false">我知道了</button>
        </div>
      </div>
    </div>

    <!-- 在线客服弹窗 -->
    <div v-if="showCustomerServiceDialog" class="dialog-overlay" @click="showCustomerServiceDialog = false">
      <div class="dialog-box" @click.stop>
        <h3 class="dialog-title">在线客服</h3>
        <div class="service-content">
          <p><strong>客服电话：</strong>15889254549</p>
          <p><strong>联系邮箱：</strong>23zhshen@stu.edu.cn</p>
          <p class="service-tip">工作时间：周一至周五 9:00-18:00</p>
        </div>
        <div class="dialog-footer">
          <button class="btn-confirm" @click="showCustomerServiceDialog = false">确定</button>
        </div>
      </div>
    </div>

    <!-- 认识胃部弹窗 -->
    <div v-if="showStomachInfoDialog" class="dialog-overlay" @click="showStomachInfoDialog = false">
      <div class="dialog-box stomach-dialog" @click.stop>
        <h3 class="dialog-title">认识胃部</h3>
        <div class="stomach-content">
          <div class="stomach-section">
            <h4 class="section-title">🔍 胃部结构</h4>
            <div class="info-grid">
              <div class="info-item">
                <div class="item-icon">🔵</div>
                <div class="item-content">
                  <h5>胃底</h5>
                  <p>位于胃的上部，呈穹窿状</p>
                </div>
              </div>
              <div class="info-item">
                <div class="item-icon">🔵</div>
                <div class="item-content">
                  <h5>胃体</h5>
                  <p>胃的主体部分，储存食物</p>
                </div>
              </div>
              <div class="info-item">
                <div class="item-icon">🔵</div>
                <div class="item-content">
                  <h5>胃窦</h5>
                  <p>胃的下部，研磨食物</p>
                </div>
              </div>
              <div class="info-item">
                <div class="item-icon">🔵</div>
                <div class="item-content">
                  <h5>幽门</h5>
                  <p>胃的出口，控制食物进入十二指肠</p>
                </div>
              </div>
            </div>
          </div>

          <div class="stomach-section">
            <h4 class="section-title">⚠️ 常见疾病</h4>
            <div class="disease-list">
              <div class="disease-item">
                <span class="disease-name">慢性胃炎</span>
                <span class="disease-desc">胃黏膜的慢性炎症性病变</span>
              </div>
              <div class="disease-item">
                <span class="disease-name">消化性溃疡</span>
                <span class="disease-desc">胃或十二指肠黏膜缺损</span>
              </div>
              <div class="disease-item">
                <span class="disease-name">胃息肉</span>
                <span class="disease-desc">胃黏膜表面的良性隆起</span>
              </div>
              <div class="disease-item">
                <span class="disease-name">胃癌</span>
                <span class="disease-desc">起源于胃黏膜上皮的恶性肿瘤</span>
              </div>
            </div>
          </div>

          <div class="stomach-section">
            <h4 class="section-title">💡 健康提示</h4>
            <ul class="health-tips">
              <li>规律饮食，避免暴饮暴食</li>
              <li>少食辛辣、油腻、刺激性食物</li>
              <li>保持良好的作息习惯</li>
              <li>定期进行胃部检查</li>
              <li>出现不适及时就医</li>
            </ul>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="btn-confirm" @click="showStomachInfoDialog = false">我知道了</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
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
  
  .pos {
    position: absolute;
    left: -2.5rem;
    top: -2.5rem;
  }
  
  .font {
    font-size: 1.88rem;
    font-family: SourceHanSansCN;
    line-height: 1.74rem;
    color: #000000;
  }
  
  .text {
    font-weight: 700;
    line-height: 1.77rem;
  }
  
  .pos_5 {
    position: absolute;
    left: 6.8rem;
    top: 1.77rem;
  }

  /* 主内容区域 */
  .main-content {
    display: flex;
    gap: 2rem;
    padding: 2rem;
    background-color: transparent;
    width: 81.75rem;
  }
  
  .pos_8 {
    position: absolute;
    right: 1.5rem;
    top: 8.63rem;
  }

  /* 左侧功能区 */
  .sidebar-functions {
    width: 22rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  /* 认识胃部卡片 */
  .function-card {
    background: linear-gradient(135deg, #00baad 0%, #00d4c5 100%);
    border-radius: 1.2rem;
    padding: 2rem;
    color: white;
    box-shadow: 0 0.5rem 1.5rem rgba(0, 186, 173, 0.3);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .function-card::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    transition: all 0.5s ease;
  }

  .function-card:hover {
    transform: translateY(-0.5rem) scale(1.02);
    box-shadow: 0 1rem 2rem rgba(0, 186, 173, 0.4);
  }

  .function-card:hover::before {
    top: -30%;
    right: -30%;
  }

  .function-icon {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-0.5rem); }
  }

  .function-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    color: white;
  }

  .function-desc {
    font-size: 1rem;
    margin: 0;
    opacity: 0.9;
    line-height: 1.5;
  }

  /* 功能按钮区 */
  .function-section {
    background: white;
    border-radius: 1.2rem;
    padding: 1.5rem;
    box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.08);
  }

  .section-header {
    font-size: 1.1rem;
    font-weight: 600;
    color: #333;
    margin: 0 0 1rem 0;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid #f0f0f0;
  }

  /* 服务按钮 */
  .service-btn {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1rem 1.2rem;
    margin-bottom: 0.8rem;
    border: none;
    border-radius: 0.8rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .service-btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.5s, height 0.5s;
  }

  .service-btn:hover::before {
    width: 300%;
    height: 300%;
  }

  .service-btn.primary {
    background: linear-gradient(135deg, #4db8af 0%, #5cc9c0 100%);
    color: white;
  }

  .service-btn.primary:hover {
    transform: translateX(0.3rem);
    box-shadow: 0 0.5rem 1rem rgba(77, 184, 175, 0.3);
  }

  .service-btn.secondary {
    background: linear-gradient(135deg, #00baad 0%, #00d4c5 100%);
    color: white;
  }

  .service-btn.secondary:hover {
    transform: translateX(0.3rem);
    box-shadow: 0 0.5rem 1rem rgba(0, 186, 173, 0.3);
  }

  .service-btn.tertiary {
    background: linear-gradient(135deg, #3da9a0 0%, #4cbab1 100%);
    color: white;
  }

  .service-btn.tertiary:hover {
    transform: translateX(0.3rem);
    box-shadow: 0 0.5rem 1rem rgba(61, 169, 160, 0.3);
  }

  .btn-icon {
    font-size: 1.3rem;
    position: relative;
    z-index: 1;
  }

  .btn-text {
    position: relative;
    z-index: 1;
  }

  /* 右侧介绍区 */
  .intro-section {
    flex: 1;
  }

  .intro-card {
    background: white;
    border-radius: 1.5rem;
    padding: 2.5rem;
    box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.08);
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }

  .intro-card::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 40%;
    height: 100%;
    background: linear-gradient(135deg, transparent 0%, rgba(0, 186, 173, 0.05) 100%);
    pointer-events: none;
  }

  .intro-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
    position: relative;
    z-index: 1;
  }

  .header-icon {
    font-size: 4rem;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  .intro-title {
    font-size: 2.2rem;
    font-weight: 700;
    color: #1f2937;
    line-height: 1.4;
    margin: 0;
    background: linear-gradient(135deg, #1f2937 0%, #00baad 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .intro-content {
    flex: 1;
    position: relative;
    z-index: 1;
  }

  .intro-text {
    font-size: 1.15rem;
    line-height: 1.8;
    color: #4b5563;
    margin: 0 0 2rem 0;
    text-align: justify;
  }

  .feature-tags {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .tag {
    display: inline-block;
    padding: 0.5rem 1.2rem;
    background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%);
    color: #00796b;
    border-radius: 2rem;
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .tag:hover {
    transform: translateY(-0.2rem);
    box-shadow: 0 0.3rem 0.8rem rgba(0, 121, 107, 0.2);
  }

  .learn-more-btn {
    align-self: center;
    margin-top: 2rem;
    padding: 1rem 2.5rem;
    background: linear-gradient(135deg, #00baad 0%, #00d4c5 100%);
    color: white;
    border: none;
    border-radius: 3rem;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    box-shadow: 0 0.5rem 1.5rem rgba(0, 186, 173, 0.3);
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;
    overflow: hidden;
  }

  .learn-more-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
  }

  .learn-more-btn:hover::before {
    left: 100%;
  }

  .learn-more-btn:hover {
    transform: translateY(-0.3rem);
    box-shadow: 0 0.8rem 2rem rgba(0, 186, 173, 0.4);
  }

  .arrow {
    font-size: 1.3rem;
    transition: transform 0.3s ease;
  }

  .learn-more-btn:hover .arrow {
    transform: translateX(0.3rem);
  }
  .group_2 {
    width: 30.25rem;
  }
  .text-wrapper {
    padding: 0.5rem 0 0.38rem;
    background-color: #cccccc00;
    border-radius: 0.31rem 0.31rem 0rem 0rem;
    width: 9.56rem;
    border-left: solid 0.13rem #000000;
    border-right: solid 0.13rem #000000;
    border-top: solid 0.13rem #000000;
    border-bottom: solid 0.13rem #000000;
  }
  .text_3 {
    line-height: 1.73rem;
  }
  .image_5 {
    width: 30.19rem;
    height: 13.56rem;
  }
  .text-wrapper_2 {
    margin-top: 0.63rem;
    padding: 0.38rem 0;
    background-color: #cccccc00;
    border-radius: 0.31rem 0.31rem 0rem 0rem;
    border-left: solid 0.13rem #000000;
    border-right: solid 0.13rem #000000;
    border-top: solid 0.13rem #000000;
    border-bottom: solid 0.13rem #000000;
  }
  .text_5 {
    margin: 0 0.75rem;
    line-height: 1.74rem;
  }
  .section_5 {
    padding: 2.25rem 1.5rem;
    background-color: #cccccc00;
    border-left: solid 0.13rem #000000;
    border-right: solid 0.13rem #000000;
    border-top: solid 0.13rem #000000;
    border-bottom: solid 0.13rem #000000;
  }
  .text-wrapper_3 {
    margin-right: 0.25rem;
    padding: 0.88rem 0 0.75rem;
    background-color: #cccccc80;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
    width: 26.7rem;
    transition: background-color 0.3s;
  }
  .text-wrapper_3:hover {
    background-color: #b0b0b0;
  }
  .text_7 {
    margin-left: 2.88rem;
  }
  .text_8 {
    line-height: 1.73rem;
  }
  .group_3 {
    margin-top: 3.44rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .group_4 {
    padding: 2rem;
    border-radius: 1rem;
    background-color: #f9f9f9;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .font_2 {
    font-size: 3rem;
    font-family: AlimamaShuHeiTi;
    line-height: 3.8rem;
    color: #000000;
  }
  .text_4 {
    margin-left: 0;
  }
  .text_6 {
    line-height: 2rem;
    font-size: 1.3rem;
    text-align: justify;
    text-indent: 2em;
  }
  .text-wrapper_4 {
    align-self: center;
    padding: 1rem 2rem;
    background-color: #00baad;
    border-radius: 2rem;
    box-shadow: 0rem 0.13rem 0.25rem #00000040;
    width: auto;
    min-width: 12rem;
    transition: all 0.3s;
  }
  .text-wrapper_4:hover {
    background-color: #009a8e;
    transform: translateY(-0.2rem);
    box-shadow: 0rem 0.25rem 0.5rem #00000040;
  }
  .text_9 {
    color: #ffffff;
    font-size: 1.5rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
    line-height: 2rem;
    text-align: center;
    white-space: nowrap;
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
  }

  .dialog-box {
    background: white;
    border-radius: 0.5rem;
    padding: 1.2rem;
    min-width: 30rem;
    max-width: 40rem;
    max-height: 85vh;
    overflow-y: auto;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
  }

  .dialog-title {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #333;
    border-bottom: 2px solid #00baad;
    padding-bottom: 0.4rem;
  }

  .flow-content {
    padding: 0.5rem 0;
  }

  .flow-step {
    display: flex;
    align-items: flex-start;
    gap: 0.8rem;
    padding: 0.6rem 0.8rem;
    background-color: #f9f9f9;
    border-radius: 0.4rem;
    margin-bottom: 0.3rem;
  }

  .step-number {
    width: 2rem;
    height: 2rem;
    background: #00baad;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: bold;
    flex-shrink: 0;
  }

  .step-info h4 {
    margin: 0 0 0.3rem 0;
    color: #00baad;
    font-size: 1rem;
  }

  .step-info p {
    margin: 0;
    color: #666;
    line-height: 1.4;
    font-size: 0.9rem;
  }

  .flow-arrow {
    text-align: center;
    font-size: 1.2rem;
    color: #00baad;
    margin: 0.2rem 0;
  }

  .service-content {
    padding: 1rem 0;
    line-height: 1.8;
  }

  .service-content p {
    margin: 1rem 0;
    font-size: 1.1rem;
  }

  .service-content strong {
    color: #333;
  }

  .service-tip {
    margin-top: 1.5rem !important;
    padding-top: 1rem;
    border-top: 1px solid #e0e0e0;
    color: #999 !important;
    font-size: 0.9rem !important;
  }

  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.8rem;
    margin-top: 1rem;
    padding-top: 0.8rem;
    border-top: 1px solid #e0e0e0;
  }

  .btn-confirm {
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: 0.3rem;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s;
    background: #00baad;
    color: white;
  }

  .btn-confirm:hover {
    background: #009a8e;
  }

  /* 认识胃部弹窗样式 */
  .stomach-dialog {
    max-width: 50rem;
    min-width: 45rem;
  }

  .stomach-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .stomach-section {
    background: #f9fafb;
    border-radius: 0.8rem;
    padding: 1.5rem;
  }

  .section-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 1rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .info-item {
    background: white;
    border-radius: 0.5rem;
    padding: 1rem;
    display: flex;
    gap: 0.8rem;
    box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }

  .info-item:hover {
    transform: translateY(-0.2rem);
    box-shadow: 0 0.3rem 0.8rem rgba(0, 186, 173, 0.15);
  }

  .item-icon {
    font-size: 2rem;
    flex-shrink: 0;
  }

  .item-content h5 {
    margin: 0 0 0.3rem 0;
    font-size: 1rem;
    font-weight: 600;
    color: #00baad;
  }

  .item-content p {
    margin: 0;
    font-size: 0.9rem;
    color: #666;
    line-height: 1.4;
  }

  .disease-list {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .disease-item {
    background: white;
    padding: 0.8rem 1rem;
    border-radius: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }

  .disease-item:hover {
    transform: translateX(0.3rem);
    box-shadow: 0 0.3rem 0.8rem rgba(0, 186, 173, 0.15);
  }

  .disease-name {
    font-weight: 600;
    color: #1f2937;
    font-size: 1rem;
  }

  .disease-desc {
    color: #666;
    font-size: 0.9rem;
  }

  .health-tips {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .health-tips li {
    background: white;
    padding: 0.8rem 1rem;
    padding-left: 2.5rem;
    border-radius: 0.5rem;
    position: relative;
    color: #4b5563;
    font-size: 0.95rem;
    box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }

  .health-tips li::before {
    content: "✓";
    position: absolute;
    left: 1rem;
    color: #00baad;
    font-weight: bold;
    font-size: 1.1rem;
  }

  .health-tips li:hover {
    transform: translateX(0.3rem);
    background: linear-gradient(135deg, #e0f2f1 0%, #ffffff 100%);
  }
</style>