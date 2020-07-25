(function() {
  let noOfSwaps = 0;

  // register the events
  function registerEvents(event) {
    if (window.onload) {
      let oldEvt = window.onload;
      window.onload = function() {
        oldEvt();
        event();
      }
    } else {
      window.onload = event;
    }
  }

  // get sorted images
  function getSortedImages() {
    let images = [];
    for (let i = 1; i <= 9; i++) {
      images.push("./images/" + i + ".jpg");
    }

    return images;
  }

  // get the shuffled images
  function shuffle() {
    let images = getSortedImages();
    for (let i = images.length-1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let tmp = images[i];
      images[i] = images[j];
      images[j] = tmp;
    }
    console.log(images);
    return images;
  }

  // count the number of checked checkbox
  function getChecked() {
    let count = 0;
    let elements = document.getElementsByTagName("input");
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].checked) {
        count++;
      }
    }

    return count;
  }

  // add event listeners for checkbox
  function checkboxClicked() {
    let elements = document.getElementsByTagName("input");
    let btn = document.getElementById('swap');
    for (let i = 0; i < elements.length; i++) {
      elements[i].onclick = function() {
        let count = getChecked();
        btn.disabled = count != 2;
        if (btn.disabled) {
          btn.style.background = "gray";
        } else {
          btn.style.background = "dodgerblue";
        }
      }
    }
  }

  // fill the images
  function fillImages() {
    let images = shuffle();
    let elements = document.getElementsByTagName("img");
    for (let i = 0; i < elements.length; i++) {
      elements[i].setAttribute('src', images[i]);
    }
  }

  // triggered when the swap button is clicked
  function regSwapBtn() {
    document.getElementById('swap').onclick = swapImages;
  }

  // swap two images when swap button is clicked
  function swapImages() {
    noOfSwaps++;
    let checked = [];
    let elements = document.getElementsByTagName("input");
    let images = document.getElementsByTagName("img");
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].checked) {
        checked.push(Number(elements[i].value.substr(-1)));
      }
    }

    if (checked.length == 2) {
      let src = checked[0];
      let dest = checked[1];
      let tmp = images[src-1].getAttribute('src');
      images[src-1].setAttribute('src', images[dest-1].getAttribute('src'));
      images[dest-1].setAttribute('src', tmp);
      for (let i = 0; i < elements.length; i++) {
        elements[i].checked = false;
      }

      let success = true;
      const sortedImages = getSortedImages();
      for (let i = 0; i < images.length; i++) {
        if (images[i].getAttribute('src') !== sortedImages[i]) {
          success = false;
          break;
        }
      }

      if (success) {
        alert("You got it!!! Number of swaps: " + noOfSwaps);
      }
    }
  }

  registerEvents(checkboxClicked);
  registerEvents(fillImages);
  registerEvents(regSwapBtn);
})();
