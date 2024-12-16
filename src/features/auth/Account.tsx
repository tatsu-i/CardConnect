import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Compressor from "compressorjs";
import { UserAccount } from "@/utils/types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/utils/supabase";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Account = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAccount>();

  const onUpload = async (data: UserAccount) => {
    const file = data.icon[0];
    new Compressor(file, {
      quality: 0.6,
      success: async (compressedFile) => {
        const fileExt = (compressedFile as File).name.split(".").pop();
        const fileName = `${user!.id}.${fileExt}`;
        const filePath = `private/${fileName}`;
        const { error: uploadError } = await supabase.storage
          .from("icons")
          .update(filePath, compressedFile, {
            upsert: true,
          });

        if (uploadError) {
          setErrorMessage(`アップロードに失敗しました：${uploadError.message}`);
        }
      },
      error: (error: Error) => {
        setErrorMessage(`画像の圧縮に失敗しました：${error.message}`);
      },
    });
  };

  return (
    <>
      <main className="flex flex-col justify-center items-center">
        <header className="text-zinc-700 text-4xl p-4">Account</header>
        <div className="flex items-center gap-2 px-5 py-2.5 mb-8 text-left text-sm border rounded-lg">
          <Avatar className="h-12 w-12 rounded-lg">
            <AvatarImage
              src={"../../../assets/images/usericon_notset.png"}
              alt=""
            />
            <AvatarFallback className="rounded-lg">Icon</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-base leading-tight">
            <span className="truncate font-medium">User Name</span>
            <span className="truncate text-sm">user email</span>
          </div>
        </div>
        <form onSubmit={handleSubmit(onUpload)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg mb-1">
              ユーザーネーム
            </label>
            <Input type="name" placeholder="User Name" />
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
            <p className="text-red-600">{errorMessage}</p>
          </div>
          <div className="flex justify-center items-center">
            <Button type="submit">更新</Button>
          </div>
        </form>
      </main>
    </>
  );
};

export default Account;
