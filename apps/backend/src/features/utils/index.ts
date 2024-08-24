export function handleError(error: unknown) {
	return new Response(
		JSON.stringify({ message: error instanceof Error ? error.message : 'Unexpected error', status: 500 }),
		{ status: error instanceof Error ? 200 : 500 }
	);
}
