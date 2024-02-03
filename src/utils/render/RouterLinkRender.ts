import {RouterLink} from "vue-router";
import {h, VNodeChild} from "vue";

/**
 * 返回带链接的VNode
 * @param routerName 路由名称
 * @param text 链接文字 或 VNode
 */
export function renderLinkTextWithName(routerName: string, text?: string | (() => VNodeChild)) {
  return h(
    RouterLink,
    {
      to: {name: routerName}
    },
    {default: () => text}
  )
}

/**
 * 返回带链接的VNode
 * @param routerPath 路由地址
 * @param text 链接文字 或 VNode
 * @param query 地址参数
 */
export function renderLinkTextWithPath(routerPath: string, text: string | (() => VNodeChild), query?: any) {
  return h(
    RouterLink,
    {
      to: {
        path: routerPath,
        query: query
      }
    },
    {default: () => text}
  )
}
