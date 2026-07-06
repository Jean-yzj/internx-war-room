# internx-war-room

InternX 投遞戰情室：貼上職缺自動辨識 → 個人申請日曆。規格文件在 `~/Desktop/實習通/職涯闖關島/06-投遞戰情室獨立版.md`。

## Zeabur Deployment
- Project ID: 69c8c6d4a972bb88a7635060（InternX 專案）
- Service ID: 6a4b16937e05aa801c1a3e57
- 部署方式：直傳（`npx zeabur@latest deploy --project-id 69c8c6d4a972bb88a7635060 --service-id 6a4b16937e05aa801c1a3e57 --json`）
- 注意：直傳只上傳已 commit 的內容，部署前先 commit
- Env：OPENAI_API_KEY、OPENAI_MODEL（gpt-4o-mini）；記憶體上限在 package.json start script 的 NODE_OPTIONS

## 原則
- 無帳號、無資料庫：使用者資料只存瀏覽器 localStorage；/api/parse 不落地儲存貼上內容
- runtime 依賴僅 next/react/react-dom/openai/zod，不加 UI 庫
- 介面繁體中文、無 emoji、icon 用 inline SVG（components/Icons.tsx）
- 日期一律絕對日期＋星期；截止日解析寧缺勿錯，禁止編造
