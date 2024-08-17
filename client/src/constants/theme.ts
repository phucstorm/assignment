import {
  alpha,
  createTheme
} from '@mui/material';

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        iconSizeLarge: {
          fontSize: '1.25rem',
        },
        iconSizeMedium: {
          fontSize: '1.25rem',
        },
        iconSizeSmall: {
          fontSize: '1rem',
        },
        root: () => ({
          textTransform: 'none',
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          whiteSpace: 'nowrap',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        hiddenLabel: true,
        size: 'small',
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: '0.625rem 0.5rem',
          fontSize: '0.875rem',
          fontWeight: 500,
          borderRadius: '0.25rem',
          height: '2.5rem',
          transition: '300ms',
          '&:active': {
            backgroundColor: alpha(
              theme.palette.common.black,
              theme.palette.action.activatedOpacity
            ),
          },
        }),
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: ({ theme }) => ({
          fontSize: theme.typography.body2.fontSize,
          lineHeight: theme.typography.body2.lineHeight,
          fontWeight: theme.typography.fontWeightMedium,
          color: theme.palette.text.primary,
        }),
      },
    },
    MuiList: {
      styleOverrides: {
        padding: {
          padding: '0.25rem',
        },
      },
    },
  },
});
