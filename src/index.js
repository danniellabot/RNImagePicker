import React from 'react';
import {AuthenticatedUserProvider} from './navigation/AuthenticatedUserProvider';
import RootNavigator from './navigation/RootNavigator';
import {ThemeProvider} from './navigation/ThemeProvider';

export default function Routes() {
  return (
    <AuthenticatedUserProvider>
      <ThemeProvider>
        <RootNavigator />
      </ThemeProvider>
    </AuthenticatedUserProvider>
  );
}
