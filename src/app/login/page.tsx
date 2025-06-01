'use client';
import React, { useState } from "react";
import MTC from "@/components/MTC"; // Ganti path sesuai struktur proyekmu
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message)
        throw new Error(result.message || "Login gagal");
      }

      // ✅ Simpan token ke localStorage
      localStorage.setItem("token", result.token);

      // 🚀 Redirect ke dashboard
      router.push("/dashboard/news/task");
    } catch (error: any) {
      setErrorMsg(error.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[url('/bg_login.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0"></div>
      <div className="relative z-10 w-full max-w-6xl px-4 md:px-8">
        <div className="flex flex-col lg:flex-row shadow-lg rounded-lg overflow-hidden bg-transparent ">
          {/* Left column */}
          <div className="w-full lg:w-1/2 p-8 md:p-12">
            <div className="text-center">
              <img
                className="mx-auto w-32 md:w-48"
                src="/logo.png"
                alt="logo"
              />
              <h4 className="mb-8 mt-4 text-xl font-semibold text-white-light">
                Melewati Batas Dengan Batasan
              </h4>
            </div>

            <form>
              <p className="mb-6 text-center text-white-light">Please login to your account</p>

              {/* Field Username */}
              <MTC.Input.Field
                title="Username"
                placeholder="Enter username"
                id="username"
                htmlFor="username"
                name="username"
                required
                magic={{
                  type: "text",
                  inputValue: username,
                  setInputValue: setUsername,
                  regex: /^[a-zA-Z0-9_]{3,}$/,
                  errorMessage: "Minimal 3 karakter tanpa spasi.",
                }}
              />
              <br />

              {/* Field Password */}
              <MTC.Input.Field
                title="Password"
                placeholder="Enter password"
                id="password"
                htmlFor="password"
                name="password"
                required
                magic={{
                  type: "password",
                  inputValue: password,
                  setInputValue: setPassword,
                  regex: /^.{6,}$/,
                  errorMessage: "Minimal 6 karakter.",
                }}
              />
              <br />
              {/* Submit */}
              <div className="mb-8 text-center">
                <MTC.Button.Normal title="Login" onClick={() => handleLogin()} isDisable={loading}/>
              </div>
            </form>
          </div>

          {/* Right column */}
          <div className="bg-[url('/bg_login.jpg')] bg-cover bg-center bg-no-repeat hidden lg:flex w-full lg:w-1/2 items-center justify-center text-white px-6 py-12">
            <div className="max-w-md text-center">
              <h2 className="text-3xl font-bold mb-4">Selamat Datang</h2>
              <p className="text-sm">
                Silakan login untuk melanjutkan ke dalam sistem admin kami.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
