'use client'

import React, { ReactNode, useEffect, useState } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import ThemeProvider from '@/utils/theme';
import { SessionProvider } from 'next-auth/react';
import { SnackbarProvider } from 'notistack';
import NextTopLoader from 'nextjs-toploader';
import { PRIMARY_COLOR } from '@/config';
import useMainStore from '@/store/main-store';
import { axiosInstance } from '@/hooks/useAxios';
import { inter } from '@/utils/fonts';

const Providers = ({ children }: { children: ReactNode }) => {
  const { setCategories } = useMainStore();
  const [mounted, setMounted] = useState(false);

  const getCategoriesHandler = async () => {
    try {
      const response = await axiosInstance.get('/api/category');
      setCategories(response.data.categories);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  }

  useEffect(() => {
    setMounted(true);
    getCategoriesHandler();
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={inter.className}>
      <SnackbarProvider>
        <SessionProvider>
          <NextTopLoader color={PRIMARY_COLOR.main} showSpinner={false} />
          <AppRouterCacheProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </AppRouterCacheProvider>
        </SessionProvider>
      </SnackbarProvider>
    </div>
  )
}

export default Providers;