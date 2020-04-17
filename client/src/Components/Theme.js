import React, { useEffect } from 'react';
import {useSpring, animated} from 'react-spring';
import { calcPositionFooter } from '../Helpers/FooterHelpers';

const Theme = ({theme}) => {
    const props = useSpring({opacity: 1, from: {opacity: 0}});

    useEffect(() => {
        calcPositionFooter();
	});

    return (
        <animated.div className="container pt-5 transition-class" style={props}>
            <div className="col-11 offset-1 order-2">
                <h2>Tema {theme}</h2>
                <p className="pt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pharetra risus tortor, quis lacinia sem accumsan vel. Sed posuere dolor augue, eget vestibulum eros pharetra nec. Pellentesque malesuada ipsum non arcu rutrum efficitur. Proin in est a nunc blandit auctor vitae ac nisl. Integer nibh tortor, pharetra et iaculis vel, fermentum quis magna. Maecenas porttitor dignissim metus eget egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse potenti. Donec vehicula est sem, id placerat nulla euismod a. Pellentesque porta lorem justo, vel porta felis dictum id. Ut sed lacinia sapien, vitae tempor sem. Nullam vel ultrices lorem.

    Quisque maximus nisi eros, nec posuere neque aliquet a. Vestibulum quis iaculis odio. Donec gravida ante eget diam auctor egestas quis quis eros. Praesent justo orci, vulputate in interdum ultricies, imperdiet sed felis. Vivamus vestibulum euismod bibendum. Nulla fringilla efficitur justo in porta. Quisque diam leo, consectetur sit amet auctor nec, congue consequat magna. Phasellus vel nulla ac neque maximus venenatis. Proin ac orci dolor. Donec vehicula diam vitae turpis posuere, quis cursus elit blandit. Integer convallis eleifend nibh, sit amet dictum odio finibus in. Donec eleifend urna eget commodo ullamcorper. In pulvinar ac velit non accumsan.

    Cras sodales ligula eget commodo facilisis. Proin gravida dui dapibus, pharetra massa in, rutrum augue. Vestibulum quis suscipit nulla. Aliquam porta pellentesque metus. Quisque vel dolor quis quam lacinia dignissim a non odio. Sed vestibulum egestas orci, ullamcorper hendrerit metus. Proin tincidunt dui a metus luctus, in lacinia purus suscipit. In pulvinar est ut nibh sagittis, ut posuere sem ornare. Donec id feugiat arcu. Sed nulla elit, ornare vel luctus eu, venenatis ac tortor. Fusce varius vulputate magna eget molestie.

    Sed pretium dolor ut tellus aliquam, quis feugiat felis faucibus. In eget magna placerat, interdum lectus sit amet, fermentum dolor. Ut id ipsum eu justo mollis vestibulum. Nunc commodo dapibus odio, id luctus orci vestibulum et. Morbi fermentum, ex id tincidunt congue, erat magna rhoncus risus, in placerat mi ipsum nec velit. In hac habitasse platea dictumst. Nunc rhoncus nulla placerat tellus commodo, facilisis hendrerit nibh malesuada. Fusce in justo augue. Praesent dictum turpis nulla, non mollis ipsum congue nec. Sed ultrices accumsan elit eget iaculis.

    Etiam et felis ultrices, facilisis dolor sit amet, suscipit risus. Vivamus ut fringilla velit, et pulvinar mi. Duis orci purus, vulputate ut mauris vel, dictum tempor sem. Sed non dolor ligula. Vestibulum ut fermentum orci. Nullam feugiat turpis a scelerisque mollis. Nunc dictum hendrerit posuere. Donec sit amet leo lacinia neque tempus sagittis. Vivamus sit amet interdum sapien.
                </p>
            </div>
        </animated.div>
    );
}
 
export default Theme;