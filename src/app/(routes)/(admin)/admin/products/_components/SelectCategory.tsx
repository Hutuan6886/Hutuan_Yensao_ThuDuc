"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CategoryType } from "@/types";
import { cn } from "@/lib/utils";

interface SelectCategoryProps {
  categories: CategoryType[]; // toàn bộ tree
  value?: CategoryType | null; // optional để không ép buộc phải có object dummy
  onChange: (category: CategoryType | null) => void;
  placeholder?: string;
  className?: string;
}

export default function SelectCategory({
  categories,
  value,
  onChange,
  placeholder = "Chọn danh mục",
  className,
}: SelectCategoryProps) {
  /**
   * selectedPath: mảng id theo thứ tự các cấp đã chọn
   * ví dụ: ["id-A", "id-AC"] nếu user chọn A -> AC
   */
  const [selectedPath, setSelectedPath] = useState<string[]>([]);

  // Lưu ý: chạy lại khi categories hoặc value?.id thay đổi
  useEffect(() => {
    if (!categories || categories.length === 0) {
      setSelectedPath([]);
      return;
    }

    if (!value || !value.id) {
      setSelectedPath([]);
      return;
    }
    // tìm đường dẫn từ root đến node có id = value.id
    /*
      categories=[
      {id:p1,...,children:[{id:cp1-1,...},{id:cp1-2,...},...]},
      {id:p2,...},children:[{id:cp2-1}]]
      targetId=cp1-2
      => path=["p1","cp1-2"]
      */
    const path = getPathById(categories, value.id);
    if (path) {
      setSelectedPath(path);
    } else {
      // nếu không tìm thấy id trong tree, fallback set id duy nhất (để selects hiển thị)
      setSelectedPath([value.id]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.id, categories]);
  /*
  levels: mảng từng mức categories để render từng Select
  levels[0] = categories (root level)
  levels[1] = children của selectedPath[0], ...
  categories=[
    {id:p1,...,children:[{id:cp1-1,...},{id:cp1-2,...},...]},
    {id:p2,...},children:[{id:cp2-1}]]
    Nếu chọn p1 => levels = [ [{id:p1,...},{id:p2,...}] , [{id:cp1-1,...},{id:cp1-2,...}] ]
    Nếu chọn p2 => [ [{id:p1,...},{id:p2,...}] , [{id:cp2-1,...},{id:cp2-2,...}] ]
    Data ở các cấp levels sau sẽ ứng với cấp chọn trước đó.
  */
  const levels = useMemo(
    () => buildCategoryLevels(categories, selectedPath),
    [categories, selectedPath]
  );

  const handleSelect = (levelIndex: number, categoryId: string) => {
    // reset phần sau levelIndex, sau đó thêm categoryId
    const newPath = [...selectedPath.slice(0, levelIndex), categoryId];
    setSelectedPath(newPath);

    // find node cuối cùng, lấy được toàn bộ giá trị của node đó để gửi ra form (bằng duyệt theo newPath)
    const node = findNodeByPath(categories, newPath);
    onChange(node ?? null);
  };

  const clearSelection = () => {
    setSelectedPath([]);
    onChange(null);
  };

  // debug logs (remove after OK)
  // console.log("SelectCategory: categories len", categories?.length, "value id", value?.id, "selectedPath", selectedPath);

  return (
    <div className={cn("flex gap-3 flex-wrap items-center", className)}>
      {levels.map((list, idx) => (
        <Select
          key={idx}
          value={selectedPath[idx] ?? ""}
          onValueChange={(v) => handleSelect(idx, v)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {list.length === 0 ? (
              <div className="p-2 text-sm text-gray-500">Không có mục</div>
            ) : (
              list.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      ))}

      <div className="flex items-center gap-2 ml-2">
        <div className="text-sm text-gray-600">
          {selectedPath.length > 0 ? (
            <span className="font-medium">
              {renderPathNames(categories, selectedPath)}
            </span>
          ) : (
            <span className="text-xs text-gray-400">Chưa chọn</span>
          )}
        </div>
        {selectedPath.length > 0 && (
          <button
            type="button"
            onClick={clearSelection}
            className="text-xs text-red-600 underline cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

/* ----------------- Helper functions ----------------- */
// Helper: trả về path (mảng id) từ root -> targetId hoặc null nếu không tìm thấy
const getPathById = (
  cats: CategoryType[],
  targetId: string
): string[] | null => {
  const stack: { node: CategoryType; idx: number }[] = [];
  const path: string[] = [];

  const dfs = (list: CategoryType[], id: string): boolean => {
    for (const node of list) {
      path.push(node.id);
      if (node.id === id) return true;
      if (node.children && node.children.length > 0) {
        const found = dfs(node.children, id);
        if (found) return true;
      }
      path.pop();
    }
    return false;
  };

  const ok = dfs(cats, targetId);
  return ok ? [...path] : null;
};

/** Trả về danh sách categories cho mỗi level dựa trên selectedPath.
 *  Ex: levels[0] = root list, levels[1] = children of selectedPath[0], ...
 */
const buildCategoryLevels = (
  cats: CategoryType[],
  path: string[]
): CategoryType[][] => {
  const levels: CategoryType[][] = [cats];
  let list = cats;
  for (const id of path) {
    const found = list.find((c) => c.id === id);
    if (!found) break;
    if (found.children && found.children.length > 0) {
      levels.push(found.children);
      list = found.children;
    } else {
      break;
    }
  }
  return levels;
};
/** Tìm category node dựa trên selectedPath (ids)
 * Lấy toàn bộ dữ liệu của node đang chọn
 */
const findNodeByPath = (cats: CategoryType[], path: string[]) => {
  if (!path || path.length === 0) return null;
  let list = cats;
  let current: CategoryType | null = null;
  for (const id of path) {
    current = list.find((c) => c.id === id) ?? null;
    if (!current) return null;
    list = current.children ?? [];
  }
  return current;
};
/** Utility: render tên path (human readable) */
const renderPathNames = (cats: CategoryType[], path: string[]) => {
  const names: string[] = [];
  let list = cats;
  for (const id of path) {
    const found = list.find((c) => c.id === id);
    if (!found) break;
    names.push(found.name);
    list = found.children ?? [];
  }
  return names.join(" / ");
};
