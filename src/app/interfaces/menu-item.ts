export interface MenuItem {
    id: number;
    idMenuPai: number | null;
    label: string;
    icon: string;
    route?: string;
    children?: MenuItem[];
}
