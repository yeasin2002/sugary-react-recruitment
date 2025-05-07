import authBg from "@/assets/sugar.jpg";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-7xl rounded-3xl overflow-hidden flex flex-col md:flex-row bg-white">
        {/* Left Panel - Colorful Background with Quote */}
        <div className="relative w-full md:w-1/2 bg-black text-white">
          <div className="relative h-full min-h-[300px] md:min-h-[600px] overflow-hidden">
            {/* Colorful Background Image */}
            <Image
              src={authBg}
              alt="Colorful waves"
              fill
              priority
              className="object-cover"
            />

            {/* Content Overlay */}
            <div className="absolute inset-0 z-10 p-8 md:p-12 flex flex-col justify-end">
              <div className="mb-8">
                <h2 className="text-5xl md:text-6xl font-serif font-bold leading-tight mb-4">
                  Get
                  <br />
                  Everything
                  <br />
                  You Want
                </h2>
                <p className="text-sm md:text-base max-w-xs">
                  You can get everything you want if you work hard, trust the
                  process, and stick to the plan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
