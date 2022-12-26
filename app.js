import {
	Application,
	Controller,
} from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js";
window.Stimulus = Application.start();

Stimulus.register(
	"todo",
	class extends Controller {
		static targets = ["input", "list", "item", "updated", "text"];
		static values = { index: Number };

		initialize() {
			console.log("stimulus initialized");
		}

		connect() {
			console.log("stimulus connected");
		}

		disconnect() {
			console.log("stimulus disconnected");
		}

		createNewTask(event) {
			event.preventDefault();

			const todo_item = this.inputTarget.value.trim();

			this.listTarget.innerHTML += `
            <li data-todo-target="item" data-item-id=${this.indexValue}>
                <div class="list">
                    <input type="checkbox" class="tick" data-action="todo#completedTask">
                
                    <span class="text" data-todo-target="text">${todo_item}</span>
                
                    <button class="edit" data-action="todo#createUpdateElement">Edit</button>
                
                    <button class="delete" data-action="todo#deleteTask">Delete</button>
                </div>
            </li>
        `;
			this.indexValue++;
			this.element.children[0].children[0].value = "";
		}

		createUpdateElement(event) {
			event.preventDefault();

			event.target.parentElement.parentElement.innerHTML = `
            <div class="update_list">
                <input type="text" class="update_text" data-todo-target="updated">
        
                <button class="update" data-action="todo#updateTask">Update</button>
        
                <button class="delete" data-action="todo#deleteTask">Delete</button>
            </div>
        `;
		}

		deleteTask(event) {
			event.preventDefault();

			event.target.parentElement.parentElement.remove();
		}

		updateTask(event) {
			event.preventDefault();

			const updated_item =
				event.target.previousElementSibling.value.trim();

			event.target.parentElement.parentElement.innerHTML = `
            <div class="list">
                    <input type="checkbox" class="tick" data-action="todo#completedTask">
                
                    <span class="text" data-todo-target="text">${updated_item}</span>
                
                    <button class="edit" data-action="todo#createUpdateElement">Edit</button>
                
                    <button class="delete" data-action="todo#deleteTask">Delete</button>
            </div>`;
		}

		completedTask(event) {
			event.preventDefault();

			if (
				event.target.nextElementSibling.style.textDecoration ===
				"line-through"
			) {
				event.target.nextElementSibling.style.textDecoration = "none";
			} else {
				event.target.nextElementSibling.style.textDecoration =
					"line-through";
			}
		}
	}
);
