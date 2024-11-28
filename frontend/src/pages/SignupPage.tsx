import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { signup } from '../api/';
import { IFormField } from '../interfaces';
import useUserStore from '../store/authorized-user.store';
import { toast } from 'react-toastify';

const SignupPage = () => {
  const FORM_FIELDS: IFormField[] = [
    {
      name: 'username',
      type: 'text',
      label: 'Username',
      placeholder: 'user name',
    },
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
    {
      name: 'repeatPassword',
      type: 'password',
      label: 'Repeat Password',
      placeholder: 'repeat password',
    },
  ];
  const { setUser } = useUserStore();
  const defaultValues = {
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    avatar: 'avatar1',
  };
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues
  });

  const onSubmit = (values: z.infer<typeof signupFormSchema>) => {
    signup(
      values.username,
      values.email,
      values.password,
      values.avatar || 'avatar1'
    ).then(resp => {
      setUser(resp.user);
      localStorage.setItem('user', JSON.stringify(resp.access_token));
    }).catch(err => {
      toast.error(err.response.message);
    }).finally(() => {
      form.reset(defaultValues);
    });
  };
//TODO: Implement checkUsername function
  // const checkUsername = async () => {
  //   const username = form.getValues('username');
  //   const isUnique = await checkUsernameUnique(username);
  //   if (!isUnique) {
  //     form.setError('username', {
  //       type: 'manual',
  //       message: 'Username is already taken, try another one.',
  //     });
  //   }
  // };

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
            {FORM_FIELDS.map(formField => (
              <FormField
                key={formField.name}
                control={form.control}
                name={formField.name}
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
            <FormItem>
              <FormLabel>Choose your avatar</FormLabel>
              <FormControl>
                <Controller
                  control={form.control}
                  name="avatar"
                  render={({ field: { onChange, value } }) => (
                    <SelectAvatar setAvatar={onChange} selectedProps={value} />
                  )}
                />
              </FormControl>
            </FormItem>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button 
            // onClick={checkUsername}
            className="w-full" type="button">
              Check username availability
            </Button>
            <Button className="w-full" type="submit">
              Register
            </Button>
            <Link
              className="hover:text-fuchsia-700 hover:underline"
              to="/login"
            >
              Already have an account? Login
            </Link>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default SignupPage;
