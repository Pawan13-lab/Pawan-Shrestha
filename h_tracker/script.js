function addHabit() {
    const habitInput = document.getElementById("habit-input");
    const habitText = habitInput.value.trim();

    if (habitText === "") {
        alert("Please enter a habit!");
        return;
    }

    const habitList = document.getElementById("habit-list");
    const li = document.createElement("li");
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function() {
        li.style.textDecoration = this.checked ? "line-through" : "none";
    });

    const text = document.createTextNode(habitText);
    
    li.appendChild(checkbox);
    li.appendChild(text);
    habitList.appendChild(li);

    habitInput.value = ""; // Clear input
}