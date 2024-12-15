import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Compressor from "compressorjs";
import { UserAccount } from "@/utils/types";
import React from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/utils/supabase";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const Account = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAccount>();

  const onSubmit = async (data: UserAccount) => {
    const file = data.icon[0];
    new Compressor(file, {
      quality: 0.6,
      success: async (compressedFile) => {
        // console.log(compressedFile);
        const fileExt = (compressedFile as File).name.split(".").pop();
        const fileName = `${user!.id}.${fileExt}`;
        const filePath = `private/${fileName}`;
        const { error: uploadError } = await supabase.storage
          .from("icons")
          .upload(filePath, compressedFile, {
            upsert: true,
          });

        if (uploadError) {
          throw uploadError;
        }
      },
    });
  };

  return (
    <>
      <main className="flex flex-col justify-center items-center">
        <header className="text-zinc-700 text-4xl p-4">Account</header>
        <div className="flex justify-center items-center mb-4">
          <Avatar>
            <AvatarImage src="" alt="" />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="icon" className="block text-lg mb-1">
              アイコンをアップロード
            </label>
            <input
              {...register("icon")}
              type="file"
              accept="image/png, image/jpeg"
              required
              className="block w-full text-sm text-zinc-500 file:mr-4 file:rounded-md file:border-0 file:bg-zinc-950 file:text-white file:py-2 file:px-4 hover:file:bg-zinc-800 hover:file:cursor-pointer "
            />
            <div className="flex justify-center items-center">
              <Button type="submit" variant="secondary" className="mt-4">
                更新
              </Button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default Account;
