
export class ToDo {
    public id: string;
    public name: string;
    public description: string;
    public priority: string;
  

    constructor(id: string, name: string, description: string, priority: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.priority = priority;
    }
}