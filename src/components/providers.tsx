"use client";

import { ClerkProvider, SignInButton, SignOutButton,SignUpButton, useAuth } from "@clerk/nextjs";
import { Authenticated,Unauthenticated ,ConvexReactClient, AuthLoading } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ThemeProvider } from "@/components/theme-provider";
import { UnauthenticatedView } from "@/features/auth/component/unauthenticated-view";
import { AuthLoadingView } from "@/features/auth/component/auth-loading-view";


const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const Providers = ({ children }: { children:React.ReactNode }) => {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
         <ThemeProvider
                  attribute='class'
                  defaultTheme="dark"
                  enableSystem
                  disableTransitionOnChange
                >
       <Authenticated>
             {children}
            <SignOutButton/>
        </Authenticated> 
        <Unauthenticated>
           <UnauthenticatedView/> 
        </Unauthenticated>
            <AuthLoading>
               <AuthLoadingView/>
            </AuthLoading>
           
    </ThemeProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};