import { inject, provide } from "vue";

//class used to attach actions directly to elements
export abstract class BaseComponent {

	// called before bound element's attributes
	// or event listeners are applied
	created(el, binding, vnode, prevVnode) { }

	// called right before the element is inserted into the DOM.
	beforeMount(el, binding, vnode, prevVnode) { }

	// called when the bound element's parent component
	// and all its children are mounted.
	mounted(el, binding, vnode, prevVnode) { }

	// called before the parent component is updated
	beforeUpdate(el, binding, vnode, prevVnode) { }

	// called after the parent component and
	// all of its children have updated
	updated(el, binding, vnode, prevVnode) { }

	// called before the parent component is unmounted
	beforeUnmount(el, binding, vnode, prevVnode) { }

	// called when the parent component is unmounted
	unmounted(el, binding, vnode, prevVnode) { }
}

export function provideProp(prop: string, value: any, target?: string) {
	provide.call(this, `$${target ? target + ':' : ''}${prop}`, value);
}

export function provideVar(prop: string, value: any, target?: string) {
	provide.call(this, `#${target ? target + ':' : ''}${prop}`, value);
}

export function injectProp(prop: string, defaultValue?: any, target?: string): any {
	return inject.call(this, `$${target ? target + ':' : ''}${prop}`) ?? defaultValue;
}

export function injectVar(prop: string, defaultValue?: any, target?: string): any {
	return inject.call(this, `#${target ? target + ':' : ''}${prop}`) ?? defaultValue;
}


export function provideProps(props: Record<string, any>, target?: string) {
	for (const [prop, value] of Object.entries(props)) {
		provideProp.call(this, prop, value, target);
	}
}


export function injectProps(props: Record<string, any>, target?: string): Record<string, any> {
	const out = {};
	for (const [prop, defaultValue] of Object.entries(props)) {
		out[prop] = injectProp.call(this, prop, defaultValue, target);
	}

	return out;
}
