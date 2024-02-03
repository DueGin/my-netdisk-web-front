import {h, VNodeChild} from "vue";
import {NIcon} from "naive-ui";
import {Icon} from "@iconify/vue";
import {RouterLink} from "vue-router";

/**
 * 直接返回iconify的<icon/>
 * @param icon icon类型
 * @param color icon颜色
 * @param size 图标大小
 */
export function renderNIcon(icon: string, color?: string, size?: string) {
  return h(NIcon, {
    size: size
  }, {
    default: () => h(Icon, {icon: icon, color: color})
  })
}


/**
 * 直接返回iconify的<icon/>
 * @param icon icon类型
 * @param color icon颜色
 * @param width (可选)icon宽度，单位px
 * @param height (可选)icon高度，单位px
 */
export function renderIcon(icon: string, color?: string, width?: number, height?: number) {
  return h(Icon,
    {
      icon: icon,
      color: color,
      width: width,
      height: height
    })
}


/**
 * 直接返回iconify的<icon/>
 * @param routerName 路由名称
 * @param icon icon类型(string) 或 已经封装好的VNode
 * @param color icon颜色
 * @param width (可选)icon宽度，单位px
 * @param height (可选)icon高度，单位px
 */
export function renderLinkIcon(routerName: string, icon: string | (() => VNodeChild), color?: string, width?: number, height?: number) {
  return h(
    RouterLink,
    {
      to: {name: routerName}
    },
    {
      default: () => typeof icon === 'string' ? h(Icon,
        {
          icon: icon,
          color: color,
          width: width,
          height: height
        }) : icon
    }
  )
}



