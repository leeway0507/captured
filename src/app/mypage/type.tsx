import { productCardProps } from "@/app/type";
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

export interface targetDetailProps {
    orderId: string;
    deliveryNumber: string;
    deliveryCompany: string;
    orderNumber: string;
    orderDate: string;
    orderStatus: string;
    orderPrice: string;
    orderAddress: addressFormProps;
    orderItemList: productCardProps[];
}

export interface orderRowProps {
    orderId: string;
    orderNumber: string;
    orderDate: string;
    orderStatus: string;
    orderPrice: string;
    deliveryNumber: string;
    deliveryCompany: string;
}
