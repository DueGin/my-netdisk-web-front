import {RouterLink} from "vue-router";
import {h, VNodeChild} from "vue";

/**
 * 返回带链接的VNode
 * @param routerName 路由名称
 * @param text 链接文字 或 VNode
 */
export function renderLinkText(routerName: string, text?: string | (() => VNodeChild)) {
  return () => h(
    RouterLink,
    {
      to: {name: routerName}
    },
    {default: () => text}
  )
}
