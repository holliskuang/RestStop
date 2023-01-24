export default function NavBar() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.auth.mode);
  const history = useHistory();
  const location = useLocation();

  const handleModeChange = () => {
    dispatch(setMode());
  };

  const handleLogout = () => {
    dispatch(setLogout());
    history.push('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className="title">
          REST Client
        </Typography>
        <div className="grow" />
        <div className="nav-buttons">
          <Button
            color="inherit"
            variant="outlined"
            onClick={handleModeChange}
            startIcon={<Brightness4Icon />}
          >
            {mode === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
          {location.pathname !== '/login' && (
            <Button
              color="inherit"
              variant="outlined"
              onClick={handleLogout}
              startIcon={<ExitToAppIcon />}
            >
              Logout
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}