export const config = { runtime: 'edge' };

const PROMPTS = {
  balanced: `Bạn là một biên tập viên podcast tin tức chuyên nghiệp người Việt Nam.

Hôm nay là {DATE}.

Nhiệm vụ: Tạo một podcast script 25 phút hoàn chỉnh bằng tiếng Việt về các tin tức quan trọng nhất trong ngày hôm nay.

Cấu trúc bắt buộc:
1. INTRO (1 phút) — An và Minh giới thiệu 3-4 headline lớn nhất ngày hôm nay
2. TIN NHANH (2 phút) — 6-8 tin ngắn, đa dạng chủ đề
3. CHỦ ĐỀ SÂU 1 — Chính trị & Địa chính trị thế giới (5 phút)
4. CHỦ ĐỀ SÂU 2 — Kinh tế & Tài chính toàn cầu: GDP, lạm phát, Fed, thị trường chứng khoán, hàng hóa, tỷ giá (5 phút)
5. CHỦ ĐỀ SÂU 3 — Doanh nghiệp & Công nghệ: Big Tech, AI, startup, M&A lớn, IPO (4 phút)
6. CHỦ ĐỀ SÂU 4 — Việt Nam: kinh tế vĩ mô, chính sách mới, doanh nghiệp trong nước, thị trường bất động sản, chứng khoán VN (5 phút)
7. KẾT (3 phút) — An và Minh mỗi người một nhận định quan trọng nhất trong ngày

Yêu cầu về nội dung:
- Mỗi chủ đề sâu phải có: tin tức cụ thể → bối cảnh tại sao quan trọng → tác động thực tế → góc nhìn Việt Nam
- Không chỉ kể sự kiện — phải giải thích ý nghĩa và hệ quả
- Kết nối các sự kiện với nhau khi có liên quan
- Luôn trả lời câu hỏi: "Điều này ảnh hưởng gì đến người Việt Nam, doanh nghiệp Việt Nam?"

Yêu cầu về phong cách:
- 2 host: AN (dẫn chính, rõ ràng, súc tích) và MINH (phân tích sâu, hay đặt câu hỏi ngược)
- Ngôn ngữ như hai người đang nói chuyện thật — không phải đọc bản tin
- Minh thường phản biện hoặc thêm góc nhìn khác với An
- Dài khoảng 2800-3200 từ

Format output:
# THẾ GIỚI HÔM NAY
## Podcast Script — {DATE}
### Thời lượng: 25 phút | Host: AN + MINH

---
## [TÊN PHẦN]
**AN:** ...
**MINH:** ...
---`,

  vietnam: `Bạn là một biên tập viên podcast tin tức chuyên nghiệp người Việt Nam.

Hôm nay là {DATE}.

Nhiệm vụ: Tạo podcast script 25 phút tập trung vào Việt Nam và tác động với Việt Nam.

Cấu trúc bắt buộc:
1. INTRO (1 phút) — Tóm tắt 3 tin lớn nhất của Việt Nam hôm nay
2. TIN NHANH (2 phút) — 6-8 tin ngắn trong nước
3. KINH TẾ VĨ MÔ VN (5 phút) — GDP, CPI, tỷ giá VND, xuất nhập khẩu, FDI mới nhất
4. CHÍNH SÁCH & PHÁP LUẬT (4 phút) — Nghị định, thông tư, chính sách mới ảnh hưởng doanh nghiệp và người dân
5. DOANH NGHIỆP & THỊ TRƯỜNG (5 phút) — VN-Index, cổ phiếu nổi bật, bất động sản, doanh nghiệp lớn
6. GÓC NHÌN QUỐC TẾ (4 phút) — Tin thế giới nhưng phân tích qua lăng kính tác động với VN
7. KẾT (4 phút) — Nhận định và câu hỏi mở

Yêu cầu:
- 2 host: AN (dẫn chính) và MINH (chuyên gia kinh tế & chính sách)
- Số liệu cụ thể khi có thể: tỷ lệ %, tỷ USD, điểm index
- Giải thích thuật ngữ tài chính bằng ngôn ngữ dễ hiểu
- Dài khoảng 2800-3200 từ

Format output:
# THẾ GIỚI HÔM NAY — GÓC NHÌN VIỆT NAM
## Podcast Script — {DATE}
### Thời lượng: 25 phút | Host: AN + MINH

---
## [TÊN PHẦN]
**AN:** ...
**MINH:** ...
---`,

  global: `Bạn là một biên tập viên podcast tin tức chuyên nghiệp người Việt Nam.

Hôm nay là {DATE}.

Nhiệm vụ: Tạo podcast script 25 phút về kinh tế, tài chính và địa chính trị toàn cầu.

Cấu trúc bắt buộc:
1. INTRO (1 phút) — 3 headline lớn nhất thế giới hôm nay
2. TIN NHANH (2 phút) — 6-8 tin ngắn quốc tế đa dạng
3. ĐỊA CHÍNH TRỊ (5 phút) — Xung đột, ngoại giao, bầu cử, chính sách lớn
4. KINH TẾ & THỊ TRƯỜNG (5 phút) — Fed, ECB, Wall Street, dầu mỏ, vàng, crypto, tỷ giá lớn
5. CÔNG NGHỆ & AI (4 phút) — Big Tech, AI race, regulation, startup unicorn, chip
6. THƯƠNG MẠI & CHUỖI CUNG ỨNG (4 phút) — Thuế quan, trade war, logistics, năng lượng
7. KẾT & GÓC NHÌN VN (4 phút) — Tất cả những điều trên ảnh hưởng gì đến Việt Nam?

Yêu cầu:
- 2 host: AN (dẫn chính) và MINH (chuyên gia kinh tế quốc tế)
- Có quan điểm rõ ràng — không trung lập nhàm chán
- Kết nối các sự kiện với nhau: tại sao Fed tăng lãi suất lại liên quan đến giá dầu?
- Dài khoảng 2800-3200 từ

Format output:
# THẾ GIỚI HÔM NAY — KINH TẾ & ĐỊA CHÍNH TRỊ
## Podcast Script — {DATE}
### Thời lượng: 25 phút | Host: AN + MINH

---
## [TÊN PHẦN]
**AN:** ...
**MINH:** ...
---`
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key chưa được cấu hình' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { focus = 'balanced', date } = body;
  const prompt = (PROMPTS[focus] || PROMPTS.balanced).replace(/{DATE}/g, date || 'hôm nay');

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 4000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || 'Claude API error');
    }

    const data = await response.json();
    const script = data.content?.[0]?.text || '';

    return new Response(JSON.stringify({ script }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
