import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { theme } from './theme';

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: theme.colors.success,
        backgroundColor: theme.colors.white,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text,
      }}
      text2Style={{
        fontSize: 14,
        color: theme.colors.textLight,
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: theme.colors.danger,
        backgroundColor: theme.colors.white,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text,
      }}
      text2Style={{
        fontSize: 14,
        color: theme.colors.textLight,
      }}
    />
  ),
};
