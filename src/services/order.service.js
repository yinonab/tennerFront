import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service'
import { utilService } from './util.service'

const STORAGE_KEY = 'orderDB'

export const orderService = {
  add,
  query,
  remove,
  save,
  getDemoOrder
}

const gigImgs = ['https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/292332178/original/18841f3470f65b26636437baa1fd560438fb1a51.jpeg', 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs3/292332178/original/ed187afc7d0fee831dcc1aed3857375ae78756cf.jpeg', 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs2/292332178/original/748f0d7770acaa93f8e7734a78252dd0359ce24b.jpeg', 'https://fiverr-res.cloudinary.com/t_gig_card_delivery_image_1x,q_auto,f_auto/attachments/delivery/asset/3046f6f5c099faab8a772c4bf3d28310-1696391924/MOCK.jpg', 'https://fiverr-res.cloudinary.com/t_gig_card_delivery_image_1x,q_auto,f_auto/attachments/delivery/asset/04195b1a525cb5e3122149b24590fe50-1696390373/1moc.jpg']
// const gigImgs=['https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/327590710/original/f64c53e2a06cc996368097c22a4b37cc2bd64c3b.jpg']

function getImgs() {
  return gigImgs
}

async function query(filterBy = {}) {
  let orders = await storageService.query(STORAGE_KEY);
  // if (filterBy.gigId) {
  //   return orders.filter((order) => order.gigId === filterBy.gigId);
  // }
  if (filterBy.buyerId) {
  orders = orders.filter((order) => order.buyer._id === filterBy.buyerId);
  }


  // Filter orders by gigId if provided

  return orders;
}

async function remove(orderId) {
  // await httpService.delete(`order/${orderId}`)
  await storageService.remove(STORAGE_KEY, orderId)
}
function formatDateForTimeAgo(date) {
  return date.toISOString();
}
function getDemoOrder(gig) {
  console.log('gig:', gig)
  return {
    imgs: getImgs(),
    buyer: userService.getLoggedinUser(),
    title: gig.title,
    price: gig.price,
    // rate: parseFloat((utilService.getRandomIntInclusive(20, 50) * 0.1).toPrecision(2)),
    createdAt: formatDateForTimeAgo(new Date()),
    status: 'pending',
    seller: gig.owner.userName,
    gigId: gig._id
    // inStock: utilService.randomTrueFalse(),
    // icon: utilService.makeImage()
  }
}
async function save(order) {
  var savedOrder
  if (order._id) {
    savedOrder = await storageService.put(STORAGE_KEY, order)
  } else {
    // Later, owner is set by the backend
    savedOrder = await storageService.post(STORAGE_KEY, order)
  }
  return savedOrder
}

async function add({ sellerName, gigId, price, title }) {
  // const addedOrder = await httpService.post(`order`, {txt, aboutUserId})

  // const aboutUser = await userService.getById(aboutUserId)

  const orderToAdd = {
    buyer: userService.getLoggedinUser(),
    sellerName: sellerName,
    gigId: gigId,
    createdAt: formatDateForTimeAgo(new Date()),
    price: price,
    title: title,
    status: 'pending'

    // aboutUser: {
    //   _id: aboutUser._id,
    //   fullname: aboutUser.fullname,
    //   imgUrl: aboutUser.imgUrl
    // }
  }

  // orderToAdd.byUser.score += 10
  // await userService.update(orderToAdd.txt)
  const addedOrder = await storageService.post(STORAGE_KEY, orderToAdd)
  return addedOrder
}