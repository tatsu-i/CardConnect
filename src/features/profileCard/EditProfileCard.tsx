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
import { ProfileCard } from "@/utils/types";
import useAuth from "@/hooks/useAuth";
import { supabase } from "@/utils/supabase";
import imageCompression from "browser-image-compression";
import { SelectGroup } from "@radix-ui/react-select";

const EditProfileCard = () => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  const [prefecture, setPrefecture] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useAuth();

  const handlePrefectureChange = (value: string) => {
    setPrefecture(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    //イメージのupdate
    let fileName = "";
    const image = formData.get("image") as File;
    if (image && image.size > 0) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(image, options);
      const fileExt = compressedFile.name.split(".").pop();
      fileName = `${user!.id}.${fileExt}`;
      const filePath = `private/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("profilecard_imgs")
        .upload(filePath, compressedFile, {
          upsert: true,
        });
      if (uploadError) {
        setErrorMessage(`アップロードに失敗しました：${uploadError.message}`);
      }
    }

    //イメージ以外のupdate;
    const updates: ProfileCard = {
      user_id: user!.id,
      birth_date: date?.toISOString(),
      prefecture,
      updated_at: new Date().toISOString(),
    };

    if (fileName) {
      updates.image_url = fileName;
    }

    const name = formData.get("name");
    if (name) updates.name = name.toString();

    const job = formData.get("job");
    if (job) updates.job = job.toString();

    const description = formData.get("description");
    if (description) updates.description = description.toString();

    const hobby = formData.get("hobby");
    if (hobby) updates.hobby = hobby.toString();

    const skill = formData.get("skill");
    if (skill) updates.skill = skill.toString();

    if (Object.keys(updates).length > 1) {
      const { error } = await supabase.from("ProfileCard").upsert(updates);
      if (error) {
        setErrorMessage(error.message);
      }
    } else {
      setErrorMessage("更新する値がありません");
    }
    setLoading(false);
  };

  return (
    <main className="flex justify-center items-center mx-auto px-4">
      <div className="w-full max-w-xs">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-md mb-1">
              ネーム
            </label>
            <Input name="name" placeholder="Name" />
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
            <Select
              value={prefecture}
              onValueChange={handlePrefectureChange}
              name="prefecture"
            >
              <SelectTrigger>
                <SelectValue placeholder="都道府県を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {prefectures.map((pref) => (
                    <SelectItem key={pref} value={pref}>
                      {pref}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <label htmlFor="job" className="block text-md mb-1">
              仕事
            </label>
            <Input name="job" placeholder="Job" />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-md mb-1">
              ディスクリプション
            </label>
            <Textarea
              name="description"
              placeholder="Description"
              className="md:min-h-64"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="hobby" className="block text-md mb-1">
              趣味
            </label>
            <Input name="hobby" placeholder="Hobby" />
          </div>
          <div className="mb-4">
            <label htmlFor="skill" className="block text-md mb-1">
              スキル
            </label>
            <Input name="skill" placeholder="Skill" />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-md mb-1">
              イメージ
            </label>
            <input
              type="file"
              accept="image/png"
              name="image"
              className="block w-full text-sm text-zinc-500 file:mr-4 file:rounded-md file:border-0 file:bg-zinc-100 file:text-zinc-950 file:py-2 file:px-4 hover:file:bg-zinc-300 hover:file:cursor-pointer "
            />
          </div>
          <div className="flex justify-center items-center my-4">
            <p className="text-red-600">{errorMessage}</p>
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
