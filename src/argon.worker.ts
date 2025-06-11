import { argon2_hash } from ".";

self.onmessage = async (e: MessageEvent<[string, string, Date]>) => {
    const [adjective, noun, date] = e.data;

    argon2_hash(adjective, noun, date).then(res => {
        self.postMessage(res.hashHex);
    });
}