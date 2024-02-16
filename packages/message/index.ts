import { h, render } from 'vue' //h() 更准确的名称是 createVnode()
import rMessage from './index.vue'

const Message = (options: {
  message?: string
  type?: 'info' | 'success' | 'error' | 'warn'
  icon?: string
  timeout?: number
}) => {
  if (!options) return

  //message 是弹窗消息内容
  //type 是消息类型
  //timeout 是弹窗存在时间
  //icon 是自定义图标
  const message = options.message || ''
  const type = options.type || 'info'
  const timeout = options.timeout || 3000
  const icon = options.icon

  //动态创建一个DOM容器
  const container: HTMLDivElement | string =
    typeof document !== 'undefined'
      ? typeof document.createElement !== 'undefined'
        ? document.createElement('div')
        : ''
      : ''

  if (container instanceof HTMLDivElement) {
    document.body.appendChild(container)

    //传递给组件的选项
    const vnode = h(rMessage, { message, type, icon, timeout })
    render(vnode, container)

    //定时销毁
    let timer: any = null

    clearTimeout(timer)

    timer = setTimeout(() => {
      render(null, container)
      if (typeof document !== 'undefined') document.body.removeChild(container)
      clearTimeout(timer)
    }, timeout)
  }
}

export default Message
