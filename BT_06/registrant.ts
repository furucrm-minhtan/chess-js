

window.onload = (e: Event) => {
    const interactElement = (id: string, callback: Function) => {
        if (!id) return;
        let element = document.getElementById(id);
        if (element) callback(element);
    }  
    
    interactElement('select-subjects', (element: HTMLElement) => {
        
    })
}
