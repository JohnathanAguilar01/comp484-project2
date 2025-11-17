$(function () {
  $(".create-pet").click(addPet);

  // open modal
  $("#adoptButton").on("click", function () {
    $("#myModal").fadeIn(200);
  });

  // close modal (X button)
  $(".close").on("click", function () {
    $("#myModal").fadeOut(200);
    $("#modalInnerContent").empty();
  });
});

function Pet(petName) {
  this.name = petName;
  this.weight = 25;
  this.happiness = 10;
  this.hunger = 0;
  this.energy = 10;

  this.clickedTreatButton = function () {
    // Increase pet happiness
    this.happiness += 1;
    // Increase pet weight
    this.weight += 1;
    // Decrease pet hunger
    this.hunger -= 3;
    // Increase pet energy
    this.energy += 1;
  };

  this.clickedPlayButton = function () {
    // Increase pet happiness
    this.happiness += 1;
    // Decrease pet weight
    this.weight -= 1;
    // Increase pet hunger
    this.hunger += 1;
    // Decrease pet energy
    this.energy -= 1;
  };

  this.clickedExerciseButton = function () {
    // Decrease pet happiness
    this.happiness -= 5;
    // Decrease pet weight
    this.weight -= 1;
    // Increase pet hunger
    this.hunger += 2;
    // Decrease pet energy
    this.energy -= 2;
  };

  this.clickedSleepButton = function () {
    // Increase pet happiness'
    this.happiness += 1;
    // Increase pet energy
    this.energy += 3;
  };

  this.checkWeightAndHappinessBeforeUpdating = function () {
    if (this.weight < 0) {
      this.weight = 0;
    }
    if (this.happiness < 0) {
      this.happiness = 0;
    }
    if (this.hunger < 0) {
      this.hunger = 0;
    }
    if (this.hunger > 10) {
      this.hunger = 10;
    }

    if (this.energy < 0) {
      this.energy = 0;
    }
    if (this.energy > 10) {
      this.energy = 10;
    }
  };

  this.startStatDecay = function () {
    // Hunger drop every 5 seconds
    setInterval(() => {
      this.hunger += 1;
    }, 5000);

    // Energy drop every 10 seconds
    setInterval(() => {
      this.energy -= 1;
    }, 10000);
  };
}

function renderPetCard(pet, petType) {
  // HTMl for each pet card
  const card = $(`
    <div class="pet-card">
      <section class="pet-image-container">
        <img
          class="pet-image"
          src="images/${petType}.png"
        />
      </section>
      <section class="dashboard">
        <div>
          Name: <strong><span class="name">${pet.name}</span></strong>
        </div>
        <div>
          Weight: <strong><span class="weight">${pet.weight}</span> pounds</strong>
        </div>
        <div>
          Happiness:
          <strong><span class="happiness">${pet.happiness}</span> tail wags (per min)</strong>
        </div>
        <div>
          Hunger:
          <strong><span class="hunger">${pet.hunger}</span> Level</strong>
        </div>
        <div>
          Energy:
          <strong><span class="energy">${pet.energy}</span> Level</strong>
        </div>
        <div class="button-container">
          <button class="treat-button">Treat</button>
          <button class="play-button">Play</button>
          <button class="exercise-button">Exercise</button>
          <button class="sleep-button">Sleep</button>
        </div>
      </section>
    </div>
  `);

  // Adds the pet object to the #pets section in the html
  $("#pets").append(card);

  // Updates values every 5 seconds to match stats decay in pets object
  setInterval(() => {
    pet.checkWeightAndHappinessBeforeUpdating();
    card.find(".weight").text(pet.weight);
    card.find(".happiness").text(pet.happiness);
    card.find(".hunger").text(pet.hunger);
    card.find(".energy").text(pet.energy);
  }, 5000);

  // Event listener for when treat button is clicked
  card.find(".treat-button").on("click", function () {
    pet.clickedTreatButton();
    pet.checkWeightAndHappinessBeforeUpdating();
    card.find(".weight").text(pet.weight);
    card.find(".happiness").text(pet.happiness);
    card.find(".hunger").text(pet.hunger);
    card.find(".energy").text(pet.energy);
  });

  // Event listener for when play button is clicked
  card.find(".play-button").on("click", function () {
    pet.clickedPlayButton();
    pet.checkWeightAndHappinessBeforeUpdating();
    card.find(".weight").text(pet.weight);
    card.find(".happiness").text(pet.happiness);
    card.find(".hunger").text(pet.hunger);
    card.find(".energy").text(pet.energy);
  });

  // Event listener for when exercise button is clicked
  card.find(".exercise-button").on("click", function () {
    pet.clickedExerciseButton();
    pet.checkWeightAndHappinessBeforeUpdating();
    card.find(".weight").text(pet.weight);
    card.find(".happiness").text(pet.happiness);
    card.find(".hunger").text(pet.hunger);
    card.find(".energy").text(pet.energy);
  });

  // Event listener for when sleep button is clicked
  card.find(".sleep-button").on("click", function () {
    pet.clickedSleepButton();
    pet.checkWeightAndHappinessBeforeUpdating();
    card.find(".weight").text(pet.weight);
    card.find(".happiness").text(pet.happiness);
    card.find(".hunger").text(pet.hunger);
    card.find(".energy").text(pet.energy);
  });
}

function addPet() {
  var petName = null;
  var petType = "dog";

  const adoptionForm = $(`
    <form id="adoptionForm">
      <h2>Adoption Form</h2>
      
      <div class="form-name">
        <strong><label for="name">Name:</label></strong>
        <input type="text" id="name" name="name" required>
      </div>

      <div class="pet-choices">
        <button type="button" id="cat" class="pet-button">
          <img src="images/cat.png" alt="Button" style="height:120px;">
        </button>
        <button type="button" id="dog" class="pet-button">
          <img src="images/dog.png" alt="Button" style="height:120px;">
        </button>
        <button type="button" id="horse" class="pet-button">
          <img src="images/horse.png" alt="Button" style="height:120px;">
        </button>
        <button type="button" id="duck" class="pet-button">
          <img src="images/duck.png" alt="Button" style="height:120px;">
        </button>
      </div>
      <button type="submit" class="create-pet">Adopt</button>
    </form>
  `);

  $("#modalInnerContent").append(adoptionForm);

  adoptionForm.find("#cat").on("click", function () {
    petType = "cat";
  });

  adoptionForm.find("#dog").on("click", function () {
    petType = "dog";
  });

  adoptionForm.find("#horse").on("click", function () {
    petType = "horse";
  });

  adoptionForm.find("#duck").on("click", function () {
    petType = "duck";
  });

  adoptionForm.on("submit", function () {
    petName = $("#name").val();

    let pet = new Pet(petName);
    pet.startStatDecay();
    renderPetCard(pet, petType);
    $("#myModal").fadeOut(200);
    $("#modalInnerContent").empty();
  });
}
