import { createToken } from "./token";

export function createTokenMock(suffix = 1) {
  return createToken(`mock_token_${suffix}`, `mocktokentype`);
}

export function createTokensMock() {
  return Array.from(Array(3).keys()).map(createTokenMock);
}
