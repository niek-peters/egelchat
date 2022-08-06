export default async function checkConnection(): Promise<boolean> {
	try {
		await fetch('http://localhost:3000/api/ping');

		return true;
	} catch (_er) {
		return false;
	}
}
