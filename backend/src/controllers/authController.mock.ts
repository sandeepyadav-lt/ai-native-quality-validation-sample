import { Request, Response } from 'express';
import { mockUsers, findById } from '../data/mockData';
import { generateToken } from '../middleware/auth';
import { AuthRequest } from '../types';
import bcrypt from 'bcryptjs';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      res.status(400).json({ error: 'Email already registered' });
      return;
    }

    // Create new user
    const newUser = {
      _id: `507f1f77bcf86cd79943901${mockUsers.length + 1}`,
      email,
      password: await bcrypt.hash(password, 10),
      firstName,
      lastName,
      avatar: `https://i.pravatar.cc/150?img=${mockUsers.length + 10}`,
      phone: '',
      bio: '',
      isHost: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockUsers.push(newUser);

    const token = generateToken(newUser._id, newUser.email);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        avatar: newUser.avatar,
        isHost: newUser.isHost,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = generateToken(user._id, user.email);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        isHost: user.isHost,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

export const getProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const user = findById(mockUsers, req.user?.userId || '');
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        phone: user.phone,
        bio: user.bio,
        isHost: user.isHost,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

export const updateProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { firstName, lastName, phone, bio, avatar } = req.body;

    const userIndex = mockUsers.findIndex(u => u._id === req.user?.userId);
    if (userIndex === -1) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      firstName: firstName || mockUsers[userIndex].firstName,
      lastName: lastName || mockUsers[userIndex].lastName,
      phone: phone || mockUsers[userIndex].phone,
      bio: bio || mockUsers[userIndex].bio,
      avatar: avatar || mockUsers[userIndex].avatar,
      updatedAt: new Date(),
    };

    const user = mockUsers[userIndex];

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        phone: user.phone,
        bio: user.bio,
        isHost: user.isHost,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};
