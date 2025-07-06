import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login, register } from "../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth-context";
import { authSchema } from "../validations";
import type z from "zod";
import { setToken } from "../services/session";

type Props = {
  type: "signup" | "signin";
};

type FormErrors = z.inferFlattenedErrors<typeof authSchema>["fieldErrors"];

const initialFormData = {
  name: "",
  email: "",
  password: "",
};

const Auth = ({ type = "signup" }: Props) => {
  const [formData, setFormData] = useState(initialFormData);

  const [formErrors, setFormErrors] = useState<FormErrors | null>();
  const navigate = useNavigate();

  const { setUser, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const mutation = useMutation({
    mutationFn: type === "signin" ? login : register,
    onSuccess: (data) => {
      toast.success("Login Successful");
      setToken(data.token);
      setUser(data.user);
      window.location.href = "/";
    },
    onError: () => {
      toast.error("Login failed");
    },
  });

  const handleFormChange = (key: keyof typeof formData) => (val: string) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = authSchema.safeParse({ ...formData, type });

    if (!validation.success) {
      setFormErrors(validation.error.flatten().fieldErrors);
      return;
    }

    mutation.mutate(formData);
  };

  useEffect(() => {
    setFormData(initialFormData);
    setFormErrors(null);
  }, [type]);

  return (
    <main className="flex justify-center items-center h-screen">
      <section className="w-sm">
        <h2 className="text-4xl mb-8 font-gelasio text-black text-center">
          {type === "signup" ? "Join Us Today" : "Welcome Back"}
        </h2>
        <form className="space-y-3 text-center" onSubmit={handleSubmit}>
          {type === "signup" && (
            <Input
              type="text"
              name="name"
              placeholder="Name"
              icon="user"
              value={formData.name}
              onChange={(e) => handleFormChange("name")(e.target.value)}
              error={formErrors?.name?.join(", ")}
            />
          )}
          <Input
            type="email"
            icon="mail"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleFormChange("email")(e.target.value)}
            error={formErrors?.email?.join(", ")}
          />
          <Input
            type="password"
            icon="key"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleFormChange("password")(e.target.value)}
            error={formErrors?.password?.join(", ")}
          />
          <Button className="mt-8 w-full capitalize">{type}</Button>
        </form>
        <div className="relative w-full flex items-center gap-2 my-10 opacity-30 uppercase text-black font-bold">
          <hr className="w-1/2 border-black" />
          <p>Or</p>
          <hr className="w-1/2 border-black" />
        </div>

        <div>
          <Button className="w-full">Continue With Google</Button>

          {type === "signup" ? (
            <p className="text-center mt-6 text-dark-grey">
              Already have an account?{" "}
              <Link to="/sign-in" className="text-link hover:underline">
                Sign In
              </Link>
            </p>
          ) : (
            <p className="text-center mt-6 text-dark-grey">
              Don't have an account yet?{" "}
              <Link to="/sign-up" className="text-link hover:underline">
                Sign up
              </Link>
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Auth;
