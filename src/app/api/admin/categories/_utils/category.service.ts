import { CategoryWithSub } from "@/types";

export function buildChildrenCategoryPost(
  children?: { name: string; children?: any[] }[]
): any {
  // Recursive
  // Check cấp con ở children để đảm bảo children là 1 [], không null hay undefine
  if (!children || children.length === 0) return []; // trả về array rỗng nếu null
  return children.map((child) => ({
    name: child.name,
    normalizedName: child.name.trim().toLowerCase(),
    ...(child.children && child.children.length > 0
      ? { children: { create: buildChildrenCategoryPost(child.children) } }
      : {}),
  }));
}

export const buildChildrenCategoryPut = (child: CategoryWithSub, level = 1) => {
  const obj: any = {
    name: child.name,
    normalizedName: normalize(child.name),
  };

  if (level >= 3) return obj; // stop at level 3

  if (child.children && child.children.length) {
    obj.children = {
      create: child.children.map((c) => buildChildrenCategoryPut(c, level + 1)),
    };
  }

  return obj;
};

export const normalize = (s: string): string => {
  return s.trim().toLowerCase();
};
export const inputChildren = (children: CategoryWithSub[]) => {
  return children.map((c: CategoryWithSub) => ({
    ...c,
    normalizedName: normalize(c.name),
  }));
};
