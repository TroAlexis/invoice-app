import AuthForm, { Props } from "components/AuthForm/AuthForm";

export default function SignUpForm(props: Partial<Props>) {
  return (
    <AuthForm
      onSubmit={(e) => {
        console.log("Submit form SIGNUP event: ", e);
      }}
      headingSlot="Signup"
      submitSlot="Submit"
      {...props}
    />
  );
}
