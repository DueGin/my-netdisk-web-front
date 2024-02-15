import {checkRole} from "@/utils/role/RoleUtils.ts";

export default {
  hasRole: {
    mounted(el: any, binding: any) {
      if (!checkRole(binding)) {
        el.style.display = 'none';
      }
    }
  }
}
