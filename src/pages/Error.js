import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ErrorCss.css';

const Error = () => {
    useEffect(() => {
        const handleMouseMove = (e) => {
            const container = document.getElementById('container');
            if (container) {
                const x = -e.clientX / 5;
                const y = -e.clientY / 5;
                container.style.backgroundPositionX = `${x}px`;
                container.style.backgroundPositionY = `${y}px`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className='body'>

            <div id='container' className='container'>
                <div className='content'>

                    <h1 className='number'>
                        404
                    </h1>
                    <h4 className='font'>
                        Opps! Page not found
                    </h4>
                    <p className='font_two'>
                        The page you are attempting to access does not exist. It appears that it was not added by an admin
                    </p>
                    <Link
                        className='button transition-all duration-200 hover:scale-95 hover:shadow-none'
                        to='/'
                    >
                        Home
                    </Link>

                </div>
            </div>

        </div>
    );
};

export default Error;