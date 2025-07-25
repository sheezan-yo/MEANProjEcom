export interface categoryType {
    _id?: string,
    name: string
}

export interface brandType {
    _id?: string,
    name: string
}

export interface productType {
    _id?: string,
    name: string,
    shortDescription: string,
    description: string,
    price: Number,
    discount: Number,
    images: string[],
    categoryId: string,
    isFeatured: boolean,
    isNew: boolean
}

export interface cartItemType {
    product: productType,
    quantity: number
}

export interface orderType {
    _id?: string,
    items: cartItemType[],
    paymentType: string,
    address: any,
    date: Date,
    status?: string
}