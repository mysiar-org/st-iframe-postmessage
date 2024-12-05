import {RenderData, Streamlit} from "streamlit-component-lib"


function onRender(event: Event): void {
    const data = (event as CustomEvent<RenderData>).detail;
    const message = data.args['message'];
    const targetOrigin = data.args['target_origin'];
    const consoleLog = data.args['console_log'];

    const wtop = window.top
    if (wtop) {
        wtop.postMessage(message, targetOrigin)
    }
    if (consoleLog) {
        console.log(`[${(new Date().toISOString())}] message : ${safeStringify(message)}, targetOrigin : ${targetOrigin}`)
    }
}

Streamlit.setFrameHeight(0)
Streamlit.setComponentReady()
Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)


function safeStringify(variable: any): string {
    if (variable === null) {
        return 'null';
    } else if (variable === undefined) {
        return 'undefined';
    } else if (typeof variable === 'string') {
        return variable;
    } else if (typeof variable === 'number' || typeof variable === 'boolean') {
        return variable.toString();
    } else if (Array.isArray(variable)) {
        return JSON.stringify(variable);
    } else if (typeof variable === 'object') {
        try {
            return JSON.stringify(variable);
        } catch (error) {
            if (error instanceof Error) {
                return `Unable to stringify object: ${error.message}`;
            } else {
                return `Unable to stringify object: ${String(error)}`;
            }
        }
    } else {
        return 'Unknown type';
    }
}