

const filter = (list:any[], toFind:string) => {
  return list.filter(product => 
    product.name.toLowerCase().includes(toFind.toLowerCase())
  )
}

const searchHandler = (items: string[], toSeach?:string) => {
  if(toSeach){
    return(filter(items, toSeach))
  }else{
    return(items)
  }
}

export {searchHandler}

