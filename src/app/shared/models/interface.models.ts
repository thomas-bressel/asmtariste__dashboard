/**
 * Interface for Navigation datas to display in overley menu
 */
export interface InterfaceNavigationItem {
    name: string;
    icon: string;
    emoji: string;
    route: string;
    action: string;
    permissionCode: string;
}

export interface InterfaceNavigationReponse {
    [key: string]: {
        [action: string]: InterfaceNavigationItem;
    };
}


/**
 * Interface for bottom Tag menu
 */
export interface InterfaceTagItem {
    name: string;
    icon: string;
    emoji: string;
    route: string;
    action: string;
    state: boolean;
    permissionCode: string;
}

export interface InterfaceTagResponse {
    [key: string]: {
        [action: string]: InterfaceTagItem;
    };
}

