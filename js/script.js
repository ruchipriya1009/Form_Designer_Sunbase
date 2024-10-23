const formContainer = document.getElementById("formContainer");
const sampleData = [
  {
    id: "c0ac49c5-871e-4c72-a878-251de465e6b4",
    type: "input",
    label: "Sample Label",
    placeholder: "Sample placeholder",
  },
  {
    id: "146e69c2-1630-4a27-9d0b-f09e463a66e4",
    type: "select",
    label: "Select",
    options: ["Sample Option", "Sample Option", "Sample Option"],
  },

  {
    id: "680cff8d-c7f9-40be-8767-e3d6ba420952",
    type: "textarea",
    label: "Text area",
    placeholder: "Sample Placeholder",
  },
  {
    id: "45002ecf-85cf-4852-bc46-529f94a758f5",
    type: "input",
    label: "Sample Label",
    placeholder: "Sample Placeholder",
  },
];

let draggedElement = null;

function renderFormElements(elements) {
  formContainer.innerHTML = "";
  elements.forEach((element, index) => {
    const formElement = document.createElement("div");
    formElement.classList.add("form-element");
    formElement.setAttribute("data-id", element.id);
    formElement.draggable = true;

    // Drag event
    formElement.addEventListener("dragstart", (e) => {
      draggedElement = index;
      e.target.style.opacity = 0.5;
    });

    // Drag event
    formElement.addEventListener("dragend", (e) => {
      e.target.style.opacity = ""; // Reset the opacity after dragging
    });

    // Drag over event
    formElement.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    // Drop event (to reorder)
    formElement.addEventListener("drop", () => {
      const droppedIndex = index;
      [sampleData[draggedElement], sampleData[droppedIndex]] = [
        sampleData[droppedIndex],
        sampleData[draggedElement],
      ];
      renderFormElements(sampleData);
    });

    // Editable label
    const label = document.createElement("label");
    label.textContent = element.label;
    label.contentEditable = true; // Make label editable
    label.addEventListener("input", () => {
      sampleData[index].label = label.textContent;
    });
    formElement.appendChild(label);

    let inputElement;
    if (element.type === "input") {
      inputElement = document.createElement("input");
      inputElement.type = "text";
      inputElement.placeholder = element.placeholder;
      inputElement.value = element.placeholder;
      inputElement.addEventListener("input", () => {
        sampleData[index].placeholder = inputElement.value;
      });
    } else if (element.type === "select") {
      inputElement = document.createElement("select");
      element.options.forEach((optionText) => {
        const option = document.createElement("option");
        option.textContent = optionText;
        inputElement.appendChild(option);
      });
      inputElement.addEventListener("change", () => {
        sampleData[index].selectedOption = inputElement.value;
      });
    } else if (element.type === "textarea") {
      inputElement = document.createElement("textarea");
      inputElement.placeholder = element.placeholder;
      inputElement.value = element.placeholder;
      inputElement.addEventListener("input", () => {
        sampleData[index].placeholder = inputElement.value;
      });
    }

    formElement.appendChild(inputElement);

    // Add delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "🗑";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", () => deleteElement(element.id));
    formElement.appendChild(deleteButton);

    formContainer.appendChild(formElement);
  });
}

// Initial rendering of form
renderFormElements(sampleData);

// Add input element
document.getElementById("addInput").addEventListener("click", () => {
  console.log("Add Input button clicked");
  const newElement = {
    id: Date.now().toString(),
    type: "input",
    label: "New Input",
    placeholder: "Enter text",
  };
  sampleData.push(newElement);
  renderFormElements(sampleData);
});

// Add select element
document.getElementById("addSelect").addEventListener("click", () => {
  console.log("Add Select button clicked");
  const newElement = {
    id: Date.now().toString(),
    type: "select",
    label: "New Select",
    options: ["Option 1", "Option 2"],
  };
  sampleData.push(newElement);
  renderFormElements(sampleData);
});

// Add textarea element
document.getElementById("addTextarea").addEventListener("click", () => {
  console.log("Add Textarea button clicked");
  const newElement = {
    id: Date.now().toString(),
    type: "textarea",
    label: "New Textarea",
    placeholder: "Enter text",
  };
  sampleData.push(newElement);
  renderFormElements(sampleData);
});

// Delete element
function deleteElement(id) {
  console.log("Delete button clicked for element with ID:", id);
  const index = sampleData.findIndex((element) => element.id === id);
  if (index !== -1) {
    sampleData.splice(index, 1);
    renderFormElements(sampleData);
  }
}

// Save form and log JSON
document.getElementById("saveForm").addEventListener("click", () => {
  console.log("Save button clicked");
  console.log("Saved Form Data:", JSON.stringify(sampleData, null, 2));
});
