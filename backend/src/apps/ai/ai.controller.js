import fetch from 'node-fetch';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export async function searchOpenAI(req, res) {
	try {
		const { prompt } = req.body;

		if (!prompt || prompt.trim() === '') {
			return res.status(400).json({ message: "Prompt required" });
		}

		const openAIResponse = await fetch(OPENAI_API_URL, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${OPENAI_API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				model: 'gpt-4o-mini',
				messages: [
					{
						role: "developer",
						content: [
							{
								type: "text",
								text: ` You are a helpful farming assistant with expertise in agriculture. You assist farmers by providing information on planting schedules, weather, and time-based farming tasks. `
							}
						]
					},
					{
						role: "user",
						content: [
							{
								type: "text",
								text: prompt
							}
						]
					}
				],

			}),
		});

		if (!openAIResponse.ok) {
			const errorData = await openAIResponse.json();
			console.error('OpenAI API Error:', errorData);
			return res.status(openAIResponse.status).json(errorData);
		}

		const data = await openAIResponse.json();
		const completion = data.choices[0].message.content
		res.status(200).json({ completion: completion, });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

