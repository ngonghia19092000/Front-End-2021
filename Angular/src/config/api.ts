import {environment} from 'src/environments/environment'
export const baseUrl = environment.production? 'http://api.shoppingcart.com':'https://60e2b3879103bd0017b474b0.mockapi.io/api/shopping/'
export const productUrl=baseUrl+'/products'
export const cartUrl= baseUrl+'/cart'

