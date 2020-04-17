export const calcPositionFooter = () => {
    let height = (document.body.clientHeight);
    let heightWindow = window.innerHeight;
    let footer = document.querySelector('footer');
    if(heightWindow > height)
        footer.classList.add('sticky-footer');
    else
        footer.classList.remove('sticky-footer');
}