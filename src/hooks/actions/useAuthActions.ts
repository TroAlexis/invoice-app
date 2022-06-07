import { useActions } from "@/hooks/actions/useActions";
import * as AuthActionCreators from "@/store/action-creators/auth";

const useAuthActions = () => useActions(AuthActionCreators);

export default useAuthActions;
