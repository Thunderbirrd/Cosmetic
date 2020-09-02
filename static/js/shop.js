const shop = document.querySelector("main .shop");

const shopRows = shop.querySelectorAll(".row");

//отступы между карточками с учётом теней
const MARGIN_BETWEEN_CARD = MARGIN_SHOP_CARD + ROW_CARD_SHADOW_SIZE * 2;

//отступы слева и справа строки
const PADDING_RIGHT_AND_LEFT_ROW = MARGIN_SHOP_CARD + ROW_CARD_SHADOW_SIZE;

//настраиваем тени, ширину и отступы справа у .card и .row в .shop
const setUpCardRowShop = () => {
    //ширина кнопок
    wrapsRowInShop.forEach(wrap => {
        wrap.querySelectorAll("button").forEach(b => {
            b.style.width = WIDTH_BUTTON_IN_ROW_WRAP + "px";
            b.style.height = WIDTH_BUTTON_IN_ROW_WRAP + "px";
        })
    })

    // отступы .row
    shopRows.forEach(row => {
        row.style.marginLeft = MARGIN_LEFT_AND_RIGHT_ROW + "px";
        row.style.marginRight = MARGIN_LEFT_AND_RIGHT_ROW + "px";

        const cards = row.querySelectorAll(".card");

        cards.forEach((el, i) => {
            //тень
            el.style.boxShadow = `0 0 ${ROW_CARD_SHADOW_SIZE}px 0 black`;
    
            //ширина
            el.style.width = WIDTH_SHOP_CARD + "px";
    
            //отступы
            if (i === 0) {
                el.style.marginLeft = PADDING_RIGHT_AND_LEFT_ROW + "px";
            } else {
                el.style.marginLeft = 0;
            }
    
            if (i !== cards.length - 1) {
                el.style.marginRight = MARGIN_BETWEEN_CARD + "px";
            } else {
                el.style.marginRight = PADDING_RIGHT_AND_LEFT_ROW + "px";
            }
        });
    });
};

setUpCardRowShop();

//длина прокрутки влево или вправо
const DISTANCE_SCROLL_ROW = MARGIN_SHOP_CARD + ROW_CARD_SHADOW_SIZE * 2 + WIDTH_SHOP_CARD;

//прокручивает на одну карточку влево
const scrollLeft = (row, time) => {
    // row.scrollBy(-DISTANCE_SCROLL_ROW, 0)
    jQuery(row).animate({scrollLeft: row.scrollLeft - DISTANCE_SCROLL_ROW}, time);
}

//прокручивает на одну карточку вправо
const scrollRight = (row, time) => {
    // row.scrollBy(DISTANCE_SCROLL_ROW, 0)
    jQuery(row).animate({scrollLeft: row.scrollLeft + DISTANCE_SCROLL_ROW}, time);
}

//прокручивает на count карточек вправо
const scrollRowTo = (row, count, time) => {
    // row.scrollToy(DISTANCE_SCROLL_ROW * count, 0)
    jQuery(row).animate({scrollLeft: DISTANCE_SCROLL_ROW * count}, time);
}

const elementsFlexControl = shop.querySelectorAll(".flex_control");

//заполняем .flex_control
const setUpFlexControl = (numberFlexControl, countVisibleCardInRow, countCard, row) => {
    const flexControl = shop.querySelector(`.flex_control[data-number="${numberFlexControl}"]`);
    const countLi = Math.ceil(countCard / countVisibleCardInRow);

    flexControl.innerHTML = "";

    for (let i = 0; i < countLi; i++) {
        const li = document.createElement("li");

        if (i === 0) {
            li.classList.add("active")
        }

        const span = document.createElement("span");
        li.appendChild(span);

        flexControl.appendChild(li)

        const clickListener = (e) => {
            flexControl.querySelectorAll("li").forEach(li => {
                li.classList.remove("active")
            })

            li.classList.add("active")

            const time = 250;

            scrollRowTo(row, i * countVisibleCardInRow, time);

            li.removeEventListener("click", clickListener);

            setTimeout(() => {
                li.addEventListener("click", clickListener);
            }, time + 100);
        }
        
        li.addEventListener("click", clickListener);
    }
}

//настраиваем ширину класс .row
const setUpWidthRow = (element) => {
    const parent = element.parentElement;

    try {
        element.scrollTo(0, 0);
    } catch (e) {
        element.scrollLeft = 0;
    }

    element.style.width = "auto";

    const marginAndWidth = WIDTH_SHOP_CARD + MARGIN_BETWEEN_CARD;
    let countVisibleCardInRow;

    if (isWidthMobileScreen()) {
        countVisibleCardInRow = 1; 
    } else {
        countVisibleCardInRow = Math.floor((parent.clientWidth - 
            WIDTH_BUTTON_IN_ROW_WRAP * 2 - MARGIN_LEFT_AND_RIGHT_ROW * 2 -
            PADDING_RIGHT_AND_LEFT_ROW * 2 - WIDTH_SHOP_CARD) / marginAndWidth) + 1;
    }

    element.style.width = (countVisibleCardInRow * WIDTH_SHOP_CARD + //карточки
        (countVisibleCardInRow - 1) * MARGIN_BETWEEN_CARD + //отступы между карточками
        2 * PADDING_RIGHT_AND_LEFT_ROW) + "px";

    setUpFlexControl(parent.dataset.number, countVisibleCardInRow, 
        element.children.length, element);
}

//настраиваем ширину всех строк
const setUpRows = () => {
    shopRows.forEach(element => {
        setUpWidthRow(element);
    });
}
setUpRows();

//прокрутка налево, направо на кнопки
wrapsRowInShop.forEach(wrap => {
    const row = wrap.querySelector(".row");

    wrap.querySelector(".back").addEventListener("click", () => {
        let event = new WheelEvent("wheel", {
            "deltaX": -1,
            "deltaMode": 0
        })

        row.dispatchEvent(event);
    })

    wrap.querySelector(".forward").addEventListener("click", () => {
        let event = new WheelEvent("wheel", {
            "deltaX": 1,
            "deltaMode": 0
        })

        row.dispatchEvent(event);
    })
})

//замена прокрутки по оси OY на ось OX
shopRows.forEach(el => {
    el.addEventListener("wheel", (e) => {
        e.preventDefault();
    })

    const listenerScrollRows = (e) => {    
        let delta = e.deltaY === 0 ? e.deltaX : e.deltaY
    
        //поправка на 1 пиксель
        if ((delta > 0 && el.scrollLeft + el.offsetWidth + 1 < el.scrollWidth) || (delta < 0 && el.scrollLeft > 0)) {
            // el.scrollBy(delta, 0)
            let time = 250;

            el.removeEventListener("wheel", listenerScrollRows);
            setTimeout(() => {
                el.addEventListener("wheel", listenerScrollRows);
            }, time + 100)

            if (delta > 0) {
                scrollRight(el, time);
            } else {
                scrollLeft(el, time);
            }
        }
    }

    el.addEventListener("wheel", listenerScrollRows)    
})

const shopSearchInput = shop.querySelector(".search_input")

const divNothingFound = shop.querySelector(".nothing_found")

const divRows = shop.querySelector(".rows")

const setUpShop = (newCards=shopCard) => {
    for (let i = 0; i < newCards.length; i++) {
        rowsInShop[Math.floor(i / countInRow)].appendChild(newCards[i]);        
    }

    hideRowInShop();
    setUpCardRowShop();
    setUpRows();
}

const showProductByFilter = (name, brand, line, category) => {
    const all = ""

    let isNothingFound = true;

    const newCards = [];

    shopCard.forEach(el => {
        if ((brand === all || el.dataset.brand === brand) &&
            (line === all || el.dataset.line === line) &&
            (category === all || el.dataset.category === category) &&
            String(el.dataset.name).toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
            newCards.push(el)
            isNothingFound = false
        } else {
            el.remove();
        }
    })

    setUpShop(newCards);

    if (isNothingFound) {
        divRows.classList.add("hide")
        divNothingFound.classList.remove("hide")
    } else {
        divRows.classList.remove("hide")
        divNothingFound.classList.add("hide")
    }
}

//показывает продукты названия которых совпадают с "name"
const showProductByName = (name) => {
    store.filter.name = name
}

//ищем продукты по названию
shopSearchInput.addEventListener("input", (e) => {
    showProductByName(shopSearchInput.value)
});

//Анимация лупы
$(".btnsearch").on("click", function () {
    $(".search_input").toggleClass("inclicked");
    $(".btnsearch").toggleClass("close");
});
