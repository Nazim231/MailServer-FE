import { Button } from '@/components/shadcn/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/card';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import useAuth from '@/utils/useAuth';
import { validateEmailPassword } from '@/utils/validator';
import { Credentials, Errors } from '@/utils/types';

export function Login() {
  const { isAuthenticated, attemptLogin } = useAuth();
  const navigateTo = useNavigate();

  // Initial state for error and data
  const dataInitialState: Credentials = { email: '', password: '' };
  const errorInitialState: Errors<Credentials> = {};

  const [data, setData] = useState<Credentials>(dataInitialState);
  const [error, setError] = useState<Errors<Credentials>>(errorInitialState);

  useEffect(() => {
    if (isAuthenticated) navigateTo('/');
  }, [isAuthenticated]);

  const validCreds = (data: { email: string; password: string }): boolean => {
    const { success, error } = validateEmailPassword(data.email, data.password);
    if (!success) {
      setError(error);
      return false;
    }
    setError(errorInitialState);
    return true;
  };

  const handleData = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validCreds(data)) return;
    const attempt = await attemptLogin(data.email, data.password);
    if (!attempt.success) {
      setError({ global: attempt.error });
      setData((prev) => ({ ...prev, password: '' }));
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>Enter your email below to login to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <div>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        onChange={handleData}
                        value={data.email}
                        aria-invalid={Boolean(error.email)}
                        placeholder="email@example.com"
                      />
                      {error.email && <span className="text-destructive text-xs">{error.email}</span>}
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      {/* <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                        Forgot your password?
                      </a> */}
                    </div>
                    <div>
                      <Input
                        id="password"
                        type="password"
                        name="password"
                        aria-invalid={Boolean(error.password)}
                        onChange={handleData}
                        value={data.password}
                      />
                      {error.password && <span className="text-destructive text-xs">{error.password}</span>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    {error.global && <span className="text-destructive text-xs">{error.global}</span>}
                    <Button type="submit" className="w-full" onClick={handleLogin}>
                      Login
                    </Button>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{' '}
                  <Link to="/signup" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
