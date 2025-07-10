import bcrypt from "bcrypt";

export function hash(data: string) {
  return bcrypt.hash(data, 10);
}

export function compare({ data, hash }: { data: string; hash: string }) {
  return bcrypt.compare(data, hash);
}
