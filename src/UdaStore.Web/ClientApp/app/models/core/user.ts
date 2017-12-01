import { Serializable } from "../catalog/product-option";

export class User {
    id: number;
    fullName: string;
    vendorId: number;
    phoneNumber: string;
    email: string;
    password: string;
    roleIds: any[] = [];
}

export class UserProfile extends Serializable {
    id: number;
    fullname: string;
    email: string;
    token: string;
    roles: string[] = [];
}