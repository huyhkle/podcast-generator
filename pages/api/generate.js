export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key chưa được cấu hình' });
  }

  const { focus = 'balanced', date } = req.body;

  const PROMPTS = {
    balanced: `Bạn là biên tập viên podcast tin tức chuyên nghiệp người Việt Nam.

Hôm nay là ${date}.

Tạo podcast script 25 phút bằng tiếng Việt về tin tức quan trọng nhất hôm nay.

Cấu trúc bắt buộc — phải có đủ 7 phần:
1. INTRO (1 phút) — An và Minh giới thiệu 3 headline lớn nhất
2. TIN NHANH (2 phút) — 5-6 tin ngắn đa dạng chủ đề
3. CHỦ ĐỀ SÂU 1 — Chính trị & Địa chính trị thế giới (4 phút)
4. CHỦ ĐỀ SÂU 2 — Kinh tế & Tài chính: Fed, thị trường, tỷ giá, hàng hóa (4 phút)
5. CHỦ ĐỀ SÂU 3 — Doanh nghiệp & Công nghệ: AI, Big Tech, startup (3 phút)
6. CHỦ ĐỀ SÂU 4 — Việt Nam: kinh tế vĩ mô, chính sách, chứng khoán VN (4 phút)
7. KẾT (2 phút) — Mỗi người một nhận định quan trọng nhất

Yêu cầu:
- 2 host: AN (dẫn chính, súc tích) và MINH (phân tích sâu, hay phản biện)
- Mỗi chủ đề: tin cụ thể → bối cảnh → tác động → góc nhìn Việt Nam
- Ngôn ngữ tự nhiên như đang nói chuyện thật
- Khoảng 2500-3000 từ, đủ 7 phần

Format:
# THẾ GIỚI HÔM NAY
## Podcast Script — ${date}
### 25 phút | AN + MINH
---
## [TÊN PHẦN]
**AN:** ...
**MINH:** ...`,

    vietnam: `Bạn là biên tập viên podcast tin tức chuyên nghiệp người Việt Nam.

Hôm nay là ${date}.

Tạo podcast script 25 phút tập trung vào Việt Nam.

Cấu trúc bắt buộc — phải có đủ 7 phần:
1. INTRO (1 phút) — 3 tin lớn nhất Việt Nam hôm nay
2. TIN NHANH (2 phút) — 5-6 tin ngắn trong nước
3. KINH TẾ VĨ MÔ (4 phút) — GDP, CPI, tỷ giá, xuất nhập khẩu, FDI
4. CHÍNH SÁCH & PHÁP LUẬT (4 phút) — Chính sách mới ảnh hưởng doanh nghiệp và người dân
5. DOANH NGHIỆP & THỊ TRƯỜNG (4 phút) — VN-Index, bất động sản, doanh nghiệp lớn
6. GÓC NHÌN QUỐC TẾ (3 phút) — Tin thế giới tác động đến VN
7. KẾT (2 phút) — Nhận định và câu hỏi mở

Yêu cầu:
- 2 host: AN (dẫn chính) và MINH (chuyên gia kinh tế & chính sách)
- Số liệu cụ thể: %, tỷ USD, điểm index
- Giải thích thuật ngữ tài chính dễ hiểu
- Khoảng 2500-3000 từ, đủ 7 phần

Format:
# THẾ GIỚI HÔM NAY — GÓC NHÌN VIỆT NAM
## Podcast Script — ${date}
### 25 phút | AN + MINH
---
## [TÊN PHẦN]
**AN:** ...
**MINH:** ...`,

    global: `Bạn là biên tập viên podcast tin tức chuyên nghiệp người Việt Nam.

Hôm nay là ${date}.

Tạo podcast script 25 phút về kinh tế và địa chính trị toàn cầu.

Cấu trúc bắt buộc — phải có đủ 7 phần:
1. INTRO (1 phút) — 3 headline lớn nhất thế giới
2. TIN NHANH (2 phút) — 5-6 tin ngắn quốc tế đa dạng
3. ĐỊA CHÍNH TRỊ (4 phút) — Xung đột, ngoại giao, chính sách lớn
4. KINH TẾ & THỊ TRƯỜNG (4 phút) — Fed, Wall Street, dầu, vàng, crypto
5. CÔNG NGHỆ & AI (3 phút) — Big Tech, AI race, chip, regulation
6. THƯƠNG MẠI & CHUỖI CUNG ỨNG (3 phút) — Thuế quan, trade war, năng lượng
7. KẾT & GÓC NHÌN VN (4 phút) — Tất cả ảnh hưởng gì đến Việt Nam?

Yêu cầu:
- 2 host: AN (dẫn chính) và MINH (chuyên gia kinh tế quốc tế)
- Có quan điểm rõ ràng, không trung lập nhàm chán
- Kết nối các sự kiện với nhau
- Khoảng 2500-3000 từ, đủ 7 phần

Format:
# THẾ GIỚI HÔM NAY — KINH TẾ & ĐỊA CHÍNH TRỊ
## Podcast Script — ${date}
### 25 phút | AN + MINH
---
## [TÊN PHẦN]
**AN:** ...
**MINH:** ...`
  };

  const prompt = PROMPTS[focus] || PROMPTS.balanced;

  try {
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 4000,
        stream: true,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!anthropicRes.ok) {
      const err = await anthropicRes.json();
      return res.status(500).json({ error: err.error?.message || 'Claude API error' });
    }

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    const reader = anthropicRes.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6).trim();
          if (data === '[DONE]') continue;
          try {
            const parsed = JSON.parse(data);
            if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
              res.write(parsed.delta.text);
            }
          } catch {
            // skip
          }
        }
      }
    }

    res.end();

  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    }
  }
}
