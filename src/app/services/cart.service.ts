import { Injectable } from '@angular/core';
import { ProdottiFull } from '../models/prodottiFull.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Map<{product : ProdottiFull, tagliaScelta : number}, number>;

  constructor() { 
    this.cart = new Map();
    if(localStorage.getItem('cart')){
      this.cart = new Map(JSON.parse(<string>localStorage.getItem('cart')));
    }
  }

  public addProduct(product:ProdottiFull,quantity : number,taglia : number): boolean{
    if(!this.cart || !product){
      return false;
    }
    if(this.cart.has({product,tagliaScelta:taglia})){
      const currentQuantity : number = <number>this.cart.get({product,tagliaScelta:taglia});
      this.cart.set({product,tagliaScelta:taglia},currentQuantity+quantity);
    }else{
      this.cart.set({product,tagliaScelta:taglia},quantity);
    }
    if(localStorage.getItem('cart')){
      localStorage.removeItem('cart');
    }
    localStorage.setItem('cart',JSON.stringify(this.cart));
    return true;
  }

  public removeProduct(product:ProdottiFull): boolean{
    if(!this.cart || !product){
      return false;
    }
    const taglia : number | false = this.getTaglia(product);
    if(taglia === false){
      return false;
    }
    if(this.cart.has({product,tagliaScelta:taglia})){
      this.cart.delete({product,tagliaScelta:taglia});
    }
    if(localStorage.getItem('cart')){
      localStorage.removeItem('cart');
    }
    localStorage.setItem('cart',JSON.stringify(this.cart));
    return true;
  }

  public updateProductQuantity(product:ProdottiFull,quantity : number): boolean{
    if(!this.cart || !product){
      return false;
    }
    const taglia : number | false = this.getTaglia(product);
    if(taglia === false){
      return false;
    }
    if(this.cart.has({product,tagliaScelta:taglia})){
      this.cart.set({product,tagliaScelta:taglia},quantity);
    }
    if(localStorage.getItem('cart')){
      localStorage.removeItem('cart');
    }
    localStorage.setItem('cart',JSON.stringify(this.cart));
    return true;
  }

  public isPresent(product : ProdottiFull) : boolean {
    if(!product){
      return false;
    }
    for(let key of this.cart.keys()){
      if(key.product === product){
        return true;
      }
    }
    return false;
  }

  private getTaglia(product : ProdottiFull) : number | false {
    if(!product){
      return false;
    }
    for(let key of this.cart.keys()){
      if(key.product === product){
        return key.tagliaScelta;
      }
    }
    return false;
  }
}
