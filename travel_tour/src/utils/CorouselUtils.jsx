import React from "react";
import {Carousel} from "react-bootstrap";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.35),
  },
  marginRight: theme.spacing(1),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: '100%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 3),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '80%',
    },
  },
}));


function DialogUtils(Img) {
    return(
      <div className="carousel">
          <Carousel variant="dark" fade={true}>
  <Carousel.Item>
    <img
      className="d-block w-100"
        src={Img}
      alt="First slide"
    />
    <Carousel.Caption>
      <div className="animete">
          <div className="load">
            <h1 className="text-white opacity-10">The Zanzibar Taxi</h1>
            <h2 className="text-white opacity-10">We guarantee you taxi transfer service across Zanzibar</h2>
               <p>Any Time Any Where</p>

       <div className="input-group"> 
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="search your trip..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
       </div>
       <div className="input-group-append">
          <button className="btn btn-success py-1" role="button">Search</button>
       </div>
           </div>
           </div>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
      </div>
    );
  }
  
  export default DialogUtils;
