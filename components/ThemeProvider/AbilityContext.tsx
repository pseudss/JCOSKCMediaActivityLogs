'use client';

import { createContext } from 'react';
import { AppAbility } from '@/lib/ability'; // Adjust path if needed

// Create the context with a default empty ability instance
export const AbilityContext = createContext<AppAbility>(new AppAbility());