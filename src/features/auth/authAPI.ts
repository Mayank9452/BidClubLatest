import { RootState } from "@/app/store";
import { frontendAPI, storage } from "@/config/config";

export interface LoginResponse {
  data: any;     // You can replace `any` with actual user type if known
  redirectUrl?: string; // ✅ Added redirect support
  ip?: string; // Optional IP field

}

// src/features/auth/authAPI.js
export const loginUser = async (credentials): Promise<LoginResponse> => {
  const res = await fetch(frontendAPI.login, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const error = await res.json(); // optional: detailed error
    throw new Error(`${error?.message ?? error?.email ?? error?.password ?? "Login Failed!"}`);
  }

  const data = await res.json();
  return data;
};

export const registerUser = async (credentials): Promise<LoginResponse> => {
  const res = await fetch(frontendAPI.signup, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const error = await res.json(); // optional: detailed error
    throw new Error(`${error?.message ?? error?.email ?? error?.password ?? "Login Failed!"}`);
  }

  const data = await res.json();
  return data;
};

export const registerAtomUser = async (credentials): Promise<LoginResponse> => {
  const res = await fetch(frontendAPI.signupAtom, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const error = await res.json(); // optional: detailed error
    throw new Error(`${error?.message ?? error?.email ?? error?.password ?? "Login Failed!"}`);
  }

  const data = await res.json();
  // console.log(data);
  return data;
};

export const checkAuthByIP = async (credentials, { getState }): Promise<LoginResponse> => {
  const res = await fetch(frontendAPI.userInfo(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cookie": "bb_session=dqhr7eaat5s24fd5l6akaoljif9efm1a"
    },
  });

  let data;
  try {
    data = await res.json();
  } catch (e) {
    // ignore json parse error to let !res.ok handle it
  }

  if (data && data.status === "error" && data.message === "User not found") {
    window.location.href = "https://bidblast.club/subscribe";
    throw new Error("User not found");
  }

  if (data?.data?.portal_access_allowed === 0 || data?.data?.portal_access_allowed === "0") {
    window.location.href = "https://bidblast.club/subscribe";
    throw new Error("Portal access not allowed");
  } else if (data?.data?.portal_access_allowed === 1 || data?.data?.portal_access_allowed === "1") {
    // proceed further, do not check user_subscription_status
  } else {
    // fallback if portal_access_allowed is not present in response
    if (data?.data?.userInfo?.user_subscription_status === "unsub" || data?.data?.userInfo?.user_subscription_status === "unsusb") {
      window.location.href = "https://bidblast.club/subscribe";
      throw new Error("User is unsubscribed");
    }
  }

  if (!res.ok) {
    throw new Error(`${data?.message ?? "Failed to check authentication"}`);
  }

  return data;
};

// 🔑 Auth via userId from URL
export const checkAuthByUserId = async (userId: string): Promise<LoginResponse> => {
  const res = await fetch(frontendAPI.userInfo(userId), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cookie": "bb_session=dqhr7eaat5s24fd5l6akaoljif9efm1a"
    },
  });

  let data;
  try {
    data = await res.json();
  } catch (e) {
    // ignore json parse error to let !res.ok handle it
  }

  if (data && data.status === "error" && data.message === "User not found") {
    window.location.href = "https://bidblast.club/subscribe";
    throw new Error("User not found");
  }

  if (data?.data?.portal_access_allowed === 0 || data?.data?.portal_access_allowed === "0") {
    window.location.href = "https://bidblast.club/subscribe";
    throw new Error("Portal access not allowed");
  } else if (data?.data?.portal_access_allowed === 1 || data?.data?.portal_access_allowed === "1") {
    // proceed further, do not check user_subscription_status
  } else {
    // fallback if portal_access_allowed is not present in response
    if (data?.data?.userInfo?.user_subscription_status === "unsub" || data?.data?.userInfo?.user_subscription_status === "unsusb") {
      window.location.href = "https://bidblast.club/subscribe";
      throw new Error("User is unsubscribed");
    }
  }

  if (!res.ok) {
    throw new Error(data?.message ?? "Failed to authenticate by userId");
  }

  return data;
};



export const updateUser = async (credentials, { getState }) => {
  const state = getState() as RootState;
  const token = state.auth.data.token || null;
  const res = await fetch(frontendAPI.updateUser, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const error = await res.json(); // optional: detailed error
    throw new Error(`${error?.message ?? "Login Failed!"}`);
  }

  const data = await res.json();
  return data;
};

export const unsubscribeUserAPI = async (user_msisdn: string): Promise<any> => {
  const res = await fetch(frontendAPI.unsubscribeUser, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_msisdn }),
  });

  let data;
  try {
    data = await res.json();
  } catch (e) {
    // ignore parse error to let !res.ok handle it
  }

  if (!res.ok) {
    throw new Error(data?.message ?? data?.msg ?? "Failed to unsubscribe. Please try again.");
  }

  if (data && (data.status === "error" || data.status === "fail" || data.status === false)) {
    throw new Error(data.message ?? data.msg ?? "Unsubscription failed");
  }

  return data; // returns { status, msg }
};