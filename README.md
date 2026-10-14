# Dành cho Man An 💗

Website quà tặng cá nhân dành riêng cho "bà chã" Man An — phong cách hồng pastel, dễ thương, chạy hoàn toàn bằng HTML/CSS/JavaScript thuần (không framework, không build step).

## ✅ Tính năng đã hoàn thành

| Mục | Mô tả |
|---|---|
| 🔐 Màn hình khoá | Bàn phím số 4 ô, mật khẩu **`0502`**. Sai → rung + báo lỗi. Đúng → hiệu ứng vòng tròn hồng lan ra + hoa bay rồi vào web. Có nút gợi ý 💡. Hỗ trợ gõ bàn phím thật trên máy tính. |
| 🏠 Trang chủ | Ảnh tròn của bé (nổi, có sticker), tên, **lịch tình yêu** (chuyển tháng, chạm vào ngày để thả tim — tim được lưu bằng `localStorage`, ngày sinh nhật 05/02 có 🎂), menu 4 ô: Nhạc / Thư / Album / Hộp ảnh 3D. |
| 🎵 Nhạc | Đĩa than xoay (ảnh bé ở giữa), cần đĩa hạ xuống khi phát, thanh tiến trình bấm tua được, nút trước/phát/sau, playlist 2 bài. Nút nhạc trên thanh đầu trang bật/tắt ở mọi màn. Nhạc tự bật ngay sau khi mở khoá. |
| 📸 Album | Lưới ảnh (ảnh ngang chiếm 2 cột), chạm mở **lightbox**: xem lớn, chuyển trái/phải, vuốt trên điện thoại, phím ← → Esc trên máy tính, caption riêng cho từng ảnh. |
| 🎁 Hộp ảnh 3D | Vòng ảnh 3D xoay tự động (`preserve-3d` + `rotateY`), **kéo tay để xoay**, thả ra 2.5s sẽ tự xoay lại, chạm ảnh để xem lớn. |
| 💌 Thư | Phong bì 3D chạm để mở (nắp lật, con dấu tim biến mất, thư trồi lên) → giấy kẻ dòng với hiệu ứng **gõ chữ** (dừng nhẹ ở dấu câu), nhạc tự nhỏ lại lúc đọc thư, nút "Đọc lại". |
| ✨ Chi tiết nhỏ | Tim trôi nền bằng canvas (14 tim trên mobile / 24 desktop), tim bay khi chạm bất kỳ đâu (có giới hạn chống lag), âm "pop" bằng WebAudio (không cần file), toast thông báo, tôn trọng `prefers-reduced-motion`. |
| 📱 Responsive | Mobile-first, thanh điều hướng dưới cho điện thoại, desktop chuyển menu thành 4 cột và lưới ảnh 4 cột. Hỗ trợ `safe-area-inset` cho iPhone. |

## 🗂 Cấu trúc file

```
index.html          trang duy nhất (tất cả màn hình nằm trong này)
css/style.css       toàn bộ giao diện
js/main.js          toàn bộ logic — phần CONFIG ở đầu file để sửa nội dung
images/anh1..anh7   ảnh thật của Man An (do chủ web cung cấp)
audio/nhac1.mp3     "Heartwarming" — Kevin MacLeod (incompetech.com), CC BY 4.0
audio/nhac2.mp3     "Touching Moments Four - Melody" — Kevin MacLeod, CC BY 4.0
vercel.json         cấu hình deploy Vercel (cache ảnh/nhạc)
```

## ✏️ Cách tự sửa nội dung (mở `js/main.js`, phần `CONFIG` ở đầu file)

- **Mật khẩu**: `password: '0502'`
- **Ngày đặc biệt trên lịch**: `specialDay: { day: 5, month: 2 }`
- **Ảnh + caption**: mảng `photos` — thêm/bớt dòng, đổi `cap`. Ảnh đầu tiên cũng là ảnh dùng trên màn khoá/hero (`index.html` → `images/anh6.jpg`).
- **Nhạc**: mảng `tracks` — bỏ file .mp3 vào `audio/` rồi thêm dòng. Có thể thay bằng bài hát hai đứa thích.
- **Lá thư**: biến `letter` — viết tự do, xuống dòng bình thường.

## 🚀 Đưa lên Vercel (gửi link cho bả)

**Cách 1 — kéo thả (dễ nhất, không cần cài gì):**
1. Tải toàn bộ thư mục project về máy (nút Download / Export ở tab Publish hoặc clone git).
2. Vào <https://vercel.com> → đăng nhập (Google/GitHub) → **Add New → Project**.
3. Chọn **"Deploy from local"** / kéo thả cả thư mục vào (hoặc dùng <https://vercel.com/new> và kéo thư mục vào vùng upload).
4. Framework Preset để **Other**, không cần Build Command, Output Directory để trống → **Deploy**.
5. ~30 giây sau có link dạng `https://ten-project.vercel.app`. Gửi link + mật khẩu `0502` cho bả.

**Cách 2 — qua GitHub (tiện khi muốn sửa về sau):**
1. Push thư mục này lên một repo GitHub.
2. Vercel → Add New Project → Import repo đó → Deploy (mặc định là đủ).
3. Mỗi lần push code mới, Vercel tự deploy lại.

**Cách 3 — dòng lệnh:**
```bash
npm i -g vercel
cd thu-muc-project
vercel          # làm theo hướng dẫn, enter hết
vercel --prod   # lên bản chính thức
```

> Hoặc bấm **Publish** ngay trong tab Publish của editor này để có link dùng liền, không cần Vercel.

## ⚠️ Lưu ý bảo mật

Mật khẩu được kiểm tra bằng JavaScript phía trình duyệt — đây chỉ là **khoá giao diện** cho vui. Ai biết xem source code vẫn thấy được ảnh và mật khẩu. Đừng dùng cho dữ liệu cần bảo mật thật.

## 🧩 Chưa làm / có thể làm thêm

- Đếm ngày yêu nhau (cần ngày bắt đầu — chưa có thông tin nên không tự bịa).
- Phần "bong bóng ảnh trôi" như cuối video mẫu (có thể thêm nếu muốn).
- Thay nhạc nền bằng bài hát của hai đứa.
- Thêm ảnh: chỉ cần bỏ vào `images/` và thêm vào `CONFIG.photos`.

## Dữ liệu

Không dùng server/database. Chỉ dùng `localStorage` của trình duyệt để nhớ các ngày đã thả tim trên lịch (key `ma_loved`).
