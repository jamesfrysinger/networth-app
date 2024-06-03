import { MouseEvent, useState } from "react";
import {
  addDataToFirestore,
  signInWithEmailAndPasswordAuth,
  signUpWithEmailAndPassword,
} from "../firebase/firebase";
import { useAppContext } from "contexts/AppProvider";
import { ACTION_SIGNIN } from "actions";
import Logo from "components/common/Logo";
import { useForm, SubmitHandler } from "react-hook-form";
import { IFormInput } from "types/loginTypes";
import { ISignInDetails } from "types/authorizationTypes";

export const inputTextStyles = `
  w-full
  h-[50px] 
  mb-5
  px-3
  border-b-[1px] 
  border-red-400 
  border-opacity-20 
  outline-none 
  placeholder-red-400 
  dark:placeholder-red-300 
  placeholder-opacity-70 
  dark:placeholder-opacity-70 
  bg-transparent
`;

const Login = () => {
  const { register, handleSubmit } = useForm<IFormInput>();

  const { state, dispatch } = useAppContext();
  const [signUp, setSignUp] = useState<boolean>(false);
  const [loginError, setLoginError] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const email = data.email;
    const fullname = data.fullname;
    const password = data.password;

    setLoginError(false);

    setTimeout(() => {
      if (signUp) {
        // Sign-up
        (async () => {
          let res;
          if (email && password) {
            res = await signUpWithEmailAndPassword(email, password);
          }

          if (res && fullname) {
            addDataToFirestore({
              name: {
                firstName: fullname,
                lastName: fullname,
              },
              uid: res.uid,
              email: res.email,
            });
          }
        })();
        setSignUp(false);
      } else if (!signUp) {
        // Sign-in
        (async () => {
          const res: ISignInDetails = await signInWithEmailAndPasswordAuth(
            email,
            password
          );

          dispatch({
            type: ACTION_SIGNIN,
            payload: { ...state, authorization: res },
          });
          handleError(state.authorization.status);
        })();
      }
    }, 1000);
  };

  const handleError = (e: boolean) => {
    if (!e) setLoginError(true);
    else setLoginError(false);
  };

  const handleAction = (e: MouseEvent) => {
    e.preventDefault();
    setSignUp(!signUp);
  };

  const labels = {
    login: "Login",
    signup: "Sign Up",
  };

  return (
    <div className="translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%] absolute max-w-[500px] p-6 box-border w-full mx-auto">
      <div className="flex justify-center w-full">
        <Logo large />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mt-10 text-center"
      >
        {signUp && (
          <input
            type="text"
            {...register("fullname", { required: true })}
            required
            placeholder="Full name"
            className={inputTextStyles}
          />
        )}
        <input
          type="email"
          {...register("email", { required: true })}
          required
          placeholder="Email address"
          className={inputTextStyles}
        />
        <br />
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder={signUp ? "Choose Password" : "Password"}
          required
          className={inputTextStyles}
        />
        {loginError && (
          <div className="bg-red-400 bg-opacity-20 p-3 rounded-md ">
            There was an issue signing in.
            <br />
            Check your username or password and try again.
          </div>
        )}

        <button className="h-[50px] bg-transparent font-black text-lg hover:underline">
          {!signUp ? labels.login : labels.signup}
        </button>
      </form>
      <p className="text-center">
        {!signUp ? ` Don't have an account? ` : ` Already have an account? `}
        <a href="void:(0)" onClick={handleAction} className="underline">
          {signUp ? labels.login : labels.signup}
        </a>
      </p>
    </div>
  );
};

export default Login;
