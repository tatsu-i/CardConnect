import React, { useRef, useState } from "react";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { supabase } from "@/utils/supabase";
import { ScannedProfileCard } from "@/utils/types";

const QRReader = () => {
  const [isScanning, setIsScanning] = useState(true);
  const lastScannedRef = useRef("");
  const [scannedProfileCard, setScannedProfileCard] =
    useState<ScannedProfileCard | null>(null);
  const handleScan = async (results: IDetectedBarcode[]) => {
    if (!isScanning || results.length === 0) return;

    const scanResult = results[0].rawValue;

    if (lastScannedRef.current === scanResult) return;
    lastScannedRef.current = scanResult;

    setIsScanning(false);

    try {
      const { data: token_data, error } = await supabase
        .from("qr_tokens")
        .select("user_id")
        .eq("token", scanResult)
        .single();

      if (error) {
        console.log(`ユーザーIDの取得に失敗しました:${error}`);
      }

      if (!token_data) {
        window.alert("トークンが見つからないか、期限切れです");
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
          setScannedProfileCard(profileCard_data);
          console.log(profileCard_data);
        }
      }
    } catch (err) {
      console.error("スキャンエラー:", err);
    } finally {
      setTimeout(() => {
        setIsScanning(true);
        lastScannedRef.current = "";
      }, 3000);
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
      <div className="w-[300px]">
        <Scanner
          onScan={handleScan}
          formats={["qr_code"]}
          allowMultiple={false} // これを指定すると連続でスキャンできる
          // スキャン時の UI をカスタマイズ
          components={{
            tracker: customTracker, // コード検出時の視覚的なフィードバックをカスタマイズ
            audio: false, // スキャン時に音を鳴らす (default: true)
            onOff: true, // スキャンのオンオフを切り替えるボタンを表示する (default: false)
            finder: false, // ファインダーを表示する (default: true)
          }}
        />
      </div>
    </div>
  );
};

export default QRReader;
