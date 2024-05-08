export interface ButtonConfig {
    label: string;
    key: string;
    class: string;
    icon?: string;
    action?: string;
    type: string;
    isShow?: boolean;
    isDisabled?: boolean;
    event?: any;

}
export interface HMZTableColumn {
    label: string;
    key: string;
    type: EColumType;
    showAction?: boolean;
    isSortable?: boolean;
    buttons?: ButtonConfig[];
}
export enum EColumType {
    text = 'text',
    number = 'number',
    date = 'date',
    image = 'image',
    boolean = 'boolean',
    action = 'action',
    select = 'select',
    button = 'button',
    link = 'link',
    icon = 'icon',
    custom = 'custom',
    currency = 'currency',
}
