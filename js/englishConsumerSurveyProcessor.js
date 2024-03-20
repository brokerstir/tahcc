document.addEventListener("DOMContentLoaded", function() {
  const formGroups = document.querySelectorAll('.form-group');
  const nextBtns = document.querySelectorAll('.nextBtn');
  const finalStep = document.getElementById('finalStep');
  const submitBtn = document.querySelector('button[type="submit"]');
  const buttonValidation = document.getElementById('validation');
  const emailValidation = document.getElementById('email-validation');

  let currentStep = 0;

  function showStep(step) {
    formGroups.forEach((group, index) => {
      if (index === step) {
        group.classList.add('active');
      } else {
        group.classList.remove('active');
      }
    });
    if (step === formGroups.length) {
      submitBtn.style.display = 'block';
      finalStep.style.display = 'block';
    } else {
      submitBtn.style.display = 'none';
      finalStep.style.display = 'none';
    }
  }

  function validateInputs() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();

    if (firstName === '' || lastName === '' || email === '') {
      // Display validation message
      emailValidation.textContent = "Please fill in first, last name, and email before proceeding.";
      emailValidation.style.display = 'block';
      setTimeout(() => {
        emailValidation.style.display = 'none';
      }, 2500);
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      // Display validation message
      emailValidation.textContent = "Please enter a valid email address.";
      emailValidation.style.display = 'block';
      setTimeout(() => {
        emailValidation.style.display = 'none';
      }, 2500);
      return false;
    }

    return true;
  }

  nextBtns.forEach((btn, index) => {
    btn.addEventListener('click', function() {
      const radioInputs = formGroups[currentStep].querySelectorAll('input[type="radio"]:not(.exclude)');
      if (radioInputs.length > 0) {
        console.log("radioInputs length:", radioInputs.length)
        let isAnyOptionSelected = false;
        radioInputs.forEach(input => {
          if (input.checked) {
            console.log("input.checked: ", input.checked)
            isAnyOptionSelected = true;
          }
        });
        if (!isAnyOptionSelected) {
          // Display validation message
          buttonValidation.textContent = "Please select an option before proceeding.";
          buttonValidation.style.display = 'block';
          setTimeout(() => {
            buttonValidation.style.display = 'none';
          }, 2500);
          return;
        }
      } else {
        if (!validateInputs()) {
        // if (false) {
        return;
      }
      }
      currentStep++;
      showStep(currentStep);
    });
  });

  document.getElementById('multiStepForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const q1Value = document.querySelector('input[name="question1"]:checked').value;
    const q2Value = document.querySelector('input[name="question2"]:checked').value;
    const q3Value = document.querySelector('input[name="question3"]:checked').value;
    const language = document.querySelector('input[name="language"]').value;
    const role = document.querySelector('input[name="role"]').value;
    const communication = document.querySelector('input[name="communication"]:checked').value;
    const updates = document.querySelector('input[name="updates"]:checked').value;
    const firstName = document.querySelector('input[name="firstName"]').value;
    const lastName = document.querySelector('input[name="lastName"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const form = document.getElementById('multiStepForm');
    const profileDiv = document.getElementById('profile');
    const profilePara = document.getElementById('profile-paragraph');
    const successDiv = document.getElementById('success-alert');
    const dangerDiv = document.getElementById('danger-alert');
    const invitations = [
      "Ready to explore and support our local businesses together? Join us at the chamber to discover hidden gems, connect with fellow enthusiasts, and make a positive impact in our community! ",
      "Passionate about empowerment and entrepreneurship? Join us at the chamber to gain new skills, network with like-minded individuals, and be part of positive change! ",
      "Love celebrating diversity and heritage? Join us at the chamber to immerse yourself in vibrant cultural experiences, connect with diverse communities, and spread joy! ",
      "Eager to make meaningful connections and explore our community? Join us at the chamber to meet new friends, discover local treasures, and create lasting memories! "
    ];
    form.style.display = 'none';

    console.log("Language:", language);
    console.log("Role:", role);
    console.log("firstName:", firstName);
    console.log("lastName:", lastName);
    console.log("email:", email);
    console.log("phone:", phone);
    console.log("updates:", updates);
    console.log("communication:", communication);

    const randomIndex = Math.floor(Math.random() * invitations.length);
    const invite = [invitations[randomIndex]];
    const answer1 = [1, q1Value];
    const answer2 = [2, q2Value];
    const answer3 = [3, q3Value];
    const answers = [answer1.join(""), answer2.join(""), answer3.join("")]
    const data = {
      firstName : firstName,
      lastName : lastName,
      lang : language,
      role : role,
      email : email,
      phone : phone,
      updates : updates,
      communication : communication,
      answer1 : answer1.join(""),
      answer2 : answer2.join(""),
      answer3 : answer3.join(""),
    }

    console.log("answers: ", answers)
    displayChamberMessage(answers, invite, firstName);
    submitToResponderAPI(data);

    function displayChamberMessage(answers, invite, firstName) {
      const greeting = "Thank you " + firstName + "! "
      const texts = answers.map(answer => getChamberMessage(answer));
      const joinedText = greeting + invite + texts.join(" ");
      console.log("profile:", joinedText);
      profilePara.innerHTML = joinedText;
      profileDiv.style.display = 'block'; // Display the profile div
    }
    
    function getChamberMessage(answerCombo) {
        switch(answerCombo) {
            case '1a':
                return "Your reliance on trusted recommendations speaks volumes about your community connections.";
            case '1b':
                return "As a social media enthusiast, you're at the forefront of staying informed.";
            case '1c':
                return "Your preference for online directories highlights your resourcefulness.";
            case '2a':
                return "Your interest in exclusive discounts shows your desire to support local businesses.";
            case '2b':
                return "As a networker keen on community connections, you're an asset to our chamber.";
            case '2c':
                return "Your commitment to community initiatives aligns with our chamber's mission.";
            case '3a':
                return "And your interest in cultural festivals reflects a desire to celebrate diversity.";
            case '3b':
                return "And as a culinary enthusiast, you appreciate the richness of our local food scene.";
            case '3c':
                return "And your interest in workshops shows a passion for entrepreneurship and empowerment.";
            default:
                return "";
        }
    }

    function submitToResponderAPI(data) {
      var URL = "https://33tey7z4r7.execute-api.us-east-1.amazonaws.com";
      console.log("data: ", data)

      $.ajax({
       type: "POST",
       url : "https://33tey7z4r7.execute-api.us-east-1.amazonaws.com/live",
       dataType: "json",
       crossDomain: "true",
       contentType: "application/json; charset=utf-8",
       data: JSON.stringify(data),
       success: function () {
         successDiv.style.display = 'block'
         // alert ("Sucess");
       },
       error: function () {
         dangerDiv.style.display = 'block'
         // alert ("Error");
       }});
      }
  });
});
