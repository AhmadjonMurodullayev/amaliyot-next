"use server";

import { log } from "console";
import { cookies } from "next/headers";

export const registerData = async (userData: {
  phone_number: string;
  password: string;
}) => {
  const res = await fetch("http://localhost:8000/api/send-phone/", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Registration failed");
  }

  cookies().set("token", JSON.stringify(data)); // Adjust as per actual token response
  return data;
};

export const loginData = async (userToken: { phone_number: string }) => {
  const code = cookies().get("code")?.value || "";
  const session = cookies().get("session")?.value || "";
  console.log("code", code);

  const res = await fetch("http://localhost:8000/api/verify-phone/", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ ...userToken, code, session }),
  });

  const data = await res.json();

  if (!res.ok) {
    // throw new Error("Login failed");
    console.log(res);
  }
  console.log(res);

  cookies().set("token", data.token);
  return data;
};
