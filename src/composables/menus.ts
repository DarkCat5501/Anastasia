export enum MItemType {
	Button,
	Text,
	F32,
	Vec2,
	Vec3,
	Select,
}

export interface MenuItem {
	label: string;
	type: MItemType;
}

export class Menu {
	title: string;
	items: MenuItem[];

	constructor(title: string, items: MenuItem[]) {
		this.items = items;
		this.title = title;
	}
}

export enum Menus {
	Properties,
}

export const MenuOptiosn: Record<Menus, Menu> = {
	[Menus.Properties]: new Menu("properties", []),
};
