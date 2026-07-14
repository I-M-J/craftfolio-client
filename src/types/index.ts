export interface Item {
    _id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    category: string;
    price: number;
    imageUrl: string;
    sellerEmail: string;
    sellerName: string;
    avgRating: number;
    totalReviews: number;
    tags?: string[];
    createdAt: string;
}

export interface Review {
    _id: string;
    itemId: string;
    reviewerEmail: string;
    reviewerName: string;
    reviewerAvatar?: string;
    rating: number;
    comment: string;
    createdAt: string;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    image?: string;
    createdAt: string;
}

export interface StatItem {
    category: string;
    count: number;
    avgPrice: number;
}

export interface ItemsResponse {
    total: number;
    items: Item[];
    page: number;
    totalPages: number;
}

export interface AddItemFormData {
    title: string;
    shortDescription: string;
    fullDescription: string;
    category: string;
    price: number;
    imageUrl?: string;
    sellerName?: string;
    tags?: string;
}
