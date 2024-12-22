import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import imageCompression from "browser-image-compression";
import { UserAccount, UserInfo } from "@/utils/types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/utils/supabase";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAccount } from "./userAccountSlice";
import { AppDispatch, RootState } from "@/store/store";

const EditAccount = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [inputUsername, setInputUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { username, iconUrl } = useSelector(
    (state: RootState) => state.userAccount
  );
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAccount>();

  const onUpload = async (data: UserAccount) => {
    setLoading(true);
    setErrorMessage("");

    //アイコンアップロード
    let fileName = "";
    if (data.icon && data.icon.length > 0) {
      const file = data.icon[0] as File;
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);

      const fileExt = compressedFile.name.split(".").pop();
      fileName = `${user!.id}.${fileExt}`;
      const filePath = `private/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("icons")
        .update(filePath, compressedFile, {
          upsert: true,
        });

      if (uploadError) {
        setErrorMessage(`アップロードに失敗しました：${uploadError.message}`);
      }
    }

    //アップデート
    const updates: UserInfo = {
      id: user!.id,
      updated_at: new Date().toISOString(),
    };

    if (inputUsername) {
      updates.username = inputUsername;
    }

    if (fileName) {
      updates.avatar_url = fileName;
    }

    if (inputUsername || fileName) {
      const { error } = await supabase.from("profiles").upsert(updates);
      if (error) {
        setErrorMessage(`データの更新に失敗しました：${error.message}`);
      } else {
        dispatch(fetchUserAccount(user!.id));
      }
    } else {
      setErrorMessage("値が入力されていません。");
    }

    setLoading(false);
  };

  return (
    <>
      <main className="flex flex-col justify-center items-center">
        <header className="text-zinc-700 text-4xl p-4">Account</header>
        <div className="flex items-center gap-2 px-5 py-2.5 mb-8 text-left text-sm border rounded-lg">
          <Avatar className="h-12 w-12 rounded-lg">
            <AvatarImage src={iconUrl} alt="" />
            <AvatarFallback className="rounded-lg">Icon</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-base leading-tight">
            <span className="truncate font-medium">{username}</span>
            <span className="truncate text-sm">user email</span>
          </div>
        </div>
        <form onSubmit={handleSubmit(onUpload)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg mb-1">
              ユーザーネーム
            </label>
            <Input
              {...register("username", {
                minLength: {
                  value: 3,
                  message: "ユーザーネームは3文字以上である必要があります。",
                },
              })}
              type="name"
              placeholder="User Name"
              onChange={(e) => setInputUsername(e.target.value)}
            />
            {errors.username && <p>{errors.username.message}</p>}
          </div>
          <div className="mb-8">
            <label htmlFor="icon" className="block text-lg">
              アイコン
            </label>
            <input
              {...register("icon")}
              type="file"
              accept="image/png"
              className="block w-full text-sm text-zinc-500 file:mr-4 file:rounded-md file:border-0 file:bg-zinc-100 file:text-zinc-950 file:py-2 file:px-4 hover:file:bg-zinc-300 hover:file:cursor-pointer "
            />
            {errors.icon && <p>{errors.icon.message}</p>}
          </div>
          <div className="flex justify-center items-center my-4">
            <p className="text-red-600">{errorMessage}</p>
          </div>
          <div className="flex justify-center items-center">
            <Button type="submit">{loading ? "更新中..." : "更新"}</Button>
          </div>
        </form>
      </main>
    </>
  );
};

export default EditAccount;
