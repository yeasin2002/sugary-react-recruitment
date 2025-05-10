import { Montserrat, Ubuntu } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

const ubuntu = Ubuntu({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-ubuntu",
});

const montserrat = Montserrat({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const fontList = [ubuntu, montserrat];

export const fontVariable = fontList.map((font) => font.variable).join(" ");
