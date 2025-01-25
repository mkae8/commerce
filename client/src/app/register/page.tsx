import AuthComponent from "@/components/main/register/auth-component";

const RegisterPage = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full h-full max-w-7xl  flex flex-col items-center justify-center ">
        <div className="w-full h-full  relative">
          <img src="/airplane.jpg" alt="" className="w-full h-full" />
        </div>
      </div>
      <div className="w-full max-w-7xl h-full flex flex-col items-center justify-center ro">
        <AuthComponent />
      </div>
    </div>
  );
};

export default RegisterPage;
