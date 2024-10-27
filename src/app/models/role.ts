export type Permission = 'READ' | 'WRITE' | 'DELETE';

export interface Role {
    _id: string;
    name: string;
    permissions: Permission[];
}
