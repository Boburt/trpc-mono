import { atom, action, task } from "nanostores";
// Since we need to use "localStorage", we need nanostores persistent
import { persistentAtom } from "@nanostores/persistent";
import Cookies from "js-cookie";
import { trpcClient } from "../utils/trpc-server";
import { RouterOutputs } from "../utils/trpc";

export const $isLoggedIn = persistentAtom<boolean>("isLoggedIn", false, {
  encode(value) {
    return JSON.stringify({
      value,
    });
  },
  decode(value) {
    try {
      return JSON.parse(value).value;
    } catch (e) {
      return value;
    }
  },
});

export const $accessToken = persistentAtom<string | null>("accessToken", null, {
  encode(value) {
    return JSON.stringify({
      value,
    });
  },
  decode(value) {
    try {
      return JSON.parse(value).value;
    } catch (e) {
      return value;
    }
  },
});

export const $refreshToken = persistentAtom<string | null>(
  "refreshToken",
  null,
  {
    encode(value) {
      return JSON.stringify({
        value,
      });
    },
    decode(value) {
      try {
        return JSON.parse(value).value;
      } catch (e) {
        return value;
      }
    },
  }
);

export const $userData = persistentAtom<
  RouterOutputs["users"]["login"]["data"] | null
>("userData", null, {
  encode(value) {
    return JSON.stringify({
      value,
    });
  },
  decode(value) {
    try {
      return JSON.parse(value).value;
    } catch (e) {
      return value;
    }
  },
});

export const login = (login: string, password: string) =>
  task(async () => {
    try {
      const loginResponse = await trpcClient.users.login.mutate({
        login,
        password,
      });
      console.log(loginResponse);
      if (loginResponse.accessToken) {
        Cookies.set("x-token", loginResponse.accessToken);
        $accessToken.set(loginResponse.accessToken);
      }
      if (loginResponse.refreshToken) {
        Cookies.set("x-refresh-token", loginResponse.refreshToken);
        $refreshToken.set(loginResponse.refreshToken);
      }
      if (loginResponse.data) {
        $userData.set(loginResponse.data);
      }
      $isLoggedIn.set(true);
    } catch (e: any) {
      return {
        error: e.message,
      };
    }
  });

export const logout = () =>
  task(async () => {
    try {
      //   const logoutResponse = await trpcClient.users.logout.mutate();
      Cookies.remove("x-token");
      Cookies.remove("x-refresh-token");
      $accessToken.set(null);
      $refreshToken.set(null);
      $userData.set(null);
      $isLoggedIn.set(false);
    } catch (e: any) {
      return {
        error: e.message,
      };
    }
  });
