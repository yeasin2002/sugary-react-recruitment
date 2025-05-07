import { Eye } from "lucide-react";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="flex flex-col items-center justify-center  w-1/2">
      <div>
        <h1>You can register yourself, Talk with admin!</h1>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          {`Don't`} have an account?
          <Link
            href="/register"
            className="font-medium text-black hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
