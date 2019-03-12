'use strict';

setInterval(() => {
  const headFixNav = document.querySelector('.header-fix-nav')
  const nav = document.querySelector('nav.main-nav')
  const navHeight = nav.offsetHeight()
  const body = document.querySelector('body')
  if (!headFixNav || !nav) return
  body.style.paddingTop = `${navHeight}px`
}, 500)

$(function() {
    $('.content__inner').prepend($('<div>', { class : 'content__item--sizer' }));
    $('.content__inner').prepend($('<div>', { class : 'content__item--gutter-sizer' }));

    var $isotope;

    var callIsotope = function() {
        if ($isotope == null) {
            $isotope = $('.content__inner').isotope({
                itemSelector: '.content__item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.content__item--sizer',
                    gutter: '.content__item--gutter-sizer'
                }
            });

            $isotope.imagesLoaded().progress(function() {
                $isotope.isotope('layout');
            }).then(function() {
                $isotope.isotope('layout');
                setTimeout(function() { $isotope.isotope('layout'); }, 500);
            });
        } else {
            $isotope.isotope('layout');
        }

        $('.content').css('height', $('.content_inner').outerHeight());
    };

    $('.content__item').removeClass('content__item--unfolded').addClass('content__item--folded');

    callIsotope();

    $('iframe.iframeWrap').iFrameResize();

    $('.content__item').each(function() {
        var $this = $(this);

        if ($this.find('.when-unfolded').length > 0) {
            var fold, bindUnfold;

            fold = function($this) {
                return function(e) {
                    if ($this.hasClass('content__item--unfolded')) {
                        history.pushState(null, null, '');
                        $this.removeClass('content__item--unfolded content__item--double')
                             .addClass('content__item--folded');

                        setTimeout(function() {
                            bindUnfold($this);
                        }, 100);

                        if (e != null) {
                            callIsotope();
                        }
                    }
                };
            };

            bindUnfold = function($this) {
                $this.css('cursor', 'pointer');

                $this.on('click.unfold', function() {
                    setTimeout(() => {
                        const offsetTop = $this.offset().top
                        window.scrollTo(0, offsetTop)
                    }, 500)
                    history.pushState(null, null, '#' + $this.attr('id') + 'o');

                    $this.css('cursor', '');

                    $this.off('click.unfold');

                    // Close everything else
                    $('.content__item').each(function() {
                        fold($(this))();
                    });

                    $this.removeClass('content__item--folded')
                         .addClass('content__item--unfolded content__item--double');


                    callIsotope();
                });
            };

            bindUnfold($this);
            $this.find('.when-unfolded .fa-remove').on('click.fold', fold($this));
        }

        // Handle iframes
        if ($this.hasClass('content__item--has-iframe')) {
            var iframeInserted = function($iframe) {
                $iframe.removeAttr('width');
                $iframe.removeAttr('height');
                $iframe.on('load', function() {
                    $this.css('display', 'block');

                    var width = '100%';
                    if ($iframe.parents('.content__item--has-iframe__wrapper').length > 0) {
                        width = 'calc(100% + 16px)';
                    }
                    $iframe.css('width', width);

                    var height = $iframe.innerWidth();
                    if ($iframe.parent().hasClass('s16x9')) {
                        height = (height / 16) * 9;
                    }
                    $iframe.css('min-height', height);

                    $iframe.parents('.content__item--has-iframe__wrapper')
                        .css('height', $this.innerWidth());
                    callIsotope();
                });
            };

            var $iframe = $this.find('iframe');
            if ($iframe.length > 0) {
                iframeInserted($iframe);
            } else {
                if (MutationObserver != null) {
                    var observer = new MutationObserver(function(mutations) {
                        _.each(mutations, function(mutation) {
                            _.each(mutation.addedNodes, function(newNode) {
                                if (newNode.tagName === 'IFRAME') {
                                    iframeInserted($(newNode));
                                    observer.disconnect();
                                }
                            });
                        });
                    });
                    observer.observe($this.find('.content__item--has-iframe__wrapper')[0], {
                        childList : true
                    });
                } else {
                    $this.on('DOMNodeInserted.paulloz', function(ev) {
                        if (ev.target.tagName === 'IFRAME') {
                            iframeInserted($(ev.target));
                            $this.off('DOMNodeInserted.paulloz');
                        }
                    });
                }
            }
        }
    });

    if (document.location.hash.length > 1) {
        var toUnfold = $(document.location.hash.replace(/o$/, ''));
        if (toUnfold.find('.when-unfolded').length > 0) {
            toUnfold.trigger('click.unfold');
        }
    }

    // Resize iframe wrappers on window resize
    $(window).on('resize', _.debounce(function() {
        $('.content__item--has-iframe').each(function() {
            var $this = $(this),
                height = $(this).innerWidth();
            if ($this.hasClass('s16x9')) {
                height = (height / 16) * 9;
            }
            $this.find('iframe').css('min-height', height);
            $this.find('.content__item--has-iframe__wrapper').css('height', $this.innerWidth());
        });

        callIsotope(true);
    }, 200));
});
