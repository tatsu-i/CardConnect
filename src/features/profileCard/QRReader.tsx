import { useRef, useState } from "react";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { supabase } from "@/utils/supabase";
import { ScannedProfileCard } from "@/utils/types";
import ProfileCardViewer from "./ProfileCardViewer";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";

const QRReader = () => {
  const [isScanning, setIsScanning] = useState(true);
  const lastScannedRef = useRef("");
  const [scannedProfileCard, setScannedProfileCard] =
    useState<ScannedProfileCard | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useAuth();

  const handleScan = async (results: IDetectedBarcode[]) => {
    if (!isScanning || results.length === 0) return;

    const scanResult = results[0].rawValue;

    if (lastScannedRef.current === scanResult) return;
    lastScannedRef.current = scanResult;

    setIsScanning(false);

    try {
      const { data: token_data, error } = await supabase
        .from("QR_token")
        .select("user_id")
        .eq("token", scanResult)
        .single();

      if (error) {
        // console.log(`ユーザーIDの取得に失敗しました:${error}`);
        setErrorMessage("ユーザーIDの取得に失敗しました。");
        return;
      }

      if (!token_data) {
        // console.log("トークンが見つからないか、期限切れです");
        setErrorMessage("トークンが見つからないか期限切れです。");
        return;
      }

      if (token_data.user_id) {
        const { data: profileCard_data, error } = await supabase
          .from("ProfileCard")
          .select(
            "user_id, name, birth_date, prefecture, job, description, hobby, skill, instagram, image_url"
          )
          .eq("user_id", token_data.user_id)
          .single();

        if (error) throw error;

        if (profileCard_data) {
          const { data: imageData, error } = await supabase.storage
            .from("profilecard_imgs")
            .download(`private/${profileCard_data.image_url}`);

          if (error) throw error;

          const url = URL.createObjectURL(imageData);
          const scannedProfileCardData = {
            ...profileCard_data,
            image_url: url,
          };
          setScannedProfileCard(scannedProfileCardData);
          // console.log(profileCard_data);
        }
      }
    } catch (err) {
      // console.error("スキャンエラー:", err);
      if (err instanceof Error) window.alert(err.message);
    } finally {
      setTimeout(() => {
        setIsScanning(true);
        lastScannedRef.current = "";
      }, 3000);
    }
  };

  const handleSavaProfileCard = async () => {
    try {
      setStatusMessage("追加しています...");

      const saved_user_id = scannedProfileCard!.user_id;
      const { error: select_error, data } = await supabase
        .from("ProfileCardList")
        .select("saved_profile_id")
        .eq("user_id", user!.id)
        .eq("saved_profile_id", saved_user_id)
        .maybeSingle();

      if (select_error) {
        console.error("チェックエラー:", select_error);
        return;
      }

      if (data?.saved_profile_id) {
        setStatusMessage("既に追加済みのユーザーです。");
        return;
      }

      const { error: upsert_error } = await supabase
        .from("ProfileCardList")
        .upsert({
          user_id: user!.id,
          saved_profile_id: saved_user_id,
          saved_at: new Date().toISOString(),
        });

      if (upsert_error) throw upsert_error;

      setStatusMessage("追加が完了しました");
    } catch (err) {
      if (err instanceof Error) window.alert(err.message);
    } finally {
      setTimeout(() => {
        setStatusMessage("");
      }, 5000);
    }
  };

  const customTracker = (
    detectedCodes: IDetectedBarcode[],
    ctx: CanvasRenderingContext2D
  ) => {
    detectedCodes.forEach((code) => {
      // 検出されたコードの周りに赤い枠を描画
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.strokeRect(
        code.boundingBox.x,
        code.boundingBox.y,
        code.boundingBox.width,
        code.boundingBox.height
      );

      // コードの内容を表示
      ctx.fillStyle = "white";
      ctx.fillRect(
        code.boundingBox.x,
        code.boundingBox.y + code.boundingBox.height,
        code.boundingBox.width,
        20
      );
      ctx.fillStyle = "black";
      ctx.fillText(
        code.rawValue,
        code.boundingBox.x,
        code.boundingBox.y + code.boundingBox.height + 15
      );
    });
  };

  return (
    <div className="flex justify-center">
      {!scannedProfileCard ? (
        <div className="w-[300px] gap-4">
          <Scanner
            onScan={handleScan}
            formats={["qr_code"]}
            allowMultiple={false}
            components={{
              tracker: customTracker,
              audio: false,
              onOff: true,
              finder: false,
            }}
          />
          <p>{errorMessage}</p>
        </div>
      ) : (
        <div>
          <ProfileCardViewer profileData={scannedProfileCard} />
          <div className="flex flex-col items-center mt-4 gap-4">
            <Button onClick={handleSavaProfileCard}>追加する</Button>
            <p className="text-red-600">{statusMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRReader;
