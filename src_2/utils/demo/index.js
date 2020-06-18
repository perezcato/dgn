/**
 ** Name: 
 ** Author: 
 ** CreateAt: 
 ** Description: 
**/
/* COMMON */
import { Config } from "~/config";

export const DemoApi = [
  {
    id: 1,
    title: "Food",
    images: Config.img_food,
    hostUrl: "http://food.zapes.zinisoft.net",
    hostSocket: "ws://spa.zstore.zinisoft.net",
  },
  {
    id: 2,
    title: "Travel",
    images: Config.img_travel,
    hostUrl: "http://hair.zstore.zinisoft.net",
    hostSocket: "ws://hair.zstore.zinisoft.net",
  },
  // {
  //   id: 3,
  //   title: "Nail salon",
  //   images: Config.img_broken,
  //   hostUrl: "http://nail.zstore.zinisoft.net",
  //   hostSocket: "ws://nail.zstore.zinisoft.net",
  // },
  // {
  //   id: 4,
  //   title: "Beauty salon",
  //   images: Config.img_broken,
  //   hostUrl: "http://beauty.zstore.zinisoft.net",
  //   hostSocket: "ws://beauty.zstore.zinisoft.net",
  // },
]