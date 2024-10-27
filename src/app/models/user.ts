export interface User {
    id?: string;
    name: string;
    age: number;
    email: string;
    password: string;
    contact?: string;
    roles?: string[];
    bio?: string;
    refreshToken?: string;
}
