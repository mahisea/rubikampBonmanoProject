import TextField from '@mui/material/TextField';

const Search = (props) => {
    return (
        <div>
            <img />
            <TextField label={props.placeholder} variant="outlined" />
            <img />
        </div>
    )
}

export default Search;