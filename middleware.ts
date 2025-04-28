// import { NextResponse } from "next/server";
// import { NextApiRequest } from "next/types";

// export const middleware = (req: NextApiRequest) => {
//   console.log(req);

//   return NextResponse.redirect(new URL("/about", req.url));
// };

import { auth } from "@/lib/auth";
export const middleware = auth;

export const config = {
  matcher: ["/account"],
};
