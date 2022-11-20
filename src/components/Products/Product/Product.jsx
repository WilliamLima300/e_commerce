import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core'; //importando configurações de aparencia dos produtos do material-ui
import {AddShoppingCart} from '@material-ui/icons'; // adicionando icone de adicionar ao carrinho
import useStyles from './styles'; //importando "estilo" do Material-ui


const Product = ({ product, onAddToCart }) => { //parametro recebe dados dos produtos da API commerce
  const classes = useStyles();  //dando uma variavel constante a função que vai receber o estilo vindo do material-ui
  
  const handleAddToCart = () => onAddToCart(product.id, 1);
 
  return (
    <Card className={classes.root}>

        <CardMedia className={classes.media} image={product.image.url} title={product.name} />
        
        <CardContent>
            <div  className={classes.cardContent}>
                <Typography variant="h5" gutterBottom>
                    {product.name}
                </Typography>
                <Typography variant="h5" gutterBottom>
                    R$ {product.price.formatted}
                </Typography>

            </div>
            <Typography dangerouslySetInnerHTML={{__html: product.description}} variant="body2" color="textSecondary" />
        </CardContent>

        <CardActions disableSpacing className={classes.cardActions} >
            <IconButton aria-label="Adicionar ao Carrinho" onClick={handleAddToCart} >
                <AddShoppingCart />
            </IconButton>
        </CardActions>

    </Card>
  );
}

export default Product
