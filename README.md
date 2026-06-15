# 塔圖聚落 Tattoo Settlement

刺青作品展示與風格媒合平台。

## 技術棧

- **Vue 3** + Composition API
- **Vite 5**
- **Vue Router 4**
- **Pinia** (含 pinia-plugin-persistedstate)
- **Tailwind CSS 3**
- **VueUse**

## 快速開始

```bash
npm install
npm run dev
```

## 頁面路由

| 路徑 | 頁面 |
|------|------|
| `/` | 首頁 |
| `/explore` | 探索作品 |
| `/artists` | 刺青師列表 |
| `/artworks/:id` | 作品詳情 |
| `/artists/:id` | 刺青師個人頁 |
| `/auth/login` | 登入 |
| `/auth/register` | 註冊 |
| `/favorites/artworks` | 收藏作品（需登入） |
| `/favorites/artists` | 收藏刺青師（需登入） |
| `/booking-requests` | 預約需求（需登入） |
| `/designer/dashboard` | 設計師後台 |
| `/designer/portfolio` | 作品集管理 |
| `/designer/requests` | 預約需求管理 |
| `/designer/profile` | 個人資料編輯 |

## Demo 帳號

登入頁面提供一鍵 Demo 登入：
- **顧客帳號**：可收藏作品/刺青師、送出預約需求
- **設計師帳號**：可查看後台、管理作品集、處理預約

## 專案結構

```
src/
├── assets/        # 全域 CSS (Tailwind)
├── components/
│   ├── layout/    # AppHeader, AppFooter
│   ├── artwork/   # ArtworkCard
│   └── artist/    # ArtistCard
├── data/          # Mock 靜態資料
├── layouts/       # DefaultLayout, AuthLayout, DesignerLayout
├── router/        # Vue Router 設定
├── stores/        # Pinia stores (auth, favorites, booking)
└── views/         # 所有頁面元件
```
