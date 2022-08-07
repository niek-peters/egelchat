import moment from 'moment';

export default function formatDate(dateStr: string): string {
	const now = moment();
	const yesterday = moment().subtract(1, 'days');

	const date = moment(dateStr);

	let output = '';

	if (now.day() === date.day()) {
		output += 'Today ';
	} else if (now.day() === yesterday.day()) {
		output += 'Yesterday ';
	} else {
		output += date.format('D-M-YYYY');
	}

	output += ' at ' + date.format('HH:mm');

	return output;
}

export function getMySQLDateTime(): string {
	// Don't convert to UTC, because MySQL returns UTC in result by default when querying
	return moment().format('YYYY-MM-DD HH:mm:ss');
}
