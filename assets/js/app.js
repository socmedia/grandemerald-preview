$(function () {

    /**
     * Navbar Toggle
     */

    const toggler = $('.btn-toggler');
    const navbarToggleState = (el) => {

        el.toggleClass('active');

        // Transformation of the points attr from polygon element
        const point = {
            first: el.hasClass('active') ? '31.839400 11.000000, 11.839400 33.000000' : '34.160600 12.000000, 5.827310 12.000000',
            second: el.hasClass('active') ? '31.839400 33.000000, 11.839400 11.000000' : '34.160600 22.000000, 10.978800 22.000000',
            third: el.hasClass('active') ? '-1, -1' : '34.160600 32.000000, 17.418200 32.000000',
        }

        // Default opacity
        const opacity = {
            third: el.hasClass('active') ? 0 : 1
        }

        // Anime.js settings
        const settings = {
            first: {
                targets: '.btn-toggler svg .path-1',
                points: {
                    value: point.first
                },
                easing: 'easeOutQuad',
                duration: 200,
            },
            second: {
                targets: '.btn-toggler svg .path-2',
                points: {
                    value: point.second
                },
                easing: 'easeOutQuad',
                duration: 200,
            },
            third: {
                targets: '.btn-toggler svg .path-3',
                points: {
                    value: point.third
                },
                opacity: opacity.third,
                easing: 'easeOutQuad',
                duration: 200,
            }
        }

        anime(settings.first);
        anime(settings.second);
        anime(settings.third);
    };

    /**
     * Preloader animation
     */
    const preloader = async () => {
        await anime.timeline()
            .add({
                targets: '.loader',
            })
            .add({
                targets: '.loader .logo .leaf path',
                opacity: [0, 1],
                translateY: [0, -40],
                delay: anime.stagger(100),
                duration: 400,
                easing: 'easeOutQuad',
            })
            .add({
                targets: '.loader .logo .circle path',
                opacity: [0, 1],
                translateY: [-70, -40],
                translateX: [20, 0],
                delay: anime.stagger(100),
                duration: 400,
                easing: 'easeOutQuad',
            })
            .add({
                targets: '.loader .grand-emerald path',
                opacity: [0, 1],
                translateY: [-20, 0],
                delay: anime.stagger(70),
                duration: 200,
                easing: 'easeOutQuad',
            })
            .add({
                targets: '.loader .residence path',
                opacity: 1,
                translateX: [20, 0],
                delay: anime.stagger(70),
                duration: 200,
                easing: 'easeOutQuad',
            })

    }

    const removePreloader = () => {

        // Wait loader animated, then loader will be disappear
        setTimeout(() => {
            $('.loader').fadeOut();
        }, 4500);


        // After loader disappear, loader element will be remove from document
        // And showing up #app element
        setTimeout(() => {
            $('body').removeClass('unloaded')
            $('.loader').remove();
            $('#app').fadeIn();
        }, 4800);
    }

    /**
     * When document succesfully loaded
     * This script will be running
     */
    $(document).ready(function () {

        // Show preloader
        preloader()
            .then(() => {

                // Remove preloader
                removePreloader()
            })

        // Animate svg button
        toggler.click(function () {
            navbarToggleState($(this))
            $('.menu').toggleClass('show')

            if ($('.menu').hasClass('show')) {
                anime.timeline()
                    .add({
                        targets: '.menu',
                        opacity: [0, 1],
                        translateX: [100, 0],
                        duration: 200,
                        easing: 'easeOutQuad',
                    })
                    .add({
                        targets: '.menu .navbar-nav li',
                        opacity: [0, 1],
                        translateX: [-30, 0],
                        delay: anime.stagger(100),
                        duration: 200,
                        easing: 'easeOutQuad',
                    })
                    .add({
                        targets: '.menu .menu-footer li',
                        opacity: [0, 1],
                        translateY: [-20, 0],
                        delay: anime.stagger(100),
                        duration: 200,
                        easing: 'easeOutQuad',
                    })
            } else {
                $('.menu').attr('style', '')
            }
        });

    })

    $('.title-text button').click(function () {
        $(this).parents('.title').toggleClass('show')
        $(this).find('svg').css('transform', $(this).parents('.title').hasClass('show') ? 'rotate(180deg)' : 'rotate(0deg)')
    })

    // $('#open-sketch').click(function () {
    //     const modal = $(this).data('modal')
    //     $('body').toggleClass('modal-show')
    //     $(`#${modal}`).toggleClass('show').fadeIn()
    // })

    // $('.modal-fullscreen .close').click(function () {
    //     const modalId = $(this).parents('.modal-fullscreen').attr('id')
    //     $(`#${modalId}`).toggleClass('show').fadeOut()
    //     $('body').toggleClass('modal-show')
    // })
})