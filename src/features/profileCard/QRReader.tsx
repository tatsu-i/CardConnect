import React, { useState } from "react";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";

const QRReader = () => {
  const [scanResult, setScanResult] = useState();
  const handleScan = (results: IDetectedBarcode[]) => {
    if (results.length > 0) {
      console.log(results);
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
