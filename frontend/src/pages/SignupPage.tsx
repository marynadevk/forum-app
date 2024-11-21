import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupFormSchema } from '@schemas/signupFormSchema';
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
import { SelectAvatar } from '@components/index';
import { IFormField } from '../interfaces';

const SignupPage = () => {
  const FORM_FIELDS: IFormField[] = [
    { name: 'username', label: 'Username', placeholder: 'user name' },
    { name: 'password', label: 'Password', placeholder: 'password' },
    {
      name: 'repeatPassword',
      label: 'Repeat Password',
      placeholder: 'repeat password',
    },
  ];

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: '',
      avatar: 'avatar1',
    },
  });

  const onSubmit = (values: z.infer<typeof signupFormSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex content-center justify-center"
      >
        <Card>
          <CardHeader>
            <CardTitle>Sign up</CardTitle>
          </CardHeader>
          <CardContent>
            {FORM_FIELDS.map(field => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      <Input placeholder={field.placeholder} {...formField} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <FormItem>
              <FormLabel>Choose your avatar</FormLabel>
              <FormControl>
                <Controller
                  control={form.control}
                  name="avatar"
                  render={({ field: { onChange, value } }) => (
                    <SelectAvatar
                      setAvatar={(avatar: string) => {
                        onChange(avatar);
                      }}
                      selected={value}
                    />
                  )}
                />
              </FormControl>
            </FormItem>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Link
              className="hover:text-fuchsia-700 hover:underline"
              to="/login"
            >
              Already have an account? Login
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

export default SignupPage;
