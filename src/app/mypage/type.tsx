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

export interface orderDetailProductCardProps extends cartProductCardProps, orderRowProps {}
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

export interface orderRowProps {
    orderNum: number;
    order_id: string;
    sku: number;
    size: string;
    quantity: number;
    deliveryNumber: string;
    deliveryCompany: string;
}
