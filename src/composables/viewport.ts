import * as Nilla from "./nilla";

export class Viewport {
	root:
		| (HTMLElement & { iframe?: HTMLIFrameElement; _viewport?: Viewport })
		| null;
	iframe: HTMLIFrameElement;
	document: Document;
	window: Window;
	locked = false;

	constructor(root?: HTMLIFrameElement) {
		if (root) this.attach(root);
	}

	attach(root: HTMLIFrameElement) {
		this.root = root;
		if (!this.root.iframe) {
			//create the iframe with the correct properties
			const iframe = document.createElement("iframe");
			iframe.frameBorder = "0";
			iframe.width = "100%";
			iframe.height = "100%";
			iframe.classList.add("an-frame");
			iframe.src = "about:blank";
			iframe.allowFullscreen = true;
			//attach event handlers
			iframe.onload = () => this.onStart();
			this.root.iframe = this.root.appendChild(iframe);
			this.iframe = this.root.iframe;
		}
		this.root._viewport = this;
		this.iframe = this.root.iframe;
	}

	toggleLock() {
		console.log("lcok");
		this.locked = !this.locked;
		//TODO: handle locking view
	}

	onStart() {
		if (!this.isValid) return;

		//inicialize document info
		this.document = this.iframe.contentDocument!;
		this.window = this.iframe.contentWindow!;

		//setup drawing
		const { body, head } = this.document;
		Nilla.append(
			head,
			'<meta charset="UTF-8" />' +
			'<link rel="icon" type="image/svg+xml" href="/vite.svg"/>' +
			'<meta name="viewport" content="width=device-width, initial-scale=1.0"/>' +
			//google material icons
			'<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/>' +
			//default stylesheet
			'<link rel="stylesheet" href="./default.css"/>' +
			"<title>Initial</title>",
		);
		Nilla.append(body, "<h1>Page is not available yet</h1>");
	}

	onUpdate() { }

	get isValid() {
		return this.root !== null && this.iframe !== null;
	}
}

export const MainViewport: Viewport = new Viewport();
