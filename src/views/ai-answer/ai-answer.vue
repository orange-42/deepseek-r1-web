<script setup name="ai-answer">
import useGptHook from './composables/useGptHook'
import { marked } from 'marked'

const {
  userQuestionTxt,
  curSessionIndex,
  changeSession,
  sendQuestion,
  addSession,
  newQuestionTxt,
  visible,
  messages,
  loading,
  historyListRef,
  questionTxt,
  sessionList
} = useGptHook()

const renderAnswer = (content) => {
  return marked(content) // 使用 marked 解析 markdown 格式内容
}
</script>
<template>
  <div class="ai-answer-layout">
    <a-layout class="layout">
      <a-layout class="content-layout">
        <a-layout-sider class="side">
          <a-space direction="vertical" style="width: 100%">
            <a-button
              v-for="(item, index) in sessionList"
              :key="index"
              :type="curSessionIndex === index ? 'primary' : 'default'"
              style="width: 100%"
              @click="changeSession(index)"
              >{{ item.text }}</a-button
            >
            <a-button style="width: 100%" type="dashed" @click="addSession"
              >新增对话</a-button
            >
          </a-space>
        </a-layout-sider>
        <a-layout-content class="content">
          <div class="header">{{ questionTxt }}</div>
          <!-- 问答区 -->
          <div class="history-answer-module" ref="historyListRef">
            <div v-for="(item, index) in messages" :key="index">
              <div v-if="item.role !== 'assistant'" class="question">
                {{ item.content }}
              </div>
              <div v-else class="answer">
                <span v-html="renderAnswer(item.content)"></span>
              </div>
            </div>
            <a-spin :spinning="loading" />
          </div>
          <!-- 发问区 -->
          <div class="question-module">
            <div class="question-operation">
              <a-textarea
                v-model:value.trim="userQuestionTxt"
                placeholder="请输入问题后点击发送或者回车进行搜索"
                :rows="3"
              />
              <a-button
                :loading="loading"
                size="large"
                @click="sendQuestion"
                type="primary"
                class="btn"
                >发送</a-button
              >
            </div>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
  <!-- 新增会话 -->
  <a-modal
    v-model:open="visible"
    title="新增会话"
    @ok="handleOk"
    okText="确定"
    cancelText="取消"
  >
    <a-form>
      <a-form-item label="问题描述">
        <a-textarea v-model:value="newQuestionTxt" placeholder="请输入问题" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<style lang="less" scoped>
.ai-answer-layout {
  width: 100%;
  height: 100vh;
  border: 1px solid #000;
  .layout {
    height: 100%;
    .content-layout {
      height: 100%;
      .side {
        padding: 16px;
        background: antiquewhite;
      }
      .content {
        padding: 0 20%;
        background: #fff;
        .header {
          font-size: 16px;
          color: #000;
          text-align: left;
          line-height: 48px;
          height: 48px;
          border-bottom: 1px solid #ddd;
        }
        .history-answer-module {
          height: calc(100% - 148px);
          background: #fff;
          padding: 16px;
          overflow: scroll;
          .question {
            background: rgba(0, 0, 0, 0.05);
            padding: 9px 16px;
            margin: 24px 0;
            border-radius: 10px;
            width: fit-content;
            max-width: 450px;
            white-space: pre;
            word-wrap: normal;
          }
          .answer {
            color: rgba(0, 0, 0, 0.7);
            margin: 24px 0;
            line-height: normal;
          }
        }
        .question-module {
          height: 100px;
          padding: 16px;
          border-top: 1px solid #dcdcdc;
          .question-operation {
            display: flex;
            align-items: center;
            .btn {
              margin-left: 16px;
            }
          }
        }
      }
    }
  }
}
</style>
