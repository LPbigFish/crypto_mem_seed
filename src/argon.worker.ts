import { argon2_hash } from "./argon2";

self.onmessage = async (e: MessageEvent<[string, string, Date, number]>) => {
    const [adjective, noun, date, length] = e.data;

    argon2_hash(adjective, noun, date, length).then(res => {
        self.postMessage(res.hashHex);
    });
}