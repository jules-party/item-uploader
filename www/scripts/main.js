async function view() {
    fetch("../imageinfo.json")
        .then((res) => res.json())
        .then((jsondata) => {
            var r = document.querySelector(':root');
            r.style.setProperty('--columns', jsondata.images.length);

            for (var i = 0; i < jsondata.images.length; i++) {
                const grid = document.getElementById("grid");
                const div = document.createElement("div");
                div.classList.add("imgdiv");
                var img = document.createElement("img");
                var src = "../uploads/" + jsondata.images[i].filename;
                img.src = src;

                const name = document.createElement("h3");
                name.textContent = jsondata.images[i].name;

                const price = document.createElement("h4");
                price.textContent = "$" + jsondata.images[i].price;

                const description = document.createElement("button");
                description.type = "button";
                description.textContent = "Description"
                description.classList.add("collapsible");

                const content = document.createElement("div");
                const text = document.createElement("p");
                content.classList.add("content");
                text.textContent = jsondata.images[i].description;
                content.appendChild(text);

                div.appendChild(img);
                div.appendChild(name);
                div.appendChild(price);
                div.appendChild(description);
                div.appendChild(content);
                grid.appendChild(div);
            }
        });
}

function description() {
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                this.parentElement.style.paddingBottom = "10px";
            } else {
                this.parentElement.style.paddingBottom = "0px";
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }
}

async function execute() {
    try {
        const result = await view();
    } catch (e) {
        console.log(e);
    }
}
execute();

setTimeout(function () {
    description();
}, 100);