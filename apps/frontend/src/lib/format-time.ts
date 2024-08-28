import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

function formatTime(timestamp: string) {
	return format(new Date(timestamp), 'MMMM d, h a', { locale: enUS });
}

function formatHours(timestamp: string) {
	return format(new Date(timestamp), 'h:mm a', { locale: enUS });
}

export function formatQueryTime(timestamp: string) {
	return `${formatTime(timestamp).split('at')[0]} - ${formatHours(timestamp).split(' ').join('').toLowerCase()}`;
}
