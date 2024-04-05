export function toElement(
	data: string,
	root = document.createElement("template"),
) {
	root.innerHTML = data;
	if (root instanceof HTMLTemplateElement) return root.content;
	return root;
}

export function append(root, ...nodes: (string | Node)[]) {
	const mappedNodes = nodes
		.map((node) => {
			if (typeof node === "string") return toElement(node);
			return node;
		})
		.flatMap((nodes) => {
			if (nodes instanceof DocumentFragment)
				//Applied for fragments
				return Array.from((<DocumentFragment>nodes).childNodes);

			return nodes;
		});

	root.append(...mappedNodes);
}
