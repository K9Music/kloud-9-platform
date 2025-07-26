import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import dbConnect from './lib/mongodb.js';
import Profile from './models/Profile.js';
import bcrypt from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email or Username', type: 'text', placeholder: 'your@email.com or username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          await dbConnect();
          if (!credentials?.email || !credentials?.password) {
            return null;
          }
          // Determine if input is email or username
          const isEmail = credentials.email.includes('@');
          const input = credentials.email;
          let user;
          if (isEmail) {
            user = await Profile.findOne({ email: input.toLowerCase() });
          } else {
            user = await Profile.findOne({ username: input.toLowerCase() });
          }
          if (!user) return null;
          // Compare password
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) return null;
          // Return user object (omit password)
          const userData = user.toObject();
          delete userData.password;
          return userData;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.email = user.email;
        token.username = user.username;
        token.name = user.name;
        token.artType = user.artType;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.name = token.name;
        session.user.artType = token.artType;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}); 