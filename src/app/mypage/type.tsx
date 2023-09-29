import { cartProductCardProps } from "@/app/type";

export interface addressFormProps {
    addressId: string;
    krName: string;
    enName: string;
    customId: string;
    phone: string;
    krAddress: string;
    enAddress: string;
    krAddressRest: string;
    enAddressRest: string;
}

export interface orderDetailProductCardProps extends cartProductCardProps {
    deliveryNumber: string;
    deliveryCompany: string;
}
export interface OrderDetailProps extends orderHistoryProps {
    orderAddress: addressFormProps;
    orderItemList: orderDetailProductCardProps[];
}

export interface orderHistoryProps {
    orderId: string;
    orderNumber: string;
    orderDate: string;
    orderStatus: string;
    orderPrice: string;
}
