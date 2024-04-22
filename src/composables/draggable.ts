import { Ref } from "vue";

export class DragHandler {
	root: HTMLElement;
	start: { x: number; y: number };
	pos: { x: number; y: number };
	vposition?: Ref<{ x: number; y: number }>;

	constructor(root: HTMLElement, vposition?: Ref<{ x: number; y: number }>) {
		this.root = root;
		this.start = { x: 0, y: 0 };
		this.pos = { x: 0, y: 0 };
		this.vposition = vposition;
	}
	setup() {
		this.root.draggable = true; //enable drag and setup handlers
		this.root.ondragstart = (e) => this._handleDragStart(e);
		this.root.ondragend = (e) => this._handleDragEnd(e);
	}
	unbind() { }
	init() {
		const box = this.root.getBoundingClientRect();
		this.start = { x: box.x, y: box.y };
		this.pos = { x: box.x, y: box.y };
	}
	update(position?: Ref<{ x: number; y: number }>) {
		console.log("updated", position);
		//force positions to equal internal state
	}

	_handleDragStart(e: DragEvent) {
		this.start = { x: e.screenX, y: e.screenY };
	}

	_handleDragEnd(e: DragEvent) {
		console.log("dragEnded", this.root);
		this.pos.y += e.screenY - this.start.y;
		this.pos.x += e.screenX - this.start.x;
		this._handleUpdatePos();
	}

	_handleUpdatePos() {
		if (this.vposition) {
			this.vposition.value = { x: this.pos.x, y: this.pos.y };
		} else {
			const styles = this.root.style;
			styles.setProperty("--pos-x", `${Math.round(this.pos.x)}px`);
			styles.setProperty("--pos-y", `${Math.round(this.pos.y)}px`);
		}
	}
}

export function useDraggable(position: Ref<{ x: number; y: number }>) {
	return {
		created: (root: HTMLElement) => {
			(<any>root).__draggable = new DragHandler(root, position);
		},
		beforeMount: (root: HTMLElement) => {
			(<any>root).__draggable?.setup();
		},
		mounted: (root: HTMLElement) => {
			(<any>root).__draggable?.init();
		},
		beforeUpdate: (root: HTMLElement) => { },
		updated: (root: HTMLElement) => {
			(<any>root).__draggable?.update(position);
		},
		beforeUnmount: (root: HTMLElement) => { },
		unmounted: (root: HTMLElement) => {
			(<any>root).__draggable?.unbind();
		},
	};
}
