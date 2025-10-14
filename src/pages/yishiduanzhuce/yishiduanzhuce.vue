<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import Dialog from '../../components/Dialog.vue';

const router = useRouter();

// 医院列表
const hospitals = [
  '汕头市中心医院',
  '汕头市第二人民医院',
  '汕头市第三人民医院',
  '汕头市第四人民医院',
  '汕头市中医医院',
  '汕头市妇幼保健院',
  '汕头大学医学院第一附属医院',
  '汕头大学医学院第二附属医院',
  '汕头大学医学院附属肿瘤医院',
  '汕头大学精神卫生中心',
  '汕头大学•香港中文大学联合汕头国际眼科中心',
  '汕头潮南民生医院',
  '汕头市潮阳区大峰医院',
  '汕头市华侨医院（汕头市澄海区人民医院）'
];

// 科室列表
const departments = [
  '神经内科', '消化内科', '心血管内科', '肾内科', '血液科', '内分泌科',
  '呼吸与危重症医学科', '特需病房', '重症医学科', '内科综合病区', '血管介入科',
  '风湿免疫科', '感染科', '老年病科', '全科医学科', '普外一科', '普外二科',
  '心胸外科', '神经外科', '泌尿外科', '整形烧伤科和手外科', '骨外一科', '骨外二科',
  '甲状腺外科', '乳腺疾病诊疗中心', '肛肠科', '介入科', '妇产科', '生殖中心',
  '儿科', '新生儿科', '小儿外科', '肿瘤外科', '肿瘤内科', '肿瘤放疗科',
  '肺癌中心', '眼科', '耳鼻咽喉-头颈外科', '口腔科', '皮肤性病科', '中医科',
  '针灸科', '中医骨伤科', '康复医学科', '高压氧科', '核医学科', '内镜中心',
  '血液净化中心', '健康管理中心', '激光美容中心', '疼痛科', '手术麻醉中心',
  '临床营养科', '药学部', '检验科', '放射科', '超声医学科', '电生理科',
  '病理科', '药物临床试验机构', '伦理委员会', '临床医学研究中心', '急诊医学科'
];

// 当前步骤
const currentStep = ref(1);

// 医院选择
const hospitalInput = ref('');
const showHospitalList = ref(false);
const selectedHospital = ref('');

// 科室选择
const departmentInput = ref('');
const showDepartmentList = ref(false);
const selectedDepartment = ref('');

// 注册表单数据
const registerForm = reactive({
  name: '',
  email: '',
  phone: '',
  licenseNumber: '',
  practiceNumber: '',
  department: '',
  account: '',
  password: '',
  confirmPassword: '',
  verifyCode: '',
  agreeProtocol: false
});

// 弹窗控制
const showDialog = ref(false);
const dialogMessage = ref('');
const showSuccessDialog = ref(false);

// 验证码控制
const showVerifyCodeInput = ref(false);
const verifyCodeInputs = ref(['', '', '', '', '', '']);
const countdown = ref(0);
let countdownTimer = null;
const verifyErrorCount = ref(0); // 验证码错误次数
const maxVerifyAttempts = 3; // 最大尝试次数
const isVerifyError = ref(false); // 是否验证码错误
const verifySuccess = ref(false); // 验证码是否验证成功

// 密码安全等级
const passwordStrength = ref(0); // 0: 无, 1: 弱, 2: 中, 3: 强

// 表单验证错误
const formErrors = reactive({
  name: '',
  email: '',
  phone: '',
  licenseNumber: '',
  practiceNumber: '',
  department: '',
  account: '',
  password: '',
  confirmPassword: ''
});

// 医院自动完成过滤
const filteredHospitals = computed(() => {
  if (!hospitalInput.value.trim()) {
    return hospitals;
  }
  return hospitals.filter(hospital => 
    hospital.toLowerCase().includes(hospitalInput.value.toLowerCase())
  );
});

// 科室自动完成过滤
const filteredDepartments = computed(() => {
  if (!departmentInput.value.trim()) {
    return departments;
  }
  return departments.filter(department => 
    department.toLowerCase().includes(departmentInput.value.toLowerCase())
  );
});

// 选择医院
const selectHospital = (hospital) => {
  hospitalInput.value = hospital;
  selectedHospital.value = hospital;
  showHospitalList.value = false;
};

// 显示医院列表
const onHospitalInputFocus = () => {
  showHospitalList.value = true;
};

// 隐藏医院列表
const onHospitalInputBlur = () => {
  // 延迟关闭，确保点击事件能触发
  setTimeout(() => {
    showHospitalList.value = false;
  }, 200);
};

// 选择科室
const selectDepartment = (department) => {
  departmentInput.value = department;
  selectedDepartment.value = department;
  registerForm.department = department;
  showDepartmentList.value = false;
};

// 显示科室列表
const onDepartmentInputFocus = () => {
  showDepartmentList.value = true;
};

// 隐藏科室列表
const onDepartmentInputBlur = () => {
  // 延迟关闭，确保点击事件能触发
  setTimeout(() => {
    showDepartmentList.value = false;
  }, 200);
};

// 科室输入处理
const onDepartmentInput = () => {
  registerForm.department = departmentInput.value;
  selectedDepartment.value = '';
};

// 下一步
const nextStep = () => {
  if (!selectedHospital.value) {
    dialogMessage.value = '请选择您所在的医院';
    showDialog.value = true;
    return;
  }
  currentStep.value = 2;
};

// 上一步
const prevStep = () => {
  currentStep.value = 1;
};

// 获取验证码
const getVerifyCode = () => {
  if (!registerForm.phone.trim()) {
    dialogMessage.value = '请先输入手机号';
    showDialog.value = true;
    return;
  }
  const phoneReg = /^1[3-9]\d{9}$/;
  if (!phoneReg.test(registerForm.phone)) {
    dialogMessage.value = '请输入正确的手机号';
    showDialog.value = true;
    return;
  }
  
  // 重置验证码相关状态
  verifyErrorCount.value = 0;
  verifySuccess.value = false;
  isVerifyError.value = false;
  verifyCodeInputs.value = ['', '', '', '', '', ''];
  registerForm.verifyCode = '';
  
  // 显示验证码输入框
  showVerifyCodeInput.value = true;
  
  // 开始倒计时
  countdown.value = 60;
  countdownTimer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(countdownTimer);
    }
  }, 1000);
  
  dialogMessage.value = '验证码已发送至您的手机！\n\n测试环境请输入：251014';
  showDialog.value = true;
};

// 验证码输入处理
const handleVerifyInput = (index, event) => {
  // 如果已经超过5次错误，禁止输入
  if (verifyErrorCount.value >= maxVerifyAttempts) {
    event.target.value = '';
    return;
  }
  
  const value = event.target.value;
  
  // 只允许输入数字
  if (!/^\d*$/.test(value)) {
    event.target.value = verifyCodeInputs.value[index];
    return;
  }
  
  // 更新值
  verifyCodeInputs.value[index] = value.slice(-1);
  
  // 自动聚焦到下一个输入框
  if (value && index < 5) {
    const nextInput = event.target.parentElement.nextElementSibling?.querySelector('input');
    if (nextInput) {
      nextInput.focus();
    }
  }
  
  // 更新完整验证码
  registerForm.verifyCode = verifyCodeInputs.value.join('');
  
  // 如果输入完6位，自动验证
  if (registerForm.verifyCode.length === 6) {
    setTimeout(() => {
      validateVerifyCode();
    }, 300);
  }
};

// 验证码输入框按键处理
const handleVerifyKeydown = (index, event) => {
  // 退格键处理
  if (event.key === 'Backspace' && !verifyCodeInputs.value[index] && index > 0) {
    const prevInput = event.target.parentElement.previousElementSibling?.querySelector('input');
    if (prevInput) {
      prevInput.focus();
    }
  }
};

// 粘贴验证码处理
const handleVerifyPaste = (event) => {
  // 如果已经超过5次错误，禁止粘贴
  if (verifyErrorCount.value >= maxVerifyAttempts) {
    event.preventDefault();
    return;
  }
  
  event.preventDefault();
  const pasteData = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
  const chars = pasteData.split('');
  
  chars.forEach((char, index) => {
    if (index < 6) {
      verifyCodeInputs.value[index] = char;
    }
  });
  
  registerForm.verifyCode = verifyCodeInputs.value.join('');
  
  // 聚焦到最后一个有值的输入框
  const lastIndex = Math.min(chars.length, 5);
  const inputs = document.querySelectorAll('.verify-code-input input');
  if (inputs[lastIndex]) {
    inputs[lastIndex].focus();
  }
  
  // 如果粘贴了完整的6位验证码，自动验证
  if (registerForm.verifyCode.length === 6) {
    setTimeout(() => {
      validateVerifyCode();
    }, 300);
  }
};

// 验证验证码
const validateVerifyCode = () => {
  if (registerForm.verifyCode === '251014') {
    // 验证成功
    isVerifyError.value = false;
    verifySuccess.value = true;
    // 只使用视觉反馈，不弹窗提示
  } else {
    // 验证失败
    isVerifyError.value = true;
    verifySuccess.value = false;
    verifyErrorCount.value++;
    
    const remainingAttempts = maxVerifyAttempts - verifyErrorCount.value;
    
    if (remainingAttempts > 0) {
      dialogMessage.value = `验证码错误！还剩 ${remainingAttempts} 次机会`;
      showDialog.value = true;
    } else {
      dialogMessage.value = '验证码输入错误次数过多，请重新获取验证码';
      showDialog.value = true;
      // 禁用验证码输入
      showVerifyCodeInput.value = false;
      verifyErrorCount.value = 0;
    }
    
    // 清空验证码并添加抖动效果
    setTimeout(() => {
      verifyCodeInputs.value = ['', '', '', '', '', ''];
      registerForm.verifyCode = '';
      isVerifyError.value = false;
    }, 1000);
  }
};

// 计算密码强度
const checkPasswordStrength = (password) => {
  if (!password) {
    passwordStrength.value = 0;
    return;
  }
  
  let strength = 0;
  
  // 长度检查
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  
  // 包含数字
  if (/\d/.test(password)) strength++;
  
  // 包含小写字母
  if (/[a-z]/.test(password)) strength++;
  
  // 包含大写字母
  if (/[A-Z]/.test(password)) strength++;
  
  // 包含特殊字符
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
  
  // 计算最终等级 (0-6分映射到0-3级)
  if (strength <= 2) {
    passwordStrength.value = 1; // 弱
  } else if (strength <= 4) {
    passwordStrength.value = 2; // 中
  } else {
    passwordStrength.value = 3; // 强
  }
};

// 密码输入处理
const onPasswordInput = () => {
  checkPasswordStrength(registerForm.password);
};

// 实时验证函数
const validateName = () => {
  if (!registerForm.name.trim()) {
    formErrors.name = '请输入姓名';
  } else {
    formErrors.name = '';
  }
};

const validateEmail = () => {
  if (!registerForm.email.trim()) {
    formErrors.email = '请输入邮箱';
  } else {
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailReg.test(registerForm.email)) {
      formErrors.email = '请输入正确的邮箱格式';
    } else {
      formErrors.email = '';
    }
  }
};

const validatePhone = () => {
  if (!registerForm.phone.trim()) {
    formErrors.phone = '请输入手机号';
  } else {
    const phoneReg = /^1[3-9]\d{9}$/;
    if (!phoneReg.test(registerForm.phone)) {
      formErrors.phone = '请输入正确的手机号';
    } else {
      formErrors.phone = '';
    }
  }
};

const validateLicenseNumber = () => {
  if (!registerForm.licenseNumber.trim()) {
    formErrors.licenseNumber = '请输入执业医师资格证书编号';
  } else {
    formErrors.licenseNumber = '';
  }
};

const validatePracticeNumber = () => {
  if (!registerForm.practiceNumber.trim()) {
    formErrors.practiceNumber = '请输入执业证书编号';
  } else {
    formErrors.practiceNumber = '';
  }
};

const validateAccount = () => {
  if (!registerForm.account.trim()) {
    formErrors.account = '请输入账号';
  } else {
    formErrors.account = '';
  }
};

const validatePassword = () => {
  if (!registerForm.password.trim()) {
    formErrors.password = '请输入密码';
  } else if (registerForm.password.length < 8) {
    formErrors.password = '密码长度至少8位';
  } else {
    formErrors.password = '';
  }
};

const validateConfirmPassword = () => {
  if (!registerForm.confirmPassword.trim()) {
    formErrors.confirmPassword = '请确认密码';
  } else if (registerForm.password !== registerForm.confirmPassword) {
    formErrors.confirmPassword = '两次密码输入不一致';
  } else {
    formErrors.confirmPassword = '';
  }
};

// 切换协议勾选
const toggleProtocol = () => {
  registerForm.agreeProtocol = !registerForm.agreeProtocol;
};

// 提交注册
const submitRegister = () => {
  // 验证姓名
  if (!registerForm.name.trim()) {
    dialogMessage.value = '请输入姓名';
    showDialog.value = true;
    return;
  }

  // 验证邮箱
  if (!registerForm.email.trim()) {
    dialogMessage.value = '请输入邮箱';
    showDialog.value = true;
    return;
  }
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailReg.test(registerForm.email)) {
    dialogMessage.value = '请输入正确的邮箱格式';
    showDialog.value = true;
    return;
  }

  // 验证手机号
  if (!registerForm.phone.trim()) {
    dialogMessage.value = '请输入手机号';
    showDialog.value = true;
    return;
  }
  const phoneReg = /^1[3-9]\d{9}$/;
  if (!phoneReg.test(registerForm.phone)) {
    dialogMessage.value = '请输入正确的手机号';
    showDialog.value = true;
    return;
  }

  // 验证执业证书
  if (!registerForm.licenseNumber.trim()) {
    dialogMessage.value = '请输入执业医师资格证书编号';
    showDialog.value = true;
    return;
  }

  if (!registerForm.practiceNumber.trim()) {
    dialogMessage.value = '请输入执业证书编号';
    showDialog.value = true;
    return;
  }

  // 验证科室
  if (!registerForm.department.trim()) {
    dialogMessage.value = '请输入所在科室';
    showDialog.value = true;
    return;
  }

  // 验证账号
  if (!registerForm.account.trim()) {
    dialogMessage.value = '请输入账号';
    showDialog.value = true;
    return;
  }

  // 验证密码
  if (!registerForm.password.trim()) {
    dialogMessage.value = '请输入密码';
    showDialog.value = true;
    return;
  }
  if (registerForm.password.length < 6) {
    dialogMessage.value = '密码长度不能少于6位';
    showDialog.value = true;
    return;
  }

  // 验证确认密码
  if (!registerForm.confirmPassword.trim()) {
    dialogMessage.value = '请确认密码';
    showDialog.value = true;
    return;
  }
  if (registerForm.password !== registerForm.confirmPassword) {
    dialogMessage.value = '两次密码输入不一致';
    showDialog.value = true;
    return;
  }

  // 验证验证码
  if (!registerForm.verifyCode.trim()) {
    dialogMessage.value = '请输入验证码';
    showDialog.value = true;
    return;
  }
  
  // 校验验证码是否验证成功
  if (!verifySuccess.value) {
    dialogMessage.value = '请先完成验证码验证';
    showDialog.value = true;
    return;
  }

  // 验证协议
  if (!registerForm.agreeProtocol) {
    dialogMessage.value = '请先同意用户协议和隐私政策';
    showDialog.value = true;
    return;
  }

  // 提交成功
  showSuccessDialog.value = true;
};

// 返回登录
const goToLogin = () => {
  router.push('/yishiduandengluyemian');
};
</script>

<template>
  <div class="register-page">
    <!-- 背景图片 -->
    <div class="bg-image-wrapper">
      <img class="bg-image" src="/58d03e64227abf479de5ecc982e8f8e3.png" alt="背景图" />
    </div>

    <!-- 顶部标题 -->
    <div class="register-header">
      <div class="header-content">
        <img class="logo" src="/e7fe18fe2874fcd6042e644381ad7b3f.png" alt="Logo" />
        <h1 class="title">医师端注册</h1>
      </div>
    </div>

    <!-- 进度条 -->
    <div class="progress-container">
      <div class="progress-bar">
        <div class="progress-step" :class="{ 'active': currentStep >= 1, 'completed': currentStep > 1 }">
          <div class="step-circle">1</div>
          <div class="step-label">选择医院</div>
        </div>
        <div class="progress-line" :class="{ 'active': currentStep > 1 }"></div>
        <div class="progress-step" :class="{ 'active': currentStep >= 2 }">
          <div class="step-circle">2</div>
          <div class="step-label">填写信息</div>
        </div>
      </div>
    </div>

    <!-- 注册表单容器 -->
    <div class="register-container">
      <!-- 第一步：选择医院 -->
      <div v-if="currentStep === 1" class="step-content">
        <div class="form-card">
          <h2 class="card-title">选择您所在的医院</h2>
          <p class="card-subtitle">请输入或选择您执业的医疗机构</p>
          
          <div class="hospital-select-wrapper">
            <input 
              v-model="hospitalInput"
              type="text"
              class="hospital-input"
              placeholder="请输入医院名称进行搜索"
              @focus="onHospitalInputFocus"
              @blur="onHospitalInputBlur"
            />
            <div v-if="showHospitalList && filteredHospitals.length > 0" class="hospital-list">
              <div 
                v-for="hospital in filteredHospitals" 
                :key="hospital"
                class="hospital-item"
                @click="selectHospital(hospital)"
              >
                {{ hospital }}
              </div>
            </div>
            <div v-if="showHospitalList && filteredHospitals.length === 0" class="no-result">
              未找到匹配的医院
            </div>
          </div>

          <div class="selected-hospital" v-if="selectedHospital">
            <span class="label">已选择：</span>
            <span class="value">{{ selectedHospital }}</span>
          </div>

          <div class="button-group">
            <button class="btn btn-secondary" @click="goToLogin">返回登录</button>
            <button class="btn btn-primary" @click="nextStep">下一步</button>
          </div>
        </div>
      </div>

      <!-- 第二步：填写信息 -->
      <div v-if="currentStep === 2" class="step-content">
        <div class="form-card">
          <h2 class="card-title">填写注册信息</h2>
          
          <div class="form-section">
            <h3 class="section-title">基本信息</h3>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">姓名 <span class="required">*</span></label>
                <input 
                  v-model="registerForm.name" 
                  type="text" 
                  class="form-input" 
                  :class="{ 'input-error': formErrors.name }"
                  placeholder="请输入您的真实姓名" 
                  @blur="validateName"
                />
                <span v-if="formErrors.name" class="error-message">{{ formErrors.name }}</span>
              </div>
              <div class="form-group">
                <label class="form-label">邮箱 <span class="required">*</span></label>
                <input 
                  v-model="registerForm.email" 
                  type="email" 
                  class="form-input" 
                  :class="{ 'input-error': formErrors.email }"
                  placeholder="请输入邮箱地址" 
                  @blur="validateEmail"
                />
                <span v-if="formErrors.email" class="error-message">{{ formErrors.email }}</span>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3 class="section-title">执业信息</h3>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">执业医师资格证书编号 <span class="required">*</span></label>
                <input 
                  v-model="registerForm.licenseNumber" 
                  type="text" 
                  class="form-input" 
                  :class="{ 'input-error': formErrors.licenseNumber }"
                  placeholder="请输入证书编号" 
                  @blur="validateLicenseNumber"
                />
                <span v-if="formErrors.licenseNumber" class="error-message">{{ formErrors.licenseNumber }}</span>
              </div>
              <div class="form-group">
                <label class="form-label">执业证书编号 <span class="required">*</span></label>
                <input 
                  v-model="registerForm.practiceNumber" 
                  type="text" 
                  class="form-input" 
                  :class="{ 'input-error': formErrors.practiceNumber }"
                  placeholder="请输入证书编号" 
                  @blur="validatePracticeNumber"
                />
                <span v-if="formErrors.practiceNumber" class="error-message">{{ formErrors.practiceNumber }}</span>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">所在科室 <span class="required">*</span></label>
              <div class="department-select-wrapper">
                <input 
                  v-model="departmentInput"
                  type="text"
                  class="form-input"
                  placeholder="请输入科室名称进行搜索"
                  @focus="onDepartmentInputFocus"
                  @blur="onDepartmentInputBlur"
                  @input="onDepartmentInput"
                />
                <div v-if="showDepartmentList && filteredDepartments.length > 0" class="department-list">
                  <div 
                    v-for="department in filteredDepartments" 
                    :key="department"
                    class="department-item"
                    @click="selectDepartment(department)"
                  >
                    {{ department }}
                  </div>
                </div>
                <div v-if="showDepartmentList && filteredDepartments.length === 0" class="no-result">
                  未找到匹配的科室
                </div>
              </div>
              <div class="selected-department" v-if="selectedDepartment">
                <span class="label">已选择：</span>
                <span class="value">{{ selectedDepartment }}</span>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3 class="section-title">登录凭证</h3>
            <div class="form-group">
              <label class="form-label">账号 <span class="required">*</span></label>
              <input 
                v-model="registerForm.account" 
                type="text" 
                class="form-input" 
                :class="{ 'input-error': formErrors.account }"
                placeholder="请输入医院管理员提供的账号" 
                @blur="validateAccount"
              />
              <span v-if="formErrors.account" class="error-message">{{ formErrors.account }}</span>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">密码 <span class="required">*</span></label>
                <input 
                  v-model="registerForm.password" 
                  type="password" 
                  class="form-input" 
                  :class="{ 'input-error': formErrors.password }"
                  placeholder="请输入密码（至少8位）" 
                  @input="onPasswordInput"
                  @blur="validatePassword"
                />
                <div v-if="registerForm.password" class="password-strength">
                  <div class="strength-bar">
                    <div 
                      class="strength-fill" 
                      :class="{
                        'strength-weak': passwordStrength === 1,
                        'strength-medium': passwordStrength === 2,
                        'strength-strong': passwordStrength === 3
                      }"
                      :style="{ width: (passwordStrength * 33.33) + '%' }"
                    ></div>
                  </div>
                  <span class="strength-text" :class="{
                    'text-weak': passwordStrength === 1,
                    'text-medium': passwordStrength === 2,
                    'text-strong': passwordStrength === 3
                  }">
                    {{ passwordStrength === 1 ? '弱' : passwordStrength === 2 ? '中' : '强' }}
                  </span>
                </div>
                <span v-if="formErrors.password" class="error-message">{{ formErrors.password }}</span>
                <p class="password-hint">建议包含大小写字母、数字和特殊字符，长度8位以上</p>
              </div>
              <div class="form-group">
                <label class="form-label">确认密码 <span class="required">*</span></label>
                <input 
                  v-model="registerForm.confirmPassword" 
                  type="password" 
                  class="form-input" 
                  :class="{ 'input-error': formErrors.confirmPassword }"
                  placeholder="请再次输入密码" 
                  @blur="validateConfirmPassword"
                />
                <span v-if="formErrors.confirmPassword" class="error-message">{{ formErrors.confirmPassword }}</span>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3 class="section-title">验证信息</h3>
            <div class="form-group">
              <label class="form-label">手机号码 <span class="required">*</span></label>
              <input 
                v-model="registerForm.phone" 
                type="tel" 
                class="form-input" 
                :class="{ 'input-error': formErrors.phone }"
                placeholder="请输入手机号码" 
                maxlength="11"
                @blur="validatePhone"
              />
              <span v-if="formErrors.phone" class="error-message">{{ formErrors.phone }}</span>
            </div>
            <div class="verify-section">
              <button 
                class="btn btn-get-code" 
                @click="getVerifyCode"
                :disabled="countdown > 0"
              >
                {{ countdown > 0 ? `${countdown}秒后重试` : '获取验证码' }}
              </button>
              
              <div v-if="showVerifyCodeInput" class="verify-code-container" :class="{ 'error-shake': isVerifyError, 'success': verifySuccess }">
                <label class="verify-label">请输入6位验证码</label>
                <p class="verify-hint">测试环境请输入：<span class="code-hint">251014</span></p>
                
                <!-- 剩余次数提示 -->
                <div class="attempts-info" v-if="verifyErrorCount > 0 && verifyErrorCount < maxVerifyAttempts">
                  <span class="attempts-text">还剩 {{ maxVerifyAttempts - verifyErrorCount }} 次机会</span>
                </div>
                
                <!-- 验证成功提示 -->
                <div class="success-info" v-if="verifySuccess">
                  <span class="success-icon">✓</span>
                  <span class="success-text">验证成功</span>
                </div>
                
                <div class="verify-code-inputs">
                  <div 
                    v-for="(item, index) in verifyCodeInputs" 
                    :key="index" 
                    class="verify-code-input"
                    :class="{ 'error': isVerifyError, 'success': verifySuccess, 'disabled': verifyErrorCount >= maxVerifyAttempts || verifySuccess }"
                  >
                    <input
                      v-model="verifyCodeInputs[index]"
                      type="text"
                      maxlength="1"
                      :disabled="verifyErrorCount >= maxVerifyAttempts || verifySuccess"
                      @input="handleVerifyInput(index, $event)"
                      @keydown="handleVerifyKeydown(index, $event)"
                      @paste="index === 0 ? handleVerifyPaste($event) : null"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="form-checkbox" @click="toggleProtocol">
            <div class="checkbox" :class="{ 'checked': registerForm.agreeProtocol }">
              <span v-if="registerForm.agreeProtocol" class="checkmark">✓</span>
            </div>
            <span class="checkbox-label">我已阅读并同意<a href="#" class="link">用户协议</a>和<a href="#" class="link">隐私政策</a></span>
          </div>

          <div class="button-group">
            <button class="btn btn-secondary" @click="prevStep">上一步</button>
            <button class="btn btn-primary" @click="submitRegister">提交注册</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 提示弹窗 -->
    <Dialog
      v-model:visible="showDialog"
      :message="dialogMessage"
      :show-cancel-button="false"
      confirm-text="确定"
    />

    <!-- 成功提示弹窗 -->
    <Dialog
      v-model:visible="showSuccessDialog"
      title="注册提交成功"
      :show-cancel-button="false"
      confirm-text="返回登录"
      @confirm="goToLogin"
    >
      <div class="success-content">
        <div class="success-icon">✓</div>
        <p class="success-text">您的注册申请已提交成功！</p>
        <p class="success-desc">系统管理员将在1-3个工作日内完成审核，审核通过后将发送短信通知至您的手机。</p>
      </div>
    </Dialog>
  </div>
</template>

<style scoped lang="css">
/* 页面基础样式 */
.register-page {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  padding: 2rem 1rem;
}

/* 背景图片 */
.bg-image-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
  filter: blur(2px);
}

/* 顶部标题 */
.register-header {
  max-width: 1200px;
  margin: 0 auto 2rem;
  position: relative;
  z-index: 1;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  width: 3rem;
  height: 3rem;
  filter: drop-shadow(0 0.2rem 0.4rem rgba(0, 0, 0, 0.1));
}

.title {
  color: #ffffff;
  font-size: 2rem;
  font-family: SourceHanSansCN;
  font-weight: 700;
  margin: 0;
}

/* 进度条 */
.progress-container {
  max-width: 600px;
  margin: 0 auto 3rem;
  position: relative;
  z-index: 1;
}

.progress-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 1;
}

.step-circle {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
  transition: all 0.3s ease;
}

.progress-step.active .step-circle {
  background-color: #00baad;
  box-shadow: 0 0.5rem 1rem rgba(0, 186, 173, 0.4);
}

.progress-step.completed .step-circle {
  background-color: #00baad;
}

.step-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  font-family: SourceHanSansCN;
}

.progress-step.active .step-label {
  color: #ffffff;
  font-weight: 600;
}

.progress-line {
  flex: 1;
  height: 0.25rem;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 0 1rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.progress-line.active {
  background-color: #00baad;
}

/* 注册容器 */
.register-container {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.step-content {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 表单卡片 */
.form-card {
  background: #ffffff;
  border-radius: 1rem;
  padding: 2.5rem;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.2);
}

.card-title {
  font-size: 1.8rem;
  font-family: SourceHanSansCN;
  font-weight: 700;
  color: #333333;
  margin: 0 0 0.5rem 0;
}

.card-subtitle {
  font-size: 1rem;
  color: #666666;
  margin: 0 0 2rem 0;
}

/* 医院选择 */
.hospital-select-wrapper {
  position: relative;
  margin-bottom: 1.5rem;
}

.hospital-input {
  width: 100%;
  padding: 1rem 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: SourceHanSansCN;
  transition: all 0.3s ease;
  outline: none;
}

.hospital-input:focus {
  border-color: #00baad;
  box-shadow: 0 0 0 3px rgba(0, 186, 173, 0.1);
}

.hospital-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  max-height: 300px;
  overflow-y: auto;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.hospital-item {
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-family: SourceHanSansCN;
}

.hospital-item:hover {
  background-color: #f5f5f5;
}

.no-result {
  padding: 1rem 1.5rem;
  color: #999999;
  text-align: center;
  font-family: SourceHanSansCN;
}

.selected-hospital {
  padding: 1rem;
  background-color: #f0fdf4;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
}

.selected-hospital .label {
  color: #666666;
  font-family: SourceHanSansCN;
}

.selected-hospital .value {
  color: #00baad;
  font-weight: 600;
  font-family: SourceHanSansCN;
}

/* 科室选择 */
.department-select-wrapper {
  position: relative;
}

.department-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  max-height: 300px;
  overflow-y: auto;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.department-item {
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-family: SourceHanSansCN;
}

.department-item:hover {
  background-color: #f5f5f5;
}

.selected-department {
  padding: 0.8rem 1rem;
  background-color: #f0fdf4;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
}

.selected-department .label {
  color: #666666;
  font-family: SourceHanSansCN;
}

.selected-department .value {
  color: #00baad;
  font-weight: 600;
  font-family: SourceHanSansCN;
}

/* 表单部分 */
.form-section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #f0f0f0;
}

.form-section:last-of-type {
  border-bottom: none;
}

.section-title {
  font-size: 1.2rem;
  font-family: SourceHanSansCN;
  font-weight: 600;
  color: #333333;
  margin: 0 0 1.5rem 0;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group.flex-1 {
  flex: 1;
}

.form-label {
  display: block;
  font-size: 0.95rem;
  font-family: SourceHanSansCN;
  font-weight: 600;
  color: #333333;
  margin-bottom: 0.5rem;
}

.required {
  color: #ef4444;
}

.form-input {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: SourceHanSansCN;
  transition: all 0.3s ease;
  outline: none;
}

.form-input:focus {
  border-color: #00baad;
  box-shadow: 0 0 0 3px rgba(0, 186, 173, 0.1);
}

.form-input::placeholder {
  color: #999999;
}

/* 密码强度指示器 */
.password-strength {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.strength-bar {
  flex: 1;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.strength-weak {
  background-color: #f44336;
}

.strength-medium {
  background-color: #ff9800;
}

.strength-strong {
  background-color: #4caf50;
}

.strength-text {
  font-size: 0.85rem;
  font-weight: 500;
  min-width: 30px;
  text-align: right;
}

.text-weak {
  color: #f44336;
}

.text-medium {
  color: #ff9800;
}

.text-strong {
  color: #4caf50;
}

.password-hint {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #666;
  line-height: 1.4;
}

/* 错误样式 */
.input-error {
  border-color: #f44336 !important;
  background-color: #fff5f5;
}

.input-error:focus {
  border-color: #f44336 !important;
  box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1) !important;
}

.error-message {
  display: block;
  margin-top: 0.4rem;
  font-size: 0.85rem;
  color: #f44336;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 验证码 */
.verify-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.btn-get-code {
  align-self: flex-start;
  padding: 0.9rem 2rem;
  background: linear-gradient(135deg, #00baad 0%, #009a8e 100%);
  color: #ffffff;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: SourceHanSansCN;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 186, 173, 0.2);
}

.btn-get-code:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(0, 186, 173, 0.3);
}

.btn-get-code:disabled {
  background: #cccccc;
  cursor: not-allowed;
  box-shadow: none;
}

.verify-code-container {
  background: linear-gradient(135deg, #f0fdf4 0%, #e6f7f7 100%);
  border: 2px solid #00baad;
  border-radius: 1rem;
  padding: 2rem;
  animation: slideDown 0.4s ease;
  transition: all 0.3s ease;
}

.verify-code-container.error-shake {
  border-color: #ef4444;
  background: linear-gradient(135deg, #fee2e2 0%, #fef2f2 100%);
  animation: shake 0.5s ease;
}

.verify-code-container.success {
  border-color: #10b981;
  background: linear-gradient(135deg, #d1fae5 0%, #ecfdf5 100%);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
  20%, 40%, 60%, 80% { transform: translateX(8px); }
}

.verify-label {
  display: block;
  font-size: 1.1rem;
  font-family: SourceHanSansCN;
  font-weight: 600;
  color: #333333;
  margin-bottom: 0.8rem;
  text-align: center;
}

.verify-hint {
  font-size: 0.95rem;
  font-family: SourceHanSansCN;
  color: #666666;
  text-align: center;
  margin: 0 0 1.5rem 0;
}

.code-hint {
  color: #00baad;
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: 0.2rem;
  background: #ffffff;
  padding: 0.2rem 0.8rem;
  border-radius: 0.3rem;
  border: 2px dashed #00baad;
}

.verify-code-inputs {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
}

.verify-code-input {
  width: 3rem;
  height: 4rem;
}

.verify-code-input input {
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 1.8rem;
  font-family: 'Courier New', monospace;
  font-weight: 700;
  color: #333333;
  border: 3px solid #d0d7de;
  border-radius: 0.8rem;
  outline: none;
  transition: all 0.3s ease;
  background: #ffffff;
}

.verify-code-input input:focus {
  border-color: #00baad;
  box-shadow: 0 0 0 4px rgba(0, 186, 173, 0.15);
  transform: scale(1.05);
}

.verify-code-input input:not(:placeholder-shown) {
  border-color: #00baad;
  background: #f0fdf4;
}

.verify-code-input.error input {
  border-color: #ef4444 !important;
  background: #fee2e2 !important;
  color: #ef4444;
}

.verify-code-input.success input {
  border-color: #10b981 !important;
  background: #d1fae5 !important;
  color: #10b981;
}

.verify-code-input.disabled input {
  cursor: not-allowed;
  opacity: 0.6;
}

/* 剩余次数提示 */
.attempts-info {
  text-align: center;
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  background: #fef3c7;
  border-radius: 0.5rem;
  border: 2px solid #f59e0b;
}

.attempts-text {
  color: #d97706;
  font-size: 1rem;
  font-family: SourceHanSansCN;
  font-weight: 600;
}

/* 验证成功提示 */
.success-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 1rem 0;
  padding: 0.8rem 1rem;
  background: #d1fae5;
  border-radius: 0.5rem;
  border: 2px solid #10b981;
}

.success-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: #10b981;
  color: #ffffff;
  font-size: 1rem;
  font-weight: bold;
}

.success-text {
  color: #059669;
  font-size: 1.1rem;
  font-family: SourceHanSansCN;
  font-weight: 600;
}

/* 复选框 */
.form-checkbox {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin: 2rem 0;
  cursor: pointer;
}

.checkbox {
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid #d0d7de;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.checkbox.checked {
  background-color: #00baad;
  border-color: #00baad;
}

.checkbox .checkmark {
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: bold;
}

.checkbox-label {
  font-size: 0.95rem;
  font-family: SourceHanSansCN;
  color: #666666;
}

.link {
  color: #00baad;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

/* 按钮组 */
.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  flex: 1;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  font-family: SourceHanSansCN;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #00baad;
  color: #ffffff;
}

.btn-primary:hover {
  background-color: #009a8e;
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(0, 186, 173, 0.3);
}

.btn-secondary {
  background-color: #f5f5f5;
  color: #333333;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}

/* 成功内容 */
.success-content {
  text-align: center;
  padding: 2rem 0;
}

.success-icon {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #00baad;
  color: #ffffff;
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.success-text {
  font-size: 1.3rem;
  font-family: SourceHanSansCN;
  font-weight: 600;
  color: #333333;
  margin: 0 0 1rem 0;
}

.success-desc {
  font-size: 1rem;
  font-family: SourceHanSansCN;
  color: #666666;
  line-height: 1.6;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .register-page {
    padding: 1rem 0.5rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .logo {
    width: 2.5rem;
    height: 2.5rem;
  }

  .form-card {
    padding: 1.5rem;
  }

  .card-title {
    font-size: 1.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .button-group {
    flex-direction: column;
  }

  .verify-code-inputs {
    gap: 0.5rem;
  }

  .verify-code-input {
    width: 2.5rem;
    height: 3.5rem;
  }

  .verify-code-input input {
    font-size: 1.5rem;
  }

  .verify-code-container {
    padding: 1.5rem 1rem;
  }

  .progress-container {
    margin-bottom: 2rem;
  }

  .step-label {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .form-card {
    padding: 1rem;
  }

  .step-circle {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1rem;
  }

  .card-title {
    font-size: 1.3rem;
  }

  .card-subtitle {
    font-size: 0.9rem;
  }
}
</style>

