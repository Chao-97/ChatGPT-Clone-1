import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import db from "@/core/db";
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
    {
      id: "authing",
      name: "Authing",
      type: "oauth",
      wellKnown: `${process.env.AUTHING_ISSUER}/oidc/.well-known/openid-configuration`,
      authorization: { params: { scope: "openid email username phone" } },
      idToken: true,
      checks: ["pkce", "state"],
      allowDangerousEmailAccountLinking:true,
      async profile(profile,tokens) {
        console.log("profile",profile);
        console.log("tokens",tokens);
        const userItem = await db.user.findFirst({
          where:{
            email:profile.email
          }
        })
        console.log("userItem",userItem);
        
        if(!userItem){
          return {
            id: profile.sub,
            uid:profile.sub,
            name: profile.username,
            email: profile.email,
            emailVerified:profile.email_verified,
            image: profile.picture,
            phone:profile.phone_number,
            authingId:profile.sub,
          }
          
        }
        await db.user.update({
          where:{
            email:profile.email
          },
          data:{
            name:profile.username,
            image: profile.picture,
            phone:profile.phone_number,
            authingId:profile.sub
          }
        })
        return {
          id: profile.sub,
          uid:profile.sub,
          name: profile.username,
          email: profile.email,
          image: profile.picture,
          emailVerified:profile.email_verified,
          phone:profile.phone_number,
          authingId:profile.sub,
        }
      },
      options:{
        clientId:process.env.AUTHING_CLIENT_ID||"",
        clientSecret:process.env.AUTHING_CLIENT_SECRET||"",
      }
    }
  ],

  callbacks: {
    async session({ session,user }: any) {
      session.user.username = session?.user?.name
        .split(" ")
        .join("")
        .toLocaleLowerCase();
      session.user.uid = user.id;
      return session;
    },
  },

  secret: process.env.NEXT_PUBLIC_SECRET,
};

export default NextAuth(authOptions);
