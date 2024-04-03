export class Viewport {
	constructor(element: HTMLElement) {
		this.element = element;
		this.element.onload = () => this.onStart();
	}

	onStart() {

	}

	onUpdate() {

	}

	element: HTMLElement;
}
