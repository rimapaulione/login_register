import { CardWrapper } from "@/components/auth/card-wrapper";

export function LoginForm() {
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have a account?"
      backButtonHref="/auth/register"
      showSocial
    >
      Login form
    </CardWrapper>
  );
}
