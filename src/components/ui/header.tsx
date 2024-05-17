import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountMenu from './menu';
const drawerWidth = 240;
interface ModalProps {
    handleDrawerToggle: ()=>void
}
const Header = ({handleDrawerToggle}:ModalProps) => {
  return (
    <>
      {/* <CssBaseline /> */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
         <div className='flex justify-between w-full items-center'>
         <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
          <AccountMenu/>
         </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
