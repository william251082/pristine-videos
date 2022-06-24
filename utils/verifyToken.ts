import { jwtVerify } from "jose";

export async function verifyToken(token: string): Promise<string> {
    try {
        if (token) {
            const verified = await jwtVerify(
                token,
                new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
            );
            return typeof verified.payload.issuer === 'string' ? verified.payload.issuer : '';
        }
        return '';
    } catch (err) {
        console.error({ err });
        return '';
    }
}
