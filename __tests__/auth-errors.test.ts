import { AxiosError, AxiosResponse } from "axios";
import {
  authErrorMessage,
  INVALID_CREDENTIALS_MESSAGE,
  isEmailTaken,
  NETWORK_ERROR_MESSAGE,
  toAuthFailure,
} from "../src/utils/auth-errors";
import {
  isSignUpEmailValid,
  isSignUpPasswordValid,
} from "../src/utils/validate-signUp";

const httpError = (status: number, data: unknown) =>
  new AxiosError("falhou", "ERR_BAD_REQUEST", undefined, undefined, {
    status,
    data,
  } as AxiosResponse);

describe("toAuthFailure", () => {
  it("should keep the server status and message", () => {
    expect(toAuthFailure(httpError(409, { message: "Já cadastrado" }))).toEqual(
      { success: false, status: 409, message: "Já cadastrado" }
    );
  });

  it("should describe a response without message", () => {
    expect(toAuthFailure(httpError(500, ""))).toEqual({
      success: false,
      status: 500,
      message: "Erro inesperado (status 500).",
    });
  });

  it("should return no status or message without a response", () => {
    expect(toAuthFailure(new AxiosError("Network Error"))).toEqual({
      success: false,
    });
    expect(toAuthFailure(new Error("x"))).toEqual({ success: false });
  });
});

describe("authErrorMessage", () => {
  it("should map invalid credentials and network failures", () => {
    expect(authErrorMessage({ status: 401, message: "x" })).toBe(
      INVALID_CREDENTIALS_MESSAGE
    );
    expect(authErrorMessage({})).toBe(NETWORK_ERROR_MESSAGE);
  });

  it("should show the server or validation message otherwise", () => {
    expect(authErrorMessage({ status: 409, message: "Já cadastrado" })).toBe(
      "Já cadastrado"
    );
    expect(authErrorMessage({ message: "Formato inválido" })).toBe(
      "Formato inválido"
    );
  });

  it("should flag an email already registered", () => {
    expect(isEmailTaken({ status: 409 })).toBe(true);
    expect(isEmailTaken({ status: 401 })).toBe(false);
  });
});

describe("sign up rules", () => {
  it("should validate email and password", () => {
    expect(isSignUpEmailValid("voce@email.com")).toBe(true);
    expect(isSignUpEmailValid("voce@email")).toBe(false);
    expect(isSignUpPasswordValid("1234567")).toBe(true);
    expect(isSignUpPasswordValid("123456")).toBe(false);
  });
});
