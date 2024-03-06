var shadowIslandPreview = document.getElementById("bgshadowisland");
var rootFruitPreview = document.getElementById("bgrootfruit");

const shadowIslandLabel = document.getElementById("shadowisland");
const rootFruitLabel = document.getElementById("rootfruit");

shadowIslandLabel.addEventListener(
    "mouseover",
    (event) => {
        shadowIslandPreview.hidden = false;
        rootFruitPreview.hidden = true;
    }
)

rootFruitLabel.addEventListener(
    "mouseover",
    (event) => {
        shadowIslandPreview.hidden = true;
        rootFruitPreview.hidden = false;
    }
)


