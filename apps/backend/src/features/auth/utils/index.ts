export const hexStringToUint8Array = (hexString?: string): Uint8Array => {
	const hex = hexString || crypto.randomUUID().toString();

	const length = hex.length / 2;
	const uint8Array = new Uint8Array(length);

	for (let i = 0; i < length; i++) {
		const byte = parseInt(hex.substring(i * 2, 2), 16);
		uint8Array[i] = byte;
	}

	return uint8Array;
};
