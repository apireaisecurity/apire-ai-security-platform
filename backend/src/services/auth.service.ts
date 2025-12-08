import { User, users } from '../models/user.model';
import { RegisterInput, LoginInput } from '../utils/validators';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export class AuthService {
  async register(input: RegisterInput): Promise<{ user: Omit<User, 'password'>; token: string }> {
    const existingUser = users.find((u) => u.email === input.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // In a real app, use bcrypt to hash password
    const hashedPassword = crypto.createHash('sha256').update(input.password).digest('hex');

    const newUser: User = {
      id: crypto.randomUUID(),
      email: input.email,
      password: hashedPassword,
      name: input.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.push(newUser);

    const token = this.generateToken(newUser);
    const { password, ...userWithoutPassword } = newUser;

    return { user: userWithoutPassword, token };
  }

  async login(input: LoginInput): Promise<{ user: Omit<User, 'password'>; token: string }> {
    const hashedPassword = crypto.createHash('sha256').update(input.password).digest('hex');
    const user = users.find((u) => u.email === input.email && u.password === hashedPassword);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user);
    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }

  private generateToken(user: User): string {
    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  }
}
