let inputValue = "undefined";
let set = false;
let display="list";
let fetchData = async () => {
    let response = await fetch("https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093");
    return response.json();
};

let fill = async (inputValue,display) => {
    let item = await fetchData();
    item = item.data;

    const data = item.map(info => {
        return {
            product_badge: info.product_badge,
            product_image: info.product_image,
            product_title: info.product_title,
            product_variants: [...info.product_variants],
        };
    });

    
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = "";

    
    function createCard(data) {
        const card = document.createElement("div");
        card.classList.add("card");

        const badge = document.createElement("div");
        badge.classList.add("badge");
        badge.textContent = data.product_badge;

        const image = document.createElement("img");
        image.src = data.product_image;

        const title = document.createElement("div");
        title.classList.add("title");
        title.textContent = data.product_title;
        

        const variants = document.createElement("div");
        variants.classList.add("variants");
        data.product_variants.forEach(variantData => {
            for (const key in variantData) {
                const variant = document.createElement("div");
                variant.classList.add("variant");

                variant.textContent = ` ${variantData[key]}`;

                let check = variantData[key];
                let parts = check.split('/');

                if (inputValue && (parts[0].toLowerCase().includes(inputValue.toLowerCase()) || parts[1].toLowerCase().startsWith(inputValue.toLowerCase()))) {
                    variant.classList.add("add");
                }
                
                if(display==="grid"){
                    variant.classList.add("new-variant")
                }
               
               
                variants.appendChild(variant);
            }
        });
       
       
        if(display==="grid"){
            badge.classList.add("new-badge")
            badge.classList.remove("badge");
            card.classList.remove("card")
            card.classList.add("grid-card")
            card.appendChild(image);
            card.appendChild(badge);
            const temp = document.createElement("div");
            temp.classList.add("description-card")
            temp.appendChild(title);
            temp.appendChild(variants);
            card.appendChild(temp);
            
        }
        else {
           
            card.appendChild(badge);
            card.appendChild(image);
            card.appendChild(title);
            card.appendChild(variants);
        }

        return card;
    }

    data.forEach(productData => {
        const card = createCard(productData);
        cardsContainer.appendChild(card);
    });
};

function handleInputChange(inputElement) {
    inputValue = inputElement.value;
    set = true;
    fill(inputValue,display);
}
function handleClick(){
    inputValue="undefined";
   
        display="grid";
    
   
    fill(inputValue,display);
}
function handleSecond(){
    inputValue="undefined";
   
        display="list";
    
   
    fill(inputValue,display);
}

fill(inputValue,display);
