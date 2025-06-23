/**
 * Interface for Navigation datas to display in overley menu
 */
export interface NavigationItem {
    name: string;
    icon: string;
    emoji: string;
    route: string;
    action: string;
    permissionCode: string;
}

export interface NavigationReponse {
    [key: string]: {
        [action: string]: NavigationItem;
    };
}

