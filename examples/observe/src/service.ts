import { ToDoItem, DisplayState } from "types";

export interface Service {
  loadItems: (displayState: DisplayState) => Promise<ToDoItem[]>;
  addItem: (text: string) => Promise<ToDoItem>;
  clearCompleted: () => Promise<void>;
  updateItem: (item: ToDoItem) => Promise<ToDoItem>;
  deleteItem: (itemId: number) => Promise<boolean>;
  toggleItem: (itemId: number) => Promise<boolean>;
}

const getRandInRange = (minValue: number, maxValue: number) =>
  Math.floor(Math.random() * (maxValue - minValue) + minValue);

class ServiceImpl implements Service {
  private lastId: number;

  constructor(private toDoItems: ToDoItem[], private delayMinMs = 200, private delayMaxMs = 5000) {
    this.lastId = toDoItems.reduce((n: number, x: ToDoItem, i) => (i === 0 || x.itemId > n) ? x.itemId : n, 1000);
  }

  private wait = () => new Promise<void>(resolve => setTimeout(resolve, getRandInRange(this.delayMinMs, this.delayMaxMs)));

  private getForState = (displayState: DisplayState) =>
    this.toDoItems
      .filter(x => displayState === "all" || x.completed === (displayState === "completed"));

  loadItems = (displayState: DisplayState) =>
    this.wait().then(() => this.getForState(displayState));

  addItem = (text: string) =>
    this.wait().then(() => {
      const item: ToDoItem = { itemId: ++this.lastId, text, completed: false };
      this.toDoItems.push(item);
      return item;
    });

  clearCompleted = () =>
    this.wait().then(() => {
      this.toDoItems = this.toDoItems.filter(x => x.completed !== true);
    });

  updateItem = (item: ToDoItem) =>
    this.wait().then(() => {
      this.toDoItems = this.toDoItems.map(x => x.itemId === item.itemId ? item : x);
      return item;
    });

  deleteItem = (itemId: number) =>
    this.wait().then(() => {
      const itemIndex = this.toDoItems.findIndex(x => x.itemId === itemId);
      if (itemIndex === -1) {
        return false;
      } else {
        this.toDoItems.splice(itemIndex, 1);
        return true;
      }
    });

  toggleItem = (itemId: number) =>
    this.wait().then(() => {
      const itemIndex = this.toDoItems.findIndex(x => x.itemId === itemId);
      if (itemIndex === -1) {
        return false;
      } else {
        this.toDoItems[itemIndex].completed = !this.toDoItems[itemIndex].completed;
        return true;
      }
    });

}

interface State {
  service: Service;
}

const state: State = { service: new ServiceImpl([]) };

export const initService = (toDoItems: ToDoItem[], delayMinMs = 200, delayMaxMs = 5000) => {
  state.service = new ServiceImpl(toDoItems, delayMinMs, delayMaxMs);
};

export const getService = (): Service =>
  state.service;
