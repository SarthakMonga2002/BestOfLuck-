document.addEventListener("DOMContentLoaded", function () {
    const cardContainer = document.querySelector(".card-container");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    const totalCards = 19;
    let currentIndex = 0;
    let cards = [];

    // List of image paths (assuming they're served statically)
    const imagePaths = [
        "/pics_vids/Ishika20.jpeg", "/pics_vids/Ishika2.jpeg", "/pics_vids/Ishika.jpeg",
        "/pics_vids/Ishika23.jpeg", "/pics_vids/Ishika5.jpeg", "/pics_vids/Ishika6.jpeg",
        "/pics_vids/Ishika7.jpeg", "/pics_vids/Ishika25.jpeg", "/pics_vids/Ishika26.jpeg",
        "/pics_vids/Ishika10.jpeg", "/pics_vids/Ishika11.jpeg", "/pics_vids/Ishika28.jpeg",
        "/pics_vids/Ishika29.jpeg", "/pics_vids/Ishika14.jpeg", "/pics_vids/Ishika30.jpeg",
        "/pics_vids/Ishika16.jpeg", "/pics_vids/Ishika31.jpeg", "/pics_vids/Ishika26.jpeg",
        "/pics_vids/Ishika38.jpeg",
    ];

    // Hardcoded text for each card
    const cardTexts = [
        "The day when I first heard your voice, I was mesmerized that how can anyone sound so good, your voice was soothing and your demeanour just won my heart💖",
        "When I saw your snap for the first time, I wanted to confirm, that is this girl actually real as how can someone look so beautiful ❤️",
        "I want our first trip to be together in Lucknow. Now why there? It's simple. To see, if the food of Lucknow is really better than Delhi",
        "I still remember we need to have a match on basketball and cricket. And ofc the loser takes the winner out for lunch or dinner but in reality I am the winner as I will be getting a date with you 😜",
        "I remember you told me that I have an accent but I am pretty ki nhi Accent hai hi nhi, so why not place a bet on this too and you can decide what the get should be",
        "I am pretty excited to meet jojo. I have been afraid of dogs but recently I find myself less scared of them, just knowing that you like dogs means that I don't need to fear them, so I am counting on you to help me get over my fear",
        "Still waiting for the day when you will teach me how to draw real art. Also tell me what's the tuition fee and you know maybe I can get some discount 😉",
        "And uss dinn I don't know how but I wasn't able to remember many movies but this time when you ask me you'll know that I am very well aware of the movies",
        "Fun fact, I really didn't do so much coding for my own projects that I am doing for your birthday and valentine's, so thank you for helping me in my coding journey by being the source of my motivation",
        "You know I generally start feeling sleepy around 11 but I am always ready to have a conversation with you no matter how late it is. I genuinely have a smile on my face when talking or thinking about you",
        "I haven't been like this in a long time but with you I can be myself, where I can show the real Sarthak as with time I just kept everything to myself but want to share that with you",
        "You know when I got the internship at MobiKwik, you know what was the first thought I had in my mind? That I can be in Delhi and near you and it's literally what I really thought ❤️",
        "There maybe many areas where I am clueless like who's Virat's older child ya Sushmita Sen's 3 movies but itna I am definitely sure that I love you and I want to keep doing that",
        "Yes I know that when we have our bet, you will make rules to give yourself advantage, so yeah so that in basketball not in cricket please, I am a noob lol. Also I would need the first ball to be the try ball",
        "You know our shopping together is still pending and our ice cream and coffee dates too. Can't wait to have cold coffee with you . Just thinking about the combination makes my heart flutter. Cold coffee and hot Ishika",
        "By the way, I do tend to ask myself how I got so lucky to have you in my life . At one point in time , all there was in my life was work, that's it. But now it's much more, I have you and I am lucky to have you and lucky to be yours",
        "There is a lot of things you need to teach and one of them is to cook, so that after our night stays together, next thing in the morning I will cook some delicious breakfast for you, provided you do wake me up 😂😂",
        "I wish to talk to you the entire night. Hear the sweet melody that comes out of your mouth, your intelligence and hardwork is something that inspires me to push myself to work even harder. You are literally one of the best people I met last year. An amazing older sister, a good daughter, an awesome friend and the list goes on and on. Though I do wish to add this, that always being Sarthak Monga's good girl",
        "Ishika Happy Birthday and have lots of fun. I know you don't like to celebrate birthdays but the point of birthdays isn't to throw a party but rather be with people you love and care for. So although at this birthday of yours I cannot be in Lucknow, I do wish that in all the upcoming birthday parties of yours I will be there to celebrate it with you as your loved one 🥰🥰"
    ];

    // Shuffle images randomly
    imagePaths.sort(() => Math.random() - 0.5);

    // Create cards dynamically
    for (let i = 0; i < totalCards; i++) {
        const card = document.createElement("div");
        card.classList.add("card");

        const frontDiv = document.createElement("div");
        frontDiv.classList.add("front");
        frontDiv.style.backgroundImage = `url('${imagePaths[i]}')`;
        frontDiv.style.backgroundSize = "cover";
        frontDiv.style.backgroundPosition = "center";
        frontDiv.style.backgroundRepeat = "no-repeat";

        const backDiv = document.createElement("div");
        backDiv.classList.add("back");
        backDiv.innerHTML = `${cardTexts[i]} <br>`;

        console.log(`Setting background for card ${i + 1}:`, imagePaths[i]); // Debugging

        card.appendChild(frontDiv);
        card.appendChild(backDiv);
        card.style.zIndex = totalCards - i;
        cardContainer.appendChild(card);
        cards.push(card);

        // Click event for flipping
        card.addEventListener("click", function () {
            card.classList.toggle("flipped");
        });
    }

    function updateCardVisibility() {
        cards.forEach((card, index) => {
            let position = (index - currentIndex + totalCards) % totalCards;
            card.style.zIndex = totalCards - position;
            card.style.top = position * 5 + "px";
            card.style.left = position * 5 + "px";
        });
    }

    prevBtn.addEventListener("click", function () {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCardVisibility();
    });

    nextBtn.addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCardVisibility();
    });

    updateCardVisibility();
});
