import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { type SignupLoginFormInput } from "../../utils/types";
import { supabase } from "../../utils/supabase";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupLoginFormInput>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SignupLoginFormInput> = async (data) => {
    try {
      setLoading(true);
      const { email, password } = data;
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      //   console.log(authData);

      if (error) {
        setErrorMessage(error.message);
      }

      if (authData.session) {
        navigate("/profilecard");
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="flex justify-center items-center min-h-screen container mx-auto px-4">
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm w-full md:max-w-md mx-auto">
          <div className="p-4 md:p-7">
            <div className="text-center mb-4">
              <h1 className="black text-2xl font-bold text-gray-800">
                サインイン
              </h1>
              <p className="text-red-600">{errorMessage}</p>
              <div>
                <p className="my-2 text-sm text-gray-600">
                  まだアカウントをお持ちではないですか？
                </p>
                <p className="text-blue-600 text-xs hover:underline">
                  <span className="inline-block hover:underline">
                    <Link to={"/signup"}>
                      こちらからアカウントを作成してください。
                    </Link>
                  </span>
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-y-5 mx-5">
                <div>
                  <label htmlFor="email" className="block text-sm mb-1">
                    メールアドレス
                  </label>
                  <input
                    {...register("email", {
                      required: {
                        value: true,
                        message: "入力が必須の項目です。",
                      },
                    })}
                    id="email"
                    type="email"
                    className="py-3 px-4 w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.email && (
                    <div className="text-red-600">{errors.email.message}</div>
                  )}
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm mb-1">
                    パスワード
                  </label>
                  <input
                    {...register("password", {
                      required: {
                        value: true,
                        message: "入力が必須の項目です。",
                      },
                      minLength: {
                        value: 8,
                        message: "8文字以上入力してください。",
                      },
                    })}
                    id="password"
                    type="password"
                    className="py-3 px-4 w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.password?.type === "required" && (
                    <div className="text-red-600">
                      {errors.password.message}
                    </div>
                  )}
                  {errors.password?.type === "minLength" && (
                    <div className="text-red-600">
                      {errors.password.message}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="block bg-blue-600 w-full py-3 px-4 mt-2 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                >
                  {loading ? "サインイン中..." : "サインイン"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
