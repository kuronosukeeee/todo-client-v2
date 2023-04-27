import { AppBar, Box, Toolbar } from '@mui/material';

const Header = () => {
	return (
		<Box>
			<AppBar position="static">
				<Toolbar>
					<h1>新入社員課題</h1>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
