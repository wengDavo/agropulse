import fetch from 'node-fetch';

const API_KEY = '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';
const API_URL = 'https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf';

export async function searchDeepSeek(req, res) {
    try {
        const query = "can you respond";
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'deepseek-chat', // Replace with the correct model name
                messages: [{ role: 'user', content: query }],
            }),
        });

        if (!response.ok) {
            const errorData = await response.json(); // Parse the error response
            console.error('DeepSeek API Error:', errorData);
            return res.status(response.status).json(errorData);
        }

        const data = await response.json(); // Parse JSON response
        console.log('Search Results:', data);
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data from DeepSeek API:', error);
        res.status(500).json({ error: error.message });
    }
}
