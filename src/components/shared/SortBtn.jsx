import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SortBtn() {
  return (
    <Select>
      <SelectTrigger className="border w-[130px] tb:w-[180px]">
        <SelectValue placeholder="정렬" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="latest">최신 순</SelectItem>
        <SelectItem value="oldest">오래된 순</SelectItem>
        <SelectItem value="highPrice">높은 가격순</SelectItem>
        <SelectItem value="lowPrice">낮은 가격순</SelectItem>
      </SelectContent>
    </Select>
  );
}
