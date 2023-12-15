function runSlide({ data = [], position = '', isPagination = false, isControl = false, time = 6000 }) {
    try {
      let index = 0;
      const innerSlide = document.createElement('div');
      innerSlide.classList.add('inner__slide');
      document.querySelector(`.${position}`).appendChild(innerSlide);
      const img = document.querySelector(`.${position} img`).clientHeight;
      // document.querySelector(`.${position}`).setAttribute('style', 'min-height:' + img + 'px');
  
      const removeSlideIndex = () => {
        const slidePicture = document.querySelector(`.${position} picture`);
        if (slidePicture) {
          slidePicture.remove();
        }
      };
  
      const myTimer = () => {
        if (index >= data.length - 1) {
          renderCard(0);
          index = 0;
        } else {
          removeSlideIndex();
          renderCard(++index);
        }
      };
  
      let myInter = setInterval(myTimer, time);
  
      const activePagination = (index) => {
        const allPagination = document.querySelectorAll(`.${position} .pagination__item`);
        for (let i = 0; i < allPagination.length; i++) {
          allPagination[i].classList.remove('active');
        }
        document.getElementById(`pagination-${position}-${index}`).classList.add('active');
      };
  
      const renderCard = (index) => {
        document.querySelector(`.${position} .inner__slide`).innerHTML = data[index];
        setTimeout(() => {
          document.querySelector(`.${position} .inner__slide img`).classList.add('ani');
        }, 100);
  
        isPagination ? activePagination(index) : '';
  
        const lazy = document.querySelector(`.${position} .lazy`);
        if (checkVisible(lazy)) {
          const src = lazy.getAttribute('data-src');
          lazy.setAttribute('src', src);
        }
      };
  
      const changeSlide = (e) => {
        removeSlideIndex();
        const id = e.getAttribute('data-id');
        index = Number(id);
        renderCard(id);
        clearInterval(myInter);
        myInter = setInterval(myTimer, time);
      };
  
      const changeSlideControl = (id) => {
        removeSlideIndex();
        if (id > data.length - 1) {
          id = 0;
          index = 0;
        } else if (id < 0) {
          id = data.length - 1;
          index = data.length - 1;
        }
        clearInterval(myInter);
        renderCard(id);
        myInter = setInterval(myTimer, time);
      };
  
      const pagination = () => {
        let html = '';
        for (let i = 0; i < data.length; i++) {
          html += `<span data-id='${i}' id="pagination-${position}-${i}" class="pagination__item">${i + 1}</span>`;
        }
        document.querySelector(`.${position}`).insertAdjacentHTML('beforeend', `<div class="pagination">${html}</div>`);
        const paginationItem = document.querySelectorAll(`.${position} .pagination__item`);
        for (let i = 0; i < paginationItem.length; i++) {
          paginationItem[i].addEventListener('click', () => changeSlide(paginationItem[i]));
        }
        isPagination ? activePagination(0) : '';
      };
  
      isPagination ? pagination() : '';
  
      const nextSlide = () => {
        changeSlideControl(++index);
      };
  
      const prevSlide = () => {
        changeSlideControl(--index);
      };
  
      const nextPrevSlide = () => {
        document.querySelector(`.${position}`).insertAdjacentHTML(
          'beforeend',
          `<div class="control"><button class="item__btn prev"><img width="30" height="30" src="Home/slider_delia/images/left-arrow.svg" alt=""></button><button class="item__btn next"><img width="30" height="30" src="Home/slider_delia/images/right-arrow.svg" alt=""></button></div>`
        );
        document.querySelector(`.${position} .next`).addEventListener('click', nextSlide);
        document.querySelector(`.${position} .prev`).addEventListener('click', prevSlide);
      };
  
      isControl ? nextPrevSlide() : '';
  
      function checkVisible(elm) {
        let rect = elm.getBoundingClientRect();
        let viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
      }
      
    } catch (error) {
      console.log('error');
    }
  }
  
  // Resize images
  const resize = () => {
    if (window.innerWidth < 768) {
      runSlide({
        data: dataSlide1Mb,
        position: 'slider_delia',
        isPagination: true,
        isControl: true,
      });
    } else {
      runSlide({
        data: dataSlide1,
        position: 'slider_delia',
        isPagination: true,
        isControl: true,
      });
    }
  };
  
  resize();