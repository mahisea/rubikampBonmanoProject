import { useState } from 'react';
import Text from '../../../components/Text';
import { cities } from '../../../constants/address';
import Address from './Address';
import styles from './Header.module.css';
import Search from './Search';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const Header = () => {
    const [city, setCity] = useState(cities[0].id);

    return (
        <header>
            <h1 className={styles.header}>Hello</h1>
            <FormControl sx={{ width: '300px' }}>
                <InputLabel id="demo-simple-select-label">شهر خود را انتخاب کنید:</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={city}
                    label="شهر"
                    onChange={e => setCity(e.target.value)}
                >
                    {cities.map(city => {
                        return <MenuItem key={city.id} value={city.id}>{city.label}</MenuItem>
                    })}
                </Select>
            </FormControl>

            <Search placeholder={<div>جستجو در <Text color='red'>دیجی کالا</Text></div>} />
            <Address city={city} />
        </header>
    )
}

export default Header;