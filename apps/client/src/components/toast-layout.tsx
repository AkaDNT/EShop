"use client";
import React from "react";
import { useAppStore } from "@/store/store";
import { useEffect } from "react";
import { toast, ToastContainer, ToastOptions } from "react-toastify";
import { AxiosError } from "axios";
import { me } from "@/lib/api/auth";

export default function ToastLayout() {
  const { userInfo, setUserInfo, toasts, clearToast, setToast } = useAppStore();
  useEffect(() => {
    if (toasts.length) {
      const toastOptions: ToastOptions = {
        position: "bottom-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
      toasts.forEach((message: string) => {
        toast(message, toastOptions);
      });
      clearToast();
    }
  }, [toasts, clearToast]);
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await me();
        if (
          response instanceof AxiosError &&
          response.response?.data.statusCode === 500
        ) {
          setToast("JWT Token Expired Please Login Again.");
          localStorage.removeItem("accessToken");
          setUserInfo(undefined);
        }
        if (response?.id) {
          setUserInfo(response);
        }
      } catch (err) {}
    };
    if (!userInfo) {
      getUserInfo();
    }
  }, [userInfo, setToast, setUserInfo]);
  return <ToastContainer />;
}
