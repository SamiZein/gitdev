import AuthedBtn from "./AuthedBtn";
import { handleLogin } from "./Utils";

export default function Login() {
    return (
        <div className="p-1 pl-3">
            <h1>Login in with Github to use this functionality</h1>
            <AuthedBtn onClick={handleLogin} text="Sign in" />
        </div>
    );
}