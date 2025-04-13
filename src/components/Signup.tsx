import { Button } from '@/components/shadcn/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/card';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { Errors, SignupForm } from '@/utils/types';
import useAuth from '@/utils/useAuth';
import { validateSignupForm } from '@/utils/validator';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Signup() {
  const { isAuthenticated, createAccount } = useAuth();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo('/');
    }
  }, [isAuthenticated]);

  const errorInitialState: Errors<SignupForm> = {};

  const formInitialState: SignupForm = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const [formData, setFormData] = useState<SignupForm>(formInitialState);
  const [error, setError] = useState<Errors<SignupForm>>(errorInitialState);

  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateData = (data: SignupForm): boolean => {
    const { success, error } = validateSignupForm(data);
    if (!success) {
      setError(error);
      return false;
    }
    setError(errorInitialState);
    return true;
  };

  const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validateData(formData)) return;
    const response = await createAccount(formData);
    if (response.success) {
      navigateTo('/');
    } else {
      setError({ global: response.error });
      setFormData((prev) => ({ ...prev, password: '', confirmPassword: '' }));
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Create your account</CardTitle>
              <CardDescription>Enter your details and you are good to go</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Full Name</Label>
                    <div>
                      <Input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        aria-invalid={Boolean(error.name)}
                        onChange={handleData}
                        placeholder="Your Name"
                      />
                      {error.name && <span className="text-destructive text-xs">{error.name}</span>}
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <div>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        aria-invalid={Boolean(error.email)}
                        onChange={handleData}
                        placeholder="email@example.com"
                      />
                      {error.email && <span className="text-destructive text-xs">{error.email}</span>}
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <div>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        aria-invalid={Boolean(error.password)}
                        onChange={handleData}
                      />
                      {error.password && <span className="text-destructive text-xs">{error.password}</span>}
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="password">Confirm Password</Label>
                    <div>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="confirmPassword"
                        value={formData.confirmPassword}
                        aria-invalid={Boolean(error.confirmPassword)}
                        onChange={handleData}
                      />
                      {error.confirmPassword && <span className="text-destructive text-xs">{error.confirmPassword}</span>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    {error.global && <span className="text-destructive text-xs">{error.global}</span>}
                    <Button type="submit" className="w-full" onClick={handleSignup}>
                      Signup
                    </Button>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{' '}
                  <Link to="/login" className="underline underline-offset-4">
                    Login
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
