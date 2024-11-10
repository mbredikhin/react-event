import {
  AppBar,
  Box,
  Button,
  Link,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '@/assets/images/Logo.svg?react';
import { ChevronRight } from '@mui/icons-material';
import { HeaderMenu } from './HeaderMenu.jsx';
import * as pt from 'prop-types';
import { signOut } from '@/store';
import { useDispatch } from 'react-redux';
import { routes } from '@/utils/constants.js';

export const AppHeader = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  async function logout() {
    dispatch(signOut());
    navigate(routes.login());
  }

  return (
    <AppBar sx={{ borderRadius: 0 }} elevation={2} position="static">
      <Paper sx={{ borderRadius: 0 }} elevation={0}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '84px',
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              flexGrow: 1,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              maxWidth: '1500px',
              height: '64px',
            }}
          >
            <Box sx={{ cursor: 'pointer' }}>
              <Logo onClick={() => navigate(routes.profile())} />
            </Box>

            <Box display="flex" justifyContent="center">
              <Link
                underline="hover"
                color="inherit"
                component="button"
                onClick={() => navigate(routes.catalog())}
              >
                {isAuthenticated ? (
                  <Typography variant="body1">Запросы о помощи</Typography>
                ) : null}
              </Link>
            </Box>

            <Box display="flex" justifyContent="end">
              {isAuthenticated ? (
                <HeaderMenu onLogout={logout} />
              ) : location.pathname === routes.login() ? null : (
                <Button
                  color="inherit"
                  variant="outlined"
                  size="large"
                  endIcon={<ChevronRight />}
                  onClick={() => navigate(routes.login())}
                >
                  Войти
                </Button>
              )}
            </Box>
          </Toolbar>
        </Box>
      </Paper>
    </AppBar>
  );
};

AppHeader.propTypes = {
  isAuthenticated: pt.bool,
};
