import {RenderData, Streamlit} from "streamlit-component-lib"


function onRender(event: Event): void {
    const data = (event as CustomEvent<RenderData>).detail;
    const message = data.args['message'];
    const targetOrigin = data.args['target_origin'];

    const wtop = window.top
    if (wtop) {
        wtop.postMessage(message, targetOrigin)
    }
}

Streamlit.setFrameHeight(0)
Streamlit.setComponentReady()
Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)


