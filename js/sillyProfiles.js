function getSillyProfileText(answerCombo) {
  switch(answerCombo.join("-")) {
    case "a-a":
      return "You're a vibrant morning person who loves starting the day with a splash of energy.";
    case "a-b":
      return "You're an adventurous individual who enjoys exploring new flavors and experiences.";
    case "a-c":
      return "You're a bold and dynamic personality, always ready to dive into the excitement of the evening.";
    case "b-a":
      return "You're a cheerful optimist who brightens up any breakfast table with your sunny disposition.";
    case "b-b":
      return "You're a laid-back soul who savors the leisurely pace of a relaxed lunchtime.";
    case "b-c":
      return "You're a versatile individual, equally comfortable enjoying a casual lunch or a fancy dinner out on the town.";
    case "c-a":
      return "You're a night owl who thrives in the evening, embracing the vibrant nightlife and its endless possibilities.";
    case "c-b":
      return "You're a practical individual who appreciates the simplicity and convenience of a satisfying lunch.";
    case "c-c":
      return "You're a gourmet connoisseur who delights in the fine dining experience of a luxurious dinner affair.";
    default:
      return "No profile available for the given answer combo.";
  }
}
