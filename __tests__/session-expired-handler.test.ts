import { createSessionExpiredHandler } from "../src/utils/session-expired-handler";

const USERS_URL = "https://api.example.com/users-api";
const FINANCE_URL = "https://api.example.com/finance";

const makeError = (
  status: number,
  url: string,
  authorization?: string
) => ({
  response: { status },
  config: {
    url,
    headers: { get: (name: string) => (name === "Authorization" ? authorization : undefined) },
  },
});

describe("createSessionExpiredHandler", () => {
  let onSessionExpired: jest.Mock;
  let handler: (error: unknown) => Promise<never>;

  beforeEach(() => {
    onSessionExpired = jest.fn();
    handler = createSessionExpiredHandler({
      apiUrls: [USERS_URL, FINANCE_URL],
      token: "current-token",
      onSessionExpired,
    });
  });

  it("should end the session on a 401 from our API sent with the current token", async () => {
    const error = makeError(401, `${USERS_URL}/users`, "Bearer current-token");

    await expect(handler(error)).rejects.toBe(error);

    expect(onSessionExpired).toHaveBeenCalledTimes(1);
  });

  it("should also handle a 401 from the finance service", async () => {
    await expect(
      handler(makeError(401, `${FINANCE_URL}/transactions/1`, "Bearer current-token"))
    ).rejects.toBeDefined();

    expect(onSessionExpired).toHaveBeenCalledTimes(1);
  });

  it("should notify only once when several requests fail together", async () => {
    const error = makeError(401, `${USERS_URL}/users`, "Bearer current-token");

    await Promise.allSettled([handler(error), handler(error), handler(error)]);

    expect(onSessionExpired).toHaveBeenCalledTimes(1);
  });

  it("should ignore a 401 without Authorization (e.g. wrong password on login)", async () => {
    await expect(
      handler(makeError(401, `${USERS_URL}/users/signIn`))
    ).rejects.toBeDefined();

    expect(onSessionExpired).not.toHaveBeenCalled();
  });

  it("should ignore a late 401 that was sent with an old token", async () => {
    await expect(
      handler(makeError(401, `${USERS_URL}/users`, "Bearer old-token"))
    ).rejects.toBeDefined();

    expect(onSessionExpired).not.toHaveBeenCalled();
  });

  it("should ignore errors that are not 401", async () => {
    for (const status of [400, 403, 404, 500]) {
      await expect(
        handler(makeError(status, `${USERS_URL}/users`, "Bearer current-token"))
      ).rejects.toBeDefined();
    }

    expect(onSessionExpired).not.toHaveBeenCalled();
  });

  it("should ignore a 401 from a third-party URL", async () => {
    await expect(
      handler(makeError(401, "https://other.example.com/x", "Bearer current-token"))
    ).rejects.toBeDefined();

    expect(onSessionExpired).not.toHaveBeenCalled();
  });

  it("should not break on network errors without a response", async () => {
    const error = { message: "Network Error" };

    await expect(handler(error)).rejects.toBe(error);

    expect(onSessionExpired).not.toHaveBeenCalled();
  });
});
