<script setup>
  import { useRouter } from 'vue-router';
  import { defineProps, defineEmits } from 'vue';

  const props = defineProps({
    visible: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: '请先勾选协议'
    }
  });

  const emit = defineEmits(['close', 'confirm']);

  const router = useRouter();

  // 确认关闭
  const handleConfirm = () => {
    emit('confirm');
    emit('close');
  };

  // 点击遮罩层不关闭，只能通过确认按钮关闭
</script>

<template>
  <div v-if="visible" class="dialog-overlay" @click.stop>
    <div class="flex-col justify-start items-center page">
      <div class="message-text">{{ message }}</div>
      <div class="section" @click="handleConfirm" style="cursor: pointer;">
        <span class="confirm-text">确认</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  .page {
    padding: 3rem 2rem 2.5rem;
    background-color: #ffffff;
    border-radius: 1.25rem;
    min-width: 35rem;
  }

  .message-text {
    color: #333333;
    font-size: 1.5rem;
    font-family: SourceHanSansCN;
    line-height: 2rem;
    text-align: center;
    margin-bottom: 3rem;
  }

  .section {
    background-color: #00baad;
    border-radius: 1.25rem;
    width: 33.5rem;
    height: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;
  }

  .section:hover {
    background-color: #009a8e;
  }

  .confirm-text {
    color: #ffffff;
    font-size: 1.5rem;
    font-family: SourceHanSansCN;
    font-weight: 700;
  }
</style>