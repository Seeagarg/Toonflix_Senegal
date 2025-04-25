import { arr } from "./data";

export const changeLang=(key)=>{
    // console.log(`(${key})`,lang)
    key = key?.split(/\r?\n/).join("")
    // console.log('==================',`(${ar}---)`);
    // if(lang == 0){
    //   return key.slice(0,15);
    // }
    // if(lang == 1){
      // console.log("====",lang,key)
     const data = arr.findIndex((item)=>item.key == key);
     console.log(data)
     if(data>=0){
      return arr[data]?.value;
     }
     return key?.slice(0,13);
    // }
  }