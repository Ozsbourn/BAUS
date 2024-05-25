'use client';

import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';
import { GoogleButton } from './GoogleButton';
import { TwitterButton } from './TwitterButton';
import classes from './AuthenticationForm.module.css';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { URLs } from '@/configs/urls';
import { notifications } from '@mantine/notifications';
import { PossibleStatusList } from '@/lib/types/userTypes/userStatuses';
import { observer } from 'mobx-react';
import { useRouter } from 'next/navigation';
import { useStores } from '@/lib/store/useStore';

export const AuthenticationForm = observer((props: PaperProps) => {
  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      login: '',
      password: '',
      // confirmPassword: '',
      terms: false,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 7 characters' : null),
      // matching: (val, values) => (values.password !== val ? 'Your passwords aren\'t matching' : null),
    },
  });
  const router = useRouter();
  const {
    userStore: { loginUser },
  } = useStores();

  const handleSubmit = async (values: {
    email: string;
    login: string;
    name: string;
    password: string;
    terms: boolean;
  }) => {
    if (type === 'login') {
      axios
        .post(
          URLs.login,
          { email: values.email, password: values.password },
          {
            withCredentials: true,
          }
        )
        .then((res: AxiosResponse) => {
          const { createdAt, updatedAt, ...other } = res.data;
          loginUser({
            userId: other.id,
            ...other,
          });

          router.push(`/profile/${other.login}`);
        })
        .catch((err: AxiosError) => {
          if (err.response) {
            notifications.show({
              color: 'red',
              title: 'Error',
              message: err.response.data.message,
            });
          } else {
            notifications.show({
              color: 'red',
              title: 'Error',
              message: 'Something went wrong! Try this later.',
            });
          }
        });
    } else {
      axios
        .post(
          URLs.register,
          {
            email: values.email,
            login: values.login,
            name: values.name,
            password: values.password,
            status: PossibleStatusList.pending,
          },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          toggle();
          notifications.show({
            title: 'You were registrated!',
            message: 'Only enter with your new authentication data left',
          });
        })
        .catch((err: AxiosError) => {
          if (err.response) {
            notifications.show({
              color: 'red',
              title: 'Error',
              message: err.response.data.message,
            });
          }
        });
    }
  };

  return (
    <div className={classes.container}>
      <Paper radius="md" p="xl" withBorder {...props} className={classes.paper}>
        <Text size="lg" fw={500}>
          {upperFirst(type)} with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <TwitterButton radius="xl">Twitter</TwitterButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form
          onSubmit={form.onSubmit((values) => {
            handleSubmit(values);
          })}
        >
          <Stack>
            {type === 'register' && (
              <TextInput
                required
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                radius="md"
              />
            )}
            {type === 'register' && (
              <TextInput
                required
                label="Login"
                placeholder="Your login"
                value={form.values.login}
                onChange={(event) => form.setFieldValue('login', event.currentTarget.value)}
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 7 characters'}
              radius="md"
            />

            {/*{type === 'register' && (
              <PasswordInput
                required
                label="Confirm password"
                placeholder="Confirm your password by repeat it"
                value={form.values.confirmPassword}
                onChange={(event) => form.setFieldValue('confirmPassword', event.currentTarget.value)}
                error={form.errors.matching && 'Your password aren\'t matching'}
                radius="md"
              />
            )}*/}

            {type === 'register' && (
              <Checkbox
                required
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                error={form.errors.terms && "You wasn't agree with our terms"}
              />
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
});
