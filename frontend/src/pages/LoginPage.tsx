import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from 'src/api';
import { handleError } from 'src/helpers/errorHandler';
import useUserStore from 'src/store/authorized-user.store';
import useTokenStore from 'src/store/token.store';
import { z } from 'zod';
import { loginFormSchema } from '@schemas/loginFormSchema';
import { Button } from '@ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/form';
import { Input } from '@ui/input';
import Loader from '@components/Loader';
import { PageLoader } from '@components/index';
import { zodResolver } from '@hookform/resolvers/zod';
import { IFormField } from '../interfaces';

const LoginPage = () => {
  const FORM_FIELDS: IFormField[] = [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'email',
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'password',
    },
  ];
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const { setToken, removeToken } = useTokenStore();
  const [isLoading, setIsLoading] = useState(true);
  const defaultValues = {
    email: '',
    password: '',
  };
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });
  const handleSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    const { email, password } = values;
    try {
      const response = await login(email, password);
      form.reset(defaultValues);
      setToken(response.access_token);
      navigate('/threads');
    } catch (error) {
      handleError(error);
      setUser(null);
      removeToken();
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <PageLoader />;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex content-center justify-center"
      >
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            {FORM_FIELDS.map(formField => (
              <FormField
                key={formField.name}
                control={form.control}
                name={formField.name as 'password' | 'email'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{formField.label}</FormLabel>
                    <FormControl>
                      <Input
                        type={formField.type}
                        placeholder={formField.placeholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Link
              className="hover:text-fuchsia-700 hover:underline"
              to="/signup"
            >
              Don't have an account? Sign up
            </Link>
            <Button className="w-full" type="submit">
              {isLoading ? <Loader size="sm" className="mr-2" /> : 'Ok'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default LoginPage;
