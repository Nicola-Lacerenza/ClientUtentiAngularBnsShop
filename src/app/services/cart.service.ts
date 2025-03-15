import { Injectable } from '@angular/core';
import { ProdottiFull } from '../models/prodottiFull.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Map<number,{product : ProdottiFull, quantity : number, tagliaScelta : string}[]>;

  constructor() { 
    this.cart = new Map();
    if(localStorage.getItem('cart')){
      const actualCart = JSON.parse(<string>localStorage.getItem('cart'));
      for(let item of actualCart){
        if(!this.cart.has(item.product.id)){
          this.cart.set(item.product.id,[]);
        }
        const actualItem = this.cart.get(item.product.id);
        if(actualItem){
          const index = actualItem.findIndex((element) => element.tagliaScelta === item.tagliaScelta);
          if(index !== -1){
            actualItem[index].quantity = item.quantity;
          }else{
            actualItem.push({product:item.product,quantity:item.quantity,tagliaScelta:item.tagliaScelta});
          }
        }
      }
    }
  }

  public addProduct(product:ProdottiFull ,taglia : string): boolean {
    if(!this.cart || !product){
      return false;
    }
    if(this.cart.has(product.id)){
      const actualItem = this.cart.get(product.id);
      if(actualItem){
        const index = actualItem.findIndex((element) => element.tagliaScelta === taglia);
        if(index !== -1){
          actualItem[index].quantity++;
        }else{
          actualItem.push({product,quantity:1,tagliaScelta:taglia});
        }
      }
    }else{
      this.cart.set(product.id,[{product,quantity:1,tagliaScelta:taglia}]);
    }
    const arrayToSave = [];
    for(let key of this.cart.keys()){
      const item = this.cart.get(key);
      if(item){
        for(let element of item){
          arrayToSave.push({product:element.product,tagliaScelta:element.tagliaScelta,quantity:element.quantity});
        }
      }
    }
    console.log(this.cart);
    if(localStorage.getItem('cart')){
      localStorage.removeItem('cart');
    }
    localStorage.setItem('cart',JSON.stringify(arrayToSave));
    return true;
  }

  public removeProduct(id : number, taglia1 : string): boolean{
    if(!this.cart || !id || !taglia1){
      return false;
    }
    if(this.cart.has(id)){
      const actualItem = this.cart.get(id);
      if(actualItem){
        const index = actualItem.findIndex((element) => element.tagliaScelta === taglia1);
        if(index !== -1){
          actualItem.splice(index,1);
        }
      }
      if(actualItem && actualItem.length === 0){
        this.cart.delete(id);
      }
    }
    const arrayToSave = [];
    for(let key of this.cart.keys()){
      const item = this.cart.get(key);
      if(item){
        for(let element of item){
          arrayToSave.push({product:element.product,tagliaScelta:element.tagliaScelta,quantity:element.quantity});
        }
      }
    }
    if(localStorage.getItem('cart')){
      localStorage.removeItem('cart');
    }
    localStorage.setItem('cart',JSON.stringify(arrayToSave));
    return true;
  }

  public updateProductQuantity(id : number,  taglia1: string,quantity : number): boolean{
    if(!this.cart || !id || !taglia1 || !quantity){
      return false;
    }
    if(this.cart.has(id)){
      const actualItem = this.cart.get(id);
      if(actualItem){
        const index = actualItem.findIndex((element) => element.tagliaScelta === taglia1);
        if(index !== -1){
          actualItem[index].quantity = quantity;
        }
      }
    }
    const arrayToSave = [];
    for(let key of this.cart.keys()){
      const item = this.cart.get(key);
      if(item){
        for(let element of item){
          arrayToSave.push({product:element.product,tagliaScelta:element.tagliaScelta,quantity:element.quantity});
        }
      }
    }
    if(localStorage.getItem('cart')){
      localStorage.removeItem('cart');
    }
    localStorage.setItem('cart',JSON.stringify(arrayToSave));
    return true;
  }

  public updateProductSize(product:ProdottiFull ,taglia : string,quantity : number): boolean{
    if(!this.cart || !product || !taglia){
      return false;
    }
    if(this.cart.has(product.id)){
      const actualItem = this.cart.get(product.id);
      if(actualItem){
        const index = actualItem.findIndex((element) => element.tagliaScelta === taglia);
        if(index !== -1){
          actualItem[index].tagliaScelta = taglia;
        }else{
          actualItem.push({product,quantity,tagliaScelta:taglia});

        }
          
      }
    }
    const arrayToSave = [];
    for(let key of this.cart.keys()){
      const item = this.cart.get(key);
      if(item){
        for(let element of item){
          arrayToSave.push({product:element.product,tagliaScelta:element.tagliaScelta,quantity:element.quantity});
        }
      }
    }
    if(localStorage.getItem('cart')){
      localStorage.removeItem('cart');
    }
    localStorage.setItem('cart',JSON.stringify(arrayToSave));
    return true;
  }

  public getListProducts() : {product : ProdottiFull, quantity : number, tagliaScelta : string}[]{
    const output : {product : ProdottiFull, quantity : number, tagliaScelta : string}[]= [];
    for(let key of this.cart.keys()){
      const item = this.cart.get(key);
      if(item){
        for(let element of item){
          output.push(element);
        }
      }
    }
    return output;
  }
}
