import {useMainStore} from "@/store/store.ts";
import {SysRoleConstant} from "@/directive/hasRole/SysRoleConstant.ts";

export function checkRole(needRole:any) {
  const mainStore = useMainStore();
  let sysRole = mainStore.sysRole;

  if (!needRole.value || needRole.value === '') {
    return true;
  }

  if(!sysRole || sysRole === ''){
    console.error("该用户没有分配角色")
    return false;
  }

  let needRoleConstant = SysRoleConstant[needRole.value as keyof typeof SysRoleConstant];

  let userRole = SysRoleConstant[sysRole as keyof typeof SysRoleConstant];
  if (userRole > needRoleConstant) {
    return false;
  }

  return true;
}
