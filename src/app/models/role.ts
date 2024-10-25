export type Permission = 'READ' | 'WRITE' | 'ADMIN';

export interface Role {
    id?: string;
    name: string;
    permissions: Permission[];
}
