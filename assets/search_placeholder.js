window.addEventListener("DOMContentLoaded", function(){
  
  const input = document.querySelector('.search_id');

  const phrases = [
    "Search for Rajma Chakrata",
    "Search for Sea Buckthorn Jam",
    "Search for Sweet Coconut Chips",
    "Search by A2 Himalayan Cow Ghee"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isTyping = true;
  let typingInterval;

  function typePhrase() {
    const currentPhrase = phrases[phraseIndex];
    if (charIndex <= currentPhrase.length) {
      input.setAttribute("placeholder", currentPhrase.substring(0, charIndex));
      charIndex++;
    } else {
      isTyping = false;
      clearInterval(typingInterval);
      setTimeout(() => {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        charIndex = 0;
        isTyping = true;
        typingInterval = setInterval(typePhrase, 100);
      }, 1500); // pause between phrases
    }
  }

  function startTypingEffect() {
    if (!isTyping && input.value === "") {
      isTyping = true;
      charIndex = 0;
      typingInterval = setInterval(typePhrase, 100);
    }
  }


  typingInterval = setInterval(typePhrase, 100);

  input.addEventListener("input", function () {
    if (input.value.length > 0) {
      clearInterval(typingInterval);
      isTyping = false;
    } else {
      startTypingEffect();
    }
  });
  
})

