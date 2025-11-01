import { CHALLS_JSON_URL } from '$env/static/private';

async function getChallsJson(url: string) {
	const timeout = 5000;

	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), timeout);

		const response = await fetch(url, {
			signal: controller.signal
		});

		clearTimeout(timeoutId);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const contentType = response.headers.get('content-type');
		if (!contentType || !contentType.includes('application/json')) {
			throw new Error('Response is not JSON');
		}

		return await response.json();
	} catch (error) {
		if (error.name === 'AbortError') {
			throw new Error('Request timed out');
		}
		console.error('Error downloading JSON:', error);
		throw error;
	}
}

export async function load() {
	try {
		if (!CHALLS_JSON_URL) {
			return {
				data: null,
				error: 'JSON URL not configured'
			};
		}

		const data = await getChallsJson(CHALLS_JSON_URL);

		return {
			data,
			error: null
		};
	} catch (err: any) {
		return {
			data: null,
			error: err.message || 'Failed to download JSON'
		};
	}
}
