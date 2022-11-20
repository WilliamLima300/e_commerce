import React from 'react';
import { AppBar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core'; // importanto elementos da barra de navegação
import { Toolbar } from '@material-ui/core'; 
import { ShoppingCart } from '@material-ui/icons'; // adicionar icone de carrinho de compras do material-ui
import { Link, useLocation } from 'react-router-dom'; // adicionar link para carrinho de compras
import logo from '../../assets/logo.png';// adicionar logo 
import useStyles from './styles';

const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    const location = useLocation();

    
  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
            <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit" >
                <img src={logo} alt="Will E-commerce " height="25px" className={classes.image} />
                Will E-commerce 
            </Typography>

            <div className={classes.grow} />

            {location.pathname === '/' && (  

            <div className={ classes.button}>
                <IconButton  component={Link} to="/cart" aria-label="Mostrar itens do carrinho" color="inherit">
                    <Badge overlap="rectangular" badgeContent={totalItems} color="secondary">
                        <ShoppingCart />
                    </Badge>
                </IconButton>
            </div> )}

        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
