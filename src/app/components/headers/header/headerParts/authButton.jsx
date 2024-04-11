import LogInButton from "./logInButton";
import AuthLinks from './authLinks';

const AuthButton = ({status, session}) => {
  return (
    <div className="flex justify-end items-center">
      {status === 'authenticated' ? 
        <AuthLinks session={session}/>
        :
        <LogInButton />
      }
    </div>
  );
}
export default AuthButton;