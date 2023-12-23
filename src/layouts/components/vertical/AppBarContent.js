// ** MUI Imports
import Box from '@mui/material/Box'  // Importing Box component from Material-UI for layout
import TextField from '@mui/material/TextField'  // Importing TextField component from Material-UI for input field
import IconButton from '@mui/material/IconButton'  // Importing IconButton component from Material-UI for icon buttons
import useMediaQuery from '@mui/material/useMediaQuery'  // Importing useMediaQuery hook from Material-UI for responsive design
import InputAdornment from '@mui/material/InputAdornment'  // Importing InputAdornment component from Material-UI for input adornments

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'  // Importing Menu icon from Material Design Icons
import Magnify from 'mdi-material-ui/Magnify'  // Importing Magnify icon from Material Design Icons

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'  // Importing ModeToggler component for theme mode toggling
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'  // Importing UserDropdown component for user-related actions
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'  // Importing NotificationDropdown component for notifications

// Component for the content of the AppBar
const AppBarContent = props => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props  // Destructuring props for easier access

  // ** Hook
  const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'))  // Using the useMediaQuery hook to handle responsiveness

  return (
    // Main container for the content of the AppBar
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* Left-side actions container */}
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {/* Hamburger menu button */}
        {hidden ? (
          <IconButton
            color='inherit'
            onClick={toggleNavVisibility}
            sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
          >
            <Menu />
          </IconButton>
        ) : null}
        {/* Search input field */}
        <TextField
          size='small'
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Magnify fontSize='small' />
              </InputAdornment>
            )
          }}
        />
      </Box>
      {/* Right-side actions container */}
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        {/* External link to GitHub */}
        {hiddenSm ? null : (
          <Box
            component='a'
            target='_blank'
            rel='noreferrer'
            sx={{ mr: 4, display: 'flex' }}
            href='https://github.com/themeselection/materio-mui-react-nextjs-admin-template-free'
          >
            {/* The content for the external link can be added here */}
          </Box>
        )}
        {/* Theme mode toggler */}
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        {/* Notification dropdown component */}
        <NotificationDropdown />
        {/* User dropdown component */}
        <UserDropdown />
      </Box>
    </Box>
  )
}

export default AppBarContent
