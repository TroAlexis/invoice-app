import useLoading from "@/hooks/useLoading";
import useLogin, { loginTypes } from "@/hooks/useLogin";
import AuthForm, { Props } from "components/AuthForm/AuthForm";
import Button from "components/ui/Button/Button";
import { Shade } from "constants/color";
import { Size, Weight } from "constants/size";
import styles from "./LoginForm.module.scss";

export default function LoginForm(props: Partial<Props>) {
  const { loading, withLoading } = useLoading();

  const {
    handleSubmit,
    info,
    isPasswordLoginType,
    nextLoginType,
    setLoginType,
  } = useLogin();

  const onSubmit = withLoading(handleSubmit);

  const handleLoginTypeChange = () =>
    setLoginType((prevValue) => {
      return prevValue === loginTypes.PASSWORD
        ? loginTypes.MAGIC_LINK
        : loginTypes.PASSWORD;
    });

  const { children } = props;

  return (
    <AuthForm
      loading={loading}
      onSubmit={onSubmit}
      headingSlot="Login to your account"
      submitSlot="Login"
      info={info}
      fields={{ password: isPasswordLoginType }}
      {...props}
    >
      {!isPasswordLoginType && (
        <p className={styles.remark}>
          No need for password, we'll e-mail you a magic link!
        </p>
      )}

      <div className={styles.actions}>
        <Button
          outline
          linkish
          shade={Shade.LIGHT}
          size={Size.MEDIUM}
          weight={Weight.REGULAR}
          className={styles.action}
          onClick={handleLoginTypeChange}
        >
          Login with {nextLoginType}
        </Button>{" "}
        {children && children}
      </div>
    </AuthForm>
  );
}
