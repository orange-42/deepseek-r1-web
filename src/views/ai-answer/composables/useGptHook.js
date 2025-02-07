import { ref, computed } from 'vue'
import { message } from 'ant-design-vue'

export default function useGptHook() {
  const userQuestionTxt = ref('')

  // 问询对话 message列表
  const messages = ref([])

  const historyListRef = ref()
  // 用户触发发送问题
  function sendQuestion() {
    if (!userQuestionTxt.value) return message.warning('请输入问题')
    if (historyListRef.value) {
      
      // 将 scrollTop 设置为 scrollHeight 以滚动到最底部
      historyListRef.value.scrollTop = historyListRef.value.scrollHeight
    }
    messages.value.push({ role: 'user', content: userQuestionTxt.value })
    userQuestionTxt.value = ''
    deepseekAI()
  }

  // 发送问题给到ai 进行回答
  const loading = ref(false)
  async function sendQuestionToAI() {
    try {
      loading.value = true
      
      const response = await fetch('http://localhost:3000/getAnswer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: messages.value })
      })
      const data = await response.json();
      
      messages.value.push(data.data.choices[0].message)
    } finally {
      loading.value = false
    }
  }

  async function deepseekAI () {
    
            try {
                loading.value = true
                const response = await fetch('http://10.20.220.118:5080/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ input: messages.value.at(-1).content })
                });
                const data = await response.json();
                
                messages.value.push({
                  content: data.response,
                  role: 'assistant'
                 })
            } catch (error) {
              
                
            } finally {
              loading.value = false
            }
  }

  const questionTxt = computed(() =>
    messages.value?.length ? messages.value[0]?.content : '问题'
  )

  const curSessionIndex = ref(0)
  const sessionList = ref([
    {
      text: '对话1',
      id: 1,
      messages: []
    },
    {
      text: '对话2',
      id: 2,
      messages: []
    }
  ])

  // 切换会话
  function changeSession (index) {
    curSessionIndex.value = index
  }

  // 新增会话
  const newQuestionTxt = ref('')
  const visible = ref(false)
  function addSession () {
    visible.value = true
    // const sessionLen = sessionList.value?.length ?? 0
    // sessionList.value.push({
    //     text: `对话${sessionLen + 1}`,
    //     id: sessionLen + 1,
    //     messages: []
    // })
  }

  

  return {
    curSessionIndex,
    changeSession,
    userQuestionTxt,
    questionTxt,
    addSession,
    sendQuestion,
    visible,
    newQuestionTxt,
    loading,
    messages,
    sessionList
  }
}
