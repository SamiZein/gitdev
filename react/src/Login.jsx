import AuthedBtn from "./AuthedBtn";
import { handleLogin } from "./Utils";

export default function Login({className}) {
    return (
        <div className={className}>
            <h1>Login in with Github to use this functionality</h1>
            <AuthedBtn onClick={handleLogin} text="Sign in" />
        </div>
    );
}