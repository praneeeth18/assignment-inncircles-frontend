export type Permission = 'READ' | 'WRITE' | 'ADMIN';

export interface Role {
    _id: string;
    name: string;
    permissions: Permission[];
}
