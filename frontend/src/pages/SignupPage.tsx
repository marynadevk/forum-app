import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { NAME_MSGS } from 'src/constants/constants';
import { handleError } from 'src/helpers/errorHandler';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { signup, checkUsernameUnique } from '../api/';
import { IFormField } from '../interfaces';
import useUserStore from '../store/authorized-user.store';

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
    avatar: '/images/avatars/avatar1.svg',
  };
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof signupFormSchema>) => {
    const { username, email, password } = values;
    const randomAvatarNumber = Math.floor(Math.random() * 10) + 1;
    const avatar = `/images/avatars/avatar${randomAvatarNumber}.svg`;
    try {
      const response = await signup(username, email, password, avatar);
      localStorage.setItem('token', response.access_token);
      form.reset(defaultValues);
      toast.success('Profile created successfully, enjoy!');
      navigate('/threads');
    } catch (error) {
      handleError(error);
      setUser(null);
    }
  };

  const checkUsername = async () => {
    const username = form.getValues('username').trim();
    if (!username) {
      form.setError('username', {
        type: 'manual',
        message: NAME_MSGS.required,
      });
      return;
    }

    const isUnique = await checkUsernameUnique(username);
    if (!isUnique) {
      form.setError('username', {
        type: 'manual',
        message: NAME_MSGS.taken,
      });
      toast.error(NAME_MSGS.taken);
    } else {
      form.clearErrors('username');
      toast.success(NAME_MSGS.available);
    }
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
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button onClick={checkUsername} className="w-full" type="button">
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
