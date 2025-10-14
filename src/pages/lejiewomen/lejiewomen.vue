<script setup>
  import { useRouter } from 'vue-router';

  const props = defineProps({});

  const router = useRouter();

  const goBack = () => {
    router.back();
  };
</script>

<template>
  <div class="page">
    <div class="back-button" @click="goBack">
      <span>← 返回</span>
    </div>
    <div class="content-overlay">
      <div class="about-section">
        <h1 class="main-title">胃部疾病超声影像智能辅助诊断系统</h1>
        <div class="intro-text">
          <p>
            胃部疾病超声影像智能辅助诊断系统是一款专业的医疗辅助诊断平台，
            致力于提升胃癌早期发现率与优化基层医疗服务的智能超声解决方案，
            为医生的临床决策提供客观量化的数据参考。
          </p>
        </div>
      </div>

      <div class="info-cards">
        <div class="info-card">
          <h3>系统优势</h3>
          <ul>
            <li>AI智能分析，辅助医生快速诊断</li>
            <li>高精度影像识别技术</li>
            <li>完整的健康档案管理</li>
            <li>便捷的在线预约系统</li>
            <li>专业医师团队支持</li>
          </ul>
        </div>

        <div class="info-card">
          <h3>服务特色</h3>
          <ul>
            <li>24小时在线预约服务</li>
            <li>多医院多医师选择</li>
            <li>完整的检查报告存档</li>
            <li>定期健康提醒服务</li>
            <li>专业医疗咨询支持</li>
          </ul>
        </div>

        <div class="info-card">
          <h3>技术支持</h3>
          <ul>
            <li>深度学习算法</li>
            <li>大数据分析技术</li>
            <li>云端存储服务</li>
            <li>安全加密传输</li>
            <li>实时数据同步</li>
          </ul>
        </div>
      </div>

      <div class="team-section">
        <h2>系统研发团队</h2>
        <div class="team-info">
          <div class="team-member">
            <h4>总负责人</h4>
            <p>沈子濠</p>
          </div>
          <div class="team-members-list">
            <h4>研发团队成员</h4>
            <p>沈子濠、胡诗婷、梁曦彤、赖梦婷</p>
          </div>
        </div>
      </div>

      <div class="contact-section">
        <h2>联系我们</h2>
        <div class="contact-info">
          <p><strong>客服电话：</strong>15889254549</p>
          <p><strong>联系邮箱：</strong>23zhshen@stu.edu.cn</p>
          <p><strong>工作时间：</strong>周一至周五 9:00-18:00</p>
        </div>
      </div>

      <div class="footer">
        <p>© 2025 胃部疾病超声影像智能辅助诊断系统</p>
        <p>版本：1.0.1（2025.10.14正式版）</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
  .page {
    background-image: url('/a2873b1948e73b57eebbbcfcfa0da9c9.png');
    background-position: top center;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    width: 100%;
    min-height: 100vh;
    overflow-y: auto;
    position: relative;
  }

  .back-button {
    position: fixed;
    top: 2rem;
    left: 2rem;
    background: rgba(0, 186, 173, 0.9);
    color: white;
    padding: 0.8rem 1.5rem;
    border-radius: 2rem;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 600;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
    transition: all 0.3s;
    z-index: 1000;
  }

  .back-button:hover {
    background: rgba(0, 154, 142, 0.95);
    transform: translateX(-0.3rem);
  }

  .content-overlay {
    max-width: 75rem;
    margin: 0 auto;
    padding: 4rem 2rem;
    background: rgba(255, 255, 255, 0.95);
    min-height: 100vh;
  }

  .about-section {
    text-align: center;
    margin-bottom: 3rem;
    padding: 2rem;
    background: linear-gradient(135deg, #00baad 0%, #568d8b 100%);
    border-radius: 1rem;
    color: white;
  }

  .main-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    text-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.2);
  }

  .intro-text {
    font-size: 1.2rem;
    line-height: 1.8;
    max-width: 50rem;
    margin: 0 auto;
  }

  .info-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .info-card {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
  }

  .info-card:hover {
    transform: translateY(-0.5rem);
    box-shadow: 0 0.5rem 1rem rgba(0, 186, 173, 0.2);
  }

  .info-card h3 {
    color: #00baad;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #00baad;
  }

  .info-card ul {
    list-style: none;
    padding: 0;
  }

  .info-card li {
    padding: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;
    line-height: 1.6;
    color: #666;
  }

  .info-card li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #00baad;
    font-weight: bold;
  }

  .team-section,
  .contact-section {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }

  .team-section h2,
  .contact-section h2 {
    color: #00baad;
    font-size: 2rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .team-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    gap: 2rem;
  }

  .team-member,
  .team-members-list {
    text-align: center;
    padding: 1.5rem;
    background: #f9f9f9;
    border-radius: 0.5rem;
  }

  .team-member h4,
  .team-members-list h4 {
    color: #00baad;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .team-member p,
  .team-members-list p {
    color: #333;
    font-size: 1.1rem;
    line-height: 1.8;
  }

  .contact-info {
    text-align: center;
    font-size: 1.1rem;
    line-height: 2;
  }

  .contact-info p {
    margin: 1rem 0;
    color: #666;
  }

  .contact-info strong {
    color: #00baad;
  }

  .footer {
    text-align: center;
    padding: 2rem;
    color: #999;
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .footer p {
    margin: 0.5rem 0;
  }
</style>