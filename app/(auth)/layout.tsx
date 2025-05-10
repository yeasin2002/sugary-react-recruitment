import authBg from "@/assets/gift.jpg";
import Image from "next/image";
import { AuthGuard } from "./auth-guard";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-black flex items-center justify-center p-4  relative">
        <div className="w-full max-w-7xl rounded-3xl overflow-hidden flex flex-col md:flex-row bg-white ring-1 ring-white/40 z-30">
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
              <div className="absolute inset-0 z-10 p-8 md:p-12 flex flex-col justify-end bg-black/40">
                <div className="mb-8 space-y-8">
                  <h2 className="text-5xl md:text-4xl font-bold leading-tight mb-4 font-ubuntu">
                    The {`world's`}
                    <br />
                    first personalized
                    <br />
                    gifting app
                  </h2>
                  <p className="text-sm md:text-base max-w-xs font-montserrat">
                    You can get everything you want if you work hard, trust the
                    process, and stick to the plan.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {children}
        </div>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(125%_125%_at_50%_10%,rgba(255,255,255,0)_40%,rgba(43,5,148,0.27)_100%)]"></div>
      </div>
    </AuthGuard>
  );
};

export default AuthLayout;
