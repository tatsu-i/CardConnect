# CardConnect - プロフィールカード交換アプリ
https://card-connect-app.vercel.app
## :iphone:サービス概要
プロフィール情報が載ったカードを交換できるアプリです。
## :thought_balloon:アプリへの想い
大学生活を送る中で、高校時代と比べて人間関係の形が大きく変化していることに気づきました。大学では、学部・学科の規模が大きく、また様々な授業で異なる人と出会うため、多くの人と「点」としての出会いを持つことになります。\
そんな環境の中で、以下のような課題を感じていました：\
\
**SNS交換のハードル**
- 初対面の人とすぐにSNSを交換することへの抵抗感
- プライベートな情報をすぐに共有することへの躊躇

これらの課題を解決するため、CardConnectでは：
- 必要な情報に絞ったプロフィール共有
- QRコードによる手軽な情報交換
- プライバシーに配慮した段階的な情報開示

を実現しました。\
「まずはお互いのことを知るところから始めたい」「気軽に連絡先を交換したい」という大学生の声に応える、新しいコミュニケーションツールを目指しています。
## :hammer_and_wrench:使用技術
| Category | Technology Stack |
| --- | --- |
| Frontend | TypeScript, React, Redux Toolkit |
| BackEnd | Supabase（認証） |
| Infrastructure | Vercel |
| Database | Supabase（データベース、ストレージ） |
| Design | TailwindCSS, shadcn/ui |
| etc. | Vite, ESLint, Prettier |
## :lock:セキュリティ
- Supabaseの認証システムを使用したセキュアなユーザー管理
- Row Level Securityによるデータアクセス制御
- 画像の安全な保存と取得
## :globe_with_meridians:デプロイ
- Vercelを使用した自動デプロイ
- カスタムドメインの設定
- 環境変数の適切な管理
## :memo:今後の展望
- 入力した趣味等をもとに、AIがプロフィール文章を作成してくれる機能
- プロフィールカードのテンプレート機能
- グループ機能の追加
