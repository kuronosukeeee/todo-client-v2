import { Box } from '@mui/material';

import type { ErrorMessageProps } from '../types';

const ErrorMessage = ({ message, handleClose }: ErrorMessageProps) => {
	return (
		<Box
			sx={{
				position: 'fixed',
				zIndex: 9999,
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				backgroundColor: 'rgba(0, 0, 0, 0.6)',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
			onClick={handleClose}
		>
			<Box
				sx={{
					p: 2,
					backgroundColor: 'white',
					maxWidth: '400px',
					borderRadius: '8px',
					boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
				}}
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<h2>{`${message}`}</h2>
			</Box>
		</Box>
	);
};

export default ErrorMessage;
