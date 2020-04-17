export const closeSlideMenu = (e) => {
    if(e) e.preventDefault();
    let menu = document.getElementById('idMenu');
    menu.style.width = `0`;
    menu.style.paddingLeft = `0`;
    menu.style.paddingRight = `0`;
}

export const openSlideMenu = (e) => {
    if(e) e.preventDefault();
    let menu = document.getElementById('idMenu');
    let submenu = document.getElementById('MenuList');
    menu.style.width = `${submenu.clientWidth+30}px`;
    menu.style.paddingLeft = `10px`;
    menu.style.paddingRight = `10px`;
    menu.style.paddingBottom = `50px`;
}