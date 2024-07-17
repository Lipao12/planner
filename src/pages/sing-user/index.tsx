import { AtSign, EyeIcon, User2Icon } from "lucide-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { api } from "../../lib/axios";
import { CustomButton } from "../../ui/componets/CustomButton";

interface User {
  id: string;
  name: string;
  email: string;
}

export function SingPage() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    if (!email || !password) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post("/login", {
        email,
        password,
      });
      const userId = response.data.id;
      navigate(`/user/${userId}`);
    } catch (err: any) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    if (!email || !name || !password) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post("/register", {
        email,
        name,
        password,
      });
      const userId = response.data.id;
      navigate(`/user/${userId}`);
    } catch (err: any) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-pattern bg-no-repeat bg-center items-center justify-center flex">
      <div className=" h-auto w-[640px] bg-zinc-900 py-5 px-6 rounded-xl items-center shadow-shape space-y-5">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <ClipLoader
              color={"#BEF264"}
              loading={isLoading}
              size={80}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-center">
              {isRegister ? "Registrar" : "Login"}
            </h2>
            <form
              className="items-center space-y-5"
              onSubmit={(event) => {
                isRegister ? handleRegister(event) : handleLogin(event);
              }}
            >
              {isRegister && (
                <div className="h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                  <User2Icon className="size-5 text-zinc-400" />
                  <input
                    name="name"
                    type="text"
                    placeholder="Nome"
                    className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                    onChange={() => {}}
                  />
                </div>
              )}
              <div className="h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <AtSign className="size-5 text-zinc-400" />
                <input
                  name="email"
                  type="email"
                  placeholder="E-mail"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                  onChange={() => {}}
                />
              </div>
              <div className="h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <EyeIcon className="size-5 text-zinc-400" />
                <input
                  name="password"
                  type="password"
                  placeholder="Senha"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                  onChange={() => {}}
                />
              </div>
              <CustomButton size="full" type="submit">
                {isRegister ? "Registrar" : "Entrar"}
              </CustomButton>
            </form>
            {isRegister ? (
              <p>
                Já possui conta?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(false);
                  }}
                  className="underline hover:hover:text-lime-300"
                >
                  Faça o login
                </button>
              </p>
            ) : (
              <p>
                Não possui conta?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(true);
                  }}
                  className="underline hover:hover:text-lime-300"
                >
                  Registre aqui
                </button>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
