import { useTypedSelector } from "@/hooks/useTypedStore";
import { useActions } from "@/hooks/useActions";

function LoginPage() {
  const { logIn } = useActions();

  return <span onClick={logIn}>Bitch yo login !</span>;
}

interface Props {
  children: JSX.Element;
}

export default function RequireAuth({ children }: Props) {
  const { session } = useTypedSelector((state) => state.auth);

  return session ? children : <LoginPage />;
}
