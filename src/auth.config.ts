import {getUserByEmail} from '@/data/user';
import {LoginSchema} from '@/schemas';
import bcryptjs from 'bcryptjs';
import type {NextAuthConfig} from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export default {
  providers: [
    Google,
    GitHub,
    Credentials({
      async authorize(credentials) {
        const {success, data} = LoginSchema.safeParse(credentials);

        if (success) {
          const user = await getUserByEmail(data.email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcryptjs.compare(
            data.password,
            user.password,
          );

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
