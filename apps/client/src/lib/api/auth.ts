import { createUrl, get, isStoredJwt, post, setStoredJwt } from "./api-client";

export const me = async () => {
  try {
    return isStoredJwt() ? (await get(createUrl("/api/me"))).data : null;
  } catch (err) {
    return err;
  }
};

export const login = async (username: string, password: string) => {
  try {
    const result = await post(createUrl("/api/login"), {
      username,
      password,
    });
    setStoredJwt(result?.data?.accessToken);
    return await me();
  } catch (err) {
    return err;
  }
};

export const signup = async (username: string, password: string) => {
  const result = (
    await post(createUrl("/api/signup"), {
      username,
      password,
      firstName: "Test",
      lastName: "Name",
    }).catch(() => null)
  )?.data;

  if (!result) {
    return alert("Could not sign up");
  }
  setStoredJwt(result.accessToken);
  return me();
};
