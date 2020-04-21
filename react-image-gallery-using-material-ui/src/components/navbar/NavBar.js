import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';


const NavBar = () => (
  <AppBar>
    <Grid container justify = "center" style={{ minHeight: '9vh', background: '#008080' }}>
      <h2>React Image Gallery Using Material-UI</h2>
    </Grid>
  </AppBar>
    
);

export default NavBar;
