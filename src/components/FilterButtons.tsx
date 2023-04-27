import { Box, Container, FormControlLabel, Radio, RadioGroup } from '@mui/material';

import type { FilterButtonsProps } from '../types';

const FilterButtons = ({ selectedValue, onFilterChange }: FilterButtonsProps) => {
	return (
		<Container>
			<Box display="flex" justifyContent="center" alignItems="center" margin={2}>
				<RadioGroup value={selectedValue} row onChange={(e) => onFilterChange(e.target.value as 'all' | 'incomplete' | 'complete')}>
					<FormControlLabel value="all" control={<Radio />} label="すべて" />
					<FormControlLabel value="incomplete" control={<Radio />} label="未完了" />
					<FormControlLabel value="complete" control={<Radio />} label="完了済" />
				</RadioGroup>
			</Box>
		</Container>
	);
};

export default FilterButtons;
