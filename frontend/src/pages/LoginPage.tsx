import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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
  const navigate = useNavigate();
  const defaultValues = {
    username: '',
    password: '',
  };
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });

  const handleSubmit = () => {
    navigate('/threads');
  };

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
              Ok
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default LoginPage;
