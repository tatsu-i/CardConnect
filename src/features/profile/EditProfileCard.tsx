import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { ja } from "date-fns/locale";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { prefectures } from "@/utils/prefectures";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const EditProfileCard = () => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date>();

  return (
    <main className="flex justify-center items-center mx-auto px-4">
      <div className="w-full max-w-xs">
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-md mb-1">
              ネーム
            </label>
            <Input type="name" placeholder="Name" />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-md mb-1">
              生まれ
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    format(date, "yyyy年MM月dd日", { locale: ja })
                  ) : (
                    <span>Birthdate</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  captionLayout="dropdown-buttons"
                  fromYear={1900}
                  toYear={2025}
                  locale={ja}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-md mb-1">
              住み
            </label>
            <Select>
              <SelectTrigger id="prefecture">
                <SelectValue placeholder="Prefecture" />
              </SelectTrigger>
              <SelectContent>
                {prefectures.map((prefecture) => (
                  <SelectItem key={prefecture} value={prefecture}>
                    {prefecture}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <label htmlFor="job" className="block text-md mb-1">
              仕事
            </label>
            <Input type="job" placeholder="Job" />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-md mb-1">
              ディスクリプション
            </label>
            <Textarea placeholder="Description" className="md:min-h-64" />
          </div>
          <div className="mb-4">
            <label htmlFor="hobby" className="block text-md mb-1">
              趣味
            </label>
            <Input type="hobby" placeholder="Job" />
          </div>
          <div className="mb-4">
            <label htmlFor="skill" className="block text-md mb-1">
              スキル
            </label>
            <Input type="skill" placeholder="Job" />
          </div>
          <div className="flex justify-center items-center">
            <Button type="submit">{loading ? "更新中..." : "更新"}</Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfileCard;
