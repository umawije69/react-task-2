import LocalizedStrings, { LocalizedStringsMethods } from "react-localization";

interface IStrings extends LocalizedStringsMethods {
  header: string;
  completed: string;
  active: string;
  all: string;
  toggle: string;
  delete: string;
  addTodo: string;
  clearTodos: string;
  inputError: string;
  inputPlaceholder: string;
}

export const strings: IStrings = new LocalizedStrings({
  en: {
    header: "Todos",
    completed: "Completed",
    active: "Active",
    all: "All",
    toggle: "Toggle",
    delete: "Delete",
    addTodo: "Add Todo",
    clearTodos: "Clear Todos",
    inputError: "Todo can't be empty",
    inputPlaceholder: "Todo..",
  },
  fr: {
    header: "Listes de tâches",
    completed: "Terminé",
    active: "Actif",
    all: "Toute",
    toggle: "Basculer",
    delete: "Effacer",
    addTodo: "Ajouter une tâche",
    clearTodos: "Tâches claires",
    inputError: "La tâche ne peut pas être vide",
    inputPlaceholder: "Faire..",
  },
  de: {
    header: "Aufgabenlisten",
    completed: "Abgeschlossen",
    active: "Aktiv",
    all: "Alle",
    toggle: "Umschalten",
    delete: "Löschen",
    addTodo: "Aufgaben hinzufügen",
    clearTodos: "Klare Aufgaben",
    inputError: "Machen kann nicht leer sein",
    inputPlaceholder: "Machen..",
  },
});
