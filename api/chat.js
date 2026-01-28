export default async function handler(req, res) {
    const { word } = req.body;
    const API_KEY = process.env.GEMINI_API_KEY; // Vercelの設定画面に入れたキーを読み込む

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{ 
                        text: `英単語「${word}」について、意味、簡単な例文、ネイティブのニュアンスを日本語で短く教えて。` 
                    }]
                }]
            })
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "通信エラーが発生しました" });
    }
}
