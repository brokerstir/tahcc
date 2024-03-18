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
      emailValidation.textContent = "Please fill in all fields before proceeding.";
      emailValidation.style.display = 'block';
      // Hide validation message after 2 seconds
      setTimeout(() => {
        emailValidation.style.display = 'none';
      }, 2000);
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      // Display validation message
      emailValidation.textContent = "Please enter a valid email address.";
      emailValidation.style.display = 'block';
      // Hide validation message after 2 seconds
      setTimeout(() => {
        emailValidation.style.display = 'none';
      }, 2000);
      return false;
    }

    return true;
  }

  nextBtns.forEach((btn, index) => {
    btn.addEventListener('click', function() {
      const radioInputs = formGroups[currentStep].querySelectorAll('input[type="radio"]');

      if (radioInputs.length > 0) {
        let isAnyOptionSelected = false;
        radioInputs.forEach(input => {
          if (input.checked) {
            isAnyOptionSelected = true;
          }
        });
        if (!isAnyOptionSelected) {
          // Display validation message
          buttonValidation.textContent = "Please select an option before proceeding.";
          buttonValidation.style.display = 'block';
          // Hide validation message after 2 seconds
          setTimeout(() => {
            buttonValidation.style.display = 'none';
          }, 3000);
          return;
        }
      } else {
        if (!validateInputs()) {
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
    const q4Value = document.querySelector('input[name="question4"]:checked').value;
    const language = document.querySelector('input[name="language"]').value;
    const role = document.querySelector('input[name="role"]').value;
    const firstName = document.querySelector('input[name="firstName"]').value;
    const lastName = document.querySelector('input[name="lastName"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const form = document.getElementById('multiStepForm');
    const profileDiv = document.getElementById('profile');
    form.style.display = 'none';

    console.log("Language:", language);
    console.log("Role:", role);
    console.log("firstName:", firstName);
    console.log("lastName:", lastName);
    console.log("email:", email);

    const answerCombo = [q1Value, q2Value, q3Value, q4Value];
    console.log("answerCombo:", answerCombo.join("-"));
    displaySillyProfile(answerCombo); 

    function displaySillyProfile(answerCombo) {
      // Update the profileDiv innerHTML with the silly profile text
      text = getSillyProfileText(answerCombo);
      console.log("profile:", text);
      profileDiv.innerHTML = text;
      profileDiv.style.display = 'block'; // Display the profile div
    }
    
    function getSillyProfileText(answerCombo) {
       switch(answerCombo.join("-")) {
        case "a-a":
          return "You're a vibrant morning person who loves starting the day with a splash of energy.";
          break;
        case "a-b":
          return "You're an adventurous individual who enjoys exploring new flavors and experiences.";
          break;
        case "a-c":
          return "You're a bold and dynamic personality, always ready to dive into the excitement of the evening.";
          break;
        case "b-a":
          return "You're a cheerful optimist who brightens up any breakfast table with your sunny disposition.";
          break;
        case "b-b":
          return "You're a laid-back soul who savors the leisurely pace of a relaxed lunchtime.";
          break;
        case "b-c":
          return "You're a versatile individual, equally comfortable enjoying a casual lunch or a fancy dinner out on the town.";
          break;
        case "c-a":
          return "You're a night owl who thrives in the evening, embracing the vibrant nightlife and its endless possibilities.";
          break;
        case "c-b":
          return "You're a practical individual who appreciates the simplicity and convenience of a satisfying lunch.";
          break;
        case "c-c":
          return "You're a gourmet connoisseur who delights in the fine dining experience of a luxurious dinner affair.";
          break;
        default:
          return "No profile available for the given answer combo.";
      }
    }
  });
});