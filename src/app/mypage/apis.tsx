//api-call - 유저 정보
//status : 제작필요
//type : GET
//url : /api/user/info
//function : get_user_info() => userInfo

export function getUserInfo() {}

//api-call - 유저 주소 정보
//status : 제작필요
//type : GET
//url : /api/user/address-array
//function : get_user_address_array(userId) => addressFormProps[]

export function getUserAddressArray(userId: string) {}

//api-call - 주문 정보
//status : 제작필요
//type : GET
//url : /api/user/order-array
//function : get_user_order_array(userId) => orderRowProps[]

export function getUserOrderArray(userId: string) {}

//api-call - 주문배송상세
//status : 제작필요
//type : GET
//url : /api/mypage/order/order-detail
//function : get_order_detail(order_id) => targetDetailProps

export function getOrderDetail(orderId: string) {}

//api-call - 유저 주소 삭제
//status : 제작필요
//type : POST
//url : /api/user/address/delete
//function : delete_user_address(address_id) => response(201)

export function deleteUserAddress(addressId: string) {}
