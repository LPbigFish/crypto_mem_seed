import argon2 from "argon2-browser/dist/argon2-bundled.min.js";


export async function argon2_hash(adjective: string, noun: string, date: Date) {
  const input =
    date.getFullYear() + adjective + date.getDay() + noun + date.getMonth();

  return argon2.hash({
    pass: input,
    salt: "69a201418f033b7c24a12989c2f71358ce77bfbc",
    parallelism: 2,
    time: 1 << 11,
    mem: 2048,
    hashLen: 16,
    type: argon2.ArgonType.Argon2id,
  });
}