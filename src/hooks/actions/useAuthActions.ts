import * as AuthActionCreators from "@/store/action-creators/auth";
import { useActions } from "@/hooks/useActions";

const useAuthActions = () => useActions(AuthActionCreators);

export default useAuthActions;
