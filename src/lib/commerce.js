import Commerce from '@chec/commerce.js'; //adiciona a API para o back end do ecommerce

export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true);