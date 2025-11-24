import { Button } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
    const { t } = useTranslation()

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {t('title')}
                    </Typography>

                    <Button color="inherit" component={NavLink} to="/tasks">
                        {t('navbarListLabel')}
                    </Button>

                    <Button color="inherit" component={NavLink} to="/map">
                        {t('navbarMapLabel')}
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
